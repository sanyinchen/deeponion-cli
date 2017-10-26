/**
 * Created by sanyinchen on 17/10/23.
 */

const log = require('./Log.js');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const yargs = require('yargs')
const help = require('./helpCommand');
const versionCommand = require('./versionCommand');
const update = require('./update');
const config = require('./config/setconfigpath')
require('console.table');
require('./utils/data')();
cliRun();

function cliRun() {


    var argv = yargs
        .usage('$0 [options] <source>')
        .options({
            version: {
                alias: 'v',
                description: 'show version'
            },
            help: {
                alias: 'h',
                description: 'show command description'
            },
            update: {
                alias: 'u',
                description: 'config module'
            },
            configpath: {
                align: 'c',
                description: 'set config path'
            }
        }).argv;

    if (argv.version) {
        //console.log('--help');
        versionCommand.func();
        return;
    }

    if (argv.help) {
        //console.log('--help');
        help();
        return;
    }
    if (argv.update) {
        update();
        return;
    }
    if (argv.configpath) {
        config(argv.configpath);
        return;
    }

    log.ERROR("invalid command, please try deep -h");

}
