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
require('console.table');
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



}
