module.exports = {
  prefixes: ["feature", "hotfix", "bugfix", "release", "chore"],
  suggestions: {
    features: "feature",
    feat: "feature",
    fix: "hotfix",
    bug: "bugfix",
    releases: "release",
  },
  banned: ["wip"],
  skip: [],
  disallowed: ["master", "main", "develop", "staging"],
  separator: "/",
  regex: undefined,
  regexOptions: undefined,
};

// Regex examples

// Any jira ticket format with kebab case description
// ^([A-Z]+-[0-9]{1,5}-[a-z0-9-]{3,60})

// jira ticket with fixed prefix and kebab case description
// ^(TRIPLE-[0-9]{1,5}-[a-z0-9-]{3,60})
