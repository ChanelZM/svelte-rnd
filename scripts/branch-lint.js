const childProcess = require("child_process");
const util = require("util");
const projectConfig = require("../branch-lint.config");

class BranchNameLint {
  constructor(config) {
    this.config = {
      prefixes: ["feature", "hotfix", "bugfix", "release"],
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
      ...config,
    };
    this.errorMessages = {
      branchBanned: 'Branches with the name "%s" are not allowed.',
      branchDisallowed:
        'Pushing to "%s" is not allowed, please create a branch different name.',
      prefixNotAllowed: 'Branch name prefix "%s" is not allowed.',
      prefixSuggestion:
        'Branch name prefix is not allowed, instead of "%s" try "%s".',
      separatorRequired: 'Branch "%s" must contain a separator "%s".',
      doesNotMatchRegex:
        'Branch name "%s" does not match the allowed pattern: "%s"',
    };
    this.branch = this.getCurrentBranch();
    this.ERROR_CODE = 1;
    this.SUCCESS_CODE = 0;
  }

  validateWithRegex(string) {
    if (this.config.regex) {
      const REGEX = new RegExp(this.config.regex, this.config.regexOptions);
      return REGEX.test(string);
    }

    return true;
  }

  doValidation() {
    const parts = this.branch.split(this.config.separator);
    const prefix = parts[0];
    let name = null;
    if (parts[1]) {
      const [, second] = parts;
      name = second;
    }

    if (!!this.config.skip.length && this.config.skip.includes(this.branch)) {
      return this.SUCCESS_CODE;
    }

    if (
      !!this.config.banned?.length &&
      this.config.banned.includes(this.branch)
    ) {
      return this.error(this.errorMessages.branchBanned, this.branch);
    }

    if (
      !!this.config.disallowed?.length &&
      this.config.disallowed.includes(this.branch)
    ) {
      return this.error(this.errorMessages.branchDisallowed, this.branch);
    }

    if (this.config.separator && !this.branch.includes(this.config.separator)) {
      return this.error(
        this.errorMessages.separatorRequired,
        this.branch,
        this.config.separator,
      );
    }

    if (
      !!this.config.prefixes?.length &&
      !this.config.prefixes.includes(prefix)
    ) {
      if (
        this.config.suggestions[prefix] &&
        this.config.prefixes.includes(this.config.suggestions[prefix])
      ) {
        this.error(
          this.errorMessages.prefixSuggestion,
          [prefix, name].join(this.config.separator),
          [this.config.suggestions[prefix], name].join(this.config.separator),
        );
      } else {
        this.error(this.errorMessages.prefixNotAllowed, prefix);
      }

      return this.ERROR_CODE;
    }

    if (!this.validateWithRegex(name)) {
      return this.error(
        this.errorMessages.doesNotMatchRegex,
        name,
        this.config.regex,
      );
    }

    return this.SUCCESS_CODE;
  }

  getCurrentBranch() {
    const branch =
      process.argv[2] ||
      childProcess
        .execFileSync("git", ["rev-parse", "--abbrev-ref", "HEAD"])
        .toString();
    this.branch = branch;

    return this.branch.trim();
  }

  error(...args) {
    console.error(
      "Branch lint:",
      Reflect.apply(util.format, null, args).replace(/\r?\n/g, ""),
    );
    return this.ERROR_CODE;
  }
}

const exitCode = new BranchNameLint(projectConfig).doValidation();

process.exit(exitCode);
