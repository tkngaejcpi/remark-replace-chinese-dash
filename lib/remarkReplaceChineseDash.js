import { visit } from 'unist-util-visit';

/**
 * @import {Root} from 'mdast'
 */

/**
 * @param {string} text
 */
export const replaceChineseDash = (text) => {
	return text.replace('——', '⸺');
};

/**
 * @description this remark plugin replaces double `—` (U+2014 EM DASH),
 * which is the default output of 破折號 in most of IME,
 * into `⸺` (U+2E3A TWO-EM DASH),
 * which might be a more appropriate form of 破折號.
 *
 * @see https://www.thetype.com/2019/03/14918
 */
export const remarkReplaceChineseDash = () => {
	/**
	 * @param {Root} tree
	 */
	return (tree) => {
		visit(tree, (node) => {
			if (node.type == 'text') {
				node.value = replaceChineseDash(node.value);
			}
		});
	};
};
