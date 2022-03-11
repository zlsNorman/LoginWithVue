"use strict"

const db = require("nano")('http://alfa:alfa@127.0.0.1:5984').db;

module.exports = db; 