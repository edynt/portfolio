import type { Tutorial } from '@/types/tutorial';

const tutorial: Tutorial = {
  id: 'lambda',
  title: 'Lambda Functions',
  description: 'JavaScript arrow functions, higher-order functions, closures, and AWS Lambda with TypeScript',
  icon: 'λ',
  chapters: [
    {
      id: 'part1',
      title: 'Part 1 — Lambda Functions Basics',
      sections: [
        {
          id: 's1',
          title: 'What is Lambda?',
          subtitle: 'Section 01 · Definition and comparison with regular functions',
          icon: '📖',
          iconColor: 'bg-blue-100',
          blocks: [
            {
              type: 'text',
              html: '<strong>Lambda</strong> (or <strong>anonymous function</strong>) is a small function <strong>defined inline</strong> without a name. It originates from <strong>Lambda Calculus</strong> — the mathematical foundation of functional programming.',
            },
            {
              type: 'compare',
              left: {
                title: 'Regular Function (Named)',
                blocks: [
                  {
                    type: 'code',
                    lang: 'javascript',
                    code: 'function add(x, y) {\n    return x + y;\n}\nconst result = add(3, 5); // 8',
                  },
                ],
              },
              right: {
                title: 'Lambda / Arrow Function',
                blocks: [
                  {
                    type: 'code',
                    lang: 'javascript',
                    code: 'const add = (x, y) => x + y;\n\nconst result = add(3, 5); // 8\n// Inline IIFE:\nconst r = ((x, y) => x + y)(3, 5);',
                  },
                ],
              },
            },
            {
              type: 'table',
              caption: 'When to use Lambda?',
              headers: ['Criteria', 'Lambda ✅', 'Regular Function ✅'],
              rows: [
                ['Single-use logic', 'Ideal', 'Overkill'],
                ['Complex, multi-step logic', 'Avoid', 'Ideal'],
                ['Pass as an argument', 'Perfect', 'Works'],
                ['Reuse in many places', 'Avoid', 'Ideal'],
                ['Inside map/filter/sort', 'Perfect', 'Works'],
              ],
            },
          ],
        },
        {
          id: 's2',
          title: 'Lambda Features',
          subtitle: 'Section 02 · 5 core characteristics',
          icon: '⚡',
          iconColor: 'bg-green-100',
          blocks: [
            {
              type: 'feature-grid',
              items: [
                {
                  icon: '👤',
                  title: 'Anonymous',
                  description: 'No name required. Define and use directly, avoiding namespace pollution.',
                },
                {
                  icon: '🎯',
                  title: 'First-class Function',
                  description: 'Functions are values — assign to variables, pass as arguments, return from other functions.',
                },
                {
                  icon: '🔒',
                  title: 'Closure',
                  description: 'Lambda "remembers" and accesses variables from outer scope even after that scope has ended.',
                },
                {
                  icon: '✂️',
                  title: 'Concise Syntax',
                  description: 'JavaScript arrow functions significantly reduce boilerplate compared to regular functions.',
                },
                {
                  icon: '🔗',
                  title: 'Higher-order Functions',
                  description: 'The foundation for writing functions that accept or return other functions.',
                },
              ],
            },
            {
              type: 'text',
              html: '<strong>Closure — illustrative example</strong>',
            },
            {
              type: 'code',
              lang: 'javascript',
              code: 'function makeCounter(start) {\n    let count = start;\n    return () => {     // arrow function captures `count`\n        count++;\n        return count;\n    };\n}\nconst counter = makeCounter(0);\nconsole.log(counter()); // 1\nconsole.log(counter()); // 2\nconsole.log(counter()); // 3',
            },
            {
              type: 'code',
              lang: 'javascript',
              code: 'const makeMultiplier = n => x => x * n;  // captures `n`\n\nconst double = makeMultiplier(2);\nconst triple = makeMultiplier(3);\nconsole.log(double(5)); // 10\nconsole.log(triple(5)); // 15',
            },
          ],
        },
        {
          id: 's4',
          title: 'Practical Applications',
          subtitle: 'Section 03 · Using lambda every day',
          icon: '🛠️',
          iconColor: 'bg-orange-100',
          blocks: [
            {
              type: 'text',
              html: '<strong>🔢 Sorting</strong> — Using lambda as a key function',
            },
            {
              type: 'code',
              lang: 'javascript',
              code: 'const people = [\n    { name: "Alice", age: 30 },\n    { name: "Bob",   age: 25 },\n    { name: "Carol", age: 28 },\n];\n\nconst byAge    = [...people].sort((a, b) => a.age - b.age);\nconst byAgeRev = [...people].sort((a, b) => b.age - a.age);\nconst byName   = [...people].sort((a, b) => a.name.localeCompare(b.name));',
            },
            {
              type: 'text',
              html: '<strong>🔄 filter / map / reduce</strong> — The holy trinity of functional programming',
            },
            {
              type: 'code',
              lang: 'javascript',
              code: 'const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];\n\nconst evens   = nums.filter(x => x % 2 === 0);    // [2,4,6,8,10]\nconst squares = nums.map(x => x ** 2);             // [1,4,9,16,...]\nconst total   = nums.reduce((acc, x) => acc + x, 0); // 55\n\n// Method chaining: sum of squares of even numbers\nconst result = nums\n    .filter(x => x % 2 === 0)    // [2,4,6,8,10]\n    .map(x => x ** 2)             // [4,16,36,64,100]\n    .reduce((acc, x) => acc + x, 0); // 220',
            },
            {
              type: 'text',
              html: '<strong>📞 Callbacks & Async</strong> — Event-driven and asynchronous',
            },
            {
              type: 'code',
              lang: 'javascript',
              code: 'setTimeout(() => console.log("After 1 second!"), 1000);\n\ndocument.querySelector("#btn")\n    .addEventListener("click", e => console.log(e.target));\n\nfetch("/api/users")\n    .then(res => res.json())\n    .then(data => data.filter(u => u.active))\n    .catch(err => console.error(err));\n\n// async/await\nconst getUser = async (id) => {\n    const res = await fetch(`/api/users/${id}`);\n    return res.json();\n};',
            },
          ],
        },
        {
          id: 's5',
          title: 'Interactive Demo',
          subtitle: 'Section 04 · Runnable examples',
          icon: '▶️',
          iconColor: 'bg-purple-100',
          blocks: [
            {
              type: 'callout',
              variant: 'info',
              title: 'Real-world Examples',
              html: 'Below are the most common Lambda patterns in modern JavaScript.',
            },
            {
              type: 'text',
              html: '<strong>Currying</strong> — Transform a multi-argument function into a chain of single-argument functions',
            },
            {
              type: 'code',
              lang: 'javascript',
              code: '// Regular function\nconst add = (a, b, c) => a + b + c;\n\n// Curried version\nconst curriedAdd = a => b => c => a + b + c;\n\nconsole.log(curriedAdd(1)(2)(3)); // 6\n\n// Partial application\nconst add5 = curriedAdd(5);\nconst add5and2 = add5(2);\nconsole.log(add5and2(3)); // 10',
            },
            {
              type: 'text',
              html: '<strong>Composition</strong> — Combine functions together',
            },
            {
              type: 'code',
              lang: 'javascript',
              code: 'const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);\n\nconst double = x => x * 2;\nconst addOne = x => x + 1;\nconst square = x => x ** 2;\n\nconst transform = compose(square, addOne, double);\n// transform(3) = square(addOne(double(3))) = square(addOne(6)) = square(7) = 49\nconsole.log(transform(3)); // 49',
            },
            {
              type: 'text',
              html: '<strong>Memoization</strong> — Cache results for faster execution',
            },
            {
              type: 'code',
              lang: 'javascript',
              code: 'const memoize = fn => {\n    const cache = new Map();\n    return (...args) => {\n        const key = JSON.stringify(args);\n        if (cache.has(key)) return cache.get(key);\n        const result = fn(...args);\n        cache.set(key, result);\n        return result;\n    };\n};\n\nconst expensiveCalc = memoize(n => {\n    console.log(`Computing ${n}...`);\n    return n * n;\n});\n\nconsole.log(expensiveCalc(5)); // Computing 5... → 25\nconsole.log(expensiveCalc(5)); // (cached) → 25',
            },
            {
              type: 'text',
              html: '<strong>Debounce & Throttle</strong> — Control function call frequency',
            },
            {
              type: 'code',
              lang: 'javascript',
              code: 'const debounce = (fn, delay) => {\n    let timer;\n    return (...args) => {\n        clearTimeout(timer);\n        timer = setTimeout(() => fn(...args), delay);\n    };\n};\n\n// Only search after user stops typing for 300ms\nconst search = debounce(query => fetchResults(query), 300);\ninput.addEventListener("input", e => search(e.target.value));',
            },
          ],
        },
      ],
    },
    {
      id: 'part2',
      title: 'Part 2 — AWS Lambda × TypeScript',
      sections: [
        {
          id: 'aws-overview',
          title: 'Architecture & How It Works',
          subtitle: 'Understand the flow before writing code',
          icon: '🏗️',
          iconColor: 'bg-blue-100',
          blocks: [
            {
              type: 'callout',
              variant: 'info',
              title: 'What is AWS Lambda?',
              html: 'Lambda is a "serverless" service — you only upload code, AWS handles all servers, scaling, and maintenance. You only pay when your code actually runs (billed per millisecond). <strong>Free tier: 1 million requests/month free forever.</strong>',
            },
            {
              type: 'text',
              html: '<strong>Request → Response Flow</strong><br/>User/App → <strong>API Gateway</strong> (HTTP endpoint) → <strong>λ Lambda</strong> (TypeScript code) → Response',
            },
            {
              type: 'text',
              html: '<strong>CI/CD Pipeline: Code → Auto Deploy</strong><br/>Local Code (TypeScript) → GitHub (git push main) → Actions (build + deploy) → AWS Lambda (live!)',
            },
            {
              type: 'text',
              html: '<strong>The API we will build:</strong>',
            },
            {
              type: 'table',
              caption: 'Endpoints',
              headers: ['Method', 'Path', 'Description'],
              rows: [
                ['GET', '/hello', 'Returns a basic greeting'],
                ['GET', '/hello/{name}', 'Greets by name passed in the URL'],
              ],
            },
          ],
        },
        {
          id: 'aws-s0',
          title: 'Environment Setup',
          subtitle: 'Node.js · AWS CLI · Serverless Framework',
          icon: '0️⃣',
          iconColor: 'bg-gray-100',
          blocks: [
            {
              type: 'text',
              html: 'Check Node.js (v18+ required):',
            },
            {
              type: 'code',
              lang: 'bash',
              code: 'node --version\n# Should see: v18.x.x or v20.x.x or later',
            },
            {
              type: 'callout',
              variant: 'warn',
              title: "Don't have Node.js?",
              html: 'Download at <strong>nodejs.org</strong> → choose "LTS" → install like a regular app. Reopen your terminal after installing.',
            },
            {
              type: 'text',
              html: 'Install AWS CLI v2:',
            },
            {
              type: 'code',
              lang: 'bash',
              filename: 'macOS',
              code: 'brew install awscli\naws --version   # aws-cli/2.x.x ...',
            },
            {
              type: 'code',
              lang: 'bash',
              filename: 'Windows (PowerShell Admin)',
              code: '# Download AWSCLIV2.msi and install, then verify:\naws --version',
            },
            {
              type: 'code',
              lang: 'bash',
              filename: 'Linux (Ubuntu)',
              code: 'curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o awscliv2.zip\nunzip awscliv2.zip && sudo ./aws/install\naws --version',
            },
            {
              type: 'text',
              html: 'Install Serverless Framework:',
            },
            {
              type: 'code',
              lang: 'bash',
              code: 'npm install -g serverless\nserverless --version   # Installed Serverless Framework v4.x.x',
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'What is Serverless Framework?',
              html: 'A tool to deploy Lambda with a single <code>serverless deploy</code> command. Instead of manual configuration in the AWS Console, just write <code>serverless.yml</code>. Version v4 has built-in TypeScript support.',
            },
          ],
        },
        {
          id: 'aws-s1',
          title: 'Create AWS Account',
          subtitle: 'Register for free — free tier is sufficient',
          icon: '1️⃣',
          iconColor: 'bg-gray-100',
          blocks: [
            {
              type: 'callout',
              variant: 'ok',
              title: 'AWS Free Tier — completely free for this tutorial',
              html: '<ul><li>Lambda: 1 million requests/month free <strong>forever</strong></li><li>API Gateway: 1 million calls/month free for the first 12 months</li><li>CloudWatch Logs: 5GB free</li></ul>',
            },
            {
              type: 'step-list',
              items: [
                'Go to aws.amazon.com → click "Create an AWS Account"',
                'Enter email, set account name → Continue',
                'Choose account type: Personal',
                'Enter personal and address information',
                'Enter credit card (AWS charges $1 to verify, then refunds it)',
                'Verify phone number (SMS)',
                'Choose Support Plan: Basic Support (Free)',
                'Sign in to AWS Management Console',
              ],
            },
            {
              type: 'callout',
              variant: 'danger',
              title: 'Enable MFA for Root Account immediately!',
              html: 'Go to <strong>Security credentials → Multi-factor authentication → enable now.</strong> Use Google Authenticator or Authy.',
            },
          ],
        },
        {
          id: 'aws-s2',
          title: 'Create IAM User',
          subtitle: 'Never use the root account to deploy',
          icon: '2️⃣',
          iconColor: 'bg-gray-100',
          blocks: [
            {
              type: 'callout',
              variant: 'info',
              title: 'What is IAM?',
              html: 'IAM (Identity and Access Management) allows creating "users" with specific permissions. We create an IAM User with just enough permissions to deploy Lambda, instead of using the root account.',
            },
            {
              type: 'step-list',
              items: [
                'AWS Console → search "IAM" → go to IAM Dashboard',
                'Sidebar → "Users" → "Create user"',
                'Username: <code>serverless-deployer</code> → Next',
                'Select "Attach policies directly"',
                'Check the required permissions below → Next → Create user',
              ],
            },
            {
              type: 'table',
              caption: 'Required Permissions',
              headers: ['Policy', 'Purpose'],
              rows: [
                ['AWSLambda_FullAccess', 'Create and update Lambda functions'],
                ['AmazonAPIGatewayAdministrator', 'Create API Gateway endpoints'],
                ['AmazonS3FullAccess', 'Upload deployment package to S3'],
                ['CloudWatchLogsFullAccess', 'View Lambda logs'],
                ['IAMFullAccess', 'Serverless creates IAM roles for Lambda'],
                ['AWSCloudFormationFullAccess', 'Serverless uses CloudFormation'],
                ['AmazonSSMFullAccess', 'Serverless v4 stores S3 bucket name in SSM'],
              ],
            },
            {
              type: 'text',
              html: 'Get Access Keys:',
            },
            {
              type: 'step-list',
              items: [
                'Click on user <code>serverless-deployer</code>',
                'Tab "Security credentials" → "Create access key"',
                'Select "Command Line Interface (CLI)" → check confirmation → Next',
                'Copy both <strong>Access key ID</strong> and <strong>Secret access key</strong> immediately',
              ],
            },
            {
              type: 'callout',
              variant: 'danger',
              title: 'Secret Access Key is shown ONCE only!',
              html: "After closing the page you cannot view it again. If lost: delete the old key and create a new one.",
            },
            {
              type: 'callout',
              variant: 'warn',
              title: 'Never commit credentials to GitHub!',
              html: 'Bots scan GitHub 24/7. If your key is exposed, it may be used to mine crypto → AWS bills of thousands of dollars.',
            },
          ],
        },
        {
          id: 'aws-s3',
          title: 'Configure AWS CLI',
          subtitle: 'Connect your computer to your AWS account',
          icon: '3️⃣',
          iconColor: 'bg-gray-100',
          blocks: [
            {
              type: 'code',
              lang: 'bash',
              code: 'aws configure',
            },
            {
              type: 'code',
              lang: 'bash',
              code: 'AWS Access Key ID [None]: AKIA...........     ← paste Access key ID\nAWS Secret Access Key [None]: abc123...       ← paste Secret access key\nDefault region name [None]: ap-southeast-1   ← Singapore (closest to SEA)\nDefault output format [None]: json',
            },
            {
              type: 'text',
              html: 'Verify the connection:',
            },
            {
              type: 'code',
              lang: 'bash',
              code: 'aws sts get-caller-identity',
            },
            {
              type: 'code',
              lang: 'bash',
              code: '{\n    "UserId": "AIDA...",\n    "Account": "123456789012",\n    "Arn": "arn:aws:iam::123456789012:user/serverless-deployer"\n}',
            },
            {
              type: 'callout',
              variant: 'warn',
              title: 'Error "Unable to locate credentials"?',
              html: 'Run <code>aws configure</code> again, check there are no leading/trailing spaces in the keys.',
            },
          ],
        },
        {
          id: 'aws-s4',
          title: 'Create TypeScript Project',
          subtitle: 'Setup Serverless Framework + TypeScript + esbuild',
          icon: '4️⃣',
          iconColor: 'bg-gray-100',
          blocks: [
            {
              type: 'code',
              lang: 'bash',
              code: 'mkdir my-lambda-api && cd my-lambda-api\nnpm init -y\nnpm install --save-dev typescript @types/aws-lambda @types/node serverless',
            },
            {
              type: 'code',
              lang: 'json',
              filename: 'tsconfig.json',
              code: '{\n  "compilerOptions": {\n    "target": "ES2020",\n    "module": "commonjs",\n    "outDir": "./dist",\n    "rootDir": "./src",\n    "strict": true,\n    "esModuleInterop": true,\n    "skipLibCheck": true\n  },\n  "include": ["src/**/*"],\n  "exclude": ["node_modules", "dist", ".serverless"]\n}',
            },
            {
              type: 'code',
              lang: 'yaml',
              filename: 'serverless.yml',
              code: 'service: my-lambda-api\nframeworkVersion: \'4\'\n\nprovider:\n  name: aws\n  runtime: nodejs20.x\n  region: ap-southeast-1   # Singapore — closest to Southeast Asia\n\nbuild:\n  esbuild:\n    bundle: true\n    minify: false\n\nfunctions:\n  hello:\n    handler: src/handler.hello\n    events:\n      - http: { path: /hello, method: get, cors: true }\n\n  greet:\n    handler: src/handler.greet\n    events:\n      - http:\n          path: /hello/{name}\n          method: get\n          cors: true',
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Add scripts to package.json',
              html: '<code>"deploy": "serverless deploy",</code><br/><code>"typecheck": "tsc --noEmit",</code><br/><code>"invoke": "serverless invoke local --function hello"</code>',
            },
          ],
        },
        {
          id: 'aws-s5',
          title: 'Write Lambda Handler',
          subtitle: 'Simple TypeScript — 1 file, 2 functions',
          icon: '5️⃣',
          iconColor: 'bg-gray-100',
          blocks: [
            {
              type: 'callout',
              variant: 'info',
              title: 'What is a Lambda Handler?',
              html: 'A handler is a TypeScript function that AWS calls when a request arrives. AWS passes in an <code>event</code> containing request information, and you return <code>{ statusCode, body }</code>.',
            },
            {
              type: 'code',
              lang: 'bash',
              code: 'mkdir src && touch src/handler.ts',
            },
            {
              type: 'code',
              lang: 'typescript',
              filename: 'src/handler.ts',
              code: "import { APIGatewayProxyHandler } from 'aws-lambda';\n\n// GET /hello → return a greeting\nexport const hello: APIGatewayProxyHandler = async () => {\n  return {\n    statusCode: 200,\n    headers: { 'Content-Type': 'application/json' },\n    body: JSON.stringify({ message: 'Hello from AWS Lambda! 🎉' }),\n  };\n};\n\n// GET /hello/{name} → greet by name\nexport const greet: APIGatewayProxyHandler = async (event) => {\n  const name = event.pathParameters?.name ?? 'there';\n  return {\n    statusCode: 200,\n    headers: { 'Content-Type': 'application/json' },\n    body: JSON.stringify({ message: `Hello, ${name}!` }),\n  };\n};",
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Quick explanation',
              html: '<ul><li><code>APIGatewayProxyHandler</code> — type from @types/aws-lambda, tells TypeScript the shape of event</li><li><code>statusCode: 200</code> — HTTP status OK</li><li><code>body</code> — must be a string (use JSON.stringify)</li><li><code>event.pathParameters?.name</code> — get {name} from the URL path</li></ul>',
            },
            {
              type: 'text',
              html: 'Test locally before deploying:',
            },
            {
              type: 'code',
              lang: 'bash',
              code: "serverless invoke local --function hello\nserverless invoke local --function greet \\\n  --data '{\"pathParameters\":{\"name\":\"Alice\"}}'",
            },
          ],
        },
        {
          id: 'aws-s6',
          title: 'Deploy to AWS',
          subtitle: 'One command — API live on the internet',
          icon: '6️⃣',
          iconColor: 'bg-gray-100',
          blocks: [
            {
              type: 'code',
              lang: 'bash',
              code: 'npm run deploy\n# Or: serverless deploy',
            },
            {
              type: 'callout',
              variant: 'info',
              title: 'First deploy takes 1–3 minutes',
              html: 'Serverless will: compile TS → create CloudFormation stack → upload to S3 → create Lambda + API Gateway. Subsequent deploys are faster.',
            },
            {
              type: 'code',
              lang: 'bash',
              code: '✔ Service deployed to stack my-lambda-api-dev (45s)\n\nendpoints:\n  GET - https://abc123xyz.execute-api.ap-southeast-1.amazonaws.com/dev/hello\n  GET - https://abc123xyz.execute-api.ap-southeast-1.amazonaws.com/dev/hello/{name}\n\nfunctions:\n  hello: my-lambda-api-dev-hello\n  greet: my-lambda-api-dev-greet',
            },
          ],
        },
        {
          id: 'aws-s7',
          title: 'Test the Deployed API',
          subtitle: 'Call the API from terminal and view logs',
          icon: '7️⃣',
          iconColor: 'bg-gray-100',
          blocks: [
            {
              type: 'code',
              lang: 'bash',
              code: 'BASE="https://abc123xyz.execute-api.ap-southeast-1.amazonaws.com/dev"\n\ncurl $BASE/hello\n# {"message":"Hello from AWS Lambda! 🎉"}\n\ncurl $BASE/hello/Alice\n# {"message":"Hello, Alice!"}',
            },
            {
              type: 'code',
              lang: 'bash',
              code: '# View logs in real-time\nserverless logs --function hello --tail',
            },
          ],
        },
        {
          id: 'aws-s8',
          title: 'GitHub Actions CI/CD',
          subtitle: 'Auto-deploy on every push to main branch',
          icon: '8️⃣',
          iconColor: 'bg-gray-100',
          blocks: [
            {
              type: 'code',
              lang: 'bash',
              code: 'git init\ngit add .\ngit commit -m "feat: initial AWS Lambda TypeScript API"\ngit remote add origin https://github.com/YOUR_USERNAME/my-lambda-api.git\ngit branch -M main\ngit push -u origin main',
            },
            {
              type: 'step-list',
              items: [
                'Go to your GitHub repo → Settings tab',
                'Sidebar: Secrets and variables → Actions',
                'Click "New repository secret"',
                'Add <code>AWS_ACCESS_KEY_ID</code> = Access Key ID of the IAM User',
                'Add <code>AWS_SECRET_ACCESS_KEY</code> = Secret Access Key',
              ],
            },
            {
              type: 'code',
              lang: 'bash',
              code: 'mkdir -p .github/workflows\ntouch .github/workflows/deploy.yml',
            },
            {
              type: 'code',
              lang: 'yaml',
              filename: '.github/workflows/deploy.yml',
              code: "name: Deploy to AWS Lambda\n\non:\n  push:\n    branches: [main]\n\njobs:\n  deploy:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n\n      - uses: actions/setup-node@v4\n        with:\n          node-version: '20'\n          cache: 'npm'\n\n      - run: npm ci\n\n      - name: Type check\n        run: npx tsc --noEmit\n\n      - name: Deploy to AWS\n        run: npx serverless deploy\n        env:\n          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}\n          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}\n          AWS_DEFAULT_REGION: ap-southeast-1",
            },
            {
              type: 'callout',
              variant: 'warn',
              title: 'Workflow failing?',
              html: '<ul><li><strong>Credentials</strong> error: verify GitHub Secrets names are correct</li><li><strong>Access Denied</strong> error: IAM User is missing permissions</li><li><strong>tsc not found</strong> error: add npm ci step before typecheck</li></ul>',
            },
          ],
        },
        {
          id: 'aws-deploy-methods',
          title: 'Deploy Methods & Lambda Triggers',
          subtitle: 'All deployment methods and ways to trigger Lambda',
          icon: '🔧',
          iconColor: 'bg-gray-100',
          blocks: [
            {
              type: 'feature-grid',
              items: [
                {
                  icon: '📦',
                  title: 'Serverless Framework',
                  description: 'Most popular tool. Deploy with one command. Handles CloudFormation, S3, IAM automatically. Used in this tutorial.',
                },
                {
                  icon: '🏗️',
                  title: 'AWS SAM',
                  description: "AWS's official tool. Uses template.yaml, supports local testing via Docker.",
                },
                {
                  icon: '🧱',
                  title: 'AWS CDK',
                  description: 'Write infrastructure as TypeScript/Python code. Powerful for large projects.',
                },
                {
                  icon: '🖥️',
                  title: 'AWS Console',
                  description: 'Upload .zip file directly in the browser. Only for quick experiments.',
                },
                {
                  icon: '⌨️',
                  title: 'AWS CLI',
                  description: 'Deploy manually with aws lambda commands. Flexible for automation scripts.',
                },
                {
                  icon: '🐙',
                  title: 'GitHub Actions / CI/CD',
                  description: 'Automatically build, test and deploy on every code push. Best practice for production.',
                },
              ],
            },
            {
              type: 'table',
              caption: 'Quick Comparison',
              headers: ['Method', 'Difficulty', 'Automation', 'Best For'],
              rows: [
                ['Serverless Framework', 'Easy', 'High', 'Any project'],
                ['AWS SAM', 'Medium', 'High', 'AWS-native projects'],
                ['AWS CDK', 'Medium', 'High', 'Large, complex projects'],
                ['AWS Console', 'Very easy', 'None', 'Quick tests, learning'],
                ['AWS CLI', 'Medium', 'Yes', 'Custom scripts'],
              ],
            },
            {
              type: 'text',
              html: '<strong>⚡ Trigger Types (Ways to Invoke Lambda)</strong>',
            },
            {
              type: 'table',
              caption: '7 Common Trigger Types',
              headers: ['Trigger', 'Icon', 'Description', 'Config in serverless.yml'],
              rows: [
                ['API Gateway', '🌐', 'HTTP request — REST API, webhook', '<code>events: - http: { path: /users, method: get }</code>'],
                ['EventBridge/Schedule', '⏰', 'Run on schedule — cron, periodic', '<code>events: - schedule: rate(1 hour)</code>'],
                ['S3 Events', '🪣', 'Trigger on S3 file upload/delete', '<code>events: - s3: { bucket: my-bucket, event: s3:ObjectCreated:* }</code>'],
                ['SQS', '📨', 'Process messages from a queue', '<code>events: - sqs: { arn: arn:aws:sqs:... }</code>'],
                ['DynamoDB Streams', '🗄️', 'React to database data changes', '<code>events: - stream: { type: dynamodb, arn: ... }</code>'],
                ['SNS', '📢', 'Fan-out: 1 event triggers multiple Lambdas', '<code>events: - sns: arn:aws:sns:...</code>'],
                ['Function URL', '🔗', 'Direct URL for Lambda, no API Gateway needed', '<code>url: { cors: true }</code>'],
              ],
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Which trigger should you choose?',
              html: '<ul><li><strong>REST API / Webhook:</strong> API Gateway or Function URL</li><li><strong>Scheduled runs (cron):</strong> EventBridge Schedule</li><li><strong>Process file uploads:</strong> S3 Events</li><li><strong>Background jobs:</strong> SQS</li><li><strong>React to DB changes:</strong> DynamoDB Streams</li><li><strong>Fan-out / microservices:</strong> SNS</li></ul>',
            },
          ],
        },
        {
          id: 'aws-alternatives',
          title: 'Beyond AWS',
          subtitle: 'Serverless Functions on Cloudflare, Google, Vercel, and more',
          icon: '🌐',
          iconColor: 'bg-blue-100',
          blocks: [
            {
              type: 'callout',
              variant: 'info',
              title: 'AWS is not the only option',
              html: 'Many platforms offer services similar to Lambda — some significantly cheaper, some faster (no cold start), some simpler for beginners.',
            },
            {
              type: 'table',
              caption: 'Price comparison — 1 million requests/month',
              headers: ['Platform', 'Free Tier', 'Cold Start', 'Notes'],
              rows: [
                ['<strong>AWS Lambda</strong>', '1M req/month forever', '100–500ms', 'Strongest ecosystem'],
                ['<strong>Cloudflare Workers</strong>', '100k req/day forever', '~0ms', 'Edge, extremely fast globally'],
                ['<strong>Google Cloud Functions</strong>', '2M req/month forever', '100–400ms', 'Better free tier than AWS'],
                ['<strong>Vercel Functions</strong>', '100k req (Hobby)', '50–200ms', 'Best for Next.js'],
                ['<strong>Deno Deploy</strong>', '1M req/month free', '~0ms', 'Edge, TypeScript native'],
              ],
            },
            {
              type: 'text',
              html: '<strong>🟠 Cloudflare Workers</strong> — Cheapest & fastest',
            },
            {
              type: 'callout',
              variant: 'ok',
              title: 'Why are Cloudflare Workers so popular?',
              html: '<ul><li><strong>0ms cold start</strong> — uses V8 Isolates instead of containers</li><li><strong>Edge network</strong> — code runs at ~270 locations closest to the user</li><li><strong>Generous free tier</strong> — 100,000 req/day = 3M req/month free</li><li><strong>Excellent pricing</strong> — $5/month for 10M requests</li></ul>',
            },
            {
              type: 'code',
              lang: 'typescript',
              filename: 'Cloudflare Worker',
              code: "export default {\n  async fetch(request: Request): Promise<Response> {\n    const url = new URL(request.url);\n\n    if (url.pathname === '/hello') {\n      return Response.json({ message: 'Hello from Cloudflare!' });\n    }\n\n    return new Response('Not Found', { status: 404 });\n  }\n};",
            },
            {
              type: 'code',
              lang: 'bash',
              code: 'npm create cloudflare@latest my-api -- --type hello-world\ncd my-api\nnpm run deploy   # Deploy to Cloudflare Workers',
            },
            {
              type: 'table',
              caption: 'Which platform should you choose?',
              headers: ['Use Case', 'Recommended', 'Reason'],
              rows: [
                ['Beginners, want to learn', '<strong>AWS Lambda</strong>', 'Most documentation, industry standard'],
                ['Simple API, want free tier', '<strong>Cloudflare Workers</strong>', '0ms cold start, 100k req/day free'],
                ['Highest free tier', '<strong>Google Cloud Functions</strong>', '2M req/month free forever'],
                ['Using Next.js / React', '<strong>Vercel Functions</strong>', 'Zero-config, perfect integration'],
                ['Large production, enterprise', '<strong>AWS Lambda</strong>', 'Full ecosystem, good SLA'],
              ],
            },
          ],
        },
        {
          id: 'aws-done',
          title: 'Done!',
          subtitle: 'Production-ready API running on AWS',
          icon: '✅',
          iconColor: 'bg-green-100',
          blocks: [
            {
              type: 'callout',
              variant: 'ok',
              title: '🎉 Your API is running on AWS!',
              html: 'Anyone in the world can call your API. Every time you push to GitHub, the API is automatically updated.',
            },
            {
              type: 'text',
              html: '<strong>What you have learned:</strong>',
            },
            {
              type: 'step-list',
              items: [
                '✅ Create AWS Account and IAM User securely',
                '✅ Configure AWS CLI',
                '✅ Write a type-safe TypeScript Lambda handler',
                '✅ Deploy with Serverless Framework',
                '✅ Automated CI/CD with GitHub Actions',
                '✅ View logs on CloudWatch',
                '✅ Understand 7 trigger types: API GW, Schedule, S3, SQS, DynamoDB, SNS, Function URL',
                '✅ Know alternative platforms: Cloudflare, GCP, Vercel',
              ],
            },
            {
              type: 'text',
              html: '<strong>Next steps:</strong>',
            },
            {
              type: 'feature-grid',
              items: [
                {
                  icon: '🔒',
                  title: 'Custom Domain',
                  description: 'Route 53 + ACM Certificate — HTTPS with your own domain',
                },
                {
                  icon: '💾',
                  title: 'Add DynamoDB',
                  description: 'Serverless NoSQL — data storage for your Lambda functions',
                },
                {
                  icon: '🔐',
                  title: 'Authentication',
                  description: 'JWT or AWS Cognito — protect your API endpoints',
                },
                {
                  icon: '📊',
                  title: 'Monitoring',
                  description: 'CloudWatch Dashboard + Alarms — track performance',
                },
              ],
            },
            {
              type: 'callout',
              variant: 'warn',
              title: 'Clean up to avoid charges',
              html: 'If no longer needed: <code>serverless remove</code> to delete all resources. Also delete the deployment S3 bucket in the Console.',
            },
          ],
        },
      ],
    },
  ],
};

export default tutorial;
