#Project 5 - FakeSlack Server

##Description
You will be implementing the node.js backend for the "Fake Slack" client you worked on last week.


##Setup

###1) Fork this repo
Click the "Fork" button on the top-right corner of this page.

###2) Clone your new repo into a Cloud9 account workspace
1. Login to Cloud9 and go to https://c9.io/account/repos
2. Find "05-fake-slack-node" and click "Clone to edit"

Once the workspace has been processed check to be sure it is up to date by running ` git status ` in the terminal. You should receive a message telling you that your branch is up to date.   
![Imgur](http://i.imgur.com/RKdsduL.png)

###3) Install node dependencies
In the bash terminal, run the command `npm install` to install the required node.js dependencies.


##Instructions

Follow the skeleton code in `server.js` to complete the chat server.

After that, see if you can:

- Only store the latest 20 messages
- Truncate messages to a desired length
- Prevent JavaScript injection attacks by escaping input
- Prevent users from spamming the same message over and over


##Notes

**NOTE: It is common practice to push your changes to your GitHub repository often. It is recommended you make a push after every major change. Through the course of completing this project you should make 7-10 pushes to GitHub. Your manager will be grading you on this.**

To push to GitHub run the following commands in your terminal:  
`git status`  
`git add .`  
`git commit -m "example comment"`  
`git push`
