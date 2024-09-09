import assert from "node:assert";
import { test } from "node:test";

import { unified } from "unified";

import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

import { replaceChineseDash, remarkReplaceChineseDash } from "./index.js";

test("replaceChineseDash()", async () => {
  assert.strictEqual(replaceChineseDash("那就是——蘋果。"), "那就是⸺蘋果。");
});

test("remarkReplaceChineseDash()", async () => {
  const result = await unified()
    .use(remarkParse)
    .use(remarkReplaceChineseDash)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process("那就是——蘋果。")
    .then((vFile) => vFile.value);

  assert.strictEqual(result, "<p>那就是⸺蘋果。</p>");
});
