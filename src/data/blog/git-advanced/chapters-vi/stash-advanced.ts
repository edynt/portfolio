import type { Chapter } from '@/types/tutorial';

/** Chapter 6: Git Stash Nâng Cao — vượt xa stash/pop cơ bản */
export const stashAdvancedChapter: Chapter = {
  id: 'chapter6',
  title: 'Git Stash Nâng Cao',
  sections: [
    {
      id: 'stash-named',
      title: 'Stash Có Tên & Quản Lý',
      subtitle: 'Tổ chức stash với message và thao tác chọn lọc',
      icon: '📦',
      iconColor: 'bg-blue-100',
      blocks: [
        {
          type: 'code',
          lang: 'bash',
          code: `# Stash với message mô tả
git stash push -m "WIP: payment form validation"

# Liệt kê tất cả stash
git stash list
# stash@{0}: On feature/pay: WIP: payment form validation
# stash@{1}: On main: debugging auth issue

# Apply stash cụ thể (giữ trong list)
git stash apply stash@{1}

# Pop stash cụ thể (apply + xóa khỏi list)
git stash pop stash@{0}

# Xóa stash cụ thể mà không apply
git stash drop stash@{1}

# Xóa tất cả stash
git stash clear`,
        },
        {
          type: 'compare',
          left: {
            title: '✅ apply (an toàn)',
            blocks: [
              {
                type: 'text',
                html: '<code>git stash apply</code> khôi phục changes nhưng <strong>giữ stash</strong> trong list. Có thể apply lại nếu cần.',
              },
            ],
          },
          right: {
            title: '⚡ pop (apply + xóa)',
            blocks: [
              {
                type: 'text',
                html: '<code>git stash pop</code> khôi phục changes và <strong>xóa stash</strong> khỏi list. Dùng khi chắc chắn không cần nữa.',
              },
            ],
          },
        },
      ],
    },
    {
      id: 'stash-partial',
      title: 'Stash File Cụ Thể Hoặc Từng Phần',
      subtitle: 'Chọn lọc phần nào của working directory để stash',
      icon: '✂️',
      iconColor: 'bg-purple-100',
      blocks: [
        {
          type: 'code',
          lang: 'bash',
          code: `# Stash chỉ file cụ thể
git stash push -m "auth changes" src/auth.ts src/middleware.ts

# Stash interactive — chọn từng hunk
git stash push -p -m "partial stash"
# Git hiện từng thay đổi và hỏi:
# Stash this hunk [y,n,q,a,d,/,s,e,?]?

# Stash bao gồm cả file untracked
git stash push -u -m "include new files"

# Stash mọi thứ kể cả file ignored
git stash push -a -m "include all"`,
        },
        {
          type: 'table',
          caption: 'Các flag của stash push',
          headers: ['Flag', 'Tác dụng'],
          rows: [
            ['-m "msg"', 'Thêm message mô tả'],
            ['-p / --patch', 'Chọn từng hunk để stash'],
            ['-u / --include-untracked', 'Stash cả file mới (untracked)'],
            ['-a / --all', 'Stash mọi thứ kể cả file .gitignore'],
            ['-k / --keep-index', 'Giữ staged changes trong working directory'],
          ],
        },
      ],
    },
    {
      id: 'stash-branch',
      title: 'Tạo Branch Từ Stash',
      subtitle: 'Biến stash thành branch đúng cách',
      icon: '🌿',
      iconColor: 'bg-green-100',
      blocks: [
        {
          type: 'text',
          html: 'Nếu stash bị conflict với changes hiện tại, tạo branch mới từ nó:',
        },
        {
          type: 'code',
          lang: 'bash',
          code: `# Tạo branch từ stash mới nhất
git stash branch feature/from-stash

# Tạo branch từ stash cụ thể
git stash branch feature/old-work stash@{2}

# Lệnh này:
# 1. Tạo branch tại commit nơi stash được tạo
# 2. Apply stash
# 3. Drop stash nếu apply thành công`,
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'Mẹo pro',
          html: 'Dùng <code>git stash show -p stash@{0}</code> để xem trước nội dung stash. Thêm <code>--stat</code> để xem tóm tắt theo file.',
        },
      ],
    },
  ],
};
