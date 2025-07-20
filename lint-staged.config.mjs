export default {
  "*": ["prettier --ignore-unknown --write"],
  "*.{md,mdx}": ["remark --output --"],
};
