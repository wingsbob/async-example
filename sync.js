"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid = require("uuid");
const sessions = {};
exports.startSession = () => {
    const sessionId = uuid();
    sessions[sessionId] = { startTime: new Date(), users: [] };
    return sessionId;
};
exports.addUser = (user, sessionId) => {
    if (!sessions[sessionId])
        throw new Error('session does not exist!');
    sessions[sessionId].users.push(user);
};
exports.getUsers = (sessionId) => sessions[sessionId].users;
