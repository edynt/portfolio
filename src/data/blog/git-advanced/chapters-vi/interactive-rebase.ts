import type { Chapter } from '@/types/tutorial';

/** Chapter 3: Git Interactive Rebase — viết lại lịch sử commit */
export const interactiveRebaseChapter: Chapter = {
  id: 'chapter3',
  title: 'Git Interactive Rebase',
  sections: [
    {
      id: 'rebase-squash',
      title: 'Gộp Các Commit Lộn Xộn Thành Một',
      subtitle: 'Dọn dẹp commit "WIP", "fix typo", "oops" trước khi merge',
      icon: '🗜',
      iconColor: 'bg-indigo-100',
      blocks: [
        {
          type: 'callout',
          variant: 'info',
          title: 'Tại sao cần squash?',
          html: 'Trước khi merge feature branch, gộp 15 commit "WIP" thành 1-2 commit có ý nghĩa. Reviewer thấy câu chuyện gọn gàng, và <code>git log</code> dễ đọc.',
        },
        {
          type: 'code',
          lang: 'bash',
          code: `# Rebase 4 commit cuối cùng
git rebase -i HEAD~4

# Editor mở ra với:
# pick abc1234 feat: add login form
# pick def5678 WIP: trying something
# pick 111aaaa fix: typo in login
# pick 222bbbb feat: add validation

# Đổi thành:
# pick abc1234 feat: add login form
# squash def5678 WIP: trying something
# squash 111aaaa fix: typo in login
# pick 222bbbb feat: add validation

# Lưu và đóng → Git gộp các commit đã squash
# Bạn sẽ được chỉnh sửa commit message gộp`,
        },
        {
          type: 'table',
          caption: 'Các lệnh interactive rebase',
          headers: ['Lệnh', 'Viết tắt', 'Tác dụng'],
          rows: [
            ['pick', 'p', 'Giữ commit nguyên vẹn'],
            ['squash', 's', 'Gộp vào commit trước, chỉnh message gộp'],
            ['fixup', 'f', 'Gộp vào commit trước, bỏ message này'],
            ['reword', 'r', 'Giữ commit nhưng sửa message'],
            ['edit', 'e', 'Tạm dừng để amend commit (thêm/xóa file)'],
            ['drop', 'd', 'Xóa commit hoàn toàn'],
          ],
        },
      ],
    },
    {
      id: 'rebase-onto',
      title: 'Rebase Sang Base Khác',
      subtitle: 'Di chuyển branch để bắt đầu từ điểm khác',
      icon: '🔀',
      iconColor: 'bg-cyan-100',
      blocks: [
        {
          type: 'text',
          html: 'Nếu bạn tạo branch từ <code>develop</code> nhưng giờ cần đặt commit lên trên <code>main</code>:',
        },
        {
          type: 'code',
          lang: 'bash',
          code: `# Rebase feature branch lên main
# (di chuyển các commit dựa trên develop sang dựa trên main)
git rebase --onto main develop feature/my-feature

# Trước:
# main:    A - B - C
# develop: A - B - D - E
# feature: A - B - D - E - F - G  (tạo từ develop)

# Sau:
# main:    A - B - C - F' - G'  (feature rebased lên main)`,
        },
        {
          type: 'callout',
          variant: 'danger',
          title: 'Quy tắc vàng của rebase',
          html: '<strong>Không bao giờ rebase commit đã push lên branch chung.</strong> Rebase viết lại commit hash. Nếu người khác đã base work trên những commit đó, history của họ sẽ phân kỳ và hỗn loạn. Chỉ rebase branch local/feature của riêng bạn.',
        },
      ],
    },
    {
      id: 'rebase-autosquash',
      title: 'Auto-Squash với fixup! Commit',
      subtitle: 'Để Git tự động sắp xếp squash target',
      icon: '🤖',
      iconColor: 'bg-amber-100',
      blocks: [
        {
          type: 'text',
          html: 'Thay vì sắp xếp thủ công trong interactive rebase, prefix commit message với <code>fixup!</code> hoặc <code>squash!</code>:',
        },
        {
          type: 'code',
          lang: 'bash',
          code: `# Commit gốc
git commit -m "feat: add user profile page"

# Sau đó, fix gì đó liên quan đến commit đó
git commit -m "fixup! feat: add user profile page"

# Khi sẵn sàng dọn dẹp, Git tự sắp xếp
git rebase -i --autosquash HEAD~5

# Fixup commit tự động được đặt ngay sau
# target của nó và đánh dấu 'fixup'`,
        },
        {
          type: 'callout',
          variant: 'tip',
          title: 'Bật autosquash toàn cục',
          html: 'Chạy <code>git config --global rebase.autoSquash true</code> để không bao giờ quên flag <code>--autosquash</code>.',
        },
      ],
    },
  ],
};
