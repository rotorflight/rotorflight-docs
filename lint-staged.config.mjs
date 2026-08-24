export default {
  "*.{js,jsx,ts,tsx,mjs,cjs,json,yml,yaml,css,scss,html}": [
    "prettier --write --ignore-unknown",
    "npm run spellcheck:staged --",
  ],
  "*.{md,mdx}": [
    "remark --output --",
    "prettier --write --ignore-unknown",
    "npm run spellcheck:staged --",
  ],
};
