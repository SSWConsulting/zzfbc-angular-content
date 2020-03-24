const GhostAdminAPI = require('@tryghost/admin-api');
const fs = require('fs');
const MarkdownIt = require('markdown-it');
const cheerio = require('cheerio');
const axios = require('axios').default;
const config = require('./config');

console.log('starting...');

const api = new GhostAdminAPI({
    url: 'https://firebootcamp.ghost.io',
    version: 'v3',
    key: config.ghostKey
})


const getImages = (markdown) => {
    // markdown is not a proper spec and parsers suck so it's easier to convert to html and then parse that!
    const md = new MarkdownIt();
    const html = md.render(markdown);
    const $ = cheerio.load(html);
    $('img').each((index, img) => {
        let src = img.attribs.src
        axios.get(src, {responseType: "stream"} )
        .then(res => {
            let newPath = '../'+src.substring('https://firebootcamp.ghost.io/'.length);
            console.log(newPath);
            fs.mkdir(newPath.substring(0, newPath.lastIndexOf('/')), { recursive: true }, (err) => {
                if (err) throw err;
                res.data.pipe(fs.createWriteStream(newPath));
              }) 
        })
        .catch(error => {  
            console.log(error);  
        });
    });
}

api.posts.browse({ limit:1000 })
 .then(res => {
     for (let item of res) {
         console.log(item.slug +' : '+item.title);
         let mobileDoc = JSON.parse(item.mobiledoc);
         const markdown = mobileDoc.cards[0][1].markdown
         const moduleTag = item.tags.find(t => t.name.startsWith('module'));    
         
         if (moduleTag && markdown) {
            fs.writeFile(`../content/${moduleTag.name}.md`, markdown, err => {
                if (err) throw err;
            });
            console.log('saved', moduleTag.name);
            getImages(markdown);
         } else if (markdown) {
            fs.writeFile(`../content/archive/${item.slug}.md`, markdown, err => {
                if (err) throw err;
            });
         }
     }
 });

 api.posts.browse({ limit:1000, filter: 'status:draft' })
 .then(res => {
     for (let item of res) {
        let mobileDoc = JSON.parse(item.mobiledoc);
        const markdown = mobileDoc.cards[0][1].markdown
        fs.writeFile(`../content/archive/${item.slug}.md`, markdown, err => {
            if (err) throw err;
        });
     }
});

