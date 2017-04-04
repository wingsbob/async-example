"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const promisedAsync_1 = require("./promisedAsync");
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
/*failing example start*/
promisedAsync_1.startSessionPromised()
    .then(() => promisedAsync_1.addUserPromised(firstUser, ''))
    .catch(e => console.error('clearly went wrong!', e));
/*failing example end*/
/*concurrency start*/
promisedAsync_1.startSessionPromised()
    .then((sessionId) => Promise.all([
    promisedAsync_1.addUserPromised(firstUser, sessionId),
    promisedAsync_1.addUserPromised(secondUser, sessionId),
    promisedAsync_1.addUserPromised(thirdUser, sessionId)
])
    .then(() => promisedAsync_1.getUsersPromised(sessionId)))
    .then((users) => console.log(`there are ${users.length} user(s) added`))
    .catch(e => console.error('bad times', e));
/*concurrency end*/
/*Working example start*/
promisedAsync_1.startSessionPromised()
    .then(sessionId => promisedAsync_1.addUserPromised(firstUser, sessionId))
    .then(() => console.log('added fine!'))
    .catch(err => console.error('failed to add user!', err));
/*Working example end*/ 
