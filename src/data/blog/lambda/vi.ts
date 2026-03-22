import type { Tutorial } from '@/types/tutorial';

const tutorial: Tutorial = {
  id: 'lambda',
  title: 'Lambda Functions',
  description: 'Arrow functions JavaScript, Higher-order functions, Closure, và AWS Lambda TypeScript',
  icon: 'λ',
  chapters: [
    {
      id: 'part1',
      title: 'Phần 1 — Lambda Functions Cơ bản',
      sections: [
        {
          id: 's1',
          title: 'Lambda là gì?',
          subtitle: 'Phần 01 · Định nghĩa và so sánh với hàm thường',
          icon: '📖',
          iconColor: 'bg-blue-100',
          blocks: [
            {
              type: 'text',
              html: '<strong>Lambda</strong> (hay <strong>anonymous function</strong> — hàm vô danh) là hàm nhỏ được <strong>định nghĩa ngay tại chỗ</strong> mà không cần đặt tên. Bắt nguồn từ <strong>Lambda Calculus</strong> — nền tảng toán học của lập trình hàm (functional programming).',
            },
            {
              type: 'compare',
              left: {
                title: 'Hàm thường (Named)',
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
              caption: 'Khi nào dùng Lambda?',
              headers: ['Tiêu chí', 'Lambda ✅', 'Hàm thường ✅'],
              rows: [
                ['Logic dùng 1 lần', 'Phù hợp', 'Thừa'],
                ['Logic phức tạp, nhiều bước', 'Không nên', 'Phù hợp'],
                ['Truyền làm argument', 'Lý tưởng', 'Được'],
                ['Cần tái sử dụng nhiều nơi', 'Không nên', 'Phù hợp'],
                ['Trong map/filter/sort', 'Rất phù hợp', 'Được'],
              ],
            },
          ],
        },
        {
          id: 's2',
          title: 'Tính năng của Lambda',
          subtitle: 'Phần 02 · 5 đặc điểm cốt lõi',
          icon: '⚡',
          iconColor: 'bg-green-100',
          blocks: [
            {
              type: 'feature-grid',
              items: [
                {
                  icon: '👤',
                  title: 'Anonymous',
                  description: 'Không cần đặt tên. Định nghĩa và dùng trực tiếp, tránh ô nhiễm namespace.',
                },
                {
                  icon: '🎯',
                  title: 'First-class Function',
                  description: 'Hàm là giá trị — gán vào biến, truyền làm argument, trả về từ hàm khác.',
                },
                {
                  icon: '🔒',
                  title: 'Closure',
                  description: 'Lambda "nhớ" và truy cập biến từ scope bên ngoài sau khi scope đó kết thúc.',
                },
                {
                  icon: '✂️',
                  title: 'Concise Syntax',
                  description: 'Arrow function JavaScript giảm boilerplate đáng kể so với function thông thường.',
                },
                {
                  icon: '🔗',
                  title: 'Higher-order Functions',
                  description: 'Nền tảng để viết hàm nhận hoặc trả về hàm khác.',
                },
              ],
            },
            {
              type: 'text',
              html: '<strong>Closure — ví dụ minh họa</strong>',
            },
            {
              type: 'code',
              lang: 'javascript',
              code: 'function makeCounter(start) {\n    let count = start;\n    return () => {     // arrow function capture biến `count`\n        count++;\n        return count;\n    };\n}\nconst counter = makeCounter(0);\nconsole.log(counter()); // 1\nconsole.log(counter()); // 2\nconsole.log(counter()); // 3',
            },
            {
              type: 'code',
              lang: 'javascript',
              code: 'const makeMultiplier = n => x => x * n;  // capture biến `n`\n\nconst double = makeMultiplier(2);\nconst triple = makeMultiplier(3);\nconsole.log(double(5)); // 10\nconsole.log(triple(5)); // 15',
            },
          ],
        },
        {
          id: 's4',
          title: 'Ứng dụng thực tế',
          subtitle: 'Phần 03 · Dùng lambda hàng ngày',
          icon: '🛠️',
          iconColor: 'bg-orange-100',
          blocks: [
            {
              type: 'text',
              html: '<strong>🔢 Sắp xếp (Sorting)</strong> — Dùng lambda làm key function',
            },
            {
              type: 'code',
              lang: 'javascript',
              code: 'const people = [\n    { name: "Alice", age: 30 },\n    { name: "Bob",   age: 25 },\n    { name: "Carol", age: 28 },\n];\n\nconst byAge    = [...people].sort((a, b) => a.age - b.age);\nconst byAgeRev = [...people].sort((a, b) => b.age - a.age);\nconst byName   = [...people].sort((a, b) => a.name.localeCompare(b.name));',
            },
            {
              type: 'text',
              html: '<strong>🔄 filter / map / reduce</strong> — Bộ ba vũ khí của functional programming',
            },
            {
              type: 'code',
              lang: 'javascript',
              code: 'const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];\n\nconst evens   = nums.filter(x => x % 2 === 0);    // [2,4,6,8,10]\nconst squares = nums.map(x => x ** 2);             // [1,4,9,16,...]\nconst total   = nums.reduce((acc, x) => acc + x, 0); // 55\n\n// Method chaining: tổng bình phương số chẵn\nconst result = nums\n    .filter(x => x % 2 === 0)    // [2,4,6,8,10]\n    .map(x => x ** 2)             // [4,16,36,64,100]\n    .reduce((acc, x) => acc + x, 0); // 220',
            },
            {
              type: 'text',
              html: '<strong>📞 Callbacks & Async</strong> — Event-driven và bất đồng bộ',
            },
            {
              type: 'code',
              lang: 'javascript',
              code: 'setTimeout(() => console.log("Sau 1 giây!"), 1000);\n\ndocument.querySelector("#btn")\n    .addEventListener("click", e => console.log(e.target));\n\nfetch("/api/users")\n    .then(res => res.json())\n    .then(data => data.filter(u => u.active))\n    .catch(err => console.error(err));\n\n// async/await\nconst getUser = async (id) => {\n    const res = await fetch(`/api/users/${id}`);\n    return res.json();\n};',
            },
          ],
        },
        {
          id: 's5',
          title: 'Demo tương tác',
          subtitle: 'Phần 04 · Các ví dụ chạy được',
          icon: '▶️',
          iconColor: 'bg-purple-100',
          blocks: [
            {
              type: 'callout',
              variant: 'info',
              title: 'Ví dụ thực tế',
              html: 'Dưới đây là các pattern Lambda phổ biến nhất trong JavaScript hiện đại.',
            },
            {
              type: 'text',
              html: '<strong>Currying</strong> — Biến hàm nhiều tham số thành chuỗi hàm 1 tham số',
            },
            {
              type: 'code',
              lang: 'javascript',
              code: '// Hàm thường\nconst add = (a, b, c) => a + b + c;\n\n// Curried version\nconst curriedAdd = a => b => c => a + b + c;\n\nconsole.log(curriedAdd(1)(2)(3)); // 6\n\n// Partial application\nconst add5 = curriedAdd(5);\nconst add5and2 = add5(2);\nconsole.log(add5and2(3)); // 10',
            },
            {
              type: 'text',
              html: '<strong>Composition</strong> — Kết hợp các hàm lại với nhau',
            },
            {
              type: 'code',
              lang: 'javascript',
              code: 'const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);\n\nconst double = x => x * 2;\nconst addOne = x => x + 1;\nconst square = x => x ** 2;\n\nconst transform = compose(square, addOne, double);\n// transform(3) = square(addOne(double(3))) = square(addOne(6)) = square(7) = 49\nconsole.log(transform(3)); // 49',
            },
            {
              type: 'text',
              html: '<strong>Memoization</strong> — Cache kết quả để tăng tốc',
            },
            {
              type: 'code',
              lang: 'javascript',
              code: 'const memoize = fn => {\n    const cache = new Map();\n    return (...args) => {\n        const key = JSON.stringify(args);\n        if (cache.has(key)) return cache.get(key);\n        const result = fn(...args);\n        cache.set(key, result);\n        return result;\n    };\n};\n\nconst expensiveCalc = memoize(n => {\n    console.log(`Computing ${n}...`);\n    return n * n;\n});\n\nconsole.log(expensiveCalc(5)); // Computing 5... → 25\nconsole.log(expensiveCalc(5)); // (cached) → 25',
            },
            {
              type: 'text',
              html: '<strong>Debounce & Throttle</strong> — Kiểm soát tần suất gọi hàm',
            },
            {
              type: 'code',
              lang: 'javascript',
              code: 'const debounce = (fn, delay) => {\n    let timer;\n    return (...args) => {\n        clearTimeout(timer);\n        timer = setTimeout(() => fn(...args), delay);\n    };\n};\n\n// Chỉ search sau khi user ngừng gõ 300ms\nconst search = debounce(query => fetchResults(query), 300);\ninput.addEventListener("input", e => search(e.target.value));',
            },
          ],
        },
      ],
    },
    {
      id: 'part2',
      title: 'Phần 2 — AWS Lambda × TypeScript',
      sections: [
        {
          id: 'aws-overview',
          title: 'Kiến trúc & cách hoạt động',
          subtitle: 'Hiểu rõ luồng trước khi code',
          icon: '🏗️',
          iconColor: 'bg-blue-100',
          blocks: [
            {
              type: 'callout',
              variant: 'info',
              title: 'AWS Lambda là gì?',
              html: 'Lambda là dịch vụ "serverless" — bạn chỉ upload code, AWS lo toàn bộ server, scaling, bảo trì. Chỉ trả tiền khi code thực sự chạy (tính theo millisecond). <strong>Free tier: 1 triệu requests/tháng miễn phí vĩnh viễn.</strong>',
            },
            {
              type: 'text',
              html: '<strong>Luồng Request → Response</strong><br/>User/App → <strong>API Gateway</strong> (HTTP endpoint) → <strong>λ Lambda</strong> (TypeScript code) → Response',
            },
            {
              type: 'text',
              html: '<strong>CI/CD Pipeline: Code → Auto Deploy</strong><br/>Local Code (TypeScript) → GitHub (git push main) → Actions (build + deploy) → AWS Lambda (live!)',
            },
            {
              type: 'text',
              html: '<strong>API chúng ta sẽ xây dựng:</strong>',
            },
            {
              type: 'table',
              caption: 'Endpoints',
              headers: ['Method', 'Path', 'Mô tả'],
              rows: [
                ['GET', '/hello', 'Trả về lời chào cơ bản'],
                ['GET', '/hello/{name}', 'Chào theo tên truyền vào URL'],
              ],
            },
          ],
        },
        {
          id: 'aws-s0',
          title: 'Cài đặt môi trường',
          subtitle: 'Node.js · AWS CLI · Serverless Framework',
          icon: '0️⃣',
          iconColor: 'bg-gray-100',
          blocks: [
            {
              type: 'text',
              html: 'Kiểm tra Node.js (cần v18+):',
            },
            {
              type: 'code',
              lang: 'bash',
              code: 'node --version\n# Phải thấy: v18.x.x hoặc v20.x.x trở lên',
            },
            {
              type: 'callout',
              variant: 'warn',
              title: 'Chưa có Node.js?',
              html: 'Tải tại <strong>nodejs.org</strong> → chọn "LTS" → cài như phần mềm bình thường. Mở lại terminal sau khi cài.',
            },
            {
              type: 'text',
              html: 'Cài AWS CLI v2:',
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
              code: '# Tải AWSCLIV2.msi và cài, sau đó kiểm tra:\naws --version',
            },
            {
              type: 'code',
              lang: 'bash',
              filename: 'Linux (Ubuntu)',
              code: 'curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o awscliv2.zip\nunzip awscliv2.zip && sudo ./aws/install\naws --version',
            },
            {
              type: 'text',
              html: 'Cài Serverless Framework:',
            },
            {
              type: 'code',
              lang: 'bash',
              code: 'npm install -g serverless\nserverless --version   # Installed Serverless Framework v4.x.x',
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Serverless Framework là gì?',
              html: 'Tool giúp deploy Lambda với 1 lệnh <code>serverless deploy</code>. Thay vì config tay trên AWS Console, bạn chỉ cần viết <code>serverless.yml</code>. Phiên bản v4 hỗ trợ TypeScript sẵn.',
            },
          ],
        },
        {
          id: 'aws-s1',
          title: 'Tạo AWS Account',
          subtitle: 'Đăng ký miễn phí — free tier đủ dùng',
          icon: '1️⃣',
          iconColor: 'bg-gray-100',
          blocks: [
            {
              type: 'callout',
              variant: 'ok',
              title: 'AWS Free Tier — hoàn toàn miễn phí cho tutorial này',
              html: '<ul><li>Lambda: 1 triệu requests/tháng miễn phí <strong>vĩnh viễn</strong></li><li>API Gateway: 1 triệu calls/tháng miễn phí 12 tháng đầu</li><li>CloudWatch Logs: 5GB miễn phí</li></ul>',
            },
            {
              type: 'step-list',
              items: [
                'Truy cập aws.amazon.com → click "Create an AWS Account"',
                'Nhập email, đặt tên account → Continue',
                'Chọn loại account: Personal',
                'Nhập thông tin và địa chỉ',
                'Nhập thẻ tín dụng (AWS charge $1 để verify, sau đó hoàn lại)',
                'Verify số điện thoại (SMS)',
                'Chọn Support Plan: Basic Support (Free)',
                'Đăng nhập vào AWS Management Console',
              ],
            },
            {
              type: 'callout',
              variant: 'danger',
              title: 'Bật MFA cho Root Account ngay!',
              html: 'Vào <strong>Security credentials → Multi-factor authentication → bật ngay.</strong> Dùng Google Authenticator hoặc Authy.',
            },
          ],
        },
        {
          id: 'aws-s2',
          title: 'Tạo IAM User',
          subtitle: 'Không bao giờ dùng root account để deploy',
          icon: '2️⃣',
          iconColor: 'bg-gray-100',
          blocks: [
            {
              type: 'callout',
              variant: 'info',
              title: 'IAM là gì?',
              html: 'IAM (Identity and Access Management) cho phép tạo "user" với quyền hạn cụ thể. Ta tạo một IAM User chỉ có đủ quyền deploy Lambda, thay vì dùng root account.',
            },
            {
              type: 'step-list',
              items: [
                'AWS Console → tìm "IAM" → vào IAM Dashboard',
                'Sidebar → "Users" → "Create user"',
                'Tên user: <code>serverless-deployer</code> → Next',
                'Chọn "Attach policies directly"',
                'Tick chọn các permissions bên dưới → Next → Create user',
              ],
            },
            {
              type: 'table',
              caption: 'Permissions cần thiết',
              headers: ['Policy', 'Dùng để làm gì'],
              rows: [
                ['AWSLambda_FullAccess', 'Tạo, update Lambda functions'],
                ['AmazonAPIGatewayAdministrator', 'Tạo API Gateway endpoints'],
                ['AmazonS3FullAccess', 'Upload deployment package lên S3'],
                ['CloudWatchLogsFullAccess', 'Xem logs của Lambda'],
                ['IAMFullAccess', 'Serverless tạo IAM roles cho Lambda'],
                ['AWSCloudFormationFullAccess', 'Serverless dùng CloudFormation'],
                ['AmazonSSMFullAccess', 'Serverless v4 lưu tên S3 bucket vào SSM'],
              ],
            },
            {
              type: 'text',
              html: 'Lấy Access Keys:',
            },
            {
              type: 'step-list',
              items: [
                'Click vào tên user <code>serverless-deployer</code>',
                'Tab "Security credentials" → "Create access key"',
                'Chọn "Command Line Interface (CLI)" → tick xác nhận → Next',
                'Copy ngay cả <strong>Access key ID</strong> và <strong>Secret access key</strong>',
              ],
            },
            {
              type: 'callout',
              variant: 'danger',
              title: 'Secret Access Key chỉ hiện MỘT LẦN!',
              html: 'Sau khi đóng trang không xem lại được. Nếu quên: xóa key cũ và tạo key mới.',
            },
            {
              type: 'callout',
              variant: 'warn',
              title: 'Không commit credentials lên GitHub!',
              html: 'Bots scan GitHub 24/7. Nếu lộ key, có thể bị dùng để mine crypto → hóa đơn AWS hàng nghìn đô.',
            },
          ],
        },
        {
          id: 'aws-s3',
          title: 'Cấu hình AWS CLI',
          subtitle: 'Kết nối máy tính với AWS account',
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
              code: 'AWS Access Key ID [None]: AKIA...........     ← paste Access key ID\nAWS Secret Access Key [None]: abc123...       ← paste Secret access key\nDefault region name [None]: ap-southeast-1   ← Singapore (gần VN nhất)\nDefault output format [None]: json',
            },
            {
              type: 'text',
              html: 'Kiểm tra kết nối:',
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
              title: 'Lỗi "Unable to locate credentials"?',
              html: 'Chạy lại <code>aws configure</code>, kiểm tra không có khoảng trắng thừa ở đầu/cuối key.',
            },
          ],
        },
        {
          id: 'aws-s4',
          title: 'Tạo project TypeScript',
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
              code: 'service: my-lambda-api\nframeworkVersion: \'4\'\n\nprovider:\n  name: aws\n  runtime: nodejs20.x\n  region: ap-southeast-1   # Singapore — gần Việt Nam\n\nbuild:\n  esbuild:\n    bundle: true\n    minify: false\n\nfunctions:\n  hello:\n    handler: src/handler.hello\n    events:\n      - http: { path: /hello, method: get, cors: true }\n\n  greet:\n    handler: src/handler.greet\n    events:\n      - http:\n          path: /hello/{name}\n          method: get\n          cors: true',
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Thêm scripts vào package.json',
              html: '<code>"deploy": "serverless deploy",</code><br/><code>"typecheck": "tsc --noEmit",</code><br/><code>"invoke": "serverless invoke local --function hello"</code>',
            },
          ],
        },
        {
          id: 'aws-s5',
          title: 'Viết Lambda Handler',
          subtitle: 'TypeScript đơn giản — 1 file, 2 function',
          icon: '5️⃣',
          iconColor: 'bg-gray-100',
          blocks: [
            {
              type: 'callout',
              variant: 'info',
              title: 'Lambda Handler là gì?',
              html: 'Handler là TypeScript function được AWS gọi khi có request đến. AWS truyền vào <code>event</code> chứa thông tin request, và bạn trả về <code>{ statusCode, body }</code>.',
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
              code: "import { APIGatewayProxyHandler } from 'aws-lambda';\n\n// GET /hello → trả về lời chào\nexport const hello: APIGatewayProxyHandler = async () => {\n  return {\n    statusCode: 200,\n    headers: { 'Content-Type': 'application/json' },\n    body: JSON.stringify({ message: 'Xin chào từ AWS Lambda! 🎉' }),\n  };\n};\n\n// GET /hello/{name} → chào theo tên\nexport const greet: APIGatewayProxyHandler = async (event) => {\n  const name = event.pathParameters?.name ?? 'bạn';\n  return {\n    statusCode: 200,\n    headers: { 'Content-Type': 'application/json' },\n    body: JSON.stringify({ message: `Xin chào, ${name}!` }),\n  };\n};",
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Giải thích nhanh',
              html: '<ul><li><code>APIGatewayProxyHandler</code> — type từ @types/aws-lambda, giúp TypeScript biết kiểu của event</li><li><code>statusCode: 200</code> — HTTP status OK</li><li><code>body</code> — phải là string (dùng JSON.stringify)</li><li><code>event.pathParameters?.name</code> — lấy {name} từ URL path</li></ul>',
            },
            {
              type: 'text',
              html: 'Test locally trước khi deploy:',
            },
            {
              type: 'code',
              lang: 'bash',
              code: "serverless invoke local --function hello\nserverless invoke local --function greet \\\n  --data '{\"pathParameters\":{\"name\":\"Minh\"}}'",
            },
          ],
        },
        {
          id: 'aws-s6',
          title: 'Deploy lên AWS',
          subtitle: 'Một lệnh — API live trên internet',
          icon: '6️⃣',
          iconColor: 'bg-gray-100',
          blocks: [
            {
              type: 'code',
              lang: 'bash',
              code: 'npm run deploy\n# Hoặc: serverless deploy',
            },
            {
              type: 'callout',
              variant: 'info',
              title: 'Deploy lần đầu mất 1-3 phút',
              html: 'Serverless sẽ: compile TS → tạo CloudFormation stack → upload S3 → tạo Lambda + API Gateway. Các lần sau nhanh hơn.',
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
          title: 'Test API đã deploy',
          subtitle: 'Gọi API từ terminal và xem logs',
          icon: '7️⃣',
          iconColor: 'bg-gray-100',
          blocks: [
            {
              type: 'code',
              lang: 'bash',
              code: 'BASE="https://abc123xyz.execute-api.ap-southeast-1.amazonaws.com/dev"\n\ncurl $BASE/hello\n# {"message":"Xin chào từ AWS Lambda! 🎉"}\n\ncurl $BASE/hello/Minh\n# {"message":"Xin chào, Minh!"}',
            },
            {
              type: 'code',
              lang: 'bash',
              code: '# Xem logs realtime\nserverless logs --function hello --tail',
            },
          ],
        },
        {
          id: 'aws-s8',
          title: 'GitHub Actions CI/CD',
          subtitle: 'Auto-deploy khi push lên nhánh main',
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
                'Repo trên GitHub → tab Settings',
                'Sidebar: Secrets and variables → Actions',
                'Click "New repository secret"',
                'Thêm <code>AWS_ACCESS_KEY_ID</code> = Access Key ID của IAM User',
                'Thêm <code>AWS_SECRET_ACCESS_KEY</code> = Secret Access Key',
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
              title: 'Workflow lỗi?',
              html: '<ul><li>Lỗi <strong>credentials</strong>: kiểm tra tên GitHub Secrets đúng chưa</li><li>Lỗi <strong>Access Denied</strong>: IAM User thiếu permissions</li><li>Lỗi <strong>tsc not found</strong>: thêm npm ci trước bước typecheck</li></ul>',
            },
          ],
        },
        {
          id: 'aws-deploy-methods',
          title: 'Các cách Deploy & Trigger Lambda',
          subtitle: 'Tất cả phương pháp deploy và kích hoạt Lambda',
          icon: '🔧',
          iconColor: 'bg-gray-100',
          blocks: [
            {
              type: 'feature-grid',
              items: [
                {
                  icon: '📦',
                  title: 'Serverless Framework',
                  description: 'Tool phổ biến nhất. Deploy bằng 1 lệnh. Tự xử lý CloudFormation, S3, IAM. Dùng trong tutorial này.',
                },
                {
                  icon: '🏗️',
                  title: 'AWS SAM',
                  description: 'Công cụ chính thức của AWS. Dùng template.yaml, hỗ trợ test local qua Docker.',
                },
                {
                  icon: '🧱',
                  title: 'AWS CDK',
                  description: 'Viết infrastructure bằng TypeScript/Python. Mạnh mẽ cho project lớn.',
                },
                {
                  icon: '🖥️',
                  title: 'AWS Console',
                  description: 'Upload file .zip trực tiếp trên trình duyệt. Chỉ dùng để thử nghiệm nhanh.',
                },
                {
                  icon: '⌨️',
                  title: 'AWS CLI',
                  description: 'Deploy thủ công bằng lệnh aws lambda. Linh hoạt cho script automation.',
                },
                {
                  icon: '🐙',
                  title: 'GitHub Actions / CI/CD',
                  description: 'Tự động build, test và deploy mỗi khi push code. Best practice cho production.',
                },
              ],
            },
            {
              type: 'table',
              caption: 'So sánh nhanh',
              headers: ['Phương pháp', 'Độ khó', 'Tự động hóa', 'Phù hợp'],
              rows: [
                ['Serverless Framework', 'Dễ', 'Cao', 'Mọi dự án'],
                ['AWS SAM', 'Trung bình', 'Cao', 'Dự án gắn với AWS'],
                ['AWS CDK', 'Trung bình', 'Cao', 'Dự án lớn, phức tạp'],
                ['AWS Console', 'Rất dễ', 'Không', 'Test nhanh, học'],
                ['AWS CLI', 'Trung bình', 'Có', 'Script tùy chỉnh'],
              ],
            },
            {
              type: 'text',
              html: '<strong>⚡ Các loại Trigger (Kích hoạt Lambda)</strong>',
            },
            {
              type: 'table',
              caption: '7 loại Trigger phổ biến',
              headers: ['Trigger', 'Icon', 'Mô tả', 'Config trong serverless.yml'],
              rows: [
                ['API Gateway', '🌐', 'HTTP request — REST API, webhook', '<code>events: - http: { path: /users, method: get }</code>'],
                ['EventBridge/Schedule', '⏰', 'Chạy theo lịch — cron, định kỳ', '<code>events: - schedule: rate(1 hour)</code>'],
                ['S3 Events', '🪣', 'Trigger khi upload/xóa file S3', '<code>events: - s3: { bucket: my-bucket, event: s3:ObjectCreated:* }</code>'],
                ['SQS', '📨', 'Xử lý messages từ hàng đợi', '<code>events: - sqs: { arn: arn:aws:sqs:... }</code>'],
                ['DynamoDB Streams', '🗄️', 'React khi có thay đổi dữ liệu DB', '<code>events: - stream: { type: dynamodb, arn: ... }</code>'],
                ['SNS', '📢', 'Fan-out: 1 event kích hoạt nhiều Lambda', '<code>events: - sns: arn:aws:sns:...</code>'],
                ['Function URL', '🔗', 'URL trực tiếp cho Lambda, không cần API Gateway', '<code>url: { cors: true }</code>'],
              ],
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Chọn Trigger nào?',
              html: '<ul><li><strong>REST API / Webhook:</strong> API Gateway hoặc Function URL</li><li><strong>Chạy định kỳ (cron):</strong> EventBridge Schedule</li><li><strong>Xử lý file upload:</strong> S3 Events</li><li><strong>Background jobs:</strong> SQS</li><li><strong>React với DB changes:</strong> DynamoDB Streams</li><li><strong>Fan-out / microservices:</strong> SNS</li></ul>',
            },
          ],
        },
        {
          id: 'aws-alternatives',
          title: 'Ngoài AWS',
          subtitle: 'Serverless Functions trên Cloudflare, Google, Vercel, và hơn thế',
          icon: '🌐',
          iconColor: 'bg-blue-100',
          blocks: [
            {
              type: 'callout',
              variant: 'info',
              title: 'AWS không phải lựa chọn duy nhất',
              html: 'Nhiều nền tảng cung cấp dịch vụ tương tự Lambda — một số rẻ hơn đáng kể, một số nhanh hơn (không có cold start), một số đơn giản hơn cho người mới.',
            },
            {
              type: 'table',
              caption: 'So sánh giá — 1 triệu requests/tháng',
              headers: ['Nền tảng', 'Free Tier', 'Cold Start', 'Ghi chú'],
              rows: [
                ['<strong>AWS Lambda</strong>', '1M req/tháng vĩnh viễn', '100–500ms', 'Ecosystem mạnh nhất'],
                ['<strong>Cloudflare Workers</strong>', '100k req/ngày vĩnh viễn', '~0ms', 'Edge, cực nhanh toàn cầu'],
                ['<strong>Google Cloud Functions</strong>', '2M req/tháng vĩnh viễn', '100–400ms', 'Free tier tốt hơn AWS'],
                ['<strong>Vercel Functions</strong>', '100k req (Hobby)', '50–200ms', 'Tốt nhất cho Next.js'],
                ['<strong>Deno Deploy</strong>', '1M req/tháng miễn phí', '~0ms', 'Edge, TypeScript native'],
              ],
            },
            {
              type: 'text',
              html: '<strong>🟠 Cloudflare Workers</strong> — Rẻ nhất & nhanh nhất',
            },
            {
              type: 'callout',
              variant: 'ok',
              title: 'Tại sao Cloudflare Workers rất phổ biến?',
              html: '<ul><li><strong>0ms cold start</strong> — dùng V8 Isolates thay vì container</li><li><strong>Edge network</strong> — code chạy tại ~270 locations gần người dùng nhất</li><li><strong>Free tier hào phóng</strong> — 100,000 req/ngày = 3M req/tháng miễn phí</li><li><strong>Giá cực tốt</strong> — $5/tháng cho 10M requests</li></ul>',
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
              code: 'npm create cloudflare@latest my-api -- --type hello-world\ncd my-api\nnpm run deploy   # Deploy lên Cloudflare Workers',
            },
            {
              type: 'table',
              caption: 'Nên chọn nền tảng nào?',
              headers: ['Trường hợp', 'Nên dùng', 'Lý do'],
              rows: [
                ['Người mới, muốn học', '<strong>AWS Lambda</strong>', 'Tài liệu nhiều nhất, industry standard'],
                ['API đơn giản, muốn miễn phí', '<strong>Cloudflare Workers</strong>', '0ms cold start, 100k req/ngày free'],
                ['Free tier cao nhất', '<strong>Google Cloud Functions</strong>', '2M req/tháng miễn phí vĩnh viễn'],
                ['Dùng Next.js / React', '<strong>Vercel Functions</strong>', 'Zero-config, tích hợp hoàn hảo'],
                ['Production lớn, enterprise', '<strong>AWS Lambda</strong>', 'Ecosystem đầy đủ, SLA tốt'],
              ],
            },
          ],
        },
        {
          id: 'aws-done',
          title: 'Hoàn thành!',
          subtitle: 'API production-ready đang chạy trên AWS',
          icon: '✅',
          iconColor: 'bg-green-100',
          blocks: [
            {
              type: 'callout',
              variant: 'ok',
              title: '🎉 API của bạn đang chạy trên AWS!',
              html: 'Bất kỳ ai trên thế giới có thể gọi API. Mỗi khi push lên GitHub, API tự động được cập nhật.',
            },
            {
              type: 'text',
              html: '<strong>Bạn đã học được:</strong>',
            },
            {
              type: 'step-list',
              items: [
                '✅ Tạo AWS Account và IAM User an toàn',
                '✅ Cấu hình AWS CLI',
                '✅ Viết Lambda handler TypeScript type-safe',
                '✅ Deploy với Serverless Framework',
                '✅ CI/CD tự động với GitHub Actions',
                '✅ Xem logs trên CloudWatch',
                '✅ Hiểu 7 loại Trigger: API GW, Schedule, S3, SQS, DynamoDB, SNS, Function URL',
                '✅ Biết các platform thay thế: Cloudflare, GCP, Vercel',
              ],
            },
            {
              type: 'text',
              html: '<strong>Các bước tiếp theo:</strong>',
            },
            {
              type: 'feature-grid',
              items: [
                {
                  icon: '🔒',
                  title: 'Custom Domain',
                  description: 'Route 53 + ACM Certificate — HTTPS với domain của bạn',
                },
                {
                  icon: '💾',
                  title: 'Thêm DynamoDB',
                  description: 'NoSQL serverless — lưu trữ dữ liệu cho Lambda functions',
                },
                {
                  icon: '🔐',
                  title: 'Authentication',
                  description: 'JWT hoặc AWS Cognito — bảo vệ API endpoints',
                },
                {
                  icon: '📊',
                  title: 'Monitoring',
                  description: 'CloudWatch Dashboard + Alarms — theo dõi performance',
                },
              ],
            },
            {
              type: 'callout',
              variant: 'warn',
              title: 'Dọn dẹp để tránh charge',
              html: 'Nếu không dùng nữa: <code>serverless remove</code> để xóa toàn bộ resources. Xóa cả S3 bucket deployment trên Console.',
            },
          ],
        },
      ],
    },
  ],
};

export default tutorial;
