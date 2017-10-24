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
    let data = [];

    data.push(['update:', ''])
    data.push(['update  config', 'This will update your DeepOnion.conf and backup old config file(deep update config)'])

    data.push(['-h,--help', 'show all commands']);
    console.table(title, data);

}