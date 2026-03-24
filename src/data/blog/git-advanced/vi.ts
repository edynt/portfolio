import type { Tutorial } from '@/types/tutorial';
import { cherryPickChapter } from './chapters-vi/cherry-pick';
import { worktreeChapter } from './chapters-vi/worktree';
import { interactiveRebaseChapter } from './chapters-vi/interactive-rebase';
import { bisectChapter } from './chapters-vi/bisect';
import { reflogChapter } from './chapters-vi/reflog';
import { stashAdvancedChapter } from './chapters-vi/stash-advanced';
import { resetRestoreChapter } from './chapters-vi/reset-restore';

const tutorial: Tutorial = {
  id: 'git-advanced',
  title: 'Git Nâng Cao Cho Các Tình Huống Khó',
  description:
    'Thành thạo cherry-pick, worktree, interactive rebase, bisect, reflog, stash nâng cao, và reset/restore — các lệnh Git cứu bạn trong thực tế.',
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
