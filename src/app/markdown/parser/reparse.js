/**
 * @module reparse
 * @version 0.0.1
 * @author Lucio Francisco
 * @description Hacks the unified/remark node modules to work as a markdown parser in a browser, the parser turns the input text into a MDAST syntaxt tree @see {https://github.com/remarkjs/remark}
 */

(function(global){
    'use strict';
	
  // Implements a basic process shim to support vfile/path modules to work in a browser
	if(!!global && !global.process) {
		
		global.process = {
			//env: { DEBUG: undefined },
			cwd: function() { return '/'; },
			platform: ''
		};
	}

  // Imports the useful modules
	const unified = require('unified');
	const parse = require('remark-parse');
  //const breaks = require('remark-breaks);
  //const abbr = require('remark-abbr');  
	const align = require('remark-align');
	const subsup  = require('remark-sub-super');
  //const comments = require('remark-comments');
  //const autolink = require('remark-autolink-headings');

  // Defines the parsing options
	const options = { 
	  commonmark : true,
	  pedantic   : true,
	  footnotes  : true
	};

  // Exports the markdown parser including align and subsup plugins
	module.exports = unified()
	  .use(parse, options)
	  .use(subsup)
    .use(align)
    //.use(breaks)
    //.use(abbr)
    //.use(comments)
    //.use(autolink)
	  .freeze();
  
}(window));