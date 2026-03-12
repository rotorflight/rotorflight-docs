export default {
  "*.{js,jsx,ts,tsx,md,mdx,json,yml,yaml,css,scss,html}": [
    "npm run prettier:check --",
    "npm run spellcheck --",
  ],
  "*.{md,mdx}": ["remark --output --"],
};
