"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = require("yargs");
const sync_1 = require("./sync");
console.log('trying to add user to non-existent session');
const firstUser = {
    name: 'Joe Bloggs',
    age: 45
};
const secondUser = {
    name: 'Jane Doe',
    age: 23
};
const thirdUser = {
    name: 'Heimlich',
    age: 30
};
switch (yargs_1.argv.example) {
    /*failing example start*/
    case "fail":
        sync_1.startSession();
        try {
            sync_1.addUser(firstUser, '');
        }
        catch (e) {
            console.error('on noes!', e);
        }
        break;
    /*failing example end*/
    /*Working example start*/
    case "working":
        {
            const sessionId = sync_1.startSession();
        }
        break;
    /*Working example end*/
    /*concurrency start*/
    case "concurrent":
        {
            const sessionId = sync_1.startSession();
            sync_1.addUser(firstUser, sessionId);
            sync_1.addUser(secondUser, sessionId);
            sync_1.addUser(thirdUser, sessionId);
            const users = sync_1.getUsers(sessionId);
            console.log(`there are ${users.length} user(s) added`);
        }
        break;
}
