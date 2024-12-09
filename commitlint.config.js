/* @SEE: https://strdr4605.com/commitlint-custom-commit-message-with-emojis */

const matchEmojiRegex = /(🎉|✨|⭐️|🔥|🚚|🔧|🐛|✅|👷|📦|📝|🔖|🚀)\s/
const matchTitleRegex = /(.+)/
module.exports = {
  parserPreset: {
    parserOpts: {
      headerPattern: new RegExp(
        "^" + matchEmojiRegex.source + matchTitleRegex.source + "$"
      ),
      headerCorrespondence: ["emoji", "title"],
    },
  },
  plugins: [
    {
      rules: {
        "header-match-team-pattern": (parsed) => {          
          const { emoji, title } = parsed;
          if (emoji === null && title === null) {
            return [
              false,
              `wrong commit msg format. \n - format: [emogi] {title}. \n - emogi: 🎉,✨,⭐️,🔥,🚚,🔧,🐛,✅,👷,📦,📝,🔖,🚀`,
            ];
          }
          return [true, ""];
        },
        "explained-emoji-enum": (parsed, _when, emojisObject) => {
          const { emoji } = parsed;
          if (emoji && !Object.keys(emojisObject).includes(emoji)) {
            return [
              false,
              `emoji must be one of: ${Object.keys(emojisObject)
                .map((emojiType) => `${emojiType} - ${emojisObject[emojiType]}`)
                .join("\n")}`,
            ];
          }
          return [true, ""];
        },
      },
    },
  ],
  rules: {
    "header-match-team-pattern": [2, "always"],
    "explained-emoji-enum": [
      2,
      "always",
      {
        '🎉': 'Add',
        '✨': 'Feat',
        '⭐️': 'Improve',
        '🔥': 'Remove',
        '🚚': 'Move',
        '🔧': 'Config',
        '🐛': 'Fix',
        '✅': 'Test',
        '👷': 'CICD',
        '📦': 'Package',
        '📝': 'Docs',
        '🔖': 'Release',
        '🚀': 'Deploy',
      },
    ],
  },
};
