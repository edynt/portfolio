import type { Chapter } from '@/types/tutorial';

/** Chapter 7: Reset, Restore & Clean — undo changes safely */
export const resetRestoreChapter: Chapter = {
  id: 'chapter7',
  title: 'Reset, Restore & Clean',
  sections: [
    {
      id: 'reset-modes',
      title: 'Three Modes of Git Reset',
      subtitle: 'Understand soft, mixed, and hard reset',
      icon: '🔄',
      iconColor: 'bg-red-100',
      blocks: [
        {
          type: 'code',
          lang: 'bash',
          code: `# Soft reset — undo commits, keep changes staged
git reset --soft HEAD~3

# Mixed reset (default) — undo commits, unstage changes
git reset HEAD~3          # same as --mixed

# Hard reset — undo commits, DISCARD all changes
git reset --hard HEAD~3   # ⚠️ destructive!`,
        },
        {
          type: 'table',
          caption: 'Reset modes comparison',
          headers: ['Mode', 'Commits', 'Staging Area', 'Working Directory'],
          rows: [
            ['--soft', 'Undone ↩️', 'Kept ✅', 'Kept ✅'],
            ['--mixed', 'Undone ↩️', 'Cleared 🔄', 'Kept ✅'],
            ['--hard', 'Undone ↩️', 'Cleared 🔄', 'Cleared ❌'],
          ],
        },
        {
          type: 'callout',
          variant: 'danger',
          title: 'Hard reset warning',
          html: '<code>--hard</code> permanently removes uncommitted changes from working directory. Always check <code>git status</code> and <code>git stash</code> before using it. If you lose work, check <code>git reflog</code>.',
        },
      ],
    },
    {
      id: 'restore-files',
      title: 'Restore Specific Files',
      subtitle: 'Modern way to undo file changes (replaces checkout --)',
      icon: '📄',
      iconColor: 'bg-blue-100',
      blocks: [
        {
          type: 'callout',
          variant: 'info',
          title: 'git restore vs git checkout',
          html: '<code>git restore</code> (Git 2.23+) replaces the confusing <code>git checkout -- file</code> syntax. It\'s clearer and safer.',
        },
        {
          type: 'code',
          lang: 'bash',
          code: `# Discard changes in working directory (unstaged changes)
git restore src/app.ts

# Unstage a file (keep changes in working directory)
git restore --staged src/app.ts

# Restore a file from a specific commit
git restore --source=HEAD~3 src/app.ts

# Restore all files in a directory
git restore src/components/

# Restore both staged and working directory
git restore --staged --worktree src/app.ts`,
        },
        {
          type: 'compare',
          left: {
            title: 'git restore (modern)',
            blocks: [
              {
                type: 'code',
                lang: 'bash',
                code: `# Clear and obvious intent
git restore src/app.ts
git restore --staged src/app.ts`,
              },
            ],
          },
          right: {
            title: 'git checkout (legacy)',
            blocks: [
              {
                type: 'code',
                lang: 'bash',
                code: `# Confusing — checkout does too many things
git checkout -- src/app.ts
git checkout HEAD -- src/app.ts`,
              },
            ],
          },
        },
      ],
    },
    {
      id: 'clean-untracked',
      title: 'Clean Untracked Files',
      subtitle: 'Remove files not tracked by Git',
      icon: '🧹',
      iconColor: 'bg-amber-100',
      blocks: [
        {
          type: 'code',
          lang: 'bash',
          code: `# Preview what would be deleted (dry run)
git clean -n

# Remove untracked files
git clean -f

# Remove untracked files AND directories
git clean -fd

# Remove ignored files too (e.g., build artifacts)
git clean -fdx

# Interactive mode — choose what to delete
git clean -i`,
        },
        {
          type: 'callout',
          variant: 'warn',
          title: 'Always dry-run first',
          html: 'Use <code>git clean -n</code> (dry run) before <code>git clean -f</code>. Deleted untracked files are <strong>gone forever</strong> — they were never committed, so even reflog can\'t save them.',
        },
      ],
    },
  ],
};
