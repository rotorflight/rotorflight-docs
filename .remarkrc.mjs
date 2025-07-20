import remarkDirective from "remark-directive";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdx from "remark-mdx";
import remarkPresetLintRecommended from "remark-preset-lint-recommended";

export default {
  plugins: [
    remarkPresetLintRecommended,
    remarkDirective,
    remarkFrontmatter,
    remarkMdx,
  ],
};
