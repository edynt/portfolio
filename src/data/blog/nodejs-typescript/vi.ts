import type { Tutorial } from '@/types/tutorial';

const tutorial: Tutorial = {
  id: 'nodejs-typescript',
  title: 'Node.js + TypeScript',
  description: 'Khởi tạo project Node.js với TypeScript, ESLint, Prettier và build cho production',
  icon: 'TS',
  chapters: [
    {
      id: 'chapter1',
      title: 'Khởi tạo Project',
      sections: [
        {
          id: 'init-project',
          title: 'Khởi tạo project',
          subtitle: 'npm init, cài TypeScript, cấu hình tsconfig đầu tiên',
          icon: '🚀',
          iconColor: 'bg-green-100',
          blocks: [
            {
              type: 'text',
              html: 'TypeScript thêm kiểu tĩnh vào JavaScript. Bạn viết file <code>.ts</code>, chạy TypeScript compiler (<code>tsc</code>) để sinh ra file <code>.js</code>, và deploy file JavaScript đó.',
            },
            {
              type: 'code',
              lang: 'bash',
              code: `# Tạo thư mục project và khởi tạo npm
mkdir my-api && cd my-api
npm init -y

# Cài TypeScript và type definitions cho Node
npm install --save-dev typescript @types/node

# Khởi tạo tsconfig.json
npx tsc --init`,
            },
            {
              type: 'callout',
              variant: 'ok',
              title: 'Kiểm tra',
              html: 'Chạy <code>node -v</code> và <code>npm -v</code> để xác nhận phiên bản đã cài đặt, sau đó chạy <code>npx tsc --version</code> để xác nhận TypeScript đã sẵn sàng.',
            },
          ],
        },
        {
          id: 'tsconfig',
          title: 'Cấu hình tsconfig.json',
          subtitle: 'Cài đặt được khuyến nghị cho Node.js backend',
          icon: '⚙️',
          iconColor: 'bg-blue-100',
          blocks: [
            {
              type: 'code',
              lang: 'json',
              filename: 'tsconfig.json',
              code: `{
  "compilerOptions": {
    // Target Node.js hiện đại
    "target": "ES2022",
    "module": "commonjs",
    "lib": ["ES2022"],

    // Thư mục output
    "outDir": "./dist",
    "rootDir": "./src",

    // Bật kiểm tra kiểu chặt chẽ
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,

    // Module resolution
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "moduleResolution": "node",

    // Source maps để debug
    "sourceMap": true,
    "declaration": true,

    // Bỏ qua type check của library files (build nhanh hơn)
    "skipLibCheck": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}`,
            },
            {
              type: 'table',
              caption: 'Giải thích các option tsconfig quan trọng',
              headers: ['Option', 'Ý nghĩa', 'Khuyến nghị'],
              rows: [
                ['strict', 'Bật toàn bộ kiểm tra kiểu chặt chẽ', 'true (luôn luôn)'],
                ['noUncheckedIndexedAccess', 'Truy cập mảng trả về T | undefined', 'true'],
                ['outDir', 'Nơi chứa file JS đã compile', './dist'],
                ['rootDir', 'Nơi chứa source TypeScript', './src'],
                ['sourceMap', 'Map lỗi JS ngược về dòng TS', 'true'],
                ['esModuleInterop', 'Sửa default imports từ CommonJS modules', 'true'],
              ],
            },
            {
              type: 'callout',
              variant: 'ok',
              title: 'Kiểm tra',
              html: 'Chạy <code>npx tsc --noEmit</code> từ thư mục gốc project — lệnh sẽ hoàn thành không có lỗi nào, xác nhận tsconfig hợp lệ.',
            },
          ],
        },
        {
          id: 'project-structure',
          title: 'Cấu trúc Project',
          subtitle: 'Layout sạch cho ứng dụng Node.js có thể mở rộng',
          icon: '📁',
          iconColor: 'bg-yellow-100',
          blocks: [
            {
              type: 'code',
              lang: 'text',
              code: `my-api/
├── src/
│   ├── index.ts          # Entry point
│   ├── routes/
│   │   └── users.ts
│   ├── services/
│   │   └── user-service.ts
│   ├── models/
│   │   └── user.ts
│   └── types/
│       └── index.ts      # Shared types
├── dist/                 # Output đã compile (gitignore)
├── tests/
│   └── user.test.ts
├── tsconfig.json
├── package.json
└── .gitignore`,
            },
            {
              type: 'code',
              lang: 'typescript',
              filename: 'src/index.ts',
              code: `import express from 'express';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(\`Server chạy trên port \${PORT}\`);
});`,
            },
          ],
        },
      ],
    },
    {
      id: 'chapter2',
      title: 'Linting & Formatting',
      sections: [
        {
          id: 'eslint-setup',
          title: 'Cài đặt ESLint',
          subtitle: 'Bắt bugs và chuẩn hóa code',
          icon: '🔍',
          iconColor: 'bg-red-100',
          blocks: [
            {
              type: 'code',
              lang: 'bash',
              code: `# Cài ESLint với hỗ trợ TypeScript
npm install --save-dev \\
  eslint \\
  @eslint/js \\
  typescript-eslint`,
            },
            {
              type: 'code',
              lang: 'javascript',
              filename: 'eslint.config.mjs',
              code: `import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': 'warn',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
  {
    // Bỏ qua output đã compile
    ignores: ['dist/**', 'node_modules/**'],
  }
);`,
            },
            {
              type: 'callout',
              variant: 'ok',
              title: 'Kiểm tra',
              html: 'Chạy <code>npx eslint . --ext .ts</code> — nếu ESLint được cấu hình đúng bạn sẽ thấy không có output (không có vấn đề) hoặc các cảnh báo/lỗi lint từ source files.',
            },
          ],
        },
        {
          id: 'prettier-setup',
          title: 'Cài đặt Prettier',
          subtitle: 'Tự động format code nhất quán',
          icon: '✨',
          iconColor: 'bg-purple-100',
          blocks: [
            {
              type: 'code',
              lang: 'bash',
              code: `# Cài Prettier và tích hợp ESLint
npm install --save-dev prettier eslint-config-prettier`,
            },
            {
              type: 'code',
              lang: 'json',
              filename: '.prettierrc',
              code: `{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100,
  "tabWidth": 2,
  "arrowParens": "always"
}`,
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'ESLint + Prettier cùng nhau',
              html: 'Thêm <code>prettier</code> vào cuối mảng extends trong config ESLint. Điều này tắt tất cả các rules ESLint có thể xung đột với format của Prettier.',
            },
            {
              type: 'callout',
              variant: 'ok',
              title: 'Kiểm tra',
              html: 'Chạy <code>npx prettier --check .</code> — lệnh sẽ liệt kê các file cần format. Nếu tất cả file đã được format đúng, bạn sẽ không thấy output nào.',
            },
          ],
        },
      ],
    },
    {
      id: 'chapter3',
      title: 'Build & Scripts',
      sections: [
        {
          id: 'package-scripts',
          title: 'Scripts trong package.json',
          subtitle: 'Scripts chuẩn mỗi project Node.js cần có',
          icon: '📜',
          iconColor: 'bg-orange-100',
          blocks: [
            {
              type: 'code',
              lang: 'json',
              filename: 'package.json',
              code: `{
  "name": "my-api",
  "version": "1.0.0",
  "main": "dist/index.js",
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc --project tsconfig.json",
    "start": "node dist/index.js",
    "lint": "eslint src --max-warnings 0",
    "lint:fix": "eslint src --fix",
    "format": "prettier --write src",
    "type-check": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest"
  }
}`,
            },
            {
              type: 'table',
              caption: 'Giải thích từng script',
              headers: ['Script', 'Khi nào dùng', 'Làm gì'],
              rows: [
                ['dev', 'Phát triển local', 'tsx watch: hot-reload TS không cần compile'],
                ['build', 'Trước khi deploy', 'tsc compile src/ → dist/'],
                ['start', 'Production', 'Chạy dist/index.js đã compile bằng Node'],
                ['lint', 'CI pipeline', 'Kiểm tra ESLint — fail nếu có warning nào'],
                ['type-check', 'CI pipeline', 'Kiểm tra kiểu không emit files (nhanh)'],
              ],
            },
            {
              type: 'callout',
              variant: 'ok',
              title: 'Kiểm tra',
              html: 'Chạy <code>npm run build</code> và xác nhận thư mục <code>dist/</code> được tạo ra chứa các file <code>index.js</code> và <code>index.d.ts</code>.',
            },
          ],
        },
        {
          id: 'tsx-dev',
          title: 'Phát triển với tsx',
          subtitle: 'Chạy TypeScript trực tiếp không cần compile',
          icon: '⚡',
          iconColor: 'bg-teal-100',
          blocks: [
            {
              type: 'text',
              html: '<strong>tsx</strong> (TypeScript Execute) chạy file TypeScript trực tiếp dùng esbuild. Nhanh hơn nhiều so với <code>ts-node</code>, hỗ trợ ESM và watch mode.',
            },
            {
              type: 'code',
              lang: 'bash',
              code: `# Cài tsx
npm install --save-dev tsx

# Chạy một lần
npx tsx src/index.ts

# Watch mode (hot reload khi file thay đổi)
npx tsx watch src/index.ts`,
            },
            {
              type: 'callout',
              variant: 'info',
              title: 'tsx vs ts-node',
              html: '<strong>tsx</strong>: nhanh (esbuild), không cần tsconfig, watch mode sẵn có. <strong>ts-node</strong>: chậm hơn (TS compiler chính thức), tuân thủ tsconfig nghiêm ngặt. Dùng tsx cho tốc độ dev, ts-node cho scripts cần chính xác kiểu.',
            },
          ],
        },
        {
          id: 'gitignore',
          title: '.gitignore',
          subtitle: 'Giữ dist và node_modules ngoài git',
          icon: '🚫',
          iconColor: 'bg-red-100',
          blocks: [
            {
              type: 'code',
              lang: 'text',
              filename: '.gitignore',
              code: `# Dependencies
node_modules/

# Output đã compile
dist/
build/

# File environment
.env
.env.local
.env.*.local

# Logs
*.log
npm-debug.log*

# OS files
.DS_Store
Thumbs.db

# IDE
.vscode/settings.json
.idea/`,
            },
            {
              type: 'callout',
              variant: 'ok',
              title: 'Checklist',
              html: '<strong>dist/</strong> là output compile — không bao giờ commit, để CI build. <strong>.env</strong> có secrets — không bao giờ commit. <strong>node_modules/</strong> rất lớn — luôn gitignore.',
            },
          ],
        },
        {
          id: 'troubleshooting',
          title: 'Troubleshooting',
          subtitle: 'Các vấn đề thường gặp và cách xử lý',
          icon: '🛠️',
          iconColor: 'bg-gray-100',
          blocks: [
            {
              type: 'text',
              html: '<strong>Lỗi Cannot find module</strong> — TypeScript không thể resolve import của bạn lúc compile.',
            },
            {
              type: 'callout',
              variant: 'danger',
              title: 'Nguyên nhân',
              html: 'Paths trong tsconfig không khớp với cấu trúc thư mục, hoặc thiếu <code>baseUrl</code> trong <code>compilerOptions</code>.',
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Fix',
              html: 'Kiểm tra <code>compilerOptions.baseUrl</code> và <code>paths</code> trong <code>tsconfig.json</code>. Đảm bảo <code>moduleResolution</code> được đặt là <code>"node"</code> hoặc <code>"bundler"</code>.',
            },
            {
              type: 'text',
              html: '<strong>ESLint xung đột với Prettier</strong> — ESLint báo lỗi format mâu thuẫn với output của Prettier.',
            },
            {
              type: 'callout',
              variant: 'danger',
              title: 'Nguyên nhân',
              html: 'Các rules formatting của ESLint đang ghi đè output của Prettier, gây xung đột giữa hai công cụ.',
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Fix',
              html: 'Cài <code>eslint-config-prettier</code> và thêm <code>"prettier"</code> vào cuối mảng extends trong config ESLint. Phải đặt cuối cùng để override tất cả config khác.',
            },
            {
              type: 'text',
              html: '<strong>Lỗi compile TypeScript sau npm install</strong> — tsc báo lỗi về thiếu type definitions cho built-ins của Node.js hoặc packages bên thứ ba.',
            },
            {
              type: 'callout',
              variant: 'danger',
              title: 'Nguyên nhân',
              html: 'Các package <code>@types</code> cho Node.js hoặc dependencies của bạn chưa được cài đặt.',
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Fix',
              html: 'Chạy <code>npm install --save-dev @types/node</code> và cài thêm các package <code>@types/*</code> còn thiếu cho dependencies.',
            },
            {
              type: 'text',
              html: '<strong>Build thành công nhưng runtime lỗi: import not found</strong> — code đã compile chạy nhưng báo lỗi module resolution lúc runtime.',
            },
            {
              type: 'callout',
              variant: 'danger',
              title: 'Nguyên nhân',
              html: 'Không khớp giữa ESM và CommonJS — field <code>"type"</code> trong <code>package.json</code> và setting <code>module</code> trong tsconfig không đồng bộ.',
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Fix',
              html: 'Kiểm tra <code>"type": "module"</code> trong <code>package.json</code>. Nếu có, đặt <code>"module": "ESNext"</code> (hoặc <code>"NodeNext"</code>) trong tsconfig. Với CommonJS, xóa <code>"type": "module"</code> và dùng <code>"module": "commonjs"</code>.',
            },
            {
              type: 'text',
              html: '<strong>Watch mode không nhận thay đổi</strong> — <code>tsx watch</code> hoặc <code>tsc --watch</code> không phát hiện các chỉnh sửa file.',
            },
            {
              type: 'callout',
              variant: 'danger',
              title: 'Nguyên nhân',
              html: 'Quá nhiều file đang được watch, hoặc giới hạn inotify của hệ thống đã đạt ngưỡng (Linux/WSL).',
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Fix',
              html: 'Đảm bảo <code>node_modules</code> và <code>dist</code> có trong <code>exclude</code> của <code>tsconfig.json</code>. Trên Linux/WSL, tăng giới hạn bằng: <code>echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p</code>',
            },
          ],
        },
      ],
    },
  ],
};

export default tutorial;
