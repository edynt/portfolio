import type { Chapter } from '@/types/tutorial';

/** Chapter 4: Git Bisect — find the commit that introduced a bug */
export const bisectChapter: Chapter = {
  id: 'chapter4',
  title: 'Git Bisect',
  sections: [
    {
      id: 'bisect-manual',
      title: 'Find the Bug-Introducing Commit',
      subtitle: 'Binary search through commits to pinpoint the exact cause',
      icon: '🔍',
      iconColor: 'bg-yellow-100',
      blocks: [
        {
          type: 'callout',
          variant: 'info',
          title: 'When to use bisect',
          html: 'Something broke, but you don\'t know which commit caused it. Instead of checking 100 commits one by one, <code>git bisect</code> uses <strong>binary search</strong> — you only need to check ~7 commits to find the culprit among 100.',
        },
        {
          type: 'code',
          lang: 'bash',
          code: `# Start bisecting
git bisect start

# Mark current commit as bad (has the bug)
git bisect bad

# Mark a known good commit (before the bug existed)
git bisect good v1.0.0   # or a commit hash

# Git checks out the middle commit
# Test it, then tell Git:
git bisect good   # if this commit is fine
# OR
git bisect bad    # if this commit has the bug

# Repeat until Git finds the exact commit:
# "abc1234 is the first bad commit"

# When done, return to your branch
git bisect reset`,
        },
        {
          type: 'step-list',
          items: [
            '<strong>Step 1:</strong> <code>git bisect start</code> — enter bisect mode',
            '<strong>Step 2:</strong> <code>git bisect bad</code> — mark current (broken) commit',
            '<strong>Step 3:</strong> <code>git bisect good &lt;ref&gt;</code> — mark a known working commit',
            '<strong>Step 4:</strong> Test each checkout, mark <code>good</code> or <code>bad</code>',
            '<strong>Step 5:</strong> <code>git bisect reset</code> — exit bisect mode',
          ],
        },
      ],
    },
    {
      id: 'bisect-auto',
      title: 'Automated Bisect with a Test Script',
      subtitle: 'Let Git run the test for you at each step',
      icon: '🤖',
      iconColor: 'bg-green-100',
      blocks: [
        {
          type: 'text',
          html: 'If you have a script that can detect the bug (exit 0 = good, exit 1 = bad), automate the entire process:',
        },
        {
          type: 'code',
          lang: 'bash',
          code: `# Start bisect
git bisect start
git bisect bad HEAD
git bisect good v1.0.0

# Run automated bisect with a test script
git bisect run npm test

# Or with a custom script
git bisect run ./scripts/check-bug.sh

# Git runs the script at each step automatically
# and reports the first bad commit when done`,
        },
        {
          type: 'code',
          lang: 'bash',
          filename: 'scripts/check-bug.sh',
          code: `#!/bin/bash
# Example: check if the login page loads
npm run build 2>/dev/null
if curl -s http://localhost:3000/login | grep -q "Login Form"; then
  exit 0   # good — bug not present
else
  exit 1   # bad — bug is here
fi`,
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'Skip untestable commits',
          html: 'If a commit doesn\'t compile or can\'t be tested, use <code>git bisect skip</code>. Git will try a nearby commit instead.',
        },
      ],
    },
  ],
};
