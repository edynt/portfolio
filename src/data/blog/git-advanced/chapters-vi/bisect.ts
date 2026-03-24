import type { Chapter } from '@/types/tutorial';

/** Chapter 4: Git Bisect — tìm commit gây ra bug */
export const bisectChapter: Chapter = {
  id: 'chapter4',
  title: 'Git Bisect',
  sections: [
    {
      id: 'bisect-manual',
      title: 'Tìm Commit Gây Ra Bug',
      subtitle: 'Binary search qua các commit để xác định chính xác nguyên nhân',
      icon: '🔍',
      iconColor: 'bg-yellow-100',
      blocks: [
        {
          type: 'callout',
          variant: 'info',
          title: 'Khi nào dùng bisect',
          html: 'Có gì đó bị hỏng, nhưng bạn không biết commit nào gây ra. Thay vì kiểm tra 100 commit từng cái, <code>git bisect</code> dùng <strong>binary search</strong> — bạn chỉ cần kiểm tra ~7 commit để tìm thủ phạm trong 100 commit.',
        },
        {
          type: 'code',
          lang: 'bash',
          code: `# Bắt đầu bisect
git bisect start

# Đánh dấu commit hiện tại là bad (có bug)
git bisect bad

# Đánh dấu commit biết chắc là tốt (trước khi có bug)
git bisect good v1.0.0   # hoặc commit hash

# Git checkout commit ở giữa
# Test nó, rồi báo Git:
git bisect good   # nếu commit này OK
# HOẶC
git bisect bad    # nếu commit này có bug

# Lặp lại cho đến khi Git tìm được commit chính xác:
# "abc1234 is the first bad commit"

# Khi xong, quay về branch
git bisect reset`,
        },
        {
          type: 'step-list',
          items: [
            '<strong>Bước 1:</strong> <code>git bisect start</code> — vào chế độ bisect',
            '<strong>Bước 2:</strong> <code>git bisect bad</code> — đánh dấu commit hiện tại (bị lỗi)',
            '<strong>Bước 3:</strong> <code>git bisect good &lt;ref&gt;</code> — đánh dấu commit biết chắc hoạt động',
            '<strong>Bước 4:</strong> Test mỗi checkout, đánh dấu <code>good</code> hoặc <code>bad</code>',
            '<strong>Bước 5:</strong> <code>git bisect reset</code> — thoát chế độ bisect',
          ],
        },
      ],
    },
    {
      id: 'bisect-auto',
      title: 'Bisect Tự Động Với Script',
      subtitle: 'Để Git chạy test cho bạn ở mỗi bước',
      icon: '🤖',
      iconColor: 'bg-green-100',
      blocks: [
        {
          type: 'text',
          html: 'Nếu bạn có script phát hiện được bug (exit 0 = good, exit 1 = bad), tự động hóa toàn bộ:',
        },
        {
          type: 'code',
          lang: 'bash',
          code: `# Bắt đầu bisect
git bisect start
git bisect bad HEAD
git bisect good v1.0.0

# Chạy bisect tự động với test script
git bisect run npm test

# Hoặc với script tùy chỉnh
git bisect run ./scripts/check-bug.sh

# Git chạy script ở mỗi bước tự động
# và báo cáo first bad commit khi xong`,
        },
        {
          type: 'code',
          lang: 'bash',
          filename: 'scripts/check-bug.sh',
          code: `#!/bin/bash
# Ví dụ: kiểm tra trang login có load được không
npm run build 2>/dev/null
if curl -s http://localhost:3000/login | grep -q "Login Form"; then
  exit 0   # good — bug chưa xuất hiện
else
  exit 1   # bad — bug ở đây
fi`,
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'Bỏ qua commit không test được',
          html: 'Nếu commit không compile hoặc không test được, dùng <code>git bisect skip</code>. Git sẽ thử commit gần đó thay thế.',
        },
      ],
    },
  ],
};
