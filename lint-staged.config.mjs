export default {
  "*.{js,jsx,ts,tsx,mjs,cjs,json,yml,yaml,css,scss,html}": [
    "npm run prettier:check:staged --",
    "npm run spellcheck:staged --",
  ],
  "*.{md,mdx}": [
    "remark --output --",
    "npm run prettier:check:staged --",
    "npm run spellcheck:staged --",
  ],
};
