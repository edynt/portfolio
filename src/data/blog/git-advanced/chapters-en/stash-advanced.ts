import type { Chapter } from '@/types/tutorial';

/** Chapter 6: Git Stash Advanced — beyond basic stash/pop */
export const stashAdvancedChapter: Chapter = {
  id: 'chapter6',
  title: 'Git Stash Advanced',
  sections: [
    {
      id: 'stash-named',
      title: 'Named Stashes & Management',
      subtitle: 'Organize stashes with messages and selective operations',
      icon: '📦',
      iconColor: 'bg-blue-100',
      blocks: [
        {
          type: 'code',
          lang: 'bash',
          code: `# Stash with a descriptive message
git stash push -m "WIP: payment form validation"

# List all stashes
git stash list
# stash@{0}: On feature/pay: WIP: payment form validation
# stash@{1}: On main: debugging auth issue

# Apply a specific stash (keeps it in the list)
git stash apply stash@{1}

# Pop a specific stash (applies + removes from list)
git stash pop stash@{0}

# Drop a specific stash without applying
git stash drop stash@{1}

# Clear all stashes
git stash clear`,
        },
        {
          type: 'compare',
          left: {
            title: '✅ apply (safe)',
            blocks: [
              {
                type: 'text',
                html: '<code>git stash apply</code> restores changes but <strong>keeps the stash</strong> in the list. You can apply it again if needed.',
              },
            ],
          },
          right: {
            title: '⚡ pop (apply + delete)',
            blocks: [
              {
                type: 'text',
                html: '<code>git stash pop</code> restores changes and <strong>removes the stash</strong> from the list. Use when you\'re sure you don\'t need it again.',
              },
            ],
          },
        },
      ],
    },
    {
      id: 'stash-partial',
      title: 'Stash Specific Files or Hunks',
      subtitle: 'Selectively stash parts of your working directory',
      icon: '✂️',
      iconColor: 'bg-purple-100',
      blocks: [
        {
          type: 'code',
          lang: 'bash',
          code: `# Stash only specific files
git stash push -m "auth changes" src/auth.ts src/middleware.ts

# Stash interactively — choose which hunks to stash
git stash push -p -m "partial stash"
# Git shows each change hunk and asks:
# Stash this hunk [y,n,q,a,d,/,s,e,?]?

# Stash including untracked files
git stash push -u -m "include new files"

# Stash everything including ignored files
git stash push -a -m "include all"`,
        },
        {
          type: 'table',
          caption: 'Stash push flags',
          headers: ['Flag', 'Effect'],
          rows: [
            ['-m "msg"', 'Add a descriptive message'],
            ['-p / --patch', 'Interactively select hunks to stash'],
            ['-u / --include-untracked', 'Also stash new (untracked) files'],
            ['-a / --all', 'Stash everything including .gitignore\'d files'],
            ['-k / --keep-index', 'Keep staged changes in the working directory'],
          ],
        },
      ],
    },
    {
      id: 'stash-branch',
      title: 'Create a Branch from a Stash',
      subtitle: 'Turn stashed work into a proper branch',
      icon: '🌿',
      iconColor: 'bg-green-100',
      blocks: [
        {
          type: 'text',
          html: 'If your stash conflicts with current changes, create a new branch from it:',
        },
        {
          type: 'code',
          lang: 'bash',
          code: `# Create a branch from the latest stash
git stash branch feature/from-stash

# Create a branch from a specific stash
git stash branch feature/old-work stash@{2}

# This:
# 1. Creates the branch at the commit where stash was created
# 2. Applies the stash
# 3. Drops the stash if apply succeeds`,
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'Pro tip',
          html: 'Use <code>git stash show -p stash@{0}</code> to preview what\'s in a stash before applying it. Add <code>--stat</code> for a file-level summary.',
        },
      ],
    },
  ],
};
