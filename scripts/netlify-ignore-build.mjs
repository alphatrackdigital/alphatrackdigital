import { execFileSync } from "node:child_process";

const ALWAYS_BUILD_EXIT_CODE = 1;
const SKIP_BUILD_EXIT_CODE = 0;

const branch = process.env.BRANCH || "";
const context = process.env.CONTEXT || "";
const commitRef = process.env.COMMIT_REF || "HEAD";
const cachedCommitRef = process.env.CACHED_COMMIT_REF || "";

const skipTokens = ["[skip ci]", "[skip netlify]", "[no deploy]"];
const productionBranches = new Set(["main", "master", "production"]);
const noDeployBranchPatterns = [/^debug[/-]/, /^local[/-]/, /^wip[/-]/, /^experiment[/-]/];

const docsOnlyPatterns = [
  /^README\.md$/i,
  /^docs\//,
  /^\.github\//,
  /^\.vscode\//,
  /^\.claude\//,
  /^\.lovable\//,
  /^.*\.md$/i,
  /^.*\.png$/i,
  /^.*\.jpg$/i,
  /^.*\.jpeg$/i,
  /^.*\.webp$/i,
  /^.*\.gif$/i,
];

const runGit = (args) => {
  try {
    return execFileSync("git", args, { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
  } catch {
    return "";
  }
};

const getCommitMessage = () => runGit(["log", "-1", "--pretty=%B", commitRef]);

const getChangedFiles = () => {
  if (cachedCommitRef) {
    const diff = runGit(["diff", "--name-only", cachedCommitRef, commitRef]);
    if (diff) return diff.split(/\r?\n/).filter(Boolean);
  }

  const latestCommit = runGit(["diff-tree", "--no-commit-id", "--name-only", "-r", commitRef]);
  return latestCommit ? latestCommit.split(/\r?\n/).filter(Boolean) : [];
};

const shouldSkipForToken = () => {
  const message = getCommitMessage().toLowerCase();
  return skipTokens.some((token) => message.includes(token));
};

const shouldSkipForBranch = () => noDeployBranchPatterns.some((pattern) => pattern.test(branch));

const isDocsOnlyChange = () => {
  const changedFiles = getChangedFiles();
  return changedFiles.length > 0 && changedFiles.every((file) => docsOnlyPatterns.some((pattern) => pattern.test(file)));
};

const logDecision = (message) => {
  console.log(`[netlify-ignore] ${message}`);
};

if (shouldSkipForToken()) {
  logDecision("Skipping build because the latest commit message contains a skip token.");
  process.exit(SKIP_BUILD_EXIT_CODE);
}

if (shouldSkipForBranch()) {
  logDecision(`Skipping build for non-deploy branch "${branch}".`);
  process.exit(SKIP_BUILD_EXIT_CODE);
}

if (isDocsOnlyChange()) {
  logDecision("Skipping build because only docs, GitHub metadata, editor settings, or image reference files changed.");
  process.exit(SKIP_BUILD_EXIT_CODE);
}

if (context === "production" && !productionBranches.has(branch)) {
  logDecision(`Skipping production-context build from non-production branch "${branch}".`);
  process.exit(SKIP_BUILD_EXIT_CODE);
}

logDecision(`Continuing build for context "${context || "unknown"}" on branch "${branch || "unknown"}".`);
process.exit(ALWAYS_BUILD_EXIT_CODE);
