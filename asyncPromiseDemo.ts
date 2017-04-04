import {
  argv
} from 'yargs';
import {
  startSessionPromised,
  addUserPromised,
  getUsersPromised
} from './promisedAsync';

import {
  IUser,
  ISessionData
} from './async';

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
    startSessionPromised()
      .then(() => addUserPromised(firstUser, ''))
      .catch(e => console.error('clearly went wrong!', e));
    break;
  /*failing example end*/

  /*concurrency start*/
  case "concurrent":
    startSessionPromised()
      .then((sessionId) =>
        Promise.all([
          addUserPromised(firstUser, sessionId),
          addUserPromised(secondUser, sessionId),
          addUserPromised(thirdUser, sessionId)
        ])
        .then(() => getUsersPromised(sessionId))
      )
      .then((users) => console.log(`there are ${users.length} user(s) added`))
      .catch(e => console.error('bad times', e));
    break;
  /*concurrency end*/

  /*Working example start*/
  case "work":
    startSessionPromised()
      .then(sessionId =>
        addUserPromised(firstUser, sessionId)
      )
      .then(() => console.log('added fine!'))
      .catch(err => console.error('failed to add user!', err))
    break;
  /*Working example end*/
}