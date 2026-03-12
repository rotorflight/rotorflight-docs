export default {
  "*": ["npm run prettier:check", "npm run spellcheck"],
  "*.{md,mdx}": ["remark --output --"],
};
