import * as uuid from 'uuid';

export interface IUser {
  name: string;
  age: number;
}

export interface ISessionData {
  startTime?: Date;
  users: IUser[];
}

const sessions: {[sessionId: string]: ISessionData} = {};

export const startSession = (cb: (err: null, sessionId: string) => void) => {
  const sessionId = uuid();

  setTimeout(() => {
    sessions[sessionId] = {startTime: new Date(), users: []};

    cb(null, sessionId);
  }, Math.random() * 1000);
};

export const addUser = (user: IUser, sessionId: string, cb: (err: Error|null) => void) => {
  setTimeout(() => {
    if (!sessions[sessionId]) cb(new Error('session does not exist!'));
    else {
      sessions[sessionId].users.push(user);
      cb(null);
    }
  }, Math.random() * 1000);
};

export const getUsers = (sessionId: string, cb: (err: Error|null, users?: IUser[]) => void) => {
  setTimeout(() => {
    if (!sessions[sessionId]) cb(new Error('session does not exist!'))
    else cb(null, sessions[sessionId].users);
  }, Math.random() * 1000);
};
