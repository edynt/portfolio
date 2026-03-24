import type { Chapter } from '@/types/tutorial';

/** Chapter 3: Git Interactive Rebase — rewrite commit history */
export const interactiveRebaseChapter: Chapter = {
  id: 'chapter3',
  title: 'Git Interactive Rebase',
  sections: [
    {
      id: 'rebase-squash',
      title: 'Squash Messy Commits into One',
      subtitle: 'Clean up "WIP", "fix typo", "oops" commits before merging',
      icon: '🗜',
      iconColor: 'bg-indigo-100',
      blocks: [
        {
          type: 'callout',
          variant: 'info',
          title: 'Why squash?',
          html: 'Before merging a feature branch, squash your 15 "WIP" commits into 1-2 meaningful commits. Reviewers see a clean story, and <code>git log</code> stays readable.',
        },
        {
          type: 'code',
          lang: 'bash',
          code: `# Rebase the last 4 commits interactively
git rebase -i HEAD~4

# Editor opens with:
# pick abc1234 feat: add login form
# pick def5678 WIP: trying something
# pick 111aaaa fix: typo in login
# pick 222bbbb feat: add validation

# Change to:
# pick abc1234 feat: add login form
# squash def5678 WIP: trying something
# squash 111aaaa fix: typo in login
# pick 222bbbb feat: add validation

# Save and close → Git combines the squashed commits
# You'll get to edit the combined commit message`,
        },
        {
          type: 'table',
          caption: 'Interactive rebase commands',
          headers: ['Command', 'Short', 'Effect'],
          rows: [
            ['pick', 'p', 'Keep commit as-is'],
            ['squash', 's', 'Merge into previous commit, edit combined message'],
            ['fixup', 'f', 'Merge into previous commit, discard this message'],
            ['reword', 'r', 'Keep commit but edit the message'],
            ['edit', 'e', 'Pause to amend the commit (add/remove files)'],
            ['drop', 'd', 'Delete the commit entirely'],
          ],
        },
      ],
    },
    {
      id: 'rebase-onto',
      title: 'Rebase Onto a Different Base',
      subtitle: 'Move a branch to start from a different point',
      icon: '🔀',
      iconColor: 'bg-cyan-100',
      blocks: [
        {
          type: 'text',
          html: 'If you branched from <code>develop</code> but now need your commits on top of <code>main</code>:',
        },
        {
          type: 'code',
          lang: 'bash',
          code: `# Rebase your feature branch onto main
# (moves commits that were based on develop to be based on main)
git rebase --onto main develop feature/my-feature

# Before:
# main:    A - B - C
# develop: A - B - D - E
# feature: A - B - D - E - F - G  (branched from develop)

# After:
# main:    A - B - C - F' - G'  (feature rebased onto main)`,
        },
        {
          type: 'callout',
          variant: 'danger',
          title: 'Golden rule of rebase',
          html: '<strong>Never rebase commits that have been pushed to a shared branch.</strong> Rebase rewrites commit hashes. If others have based work on those commits, their history diverges and chaos ensues. Only rebase your own local/feature branches.',
        },
      ],
    },
    {
      id: 'rebase-autosquash',
      title: 'Auto-Squash with fixup! Commits',
      subtitle: 'Let Git automatically organize your squash targets',
      icon: '🤖',
      iconColor: 'bg-amber-100',
      blocks: [
        {
          type: 'text',
          html: 'Instead of manually reordering in interactive rebase, prefix commit messages with <code>fixup!</code> or <code>squash!</code>:',
        },
        {
          type: 'code',
          lang: 'bash',
          code: `# Original commit
git commit -m "feat: add user profile page"

# Later, fix something related to that commit
git commit -m "fixup! feat: add user profile page"

# When ready to clean up, Git auto-arranges them
git rebase -i --autosquash HEAD~5

# The fixup commit is automatically placed right after
# its target and marked as 'fixup'`,
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'Enable autosquash globally',
          html: 'Run <code>git config --global rebase.autoSquash true</code> so you never forget the <code>--autosquash</code> flag.',
        },
      ],
    },
  ],
};
