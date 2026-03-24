import type { Tutorial } from '@/types/tutorial';
import { cherryPickChapter } from './chapters-en/cherry-pick';
import { worktreeChapter } from './chapters-en/worktree';
import { interactiveRebaseChapter } from './chapters-en/interactive-rebase';
import { bisectChapter } from './chapters-en/bisect';
import { reflogChapter } from './chapters-en/reflog';
import { stashAdvancedChapter } from './chapters-en/stash-advanced';
import { resetRestoreChapter } from './chapters-en/reset-restore';

const tutorial: Tutorial = {
  id: 'git-advanced',
  title: 'Advanced Git for Hard Cases',
  description:
    'Master cherry-pick, worktree, interactive rebase, bisect, reflog, advanced stash, and reset/restore — the Git commands that save you in real-world scenarios.',
  icon: '🔀',
  chapters: [
    cherryPickChapter,
    worktreeChapter,
    interactiveRebaseChapter,
    bisectChapter,
    reflogChapter,
    stashAdvancedChapter,
    resetRestoreChapter,
  ],
};

export default tutorial;
