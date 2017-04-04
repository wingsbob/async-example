import * as uuid from 'uuid';

export interface ISessionData {
  startTime?: Date;
  users: IUser[];
}

export interface IUser {
  name: string;
  age: number;
}

const sessions: {[sessionId: string]: ISessionData} = {};

export const startSession = () => {
  const sessionId = uuid();
  sessions[sessionId] = {startTime: new Date(), users: []};

  return sessionId;
};

export const addUser = (user: IUser, sessionId: string) => {
  if (!sessions[sessionId]) throw new Error('session does not exist!');
  sessions[sessionId].users.push(user);
};

export const getUsers = (sessionId: string) =>
  sessions[sessionId].users;
