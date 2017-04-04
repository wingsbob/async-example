import {
  startSession,
  getUsers,
  addUser
} from './async';

import {
  promisify
} from 'typed-promisify';

export const startSessionPromised: () => Promise<string> = promisify(startSession);
export const addUserPromised = promisify(addUser);
export const getUsersPromised = promisify(getUsers);
