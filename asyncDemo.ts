import {
  argv
} from 'yargs';
import {
  IUser,
  startSession,
  getUsers,
  addUser
} from './async';

const firstUser: IUser = {
  name: 'Jos Bloggs',
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
    startSession((sessionId) => {
      addUser(firstUser, '', (err) => {
        if (err) console.error('failed to add user!', err);
        else console.log('added fine!');
      })
    });
    break;
  /*failing example end*/

  /*Working example start*/
  case "work":
    startSession((sessionId) => {
      addUser(firstUser, sessionId, (err) => {
        if (err) console.error('failed to add user!', err);
        else console.log('added fine!');
      })
    });
    break;
  /*Working example end*/

  /*concurrency example start*/
  case "concurrent":
    startSession(sessionid => {
      var completedCount = 0;
      var error: Error|null = null;

      const onComplete = (err: Error|null) => {
        if (err) error = err;
        else completedCount++;

        if (completedCount === 3) {
          if (error) {
            console.error('shit went wrong!');
          } else {
            getUsers(sessionid, (err, users) => {
              if (err) console.error('failed to get users', err);
              else console.log(`We have ${users.length} user(s)`);
            })
          }
        }
      }

      addUser(firstUser, sessionid, onComplete);
      addUser(secondUser, sessionid, onComplete);
      addUser(thirdUser, sessionid, onComplete);
    });
    break;
  /*concurrency example end*/

  /*sequential example start*/
  case "sequential":
    startSession(sessionid => {
      addUser(firstUser, sessionid, err => {
        if (err) console.error(err);
        else addUser(secondUser, sessionid, err => {
          if (err) console.error(err);
          else addUser(thirdUser, sessionid, err => {
            if (err) console.error(err);
            else console.log('success!');
          });
        });
      }));
    });
    break;
  /*sequential example end*/
}
