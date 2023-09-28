const functions = require('@google-cloud/functions-framework');

const { createNodeMiddleware, createProbot } = require("probot");
const app = require("./app");

functions.http('probotApp', createNodeMiddleware(app, { probot: createProbot() }));
