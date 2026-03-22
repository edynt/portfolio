import type { Tutorial } from '@/types/tutorial';

const tutorial: Tutorial = {
  id: 'nodejs-typescript',
  title: 'Node.js + TypeScript',
  description: 'Set up a Node.js project with TypeScript, ESLint, Prettier, and production builds',
  icon: 'TS',
  chapters: [
    {
      id: 'chapter1',
      title: 'Project Setup',
      sections: [
        {
          id: 'init-project',
          title: 'Initialize the Project',
          subtitle: 'npm init, install TypeScript, first tsconfig',
          icon: '🚀',
          iconColor: 'bg-green-100',
          blocks: [
            {
              type: 'text',
              html: 'TypeScript adds static typing to JavaScript. You write <code>.ts</code> files, run the TypeScript compiler (<code>tsc</code>) to emit <code>.js</code> files, and ship the JavaScript.',
            },
            {
              type: 'code',
              lang: 'bash',
              code: `# Create project directory and init npm
mkdir my-api && cd my-api
npm init -y

# Install TypeScript and Node type definitions
npm install --save-dev typescript @types/node

# Initialize tsconfig.json
npx tsc --init`,
            },
            {
              type: 'callout',
              variant: 'ok',
              title: 'Verify',
              html: 'Run <code>node -v</code> and <code>npm -v</code> to confirm versions are installed, then run <code>npx tsc --version</code> to confirm TypeScript is available.',
            },
          ],
        },
        {
          id: 'tsconfig',
          title: 'Configure tsconfig.json',
          subtitle: 'Recommended settings for a Node.js backend',
          icon: '⚙️',
          iconColor: 'bg-blue-100',
          blocks: [
            {
              type: 'code',
              lang: 'json',
              filename: 'tsconfig.json',
              code: `{
  "compilerOptions": {
    // Target modern Node.js
    "target": "ES2022",
    "module": "commonjs",
    "lib": ["ES2022"],

    // Output directory
    "outDir": "./dist",
    "rootDir": "./src",

    // Enable strict type checking
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,

    // Module resolution
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "moduleResolution": "node",

    // Source maps for debugging
    "sourceMap": true,
    "declaration": true,

    // Skip type checking of library files (faster builds)
    "skipLibCheck": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}`,
            },
            {
              type: 'table',
              caption: 'Key tsconfig options explained',
              headers: ['Option', 'What it does', 'Recommended'],
              rows: [
                ['strict', 'Enables all strict type checks', 'true (always)'],
                ['noUncheckedIndexedAccess', 'Array access returns T | undefined', 'true'],
                ['outDir', 'Where compiled JS files go', './dist'],
                ['rootDir', 'Where your TypeScript sources are', './src'],
                ['sourceMap', 'Maps JS errors back to TS lines', 'true'],
                ['esModuleInterop', 'Fixes default imports from CommonJS modules', 'true'],
              ],
            },
            {
              type: 'callout',
              variant: 'ok',
              title: 'Verify',
              html: 'Run <code>npx tsc --noEmit</code> from the project root — it should complete with no errors, confirming your tsconfig is valid.',
            },
          ],
        },
        {
          id: 'project-structure',
          title: 'Project Structure',
          subtitle: 'Clean layout for scalable Node.js apps',
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
├── dist/                 # Compiled output (git-ignored)
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
  console.log(\`Server running on port \${PORT}\`);
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
          title: 'ESLint Setup',
          subtitle: 'Catch bugs and enforce code standards',
          icon: '🔍',
          iconColor: 'bg-red-100',
          blocks: [
            {
              type: 'code',
              lang: 'bash',
              code: `# Install ESLint with TypeScript support
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
    // Ignore compiled output
    ignores: ['dist/**', 'node_modules/**'],
  }
);`,
            },
            {
              type: 'callout',
              variant: 'ok',
              title: 'Verify',
              html: 'Run <code>npx eslint . --ext .ts</code> — if ESLint is configured correctly you will see either no output (no issues) or lint warnings/errors from your source files.',
            },
          ],
        },
        {
          id: 'prettier-setup',
          title: 'Prettier Setup',
          subtitle: 'Auto-format code consistently',
          icon: '✨',
          iconColor: 'bg-purple-100',
          blocks: [
            {
              type: 'code',
              lang: 'bash',
              code: `# Install Prettier and ESLint integration
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
              title: 'ESLint + Prettier together',
              html: 'Add <code>prettier</code> to the end of your ESLint config\'s extends array. This turns off all ESLint rules that might conflict with Prettier\'s formatting.',
            },
            {
              type: 'callout',
              variant: 'ok',
              title: 'Verify',
              html: 'Run <code>npx prettier --check .</code> — it will list files that need formatting. If all files are already formatted, you will see no output.',
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
          title: 'package.json Scripts',
          subtitle: 'Standard scripts every Node.js project needs',
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
              caption: 'Script breakdown',
              headers: ['Script', 'When to use', 'What it does'],
              rows: [
                ['dev', 'Local development', 'tsx watch: hot-reload TS without compilation step'],
                ['build', 'Before deploy', 'tsc compiles src/ → dist/'],
                ['start', 'Production', 'Runs compiled dist/index.js with Node'],
                ['lint', 'CI pipeline', 'ESLint check — fails on any warning'],
                ['type-check', 'CI pipeline', 'Type check without emitting files (fast)'],
              ],
            },
            {
              type: 'callout',
              variant: 'ok',
              title: 'Verify',
              html: 'Run <code>npm run build</code> and confirm a <code>dist/</code> folder is created containing <code>index.js</code> and <code>index.d.ts</code> files.',
            },
          ],
        },
        {
          id: 'tsx-dev',
          title: 'Development with tsx',
          subtitle: 'Run TypeScript directly without compiling',
          icon: '⚡',
          iconColor: 'bg-teal-100',
          blocks: [
            {
              type: 'text',
              html: '<strong>tsx</strong> (TypeScript Execute) runs TypeScript files directly using esbuild under the hood. It\'s much faster than <code>ts-node</code> and supports ESM + watch mode.',
            },
            {
              type: 'code',
              lang: 'bash',
              code: `# Install tsx
npm install --save-dev tsx

# Run once
npx tsx src/index.ts

# Watch mode (hot reload on file changes)
npx tsx watch src/index.ts`,
            },
            {
              type: 'callout',
              variant: 'info',
              title: 'tsx vs ts-node',
              html: '<strong>tsx</strong>: fast (esbuild), no tsconfig required, watch mode built-in. <strong>ts-node</strong>: slower (official TS compiler), strict tsconfig compliance. For dev speed, use tsx; for type accuracy in scripts, use ts-node.',
            },
          ],
        },
        {
          id: 'gitignore',
          title: '.gitignore',
          subtitle: 'Keep dist and node_modules out of git',
          icon: '🚫',
          iconColor: 'bg-red-100',
          blocks: [
            {
              type: 'code',
              lang: 'text',
              filename: '.gitignore',
              code: `# Dependencies
node_modules/

# Compiled output
dist/
build/

# Environment files
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
              html: '<strong>dist/</strong> is compiled output — never commit it, let CI build it. <strong>.env</strong> has secrets — never commit. <strong>node_modules/</strong> is huge — always gitignore.',
            },
          ],
        },
        {
          id: 'troubleshooting',
          title: 'Troubleshooting',
          subtitle: 'Common issues and how to fix them',
          icon: '🛠️',
          iconColor: 'bg-gray-100',
          blocks: [
            {
              type: 'text',
              html: '<strong>Cannot find module errors</strong> — TypeScript cannot resolve your module imports at compile time.',
            },
            {
              type: 'callout',
              variant: 'danger',
              title: 'Cause',
              html: 'tsconfig paths are not matching your directory structure, or <code>baseUrl</code> is missing from <code>compilerOptions</code>.',
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Fix',
              html: 'Check <code>compilerOptions.baseUrl</code> and <code>paths</code> in <code>tsconfig.json</code>. Also ensure <code>moduleResolution</code> is set to <code>"node"</code> or <code>"bundler"</code>.',
            },
            {
              type: 'text',
              html: '<strong>ESLint conflicts with Prettier</strong> — ESLint reports formatting errors that contradict what Prettier produces.',
            },
            {
              type: 'callout',
              variant: 'danger',
              title: 'Cause',
              html: 'ESLint formatting rules are overriding Prettier\'s output, causing conflicts between the two tools.',
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Fix',
              html: 'Install <code>eslint-config-prettier</code> and add <code>"prettier"</code> to the end of the extends array in your ESLint config. It must be last to override all other configs.',
            },
            {
              type: 'text',
              html: '<strong>TypeScript compilation errors after npm install</strong> — tsc reports errors about missing type definitions for Node.js built-ins or third-party packages.',
            },
            {
              type: 'callout',
              variant: 'danger',
              title: 'Cause',
              html: 'The <code>@types</code> packages for Node.js or your dependencies are not installed.',
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Fix',
              html: 'Run <code>npm install --save-dev @types/node</code> and install any other missing <code>@types/*</code> packages for your dependencies.',
            },
            {
              type: 'text',
              html: '<strong>Build succeeds but runtime error: import not found</strong> — the compiled code runs but throws module resolution errors at runtime.',
            },
            {
              type: 'callout',
              variant: 'danger',
              title: 'Cause',
              html: 'ESM vs CommonJS mismatch — your <code>package.json</code> <code>"type"</code> field and tsconfig <code>module</code> setting are not aligned.',
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Fix',
              html: 'Check whether <code>"type": "module"</code> is set in <code>package.json</code>. If so, set <code>"module": "ESNext"</code> (or <code>"NodeNext"</code>) in tsconfig. For CommonJS, remove <code>"type": "module"</code> and use <code>"module": "commonjs"</code>.',
            },
            {
              type: 'text',
              html: '<strong>Watch mode not detecting changes</strong> — <code>tsx watch</code> or <code>tsc --watch</code> does not pick up file edits.',
            },
            {
              type: 'callout',
              variant: 'danger',
              title: 'Cause',
              html: 'Too many files are being watched, or the system\'s inotify limit has been reached (Linux/WSL).',
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Fix',
              html: 'Ensure <code>node_modules</code> and <code>dist</code> are listed in <code>exclude</code> in <code>tsconfig.json</code>. On Linux/WSL, increase the limit with: <code>echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p</code>',
            },
          ],
        },
      ],
    },
  ],
};

export default tutorial;
