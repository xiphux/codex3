/// <reference path="../../../typings/lodash/lodash.d.ts"/>
/// <reference path="../../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('codex.text')
	.factory('textFormatterService', textFormatterService);

function textFormatterService() {
	
	var service = {
		
		padDenseText: padDenseText,
		compactBlankLines: compactBlankLines,
		
		getUnwrapMetrics: getUnwrapMetrics,
		unwrapTrailingSpaces: unwrapTrailingSpaces,
		unwrapIndentedLines: unwrapIndentedLines,
		unwrapBlankLines: unwrapBlankLines,
		unwrapLineWidths: unwrapLineWidths,
		wrapBreaklines: wrapBreaklines,
		unwrap: unwrap,
		
		stylize: stylize,
		
		format: format
		
	};
	return service;
	
	function padDenseText(content) {
		// pad out dense text with blank lines
		return content.replace(/([^\w\s,]) *\n([A-Z\t\"]| {3,})/g, "$1\n\n$2");
	};
	
	function compactBlankLines(content) {
		// trim out extraneous blank lines
		return content.replace(/([^\n])(\n\s*){2,}\n(\s*[^\n])/g, "$1\n\n$3");
	};
	
	function getUnwrapMetrics(content) {
		var lines = compactBlankLines(content).split("\n");
		
		var lineCount = lines.length;
		var characterCount = 0;
		var indentedLineCount = 0;
		var spaceEndedLineCount = 0;
		var contentLineCount = 0;
		
		var spacedLine;
		for (var i = 0; i < lines.length; i++) {
			spacedLine = lines[i].replace(/^ {2,}([^ ].*)$/, "\t$1");
			if (/^\t/.test(spacedLine)) {
				indentedLineCount++;
			}
			if (/ $/.test(spacedLine)) {
				spaceEndedLineCount++;
			}
			characterCount += spacedLine.length;
			if (spacedLine.replace(/^\s+|\s+$/g, '').length > 0) {
				contentLineCount++;
			}
		}
		
		var averageLineLength = (characterCount/contentLineCount) | 0;
		var trailingSpaceRatio = spaceEndedLineCount * 1.0 / contentLineCount;
		var indentedLineRatio = indentedLineCount * 1.0 / contentLineCount;
		var blankLineRatio = (lineCount - contentLineCount) * 1.0 / lineCount;
		
		return {
			averageLineLength: averageLineLength,
			trailingSpaceRatio: trailingSpaceRatio,
			indentedLineRatio: indentedLineRatio,
			blankLineRatio: blankLineRatio
		};
	};
	
	function unwrapTrailingSpaces(content) {
		// unwrap by using the ending space as an indication of a continuing line
		return content.replace(/ \n/g, ' ');
	};
	
	function unwrapIndentedLines(content) {
		// unwrap by using indents to find paragraphs
		return content.replace(/ *\n(\S)/g, " $1");
	};
	
	function unwrapBlankLines(content) {
		// unwrap by using blank lines to find paragraphs
		return content.replace(/([^\n]) *\n([^\r\s])/g, "$1 $2");
	};
	
	function unwrapLineWidths(content, averageLength) {
		// unwrap by average line width
		var rgx = new RegExp("([^\n]{" + averageLength.toString() + ",})\n", "g");
		return content.replace(rgx, "$1 ").replace(/([\w,]) {2,}([\w,])/, "$1 $2");
	};
	
	function wrapBreaklines(content) {
		// preserve breaklines that may have been accidentally wrapped up
		return content.replace(/([^\*\-=\~_\^`#\$@\+A-Za-z])((([\*\-=\~_#\^`\$@\+]) ?){4,})([^\*\-=\~_#\^`\$@\+])/, "$1\n$2\n$5");
	};
	
	function unwrap(content) {
		
		var unwrapped = content;
		
		var metrics = getUnwrapMetrics(content);
		
		if ((metrics.trailingSpaceRatio > 0.6) && (metrics.trailingSpaceRatio < 0.95)) {
			// text has lots of lines that end in spaces
			unwrapped = unwrapTrailingSpaces(unwrapped);
		} else if (metrics.indentedLineRatio > 0.2) {
			// text appears to have a number of indented lines
			unwrapped = unwrapIndentedLines(unwrapped);
		} else if (metrics.blankLineRatio > 0.1) {
			// text appears to have a number of blank lines
			unwrapped = unwrapBlankLines(unwrapped);
		} else if (metrics.averageLineLength > 1) {
			// try to unwrap by guessing the width of lines
			unwrapped = unwrapLineWidths(unwrapped, metrics.averageLineLength);
		}
		
		unwrapped = wrapBreaklines(unwrapped);
		
		return unwrapped;
	};
	
	function stylize(content) {
		return content
			.replace(/\s*\n([\s\n])*(([\*\-=\~_\^`#\$@\+]) ?){3,}([\s\n])*\n/g, "<hr>")    // stylize breaking lines
			.replace(/^([\s\n])*(([\*\-=\~_\^`#\$@\+]) ?){3,}([\s\n])+/g, "")    // remove leading breaking lines
			.replace(/([\s\n])+(([\*\-=\~_\^`#\$@\+]) ?){3,}([\s\n])*$/g, "")    // remove trailing breaking lines
 			.replace(/(\W)_(\S+?)_(\W)/g, "$1<strong>$2</strong>$3")			// stylize underscore emphasis
 			.replace(/([^\*])(\*{1,2})([^\*>\n]*)(\*{1,2})([^\*])/g, "$1$2<strong>$3</strong>$4$5")	// stylize asterisk emphasis
 			.replace(/\^?\(TM\)/ig, "<sup>TM</sup>");			// stylize trademark
	};
	
	function format(text, wrapped, noParagraphSpacing, doubleLineBreaks) {

		var content = text;
		
		if (!content) {
			return '';
		}
		
		content = content
			.replace(/\r\n/g, "\n")   	// use unix line breaks
			.replace(/^\s+/,'')			// trim leading and trailing spaces and breaks
			.replace(/\s+$/,'');
			
		if (doubleLineBreaks) {
			
			content = content.replace(/\n\n/g, "\n");		// strip double line breaks
			
			content = padDenseText(content);				// pad dense text since we just stripped breaks
			
			if (wrapped) {
				content = unwrap(content);					// unwrap lines
			}
			
		} else {
			
			if (wrapped) {
				content = unwrap(content);					// unwrap lines
			}
			
			if (noParagraphSpacing) {
				content = padDenseText(content);			// pad dense text
			}
			
		}
		
		content = compactBlankLines(content);				// remove unnecessary blank lines
		
		content = _.escape(content);							// escape html entities
		
		content = stylize(content);							// stylize text
		
		return content;
	};
}