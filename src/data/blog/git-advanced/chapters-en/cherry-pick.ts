import type { Chapter } from '@/types/tutorial';

/** Chapter 1: Git Cherry-Pick — pick specific commits across branches */
export const cherryPickChapter: Chapter = {
  id: 'chapter1',
  title: 'Git Cherry-Pick',
  sections: [
    {
      id: 'cherry-pick-basics',
      title: 'Pick a Specific Commit to Another Branch',
      subtitle: 'Apply individual commits without merging entire branches',
      icon: '🍒',
      iconColor: 'bg-red-100',
      blocks: [
        {
          type: 'callout',
          variant: 'info',
          title: 'When to use cherry-pick',
          html: 'Use cherry-pick when you need a <strong>specific fix</strong> from another branch without merging everything. Common cases: backporting hotfixes to release branches, or pulling a single feature commit to main.',
        },
        {
          type: 'code',
          lang: 'bash',
          code: `# Switch to the branch you want to apply the commit TO
git checkout main

# Cherry-pick a specific commit by its hash
git cherry-pick abc1234

# Cherry-pick multiple commits
git cherry-pick abc1234 def5678

# Cherry-pick a range of commits (exclusive start, inclusive end)
git cherry-pick abc1234..def5678`,
        },
        {
          type: 'callout',
          variant: 'warn',
          title: 'Range syntax',
          html: '<code>A..B</code> picks commits <strong>after A up to and including B</strong>. Commit A itself is NOT included. Use <code>A^..B</code> to include A.',
        },
      ],
    },
    {
      id: 'cherry-pick-no-commit',
      title: 'Cherry-Pick Without Auto-Committing',
      subtitle: 'Stage changes without creating a commit',
      icon: '📋',
      iconColor: 'bg-blue-100',
      blocks: [
        {
          type: 'text',
          html: 'Sometimes you want to cherry-pick changes but <strong>modify them before committing</strong>. Use <code>--no-commit</code> (or <code>-n</code>):',
        },
        {
          type: 'code',
          lang: 'bash',
          code: `# Stage changes but don't commit
git cherry-pick --no-commit abc1234

# Review what was staged
git diff --cached

# Make additional changes if needed, then commit manually
git commit -m "feat: backport login fix with adjustments"`,
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'Combine multiple cherry-picks',
          html: 'Use <code>--no-commit</code> on several cherry-picks, then make a single commit. This keeps the target branch history clean.',
        },
      ],
    },
    {
      id: 'cherry-pick-conflicts',
      title: 'Handling Cherry-Pick Conflicts',
      subtitle: 'Resolve conflicts and continue or abort',
      icon: '⚠️',
      iconColor: 'bg-yellow-100',
      blocks: [
        {
          type: 'text',
          html: 'If the cherry-picked commit conflicts with current branch:',
        },
        {
          type: 'code',
          lang: 'bash',
          code: `# Git will pause and show conflicted files
git cherry-pick abc1234
# CONFLICT (content): Merge conflict in src/auth.ts

# 1. Fix conflicts manually in the files
# 2. Stage the resolved files
git add src/auth.ts

# 3. Continue the cherry-pick
git cherry-pick --continue

# OR abort if you change your mind
git cherry-pick --abort`,
        },
        {
          type: 'compare',
          left: {
            title: '✅ --continue',
            blocks: [
              {
                type: 'text',
                html: 'After resolving conflicts and staging files, <code>--continue</code> finishes the cherry-pick with the original commit message.',
              },
            ],
          },
          right: {
            title: '🔙 --abort',
            blocks: [
              {
                type: 'text',
                html: '<code>--abort</code> reverts everything back to the state before you started the cherry-pick. No changes are kept.',
              },
            ],
          },
        },
      ],
    },
  ],
};
