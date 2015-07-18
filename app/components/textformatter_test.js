'use strict';

describe('codex.textformatter module', function() {
	
	beforeEach(module('codex.textFormatter'));
	
	describe('text formatter service', function() {
		
		var mockTextFormatterService;
		
		beforeEach(function() {
			angular.mock.inject(function($injector) {
				mockTextFormatterService = $injector.get('textFormatterService')
			});
		});
		
		describe('pad dense text', function() {
			
			it('should pad dense unindented text', function() {
				
				var original = "This is paragraph one.\nThis is paragraph two.\n\"This is paragraph three.\"\nThis is paragraph four.";
				var final = "This is paragraph one.\n\nThis is paragraph two.\n\n\"This is paragraph three.\"\n\nThis is paragraph four.";
				
				expect(mockTextFormatterService.padDenseText(original)).toEqual(final);
				
			});
			
			it('should pad dense tab indented text', function() {
				
				var original = "This is paragraph one.\n\tThis is paragraph two.\n\t\"This is paragraph three.\"\n\tThis is paragraph four.";
				var final = "This is paragraph one.\n\n\tThis is paragraph two.\n\n\t\"This is paragraph three.\"\n\n\tThis is paragraph four.";
				
				expect(mockTextFormatterService.padDenseText(original)).toEqual(final);
				
			});
			
			it('should pad dense space indented text', function() {
				
				var original = "This is paragraph one.\n   This is paragraph two.\n   \"This is paragraph three.\"\n   This is paragraph four.";
				var final = "This is paragraph one.\n\n   This is paragraph two.\n\n   \"This is paragraph three.\"\n\n   This is paragraph four.";
				
				expect(mockTextFormatterService.padDenseText(original)).toEqual(final);
				
			});
			
		});
		
		describe('compact blank lines', function() {
			
			it('should compact two blank lines', function() {
				
				var original = "This is paragraph one.\n\n\nThis is paragraph two.";
				var final = "This is paragraph one.\n\nThis is paragraph two.";
				
				expect(mockTextFormatterService.compactBlankLines(original)).toEqual(final);
				
			});
			
			it('should compact three blank lines', function() {
				
				var original = "This is paragraph one.\n\n\n\nThis is paragraph two.";
				var final = "This is paragraph one.\n\nThis is paragraph two.";
				
				expect(mockTextFormatterService.compactBlankLines(original)).toEqual(final);
				
			});
			
			it('should compact four blank lines', function() {
				
				var original = "This is paragraph one.\n\n\n\nThis is paragraph two.";
				var final = "This is paragraph one.\n\nThis is paragraph two.";
				
				expect(mockTextFormatterService.compactBlankLines(original)).toEqual(final);
				
			});
			
			it('should not compact one blank lines', function() {
				
				var original = "This is paragraph one.\n\nThis is paragraph two.";
				
				expect(mockTextFormatterService.compactBlankLines(original)).toEqual(original);
				
			});
			
		});
		
		describe('get unwrap metrics', function() {
			
		});
		
		describe('unwrap trailing spaces', function() {
			
			it('should unwrap lines based on trailing spaces with dense paragraphs', function() {
				
				var original = "This is paragraph one \nsentence one. This is \nparagraph one sentence two.\nThis is paragraph two \nsentence one.";
				var final = "This is paragraph one sentence one. This is paragraph one sentence two.\nThis is paragraph two sentence one.";
				
				expect(mockTextFormatterService.unwrapTrailingSpaces(original)).toEqual(final);
				
			});
			
			it('should unwrap lines based on trailing spaces with spaced paragraphs', function() {
				
				var original = "This is paragraph one \nsentence one. This is \nparagraph one sentence two.\n\nThis is paragraph two \nsentence one.";
				var final = "This is paragraph one sentence one. This is paragraph one sentence two.\n\nThis is paragraph two sentence one.";
				
				expect(mockTextFormatterService.unwrapTrailingSpaces(original)).toEqual(final);
				
			});
			
		});
		
		describe('unwrap indented lines', function() {
			
			it('should unwrap dense paragraphs indented by tabs', function() {
				
				var original = "\tThis is paragraph\none line one.\n\tThis is paragraph\ntwo line one. \"This\nis paragraph two line two.\"\n\tThis is paragraph\nthree line one.";
				var final = "\tThis is paragraph one line one.\n\tThis is paragraph two line one. \"This is paragraph two line two.\"\n\tThis is paragraph three line one.";
				
				expect(mockTextFormatterService.unwrapIndentedLines(original)).toEqual(final);
				
			});
			
			it('should unwrap dense paragraphs indented by spaces', function() {
				
				var original = "   This is paragraph\none line one.\n   This is paragraph\ntwo line one. \"This\nis paragraph two line two.\"\n   This is paragraph\nthree line one.";
				var final = "   This is paragraph one line one.\n   This is paragraph two line one. \"This is paragraph two line two.\"\n   This is paragraph three line one.";
				
				expect(mockTextFormatterService.unwrapIndentedLines(original)).toEqual(final);
				
			});
			
			it('should unwrap spaced paragraphs indented by tabs', function() {
				
				var original = "\tThis is paragraph\none line one.\n\n\tThis is paragraph\ntwo line one. \"This\nis paragraph two line two.\"\n\n\tThis is paragraph\nthree line one.";
				var final = "\tThis is paragraph one line one.\n\n\tThis is paragraph two line one. \"This is paragraph two line two.\"\n\n\tThis is paragraph three line one.";
				
				expect(mockTextFormatterService.unwrapIndentedLines(original)).toEqual(final);
				
			});
			
			it('should unwrap spaced paragraphs indented by spaces', function() {
				
				var original = "   This is paragraph\none line one.\n\n   This is paragraph\ntwo line one. \"This\nis paragraph two line two.\"\n\n   This is paragraph\nthree line one.";
				var final = "   This is paragraph one line one.\n\n   This is paragraph two line one. \"This is paragraph two line two.\"\n\n   This is paragraph three line one.";
				
				expect(mockTextFormatterService.unwrapIndentedLines(original)).toEqual(final);
				
			});
			
		});
		
		describe('unwrap blank lines', function() {
			
			it('should unwrap text with single line breaks', function() {
				
				var original = "This is paragraph\none. This is paragraph\none.\n\n\"This is paragraph\ntwo.\"\n\nThis is paragraph\nthree.";
				var final = "This is paragraph one. This is paragraph one.\n\n\"This is paragraph two.\"\n\nThis is paragraph three.";
				
				expect(mockTextFormatterService.unwrapBlankLines(original)).toEqual(final);
				
			});
			
		});
		
		describe('unwrap line widths', function() {
			
			it('should unwrap lines that are longer than the average length', function() {
				
				var original = "This is a long line.\nThis is also a long\nline.\nThis is a long line.\nThis is also a long\nline.";
				var final = "This is a long line. This is also a long line.\nThis is a long line. This is also a long line.";
				
				expect(mockTextFormatterService.unwrapLineWidths(original, 17)).toEqual(final);
				
			});
			
		});
		
		describe('rewrap break lines', function() {
			
			it('should rewrap asterisk breaklines', function() {
				
				var original = "This is sentence one.****This is sentence two.";
				var final = "This is sentence one.\n****\nThis is sentence two.";
				
				expect(mockTextFormatterService.wrapBreaklines(original)).toEqual(final);
				
			});
			
			it('should rewrap dashed breaklines', function() {
				
				var original = "This is sentence one.----This is sentence two.";
				var final = "This is sentence one.\n----\nThis is sentence two.";
				
				expect(mockTextFormatterService.wrapBreaklines(original)).toEqual(final);
				
			});
			
			it('should rewrap equals breaklines', function() {
				
				var original = "This is sentence one.====This is sentence two.";
				var final = "This is sentence one.\n====\nThis is sentence two.";
				
				expect(mockTextFormatterService.wrapBreaklines(original)).toEqual(final);
				
			});
			
			it('should rewrap tilde breaklines', function() {
				
				var original = "This is sentence one.~~~~This is sentence two.";
				var final = "This is sentence one.\n~~~~\nThis is sentence two.";
				
				expect(mockTextFormatterService.wrapBreaklines(original)).toEqual(final);
				
			});
			
			it('should rewrap underscore breaklines', function() {
				
				var original = "This is sentence one.____This is sentence two.";
				var final = "This is sentence one.\n____\nThis is sentence two.";
				
				expect(mockTextFormatterService.wrapBreaklines(original)).toEqual(final);
				
			});
			
			it('should rewrap hash breaklines', function() {
				
				var original = "This is sentence one.####This is sentence two.";
				var final = "This is sentence one.\n####\nThis is sentence two.";
				
				expect(mockTextFormatterService.wrapBreaklines(original)).toEqual(final);
				
			});
			
			it('should rewrap caret breaklines', function() {
				
				var original = "This is sentence one.^^^^This is sentence two.";
				var final = "This is sentence one.\n^^^^\nThis is sentence two.";
				
				expect(mockTextFormatterService.wrapBreaklines(original)).toEqual(final);
				
			});
			
			it('should rewrap backtick breaklines', function() {
				
				var original = "This is sentence one.````This is sentence two.";
				var final = "This is sentence one.\n````\nThis is sentence two.";
				
				expect(mockTextFormatterService.wrapBreaklines(original)).toEqual(final);
				
			});
			
			it('should rewrap dollar breaklines', function() {
				
				var original = "This is sentence one.$$$$This is sentence two.";
				var final = "This is sentence one.\n$$$$\nThis is sentence two.";
				
				expect(mockTextFormatterService.wrapBreaklines(original)).toEqual(final);
				
			});
			
			it('should rewrap at breaklines', function() {
				
				var original = "This is sentence one.@@@@This is sentence two.";
				var final = "This is sentence one.\n@@@@\nThis is sentence two.";
				
				expect(mockTextFormatterService.wrapBreaklines(original)).toEqual(final);
				
			});
			
			it('should rewrap plus breaklines', function() {
				
				var original = "This is sentence one.++++This is sentence two.";
				var final = "This is sentence one.\n++++\nThis is sentence two.";
				
				expect(mockTextFormatterService.wrapBreaklines(original)).toEqual(final);
				
			});
			
			it('should rewrap combination breaklines', function() {
				
				var original = "This is sentence one.*-=~_#^`$@++@$`^#_~=-*This is sentence two.";
				var final = "This is sentence one.\n*-=~_#^`$@++@$`^#_~=-*\nThis is sentence two.";
				
				expect(mockTextFormatterService.wrapBreaklines(original)).toEqual(final);
				
			});
			
		});
		
		describe('unwrap', function() {
			
		});
		
		describe('stylize', function() {
			
			it('should turn asterisk breaklines into horizonal rules', function() {
				
				var original = "This is paragraph one.\n***\nThis is paragraph two.\n\n***\n\nThis is paragraph three.";
				var final = "This is paragraph one.<hr>This is paragraph two.<hr>This is paragraph three.";
				
				expect(mockTextFormatterService.stylize(original)).toEqual(final);
				
			});
			
			it('should turn dashed breaklines into horizontal rules', function() {
				
				var original = "This is paragraph one.\n---\nThis is paragraph two.\n\n---\n\nThis is paragraph three.";
				var final = "This is paragraph one.<hr>This is paragraph two.<hr>This is paragraph three.";
				
				expect(mockTextFormatterService.stylize(original)).toEqual(final);
				
			});
			
			it('should turn equals breaklines into horizontal rules', function() {
				
				var original = "This is paragraph one.\n===\nThis is paragraph two.\n\n===\n\nThis is paragraph three.";
				var final = "This is paragraph one.<hr>This is paragraph two.<hr>This is paragraph three.";
				
				expect(mockTextFormatterService.stylize(original)).toEqual(final);
				
			});
			
			it('should turn tilde breaklines into horizontal rules', function() {
				
				var original = "This is paragraph one.\n~~~\nThis is paragraph two.\n\n~~~\n\nThis is paragraph three.";
				var final = "This is paragraph one.<hr>This is paragraph two.<hr>This is paragraph three.";
				
				expect(mockTextFormatterService.stylize(original)).toEqual(final);
				
			});
			
			it('should turn underscore breaklines into horizontal rules', function() {
				
				var original = "This is paragraph one.\n___\nThis is paragraph two.\n\n___\n\nThis is paragraph three.";
				var final = "This is paragraph one.<hr>This is paragraph two.<hr>This is paragraph three.";
				
				expect(mockTextFormatterService.stylize(original)).toEqual(final);
				
			});
			
			it('should turn hash breaklines into horizontal rules', function() {
				
				var original = "This is paragraph one.\n###\nThis is paragraph two.\n\n###\n\nThis is paragraph three.";
				var final = "This is paragraph one.<hr>This is paragraph two.<hr>This is paragraph three.";
				
				expect(mockTextFormatterService.stylize(original)).toEqual(final);
							
			});
			
			it('should turn caret breaklines into horizontal rules', function() {
				
				var original = "This is paragraph one.\n^^^\nThis is paragraph two.\n\n^^^\n\nThis is paragraph three.";
				var final = "This is paragraph one.<hr>This is paragraph two.<hr>This is paragraph three.";
				
				expect(mockTextFormatterService.stylize(original)).toEqual(final);
				
			});
			
			it('should turn backtick breaklines into horizontal rules', function() {
				
				var original = "This is paragraph one.\n```\nThis is paragraph two.\n\n```\n\nThis is paragraph three.";
				var final = "This is paragraph one.<hr>This is paragraph two.<hr>This is paragraph three.";
				
				expect(mockTextFormatterService.stylize(original)).toEqual(final);
				
			});
			
			it('should turn dollar breaklines into horizontal rules', function() {
				
				var original = "This is paragraph one.\n$$$\nThis is paragraph two.\n\n$$$\n\nThis is paragraph three.";
				var final = "This is paragraph one.<hr>This is paragraph two.<hr>This is paragraph three.";
				
				expect(mockTextFormatterService.stylize(original)).toEqual(final);
				
			});
			
			it('should turn at breaklines into horizontal rules', function() {
				
				var original = "This is paragraph one.\n@@@\nThis is paragraph two.\n\n@@@\n\nThis is paragraph three.";
				var final = "This is paragraph one.<hr>This is paragraph two.<hr>This is paragraph three.";
				
				expect(mockTextFormatterService.stylize(original)).toEqual(final);
				
			});
			
			it('should turn plus breaklines into horizontal rules', function() {
				
				var original = "This is paragraph one.\n+++\nThis is paragraph two.\n\n+++\n\nThis is paragraph three.";
				var final = "This is paragraph one.<hr>This is paragraph two.<hr>This is paragraph three.";
				
				expect(mockTextFormatterService.stylize(original)).toEqual(final);
				
			});
			
			it('should turn combination breaklines into horizontal rules', function() {
				
				var original = "This is paragraph one.\n*-=~_#^`$@++@$`^#_~=-*\nThis is paragraph two.\n\n*-=~_#^`$@++@$`^#_~=-*\n\nThis is paragraph three.";
				var final = "This is paragraph one.<hr>This is paragraph two.<hr>This is paragraph three.";
				
				expect(mockTextFormatterService.stylize(original)).toEqual(final);
				
			});
			
			it('should strong emphasize an underscore bounded word', function() {
				
				var original = "This is an _important_ word.  This is _also_ important.";
				var final = "This is an <strong>important</strong> word.  This is <strong>also</strong> important."
				
				expect(mockTextFormatterService.stylize(original)).toEqual(final);
				
			});
			
			xit('should strong emphasize underscore bounded text', function() {
				// TODO: handle this
				
				var original = "This is _really important_ text.  This is _also really important_.";
				var final = "This is <strong>really important</strong> text.  This is <strong>also really important</strong>."
				
				expect(mockTextFormatterService.stylize(original)).toEqual(final);
				
			});
			
			xit('should strong emphasize underscore interspersed text', function() {
				// TODO: handle this
				
				var original = "This is _really_important_ text.  This is _also_really_important_.";
				var final = "This is <strong>really important</strong> text.  This is <strong>also really important</strong>."
				
				expect(mockTextFormatterService.stylize(original)).toEqual(final);
				
			});
			
			it('should strong emphasize a single asterisk bounded word', function() {
				
				var original = "This is an *important* word.  This is *also* important.";
				var final = "This is an *<strong>important</strong>* word.  This is *<strong>also</strong>* important."
				
				expect(mockTextFormatterService.stylize(original)).toEqual(final);
				
			});
			
			it('should strong emphasize a double asterisk bounded word', function() {
				
				var original = "This is an **important** word.  This is **also** important.";
				var final = "This is an **<strong>important</strong>** word.  This is **<strong>also</strong>** important."
				
				expect(mockTextFormatterService.stylize(original)).toEqual(final);
				
			});
			
			it('should strong emphasize single asterisk bounded text', function() {
				
				var original = "This is *really important* text.  This is *also really important*.";
				var final = "This is *<strong>really important</strong>* text.  This is *<strong>also really important</strong>*."
				
				expect(mockTextFormatterService.stylize(original)).toEqual(final);
				
			});
			
			it('should strong emphasize double asterisk bounded text', function() {
				
				var original = "This is **really important** text.  This is **also really important**.";
				var final = "This is **<strong>really important</strong>** text.  This is **<strong>also really important</strong>**."
				
				expect(mockTextFormatterService.stylize(original)).toEqual(final);
				
			});
			
			it('should superscript the trademark symbol', function() {
				
				var original = "This is a ReallyCool(TM) thing.";
				var final = "This is a ReallyCool<sup>TM</sup> thing.";
				
				expect(mockTextFormatterService.stylize(original)).toEqual(final);
				
			});
			
		});
		
		describe('format', function() {
			
		});
		
	});
	
});