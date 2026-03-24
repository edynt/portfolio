import type { Chapter } from '@/types/tutorial';

/** Chapter 1: Git Cherry-Pick — chọn commit cụ thể giữa các branch */
export const cherryPickChapter: Chapter = {
  id: 'chapter1',
  title: 'Git Cherry-Pick',
  sections: [
    {
      id: 'cherry-pick-basics',
      title: 'Chọn Commit Cụ Thể Sang Branch Khác',
      subtitle: 'Áp dụng từng commit riêng lẻ mà không cần merge toàn bộ branch',
      icon: '🍒',
      iconColor: 'bg-red-100',
      blocks: [
        {
          type: 'callout',
          variant: 'info',
          title: 'Khi nào dùng cherry-pick',
          html: 'Dùng cherry-pick khi bạn cần một <strong>fix cụ thể</strong> từ branch khác mà không muốn merge hết. Trường hợp phổ biến: backport hotfix sang release branch, hoặc lấy một commit feature về main.',
        },
        {
          type: 'code',
          lang: 'bash',
          code: `# Chuyển sang branch bạn muốn ÁP DỤNG commit vào
git checkout main

# Cherry-pick commit cụ thể bằng hash
git cherry-pick abc1234

# Cherry-pick nhiều commits
git cherry-pick abc1234 def5678

# Cherry-pick một range (bắt đầu exclusive, kết thúc inclusive)
git cherry-pick abc1234..def5678`,
        },
        {
          type: 'callout',
          variant: 'warn',
          title: 'Cú pháp range',
          html: '<code>A..B</code> lấy các commit <strong>sau A đến và bao gồm B</strong>. Commit A KHÔNG được bao gồm. Dùng <code>A^..B</code> để bao gồm cả A.',
        },
      ],
    },
    {
      id: 'cherry-pick-no-commit',
      title: 'Cherry-Pick Không Tự Động Commit',
      subtitle: 'Stage changes mà không tạo commit',
      icon: '📋',
      iconColor: 'bg-blue-100',
      blocks: [
        {
          type: 'text',
          html: 'Đôi khi bạn muốn cherry-pick nhưng <strong>chỉnh sửa trước khi commit</strong>. Dùng <code>--no-commit</code> (hoặc <code>-n</code>):',
        },
        {
          type: 'code',
          lang: 'bash',
          code: `# Stage changes nhưng không commit
git cherry-pick --no-commit abc1234

# Xem những gì đã staged
git diff --cached

# Chỉnh sửa thêm nếu cần, rồi commit thủ công
git commit -m "feat: backport login fix with adjustments"`,
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'Gộp nhiều cherry-pick',
          html: 'Dùng <code>--no-commit</code> trên nhiều cherry-pick, rồi tạo một commit duy nhất. Giữ history branch đích sạch sẽ.',
        },
      ],
    },
    {
      id: 'cherry-pick-conflicts',
      title: 'Xử Lý Conflict Khi Cherry-Pick',
      subtitle: 'Giải quyết conflict rồi tiếp tục hoặc hủy',
      icon: '⚠️',
      iconColor: 'bg-yellow-100',
      blocks: [
        {
          type: 'text',
          html: 'Nếu commit cherry-pick bị conflict với branch hiện tại:',
        },
        {
          type: 'code',
          lang: 'bash',
          code: `# Git sẽ dừng lại và hiện các file bị conflict
git cherry-pick abc1234
# CONFLICT (content): Merge conflict in src/auth.ts

# 1. Sửa conflict thủ công trong các file
# 2. Stage các file đã resolve
git add src/auth.ts

# 3. Tiếp tục cherry-pick
git cherry-pick --continue

# HOẶC hủy bỏ nếu đổi ý
git cherry-pick --abort`,
        },
        {
          type: 'compare',
          left: {
            title: '✅ --continue',
            blocks: [
              {
                type: 'text',
                html: 'Sau khi resolve conflict và stage file, <code>--continue</code> hoàn thành cherry-pick với commit message gốc.',
              },
            ],
          },
          right: {
            title: '🔙 --abort',
            blocks: [
              {
                type: 'text',
                html: '<code>--abort</code> đưa mọi thứ về trạng thái trước khi bắt đầu cherry-pick. Không giữ lại thay đổi nào.',
              },
            ],
          },
        },
      ],
    },
  ],
};
