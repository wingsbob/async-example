import {
  argv
} from 'yargs';
import {
  startSession,
  getUsers,
  addUser,
  IUser,
  ISessionData
} from './sync';
import * as uuid from 'uuid';

console.log('trying to add user to non-existent session');

const firstUser: IUser = {
  name: 'Joe Bloggs',
  age: 45
};
const secondUser: IUser = {
  name: 'Jane Doe',
  age: 23
};
const thirdUser: IUser = {
  name: 'Heimlich',
  age: 30
};

switch (argv.example) {
  /*failing example start*/
  case "fail":
    startSession();
    try {
      addUser(firstUser, '');
    } catch (e) {
      console.error('on noes!', e);
    }
    break;
  /*failing example end*/

  /*concurrency start*/
  case "concurrent":
    {
      const sessionId = startSession();

      addUser(firstUser, sessionId);
      addUser(secondUser, sessionId);
      addUser(thirdUser, sessionId);

      const users = getUsers(sessionId);
      console.log(`there are ${users.length} user(s) added`);
    }
    break;
  /*concurrency end*/

  /*Working example start*/
  case "work":
    {
      const sessionId = startSession();
      addUser(firstUser, sessionId);
      console.log('tada!');
    }
    break;
  /*Working example end*/
}
