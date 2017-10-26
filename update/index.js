/**
 * Created by yinchensan on 2017/10/25.
 */

const log = require('../Log.js');
const os = require('os');
const PromiseQueue = require('../RequestQueue')
let successnumber = 0;
const readline = require('readline');
const path = require('path');
const fs = require('fs');
let content = ''
function update() {

    successnumber = 0;
    let officalUrl = 'https://deeponion.org/conf_file/DeepOnion.conf';
    let zpoolUrl = 'http://www.zpool.ca/explorer/peers?id=2404';
    let novaUrl = 'https://novaexchange.com/addnodes/ONION/';
    const downloadQueue = new PromiseQueue();
    let destPath = path.join(__dirname, '../temp');
    deleteFolderRecursive(destPath);
    downloadQueue.add((resolve, reject) => {

        downlaodConfigFile(officalUrl, 'https', 'officalUrl.conf', resolve)
        //downlaodConfigFile(officalUrl, 'https', 'officalUrl.conf', resolve)
    }).add((resolve, reject) => {

        downlaodConfigFile(zpoolUrl, 'http', 'zpoolUrl.conf  ', resolve)
    }).add((resolve, reject) => {
        downlaodConfigFile(novaUrl, 'https', 'novaUrl.conf   ', merge)
    })


}

function filtration(content) {
    if (content == null) {
        return null;
    }
    content = content.trim();
    if (content === 'testnet=0' || content === 'listen=1') {
        return content;
    }
    if (!content.startsWith("addnode=") || !content.endsWith(".onion:17570")) {
        return null
    }
    return content;
}
function deleteFolderRecursive(_path) {
    var files = [];
    if (fs.existsSync(_path)) {
        files = fs.readdirSync(_path);
        files.forEach(function (file, index) {
            var curPath = path.join(_path, file);
            if (fs.statSync(curPath).isDirectory()) { // recurse
                // not existed
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });

    } else {
        fs.mkdirSync(_path);
    }
};
function merge() {
    if (successnumber == 0) {
        log.ERROR("Please check your network, all config files download failed")
        return;
    }
    let fileName = 'DeepOnion.conf';
    content = '';
    let officalUrl = path.join(__dirname, '../temp', 'officalUrl.conf');
    let zpoolUrl = path.join(__dirname, '../temp', 'zpoolUrl.conf');
    let novaUrl = path.join(__dirname, '../temp', 'novaUrl.conf');
    let str = '';
    const parseQueue = new PromiseQueue();
    parseQueue.add((resolve, reject) => {

        readLine('officalUrl.conf', officalUrl, resolve, str)
    }).add((resolve, reject) => {
        readLine('zpoolUrl.conf', zpoolUrl, resolve, str)
    }).add((resolve, reject) => {
        readLine('novaUrl.conf', novaUrl, (str) => {
            if (str == "" || str.length < 5) {
                log.ERROR('parse error!!');
            }
            let configObj = require(path.join(__dirname, '../config.json'));

            if (!fsExistsSync(configObj.configPtah)) {
                log.ERROR('Please check if ' + configObj.configPtah + ' is existed or you have executed (deeponion --configpath yourconfigpath) command first')
                return;
            }
            let finalConfigPath = path.join(configObj.configPtah, fileName);

            if (fsExistsSync(finalConfigPath)) {
                let time = new Date().Format("yyyy-MM-dd-hh-mm-ss");
                let backUpDir = path.join(path.dirname(finalConfigPath), time);
                fs.mkdirSync(backUpDir)
                log.TIP('backup old config to ');
                fs.writeFileSync(path.join(backUpDir, fileName), fs.readFileSync(finalConfigPath));

            }
            fs.writeFileSync(finalConfigPath, str);
            log.TIP(fileName + ' update succeed!');
        }, str)
    })

}

function fsExistsSync(path) {
    try {
        fs.accessSync(path, fs.F_OK);
    } catch (e) {
        return false;
    }
    return true;
}
function readLine(filename, path, callback) {
    // console.log('-------------');
    // console.log(content);
    if (!fsExistsSync(path)) {
        //console.log(path);
        log.ERROR('can not parse : ' + filename);
        callback && callback(content);
        return;
    }
    let rl = readline.createInterface({
        input: fs.createReadStream(path)
    });
    rl.on('line', function (line) {
        let str = filtration(line);
        if (str !== null) {
            content += line + os.EOL;
        }

    });
    rl.on('close', function () {
        log.TIP(filename + ' parse succeed');
        callback && callback(content)
    });
}

function downlaodConfigFile(url, type, fileName, callback) {
    let http = require(type);
    let fs = require('fs');

    let dest = path.join(__dirname, '../temp', fileName);
    let file = fs.createWriteStream(dest.trim());

    let request = http.get(url, function (response) {
        log.TIP(fileName + ' is downloading...');
        response.pipe(file);
        file.on('finish', function () {
            log.TIP(fileName + " is downloaded from " + url);
            successnumber++;
            file.close();
            callback && callback()
        });
    });
    // check for request error too
    request.on('error', function (err) {
        file.close();
        log.ERROR(fileName + ' download failed ' + err);
        callback && callback()
    });

    request.end();
}

module.exports = update;