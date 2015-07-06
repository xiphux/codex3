'use strict';

angular.module('codex.textFormatter', [])

.factory('textFormatterService', function() {
	var service = {
		padDenseText: function(content) {
			return content.replace(/([^\w\s,]) *\n([A-Z\t\"]| {3,})/g, "$1\n\n$2")
		},
		
		compactBlankLines: function(content) {
			return content.replace(/([^\n])(\n\s*){2,}\n(\s*[^\n])/g, "$1\n\n$3");
		},
		
		unwrap: function(content) {
			
			var unwrapped = content;
			
			var lines = this.compactBlankLines(content).split("\n");
			
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
			
			var averageLength = (characterCount/contentLineCount) | 0;
			var spaceToLineRatio = spaceEndedLineCount * 1.0 / contentLineCount;
			
			if ((spaceToLineRatio > 0.6) && (spaceToLineRatio < 0.95)) {
				// text has lots of lines that end in spaces
				// might be unwrappable by using the ending space as an indication of a continuing line
				unwrapped = unwrapped.replace(/ \n/g, ' ');
			} else if ((indentedLineCount * 1.0 / contentLineCount) > 0.2) {
				// text appears to have a number of indented lines
				// try to use indents to find paragraphs
				unwrapped = unwrapped.replace(/ *\n(\S)/g, " $1");
			} else if (((lineCount - contentLineCount) * 1.0 / lineCount) > 0.1) {
				// text appears to have a number of blank lines
				// try to use blank lines to find paragraphs
				unwrapped = unwrapped.replace(/([^\n]) *\n([^\r\s])/g, "$1 $2");
			} else if (averageLength > 1) {
				// try to unwrap by guessing the width of lines
				var rgx = new RegExp("([^\n]{" + averageLength.toString() + ",})\n", "g");
				unwrapped = unwrapped.replace(rgx, "$1 ");
				unwrapped = unwrapped.replace(/([\w,]) {2,}([\w,])/, "$1 $2");
			}
			
			// preserve breaklines that may have been accidentally wrapped up
			unwrapped = unwrapped.replace(/([^\*\-=\~_\^`#\$@\+A-Za-z])((([\*\-=\~_#\^`\$@\+]) ?){4,})([^\*\-=\~_#\^`\$@\+])/, "$1\n$2\n$5");
			
			return unwrapped;
		},
		
		stylize: function(content) {
			return content
				.replace(/\s*\n([\s\n])*(([\*\-=\~_\^`#\$@\+]) ?){3,}([\s\n])*\n/g, "<hr>")    // stylize breaking lines
	 			.replace(/(\W)_(\S+?)_(\W)/g, "$1<strong>$2</strong>$3")			// stylize underscore emphasis
	 			.replace(/([^\*])(\*{1,2})([^\*>\n]*)(\*{1,2})([^\*])/g, "$1$2<strong>$3</strong>$4$5")	// stylize asterisk emphasis
	 			.replace(/\^?\(TM\)/ig, "<sup>TM</sup>");			// stylize trademark
		},
		
		format: function(text, wrapped, noParagraphSpacing, doubleLineBreaks) {

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
				
				content = this.padDenseText(content);				// pad dense text since we just stripped breaks
				
				if (wrapped) {
					content = this.unwrap(content);					// unwrap lines
				}
				
			} else {
				
				if (wrapped) {
					content = this.unwrap(content);					// unwrap lines
				}
				
				if (noParagraphSpacing) {
					content = this.padDenseText(content);			// pad dense text
				}
				
			}
			
			content = this.compactBlankLines(content);				// remove unnecessary blank lines
			
			content = _.escape(content);							// escape html entities
			
			content = this.stylize(content);							// stylize text
			
			return content;
		}
	};
	
	return service;
});