/*
 * ACCESSING THE FILE SYSTEM IN NODE.JS -------------------------
 * 
 * for all file system calls (in this chapter), you need to have loaded the fs module:
 */

var fs = require('fs');

// SYNCHRONOUS VS ASYNCHRONOUS FILE SYSTEM CALLS
// the fs module in node.js makes almost all functionality available in two forms: synchronous or asynchronous
// e.g. there is asynchronous write() and synchronous writeSync()