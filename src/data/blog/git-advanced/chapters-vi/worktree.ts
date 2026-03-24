import type { Chapter } from '@/types/tutorial';

/** Chapter 2: Git Worktree — làm việc trên nhiều branch cùng lúc */
export const worktreeChapter: Chapter = {
  id: 'chapter2',
  title: 'Git Worktree',
  sections: [
    {
      id: 'worktree-basics',
      title: 'Làm Việc Trên Nhiều Branch Cùng Lúc',
      subtitle: 'Không cần stash hay commit dở dang để chuyển branch',
      icon: '🌳',
      iconColor: 'bg-green-100',
      blocks: [
        {
          type: 'callout',
          variant: 'info',
          title: 'Git Worktree là gì?',
          html: '<code>git worktree</code> cho phép bạn checkout <strong>nhiều branch cùng lúc</strong> trong các thư mục riêng biệt — tất cả dùng chung một repo <code>.git</code>. Không cần clone repo lần nữa hay stash work.',
        },
        {
          type: 'code',
          lang: 'bash',
          code: `# Tạo worktree mới cho một branch
git worktree add ../hotfix-branch hotfix/login-bug

# Bây giờ bạn có:
# /project          → branch hiện tại (vd: feature/dashboard)
# /hotfix-branch    → branch hotfix/login-bug

# Làm việc trên hotfix ở thư mục kia
cd ../hotfix-branch
# ... fix bug, commit, push ...

# Quay lại feature branch — không cần stash
cd ../project`,
        },
        {
          type: 'feature-grid',
          items: [
            {
              icon: '⚡',
              title: 'Chuyển đổi tức thì',
              description: 'Không cần stash/commit để chuyển context. Mỗi worktree hoạt động độc lập.',
            },
            {
              icon: '💾',
              title: 'Chung .git',
              description: 'Tất cả worktree dùng chung repo Git — không tốn thêm dung lượng cho objects.',
            },
            {
              icon: '🔄',
              title: 'Build song song',
              description: 'Chạy test trên một branch trong khi code trên branch khác. Không cần đợi.',
            },
          ],
        },
      ],
    },
    {
      id: 'worktree-manage',
      title: 'Quản Lý Worktree',
      subtitle: 'Liệt kê, xóa, và dọn dẹp worktree',
      icon: '🗂',
      iconColor: 'bg-purple-100',
      blocks: [
        {
          type: 'code',
          lang: 'bash',
          code: `# Liệt kê tất cả worktree
git worktree list
# /Users/me/project          abc1234 [main]
# /Users/me/hotfix-branch    def5678 [hotfix/login-bug]

# Tạo worktree cho branch mới (tạo + checkout)
git worktree add -b feature/new-api ../new-api-worktree

# Xóa worktree khi hoàn thành
git worktree remove ../hotfix-branch

# Nếu đã xóa thư mục thủ công, dọn dẹp
git worktree prune`,
        },
        {
          type: 'callout',
          variant: 'warn',
          title: 'Một branch một worktree',
          html: 'Mỗi branch chỉ có thể checkout trong <strong>một worktree tại một thời điểm</strong>. Nếu bạn thử tạo worktree cho branch đã checkout, Git sẽ từ chối.',
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'Best practice',
          html: 'Đặt worktree ở thư mục cùng cấp (vd: <code>../worktrees/hotfix</code>) để giữ project root sạch. Luôn <code>git worktree remove</code> khi xong.',
        },
      ],
    },
  ],
};
