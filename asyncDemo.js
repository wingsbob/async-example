"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = require("yargs");
const async_1 = require("./async");
const firstUser = {
    name: 'Jos Bloggs',
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
    case "fail":
        /*failing example start*/
        async_1.startSession((sessionId) => {
            async_1.addUser(firstUser, '', (err) => {
                if (err)
                    console.error('failed to add user!', err);
                else
                    console.log('added fine!');
            });
        });
        /*failing example end*/
        break;
    case "concurrent":
        /*concurrency example start*/
        async_1.startSession(sessionid => {
            var completedCount = 0;
            var error = null;
            const onComplete = (err) => {
                if (err)
                    error = err;
                else
                    completedCount++;
                if (completedCount === 3) {
                    if (error) {
                        console.error('shit went wrong!');
                    }
                    else {
                        async_1.getUsers(sessionid, (err, users) => {
                            if (err)
                                console.error('failed to get users', err);
                            else
                                console.log(`We have ${users.length} user(s)`);
                        });
                    }
                }
            };
            async_1.addUser(firstUser, sessionid, onComplete);
            async_1.addUser(secondUser, sessionid, onComplete);
            async_1.addUser(thirdUser, sessionid, onComplete);
        });
        /*concurrency example end*/
        break;
    case "work":
        /*Working example start*/
        async_1.startSession((sessionId) => {
            async_1.addUser(firstUser, sessionId, (err) => {
                if (err)
                    console.error('failed to add user!', err);
                else
                    console.log('added fine!');
            });
        });
        /*Working example end*/
        break;
}
