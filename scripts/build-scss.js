'use strict';
const upath = require('upath');
const sh = require('shelljs');

const renderSCSS = require('./render-scss');

renderSCSS();

// Copy over FontAwesome files
const sourcePathFA = upath.resolve(upath.dirname(__filename), '../src/css/all.css');
const destPathFA = upath.resolve(upath.dirname(__filename), '../dist/css/');

sh.cp('-R', sourcePathFA, destPathFA)

const sourcePathFAWebFonts = upath.resolve(upath.dirname(__filename), '../src/webfonts');
const destPathFAWebFonts = upath.resolve(upath.dirname(__filename), '../dist/');

sh.cp('-R', sourcePathFAWebFonts, destPathFAWebFonts) 