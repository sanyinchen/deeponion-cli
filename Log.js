/**
 * Created by sanyinchen on 16/11/22.
 */
"use strict";

const chalk = require('chalk');

function log(msg) {
    console.log(msg);
}
function tip(msg) {
    console.log(chalk.green(msg));
}
function error(msg) {
    console.log(chalk.red(msg));
}
function warn(msg) {
    console.log(chalk.yellow(msg));
}

module.exports = {
    LOG: log,
    TIP: tip,
    ERROR: error,
    WARN:warn
}