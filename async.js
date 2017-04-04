"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid = require("uuid");
const sessions = {};
exports.startSession = (cb) => {
    const sessionId = uuid();
    setTimeout(() => {
        sessions[sessionId] = { startTime: new Date(), users: [] };
        cb(null, sessionId);
    }, Math.random() * 1000);
};
exports.addUser = (user, sessionId, cb) => {
    setTimeout(() => {
        if (!sessions[sessionId])
            cb(new Error('session does not exist!'));
        else {
            sessions[sessionId].users.push(user);
            cb(null);
        }
    }, Math.random() * 1000);
};
exports.getUsers = (sessionId, cb) => {
    setTimeout(() => {
        if (!sessions[sessionId])
            cb(new Error('session does not exist!'));
        else
            cb(null, sessions[sessionId].users);
    }, Math.random() * 1000);
};
