import type { Chapter } from '@/types/tutorial';

/** Chapter 2: Git Worktree — work on multiple branches simultaneously */
export const worktreeChapter: Chapter = {
  id: 'chapter2',
  title: 'Git Worktree',
  sections: [
    {
      id: 'worktree-basics',
      title: 'Work on Multiple Branches Simultaneously',
      subtitle: 'No more stashing or committing half-done work to switch branches',
      icon: '🌳',
      iconColor: 'bg-green-100',
      blocks: [
        {
          type: 'callout',
          variant: 'info',
          title: 'What is Git Worktree?',
          html: '<code>git worktree</code> lets you check out <strong>multiple branches at the same time</strong> in separate directories — all sharing the same <code>.git</code> repo. No need to clone the repo twice or stash your work.',
        },
        {
          type: 'code',
          lang: 'bash',
          code: `# Create a new worktree for a branch
git worktree add ../hotfix-branch hotfix/login-bug

# Now you have:
# /project          → your current branch (e.g., feature/dashboard)
# /hotfix-branch    → hotfix/login-bug branch

# Work on the hotfix in the other directory
cd ../hotfix-branch
# ... fix the bug, commit, push ...

# Come back to your feature branch — no stash needed
cd ../project`,
        },
        {
          type: 'feature-grid',
          items: [
            {
              icon: '⚡',
              title: 'Instant switch',
              description: 'No stash/commit needed to switch context. Each worktree is independent.',
            },
            {
              icon: '💾',
              title: 'Shared .git',
              description: 'All worktrees share the same Git repo — no extra disk space for objects.',
            },
            {
              icon: '🔄',
              title: 'Parallel builds',
              description: 'Run tests on one branch while coding on another. No waiting.',
            },
          ],
        },
      ],
    },
    {
      id: 'worktree-manage',
      title: 'Managing Worktrees',
      subtitle: 'List, remove, and prune worktrees',
      icon: '🗂',
      iconColor: 'bg-purple-100',
      blocks: [
        {
          type: 'code',
          lang: 'bash',
          code: `# List all worktrees
git worktree list
# /Users/me/project          abc1234 [main]
# /Users/me/hotfix-branch    def5678 [hotfix/login-bug]

# Create worktree for a new branch (create + checkout)
git worktree add -b feature/new-api ../new-api-worktree

# Remove a worktree when done
git worktree remove ../hotfix-branch

# If you manually deleted the directory, clean up
git worktree prune`,
        },
        {
          type: 'callout',
          variant: 'warn',
          title: 'One branch per worktree',
          html: 'A branch can only be checked out in <strong>one worktree at a time</strong>. If you try to create a worktree for an already checked-out branch, Git will refuse.',
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'Best practice',
          html: 'Keep worktrees in a sibling directory (e.g., <code>../worktrees/hotfix</code>) to keep your project root clean. Always <code>git worktree remove</code> when done.',
        },
      ],
    },
  ],
};
