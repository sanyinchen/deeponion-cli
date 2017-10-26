/**
 * Created by yinchensan on 2017/10/25.
 */
const fs = require('fs');
const log = require('../Log')
const _path = require('path')
function setConfigPath(path) {

    log.LOG('The cofig path you set is : ' + path);
    let rootpath = _path.join(__dirname, '../config.json');
    let configPath = require(rootpath);
    configPath.configPtah = path;

    try {
        fs.writeFileSync(rootpath, JSON.stringify(configPath));
    } catch (err) {
        console.log('Error writing Metadata.json:' + err.message)
    }
    log.TIP('path set successed, you just need set onece');
}

module.exports = setConfigPath;