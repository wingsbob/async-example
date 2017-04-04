"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const async_1 = require("./async");
const typed_promisify_1 = require("typed-promisify");
exports.startSessionPromised = typed_promisify_1.promisify(async_1.startSession);
exports.addUserPromised = typed_promisify_1.promisify(async_1.addUser);
exports.getUsersPromised = typed_promisify_1.promisify(async_1.getUsers);
