import type { Chapter } from '@/types/tutorial';

/** Chapter 5: Git Reflog — khôi phục commit bị mất và undo sai lầm */
export const reflogChapter: Chapter = {
  id: 'chapter5',
  title: 'Git Reflog',
  sections: [
    {
      id: 'reflog-recover',
      title: 'Khôi Phục Sau Hard Reset',
      subtitle: 'Undo "git reset --hard" và lấy lại commit',
      icon: '🔄',
      iconColor: 'bg-red-100',
      blocks: [
        {
          type: 'callout',
          variant: 'danger',
          title: 'Tình huống ác mộng',
          html: 'Bạn chạy <code>git reset --hard HEAD~5</code> và mất 5 commit. <code>git log</code> không hiện gì. Nhưng các commit KHÔNG mất — chúng nằm trong <strong>reflog</strong>.',
        },
        {
          type: 'code',
          lang: 'bash',
          code: `# Xem reflog — mọi di chuyển HEAD đều được ghi lại
git reflog
# abc1234 HEAD@{0}: reset: moving to HEAD~5
# def5678 HEAD@{1}: commit: feat: add payment gateway
# 111aaaa HEAD@{2}: commit: feat: add cart page
# 222bbbb HEAD@{3}: commit: feat: add product list
# ...

# Khôi phục bằng cách reset đến commit TRƯỚC lúc reset
git reset --hard def5678

# Hoặc dùng reflog reference trực tiếp
git reset --hard HEAD@{1}

# Commit đã quay lại!`,
        },
        {
          type: 'callout',
          variant: 'ok',
          title: 'Reflog lưu mọi thứ',
          html: 'Reflog ghi lại mọi thay đổi HEAD trong <strong>90 ngày</strong> mặc định. Miễn là chưa chạy <code>git gc</code>, commit bị mất đều có thể khôi phục.',
        },
      ],
    },
    {
      id: 'reflog-deleted-branch',
      title: 'Khôi Phục Branch Đã Xóa',
      subtitle: 'Phục hồi branch vô tình xóa',
      icon: '🌿',
      iconColor: 'bg-green-100',
      blocks: [
        {
          type: 'code',
          lang: 'bash',
          code: `# Oops — xóa mất branch
git branch -D feature/important-work

# Tìm commit cuối của branch trong reflog
git reflog | grep "important-work"
# abc1234 HEAD@{5}: checkout: moving from feature/important-work to main

# Tạo lại branch tại commit đó
git branch feature/important-work abc1234

# Hoặc checkout trực tiếp
git checkout -b feature/important-work abc1234`,
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'Filter reflog hữu ích',
          html: 'Dùng <code>git reflog show feature/branch-name</code> để xem reflog cho branch cụ thể. Dùng <code>git log --walk-reflogs</code> để xem chi tiết với ngày tháng.',
        },
      ],
    },
    {
      id: 'reflog-undo-rebase',
      title: 'Undo Rebase Bị Lỗi',
      subtitle: 'Quay về trạng thái trước rebase',
      icon: '⏪',
      iconColor: 'bg-orange-100',
      blocks: [
        {
          type: 'text',
          html: 'Nếu rebase bị lỗi (conflict, sai base, v.v.), dùng reflog để quay lại:',
        },
        {
          type: 'code',
          lang: 'bash',
          code: `# Sau rebase lỗi, tìm trạng thái trước rebase
git reflog
# abc1234 HEAD@{0}: rebase (finish): ...
# def5678 HEAD@{1}: rebase (pick): ...
# 999cccc HEAD@{5}: checkout: moving from feature to main
# 888dddd HEAD@{6}: commit: feat: my last good commit  ← ĐÂY

# Reset về trạng thái trước rebase
git reset --hard 888dddd`,
        },
        {
          type: 'callout',
          variant: 'info',
          title: 'ORIG_HEAD tắt nhanh',
          html: 'Ngay sau rebase hoặc merge, Git lưu HEAD trước đó là <code>ORIG_HEAD</code>. Undo nhanh: <code>git reset --hard ORIG_HEAD</code>. Chỉ hoạt động ngay sau operation.',
        },
      ],
    },
  ],
};
