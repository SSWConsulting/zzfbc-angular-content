## Overview
##### Time: 5min

There are two dependencies that we need to have correctly installed to be able to successfully build Angular applications: git and nodejs.

We need to ensure that the required versions are installed and that they are available globally from the command line.

### Relevant SSW Rules
- [Do you know how to get your machine setup?](https://rules.ssw.com.au/how-to-get-your-machine-setup)

### Learning Outcomes:

- Understand how to configure a machine to run Angular
- Have a working machine

## Install Visual Studio Code
##### Time: 15min

[Visual Studio Code](https://code.visualstudio.com/) is a lightweight but powerful source code editor which runs on your desktop and is available for Windows, OSX and Linux. It comes with built-in support for JavaScript, TypeScript, and Node.js and has a rich ecosystem of extensions for other languages (C++, C#, Python, PHP) and runtimes.

It's the easiest IDE to use for building Angular applications and is the IDE that we recommend during the course.

After you get the hang of building Angular apps, you are free to use your IDE of choice, but the course is written to be undertaken in Visual Studio Code.

Go to [https://code.visualstudio.com/](https://code.visualstudio.com/) and install Visual Studio Code for your operating system (Windows, OSX or Linux).


## Installing Dependencies
##### Time: 15min
To build Angular applications we require a number of tools including Git and nodejs.

We need to install them and get them setup, but we aren't going to focus on the mechanics of these tools early in the course - we want to focus on the fun stuff: building components and seeing our application develop. 

But don't worry, we do come back and ensure you understand what each of these tools does, and how to use them.

For each of the required dependencies, we are going to

- check the installed version
- install or update the package
- ensure it is installed globally.

It is important to check the version of these packages as having the wrong version or not having it globally installed is usually the main reason people have problems building other people's projects.

Before you install each of these packages it is best to check if you have it installed already and if so what version, which is the first step in installing any of the below items.

> [NOTE - Mac Users]  All of these instructions will be the same for Mac or Windows except that you may need to prefix the commands with ```sudo ``` on a mac if you have not set up authentication. e.g. ```git --version``` will become ```sudo git --version```. See [Apple Support](https://support.apple.com/en-au/HT202035) for more information. 

 

## Install Git 
##### Time: 5min
[Git](https://git-scm.com/) is a free and open source version control system. It is the way we share and manage versions of the code we make during this course.
    
### Check Installed Version of Git

Execute the following command at a command prompt/terminal:

```
 git --version
```



![Checking git version on command line](https://firebootcamp.ghost.io/content/images/2017/02/check-git-version.png)

Figure: OSX: - If installed correctly you should be able to see the version of Git installed 


![Checking git version on command line](https://firebootcamp.ghost.io/content/images/2017/02/check-git-version-1.jpg)

Figure: Windows: - If installed correctly you should be able to see the version of Git installed 


### Install Git (if required)

If a version number was not returned, or you received an error you need to install Git on your machine.

Follow the following instructions: 

1. Go to [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) 

2. Follow the instructions to install git for your machine type.
    
![Git install instructions page](https://firebootcamp.ghost.io/content/images/2017/02/installing-git.jpg)

Figure: [git install instructions page](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) 



## Install Node.js and npm 
##### Time: 5min
[Node.js](https://nodejs.org/en/) is a JavaScript runtime built on Chrome's V8 JavaScript engine. 

When you install NodeJS you will also get a copy of [npm](https://www.npmjs.com/) - the Node Package Manager. npm is the largest ecosystem of open source libraries in the world. For developers coming from the .Net space, think of npm as 'NuGet for HTML, CSS & JavaScript libraries'.  For Ruby devs: think Gems.

We will be using npm to install all our third party dependencies that will be delivered to the browser like twitter bootstrap, jquery and even Angular 2 itself. We will also use npm to get packages that will be used in developing our application like TypeScript (we'll talk more about these as we come to them). 

### Get an understanding of npm

- Go to the ['What is npm?'](https://docs.npmjs.com/getting-started/what-is-npm) page from the [npm 'Getting Started' guide](https://docs.npmjs.com/getting-started/what-is-npm).
- Read the text
- Watch the 2 minute video

### Check Installed Versions of Node.js and npm  

Check if you have Node installed and its version by running the below commands. 

```
 node -v
 npm -v
```

If it is installed and the version of Node is 6.9.0  or higher and npm is version 3 or higher you can skip the next step. 
We recommend using version 7x for Angular 2 although if you have version 6.9.0  installed this is ok.


### Install / Update Node.js & npm (if required)
If a version number was not returned, or you received an error follow the following instructions:
 
1. Go to [the Node.js installation instructions](https://docs.npmjs.com/getting-started/installing-node)

2. Follow the instructions to install Node.js and npm on your machine type.

   > Note: If you have an older version of npm it can be difficult to update, and it is worth watching [this video](https://docs.npmjs.com/getting-started/installing-node). 
   
   > Tip: Often issues with updating npm are resolved by clearing your cache and reinstalling.
    

![NodeJS install instructions page](https://firebootcamp.ghost.io/content/images/2017/02/install-nodejs-page.jpg)
<br/>
Figure: NodeJS install instructions page


## Summary
##### Time: 5min
In this module we have installed the main dependencies we will require to be able to complete this course. 

