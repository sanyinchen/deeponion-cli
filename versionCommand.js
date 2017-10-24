/**
 * Created by sanyinchen on 16/12/8.
 */

'use strict';

const path = require('path');
const fs = require('fs');
const log = require('./Log');

var cliPath = function () {

    return path.resolve(
        __dirname,
        'package.json'
    );
};

function getVersion() {
    console.log(__dirname);
    let _cliPath = cliPath();
    let baseConfig = require(_cliPath);

    console.log('deepOnion-cli\'s version:' + baseConfig.version);


}

module.exports = {
    name: 'version',
    description: "get version  ",
    func: getVersion
}