/**
 * Created by sanyinchen on 16/12/8.
 */

'use strict';

const log = require('./Log');

module.exports = () => {
    let title = ['Commands', 'Description'];
    console.log('\n');
    log.TIP('Hello,guys,welocme to deeponion, this script was developed by YinchenSan@sanyinchen');
    log.TIP('        donations are welcome: Dn5FVD6qaDFNxrrTtcbJMs3yuxnBTrVEgV    \n')
    log.LOG("[--update    ]  This will update your DeepOnion.conf and backup old config file");
    log.LOG("[--configpath]  Set the path of you want to save DeepOnion.conf, be careful it\'s a" +
    "folder absolute path")
    log.LOG("[--help      ]  Show all commands")

    //let data = [];
    // data.push(['-u,--update', 'This will update your DeepOnion.conf and backup old config file'])
    // data.push(['-c,--configpath', 'Set the path of you want to save DeepOnion.conf, be careful
    // it\'s a folder absolute path'])
    //
    // data.push(['-h,--help', 'show all commands']);
    //console.table(title, data);

}