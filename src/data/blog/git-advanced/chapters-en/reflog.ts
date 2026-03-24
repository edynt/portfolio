import type { Chapter } from '@/types/tutorial';

/** Chapter 5: Git Reflog — recover lost commits and undo mistakes */
export const reflogChapter: Chapter = {
  id: 'chapter5',
  title: 'Git Reflog',
  sections: [
    {
      id: 'reflog-recover',
      title: 'Recover After a Hard Reset',
      subtitle: 'Undo "git reset --hard" and get your commits back',
      icon: '🔄',
      iconColor: 'bg-red-100',
      blocks: [
        {
          type: 'callout',
          variant: 'danger',
          title: 'The nightmare scenario',
          html: 'You ran <code>git reset --hard HEAD~5</code> and lost 5 commits. <code>git log</code> shows nothing. But the commits are NOT gone — they\'re in the <strong>reflog</strong>.',
        },
        {
          type: 'code',
          lang: 'bash',
          code: `# View the reflog — every HEAD movement is recorded
git reflog
# abc1234 HEAD@{0}: reset: moving to HEAD~5
# def5678 HEAD@{1}: commit: feat: add payment gateway
# 111aaaa HEAD@{2}: commit: feat: add cart page
# 222bbbb HEAD@{3}: commit: feat: add product list
# ...

# Recover by resetting to the commit BEFORE the reset
git reset --hard def5678

# Or use the reflog reference directly
git reset --hard HEAD@{1}

# Your commits are back!`,
        },
        {
          type: 'callout',
          variant: 'ok',
          title: 'Reflog saves everything',
          html: 'The reflog records every change to HEAD for <strong>90 days</strong> by default. As long as you haven\'t run <code>git gc</code>, lost commits can be recovered.',
        },
      ],
    },
    {
      id: 'reflog-deleted-branch',
      title: 'Recover a Deleted Branch',
      subtitle: 'Restore a branch you accidentally deleted',
      icon: '🌿',
      iconColor: 'bg-green-100',
      blocks: [
        {
          type: 'code',
          lang: 'bash',
          code: `# Oops — deleted a branch
git branch -D feature/important-work

# Find the branch's last commit in the reflog
git reflog | grep "important-work"
# abc1234 HEAD@{5}: checkout: moving from feature/important-work to main

# Recreate the branch at that commit
git branch feature/important-work abc1234

# Or check out directly
git checkout -b feature/important-work abc1234`,
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'Useful reflog filters',
          html: 'Use <code>git reflog show feature/branch-name</code> to see reflog for a specific branch. Use <code>git log --walk-reflogs</code> for detailed output with dates.',
        },
      ],
    },
    {
      id: 'reflog-undo-rebase',
      title: 'Undo a Bad Rebase',
      subtitle: 'Revert to pre-rebase state',
      icon: '⏪',
      iconColor: 'bg-orange-100',
      blocks: [
        {
          type: 'text',
          html: 'If a rebase went wrong (conflicts, wrong base, etc.), use reflog to go back:',
        },
        {
          type: 'code',
          lang: 'bash',
          code: `# After a bad rebase, find the pre-rebase state
git reflog
# abc1234 HEAD@{0}: rebase (finish): ...
# def5678 HEAD@{1}: rebase (pick): ...
# 999cccc HEAD@{5}: checkout: moving from feature to main
# 888dddd HEAD@{6}: commit: feat: my last good commit  ← HERE

# Reset to the pre-rebase state
git reset --hard 888dddd`,
        },
        {
          type: 'callout',
          variant: 'info',
          title: 'ORIG_HEAD shortcut',
          html: 'Right after a rebase or merge, Git saves the previous HEAD as <code>ORIG_HEAD</code>. Quick undo: <code>git reset --hard ORIG_HEAD</code>. This only works immediately after the operation.',
        },
      ],
    },
  ],
};
