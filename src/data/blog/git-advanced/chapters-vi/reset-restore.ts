import type { Chapter } from '@/types/tutorial';

/** Chapter 7: Reset, Restore & Clean — undo changes an toàn */
export const resetRestoreChapter: Chapter = {
  id: 'chapter7',
  title: 'Reset, Restore & Clean',
  sections: [
    {
      id: 'reset-modes',
      title: 'Ba Chế Độ Git Reset',
      subtitle: 'Hiểu soft, mixed, và hard reset',
      icon: '🔄',
      iconColor: 'bg-red-100',
      blocks: [
        {
          type: 'code',
          lang: 'bash',
          code: `# Soft reset — undo commit, giữ changes đã staged
git reset --soft HEAD~3

# Mixed reset (mặc định) — undo commit, unstage changes
git reset HEAD~3          # giống --mixed

# Hard reset — undo commit, XÓA tất cả changes
git reset --hard HEAD~3   # ⚠️ nguy hiểm!`,
        },
        {
          type: 'table',
          caption: 'So sánh các chế độ reset',
          headers: ['Chế độ', 'Commits', 'Staging Area', 'Working Directory'],
          rows: [
            ['--soft', 'Undo ↩️', 'Giữ ✅', 'Giữ ✅'],
            ['--mixed', 'Undo ↩️', 'Xóa 🔄', 'Giữ ✅'],
            ['--hard', 'Undo ↩️', 'Xóa 🔄', 'Xóa ❌'],
          ],
        },
        {
          type: 'callout',
          variant: 'danger',
          title: 'Cảnh báo hard reset',
          html: '<code>--hard</code> xóa vĩnh viễn uncommitted changes khỏi working directory. Luôn kiểm tra <code>git status</code> và <code>git stash</code> trước khi dùng. Nếu mất work, kiểm tra <code>git reflog</code>.',
        },
      ],
    },
    {
      id: 'restore-files',
      title: 'Restore File Cụ Thể',
      subtitle: 'Cách hiện đại để undo thay đổi file (thay thế checkout --)',
      icon: '📄',
      iconColor: 'bg-blue-100',
      blocks: [
        {
          type: 'callout',
          variant: 'info',
          title: 'git restore vs git checkout',
          html: '<code>git restore</code> (Git 2.23+) thay thế cú pháp khó hiểu <code>git checkout -- file</code>. Rõ ràng hơn và an toàn hơn.',
        },
        {
          type: 'code',
          lang: 'bash',
          code: `# Hủy thay đổi trong working directory (unstaged)
git restore src/app.ts

# Unstage file (giữ changes trong working directory)
git restore --staged src/app.ts

# Restore file từ commit cụ thể
git restore --source=HEAD~3 src/app.ts

# Restore tất cả file trong thư mục
git restore src/components/

# Restore cả staged lẫn working directory
git restore --staged --worktree src/app.ts`,
        },
        {
          type: 'compare',
          left: {
            title: 'git restore (hiện đại)',
            blocks: [
              {
                type: 'code',
                lang: 'bash',
                code: `# Rõ ràng và dễ hiểu
git restore src/app.ts
git restore --staged src/app.ts`,
              },
            ],
          },
          right: {
            title: 'git checkout (cũ)',
            blocks: [
              {
                type: 'code',
                lang: 'bash',
                code: `# Khó hiểu — checkout làm quá nhiều thứ
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
      title: 'Dọn File Untracked',
      subtitle: 'Xóa file không được Git theo dõi',
      icon: '🧹',
      iconColor: 'bg-amber-100',
      blocks: [
        {
          type: 'code',
          lang: 'bash',
          code: `# Xem trước những gì sẽ bị xóa (dry run)
git clean -n

# Xóa file untracked
git clean -f

# Xóa file untracked VÀ thư mục
git clean -fd

# Xóa cả file ignored (vd: build artifacts)
git clean -fdx

# Chế độ interactive — chọn cái nào xóa
git clean -i`,
        },
        {
          type: 'callout',
          variant: 'warn',
          title: 'Luôn dry-run trước',
          html: 'Dùng <code>git clean -n</code> (dry run) trước <code>git clean -f</code>. File untracked đã xóa sẽ <strong>mất vĩnh viễn</strong> — chúng chưa bao giờ được commit, nên reflog cũng không cứu được.',
        },
      ],
    },
  ],
};
