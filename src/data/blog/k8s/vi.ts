import type { Tutorial } from '@/types/tutorial';

const tutorial: Tutorial = {
  id: 'k8s',
  title: 'Kubernetes cho người mới',
  description: 'Cài đặt, setup và triển khai ứng dụng đầu tiên trên Kubernetes',
  icon: '☸',
  chapters: [
    {
      id: 'chapter1',
      title: 'Giới thiệu Kubernetes',
      sections: [
        {
          id: 'what-is-k8s',
          title: 'Kubernetes là gì?',
          subtitle: 'Container orchestration cho production',
          icon: '☸',
          iconColor: 'bg-blue-100',
          blocks: [
            {
              type: 'text',
              html: 'Kubernetes (K8s) là hệ thống <strong>container orchestration</strong> mã nguồn mở, giúp tự động hóa việc triển khai, mở rộng và quản lý các ứng dụng container. Được phát triển bởi Google và hiện do CNCF quản lý.',
            },
            {
              type: 'compare',
              left: {
                title: 'Chỉ dùng Docker',
                blocks: [
                  {
                    type: 'step-list',
                    items: [
                      'Quản lý thủ công từng container',
                      'Không tự restart khi container crash',
                      'Scale bằng tay, phải SSH vào server',
                      'Load balancing tự cấu hình',
                      'Rolling update phức tạp, downtime cao',
                    ],
                  },
                ],
              },
              right: {
                title: 'Docker + Kubernetes',
                blocks: [
                  {
                    type: 'step-list',
                    items: [
                      'Tự động quản lý hàng trăm containers',
                      'Self-healing: tự restart container lỗi',
                      'Auto-scaling theo CPU/memory',
                      'Load balancing tích hợp sẵn',
                      'Rolling update zero-downtime',
                    ],
                  },
                ],
              },
            },
            {
              type: 'callout',
              variant: 'info',
              title: 'Khi nào cần K8s?',
              html: 'Nếu app chỉ chạy 1-2 containers trên 1 server, Docker Compose là đủ. K8s hữu ích khi bạn cần <strong>high availability</strong>, <strong>auto-scaling</strong>, hoặc quản lý nhiều services trên nhiều server.',
            },
          ],
        },
        {
          id: 'k8s-architecture',
          title: 'Kiến trúc K8s',
          subtitle: 'Control Plane và Worker Nodes',
          icon: '🏗',
          iconColor: 'bg-indigo-100',
          blocks: [
            {
              type: 'text',
              html: 'Một K8s cluster gồm 2 phần chính: <strong>Control Plane</strong> (bộ não điều khiển) và <strong>Worker Nodes</strong> (máy chạy containers).',
            },
            {
              type: 'feature-grid',
              items: [
                { icon: '🧠', title: 'API Server', description: 'Cổng giao tiếp chính. Mọi lệnh kubectl đều đi qua đây.' },
                { icon: '💾', title: 'etcd', description: 'Database lưu trạng thái cluster. Key-value store phân tán.' },
                { icon: '📋', title: 'Scheduler', description: 'Quyết định Pod chạy trên Node nào dựa trên tài nguyên.' },
                { icon: '🔄', title: 'Controller Manager', description: 'Đảm bảo trạng thái thực tế khớp với trạng thái mong muốn.' },
                { icon: '🤖', title: 'kubelet', description: 'Agent trên mỗi Node. Nhận lệnh và quản lý containers.' },
                { icon: '🌐', title: 'kube-proxy', description: 'Quản lý network rules, cho phép Pods giao tiếp.' },
              ],
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Declarative vs. Imperative',
              html: 'K8s hoạt động theo mô hình <strong>declarative</strong>: bạn khai báo trạng thái mong muốn (vd: "chạy 3 replicas") trong file YAML, K8s tự lo đạt được trạng thái đó. Khác với imperative (chạy lệnh từng bước).',
            },
          ],
        },
      ],
    },
    {
      id: 'chapter2',
      title: 'Cài đặt & Setup',
      sections: [
        {
          id: 'install-kubectl',
          title: 'Cài kubectl',
          subtitle: 'CLI tool để tương tác với K8s cluster',
          icon: '⌨️',
          iconColor: 'bg-gray-100',
          blocks: [
            {
              type: 'text',
              html: '<code>kubectl</code> là công cụ dòng lệnh chính để quản lý K8s cluster. Cài đặt trước khi setup cluster.',
            },
            {
              type: 'table',
              caption: 'Cài kubectl theo nền tảng',
              headers: ['Nền tảng', 'Lệnh cài', 'Ghi chú'],
              rows: [
                ['macOS', 'brew install kubectl', 'Hoặc tải binary từ kubernetes.io'],
                ['Windows', 'choco install kubernetes-cli', 'Hoặc tải .exe từ kubernetes.io'],
                ['Ubuntu/Debian', 'sudo snap install kubectl --classic', 'Hoặc dùng apt với K8s repo'],
              ],
            },
            {
              type: 'code',
              lang: 'bash',
              code: '# Kiểm tra sau khi cài\nkubectl version --client\n# Client Version: v1.31.x',
            },
          ],
        },
        {
          id: 'install-minikube',
          title: 'Cài Minikube',
          subtitle: 'Chạy K8s cluster trên máy local',
          icon: '💻',
          iconColor: 'bg-green-100',
          blocks: [
            {
              type: 'text',
              html: '<strong>Minikube</strong> tạo một K8s cluster single-node trên máy local — lý tưởng để học và phát triển. Yêu cầu Docker đã cài sẵn.',
            },
            {
              type: 'table',
              caption: 'Cài Minikube theo nền tảng',
              headers: ['Nền tảng', 'Lệnh cài'],
              rows: [
                ['macOS', 'brew install minikube'],
                ['Windows', 'choco install minikube'],
                ['Linux', 'curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64 && sudo install minikube-linux-amd64 /usr/local/bin/minikube'],
              ],
            },
            {
              type: 'code',
              lang: 'bash',
              code: `# Khởi động cluster (dùng Docker driver)
minikube start --driver=docker

# Kiểm tra cluster
kubectl cluster-info
# Kubernetes control plane is running at https://127.0.0.1:xxxxx

# Xem nodes
kubectl get nodes
# NAME       STATUS   ROLES           AGE   VERSION
# minikube   Ready    control-plane   1m    v1.31.x

# Mở K8s dashboard (tùy chọn)
minikube dashboard`,
            },
            {
              type: 'callout',
              variant: 'info',
              title: 'Thay thế: kind',
              html: '<strong>kind</strong> (Kubernetes in Docker) là lựa chọn thay thế Minikube — nhẹ hơn, khởi động nhanh hơn. Cài bằng <code>brew install kind</code> rồi <code>kind create cluster</code>.',
            },
            {
              type: 'callout',
              variant: 'warn',
              title: 'Tài nguyên',
              html: 'Minikube cần tối thiểu <strong>2 CPU</strong> và <strong>2GB RAM</strong>. Nếu máy yếu, dùng <code>minikube start --cpus=2 --memory=2048</code> để giới hạn tài nguyên.',
            },
          ],
        },
      ],
    },
    {
      id: 'chapter3',
      title: 'Các khái niệm cốt lõi',
      sections: [
        {
          id: 'pods',
          title: 'Pods',
          subtitle: 'Đơn vị nhỏ nhất trong K8s',
          icon: '🫛',
          iconColor: 'bg-green-100',
          blocks: [
            {
              type: 'text',
              html: '<strong>Pod</strong> là đơn vị nhỏ nhất có thể deploy trong K8s. Mỗi Pod chứa một hoặc nhiều containers chia sẻ cùng network và storage. Thực tế, 99% trường hợp mỗi Pod chỉ chạy 1 container.',
            },
            {
              type: 'code',
              lang: 'yaml',
              filename: 'pod.yaml',
              code: `apiVersion: v1
kind: Pod
metadata:
  name: my-app
  labels:
    app: my-app
spec:
  containers:
    - name: my-app
      image: nginx:alpine
      ports:
        - containerPort: 80`,
            },
            {
              type: 'code',
              lang: 'bash',
              code: `# Tạo Pod từ file YAML
kubectl apply -f pod.yaml

# Xem danh sách Pods
kubectl get pods

# Xem chi tiết Pod
kubectl describe pod my-app

# Xem logs
kubectl logs my-app

# Truy cập shell bên trong Pod
kubectl exec -it my-app -- /bin/sh

# Xóa Pod
kubectl delete pod my-app`,
            },
            {
              type: 'callout',
              variant: 'warn',
              title: 'Không deploy Pod trực tiếp',
              html: 'Trong thực tế, <strong>không bao giờ</strong> tạo Pod trực tiếp. Hãy dùng <strong>Deployment</strong> — nó tự quản lý Pods, restart khi crash, và hỗ trợ rolling updates.',
            },
          ],
        },
        {
          id: 'deployments',
          title: 'Deployments',
          subtitle: 'Quản lý và scale ứng dụng',
          icon: '🚀',
          iconColor: 'bg-blue-100',
          blocks: [
            {
              type: 'text',
              html: '<strong>Deployment</strong> quản lý một nhóm Pods giống nhau (replicas). Nó đảm bảo số lượng Pods mong muốn luôn chạy, tự restart Pod lỗi, và hỗ trợ rolling updates khi deploy phiên bản mới.',
            },
            {
              type: 'code',
              lang: 'yaml',
              filename: 'deployment.yaml',
              code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
        - name: my-app
          image: my-app:1.0
          ports:
            - containerPort: 3000
          resources:
            requests:
              cpu: "100m"
              memory: "128Mi"
            limits:
              cpu: "250m"
              memory: "256Mi"`,
            },
            {
              type: 'code',
              lang: 'bash',
              code: `# Tạo Deployment
kubectl apply -f deployment.yaml

# Xem Deployments
kubectl get deployments

# Scale lên 5 replicas
kubectl scale deployment my-app --replicas=5

# Cập nhật image (rolling update)
kubectl set image deployment/my-app my-app=my-app:2.0

# Xem trạng thái rollout
kubectl rollout status deployment/my-app

# Rollback về phiên bản trước
kubectl rollout undo deployment/my-app`,
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Resource Requests & Limits',
              html: 'Luôn đặt <code>resources.requests</code> (tối thiểu) và <code>resources.limits</code> (tối đa) cho CPU và memory. Scheduler dùng requests để chọn Node, limits để ngăn container chiếm quá nhiều tài nguyên.',
            },
          ],
        },
        {
          id: 'services',
          title: 'Services',
          subtitle: 'Expose ứng dụng ra bên ngoài',
          icon: '🌐',
          iconColor: 'bg-purple-100',
          blocks: [
            {
              type: 'text',
              html: '<strong>Service</strong> cung cấp một địa chỉ mạng ổn định cho một nhóm Pods. Pods có thể bị tạo/xóa liên tục, nhưng Service giữ nguyên IP và DNS name.',
            },
            {
              type: 'table',
              caption: 'Các loại Service',
              headers: ['Loại', 'Mô tả', 'Use case'],
              rows: [
                ['ClusterIP', 'Chỉ truy cập được trong cluster', 'Giao tiếp giữa các services nội bộ'],
                ['NodePort', 'Mở port trên mỗi Node (30000-32767)', 'Dev/test, truy cập từ bên ngoài'],
                ['LoadBalancer', 'Tạo load balancer trên cloud provider', 'Production trên AWS/GCP/Azure'],
              ],
            },
            {
              type: 'code',
              lang: 'yaml',
              filename: 'service.yaml',
              code: `apiVersion: v1
kind: Service
metadata:
  name: my-app-service
spec:
  type: NodePort
  selector:
    app: my-app        # Chọn Pods có label app=my-app
  ports:
    - port: 80          # Port của Service
      targetPort: 3000  # Port của container
      nodePort: 30080   # Port truy cập từ bên ngoài`,
            },
            {
              type: 'code',
              lang: 'bash',
              code: `# Tạo Service
kubectl apply -f service.yaml

# Xem Services
kubectl get services

# Truy cập app qua Minikube
minikube service my-app-service --url
# http://192.168.49.2:30080`,
            },
          ],
        },
        {
          id: 'namespaces',
          title: 'Namespaces',
          subtitle: 'Phân vùng tài nguyên trong cluster',
          icon: '📁',
          iconColor: 'bg-yellow-100',
          blocks: [
            {
              type: 'text',
              html: '<strong>Namespace</strong> phân chia cluster thành các vùng logic riêng biệt. Hữu ích khi nhiều team hoặc nhiều môi trường (dev/staging/prod) dùng chung cluster.',
            },
            {
              type: 'code',
              lang: 'bash',
              code: `# Xem namespaces
kubectl get namespaces

# Tạo namespace
kubectl create namespace staging

# Deploy vào namespace cụ thể
kubectl apply -f deployment.yaml -n staging

# Xem resources trong namespace
kubectl get all -n staging

# Đặt namespace mặc định cho context
kubectl config set-context --current --namespace=staging`,
            },
            {
              type: 'callout',
              variant: 'info',
              title: 'Namespaces mặc định',
              html: 'K8s có sẵn: <code>default</code> (mặc định), <code>kube-system</code> (components hệ thống), <code>kube-public</code> (public resources). Tránh deploy app vào <code>kube-system</code>.',
            },
          ],
        },
      ],
    },
    {
      id: 'chapter4',
      title: 'Thực hành: Deploy App',
      sections: [
        {
          id: 'deploy-nodejs-app',
          title: 'Deploy ứng dụng Node.js',
          subtitle: 'Từ Docker image đến K8s cluster',
          icon: '🎯',
          iconColor: 'bg-emerald-100',
          blocks: [
            {
              type: 'text',
              html: 'Hãy deploy một ứng dụng Node.js đơn giản lên Minikube. Bước đầu tiên: build Docker image và load vào Minikube.',
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Dùng Docker daemon của Minikube',
              html: 'Chạy <code>eval $(minikube docker-env)</code> để dùng Docker daemon bên trong Minikube. Image build ở đây sẽ có sẵn trong cluster mà không cần push lên registry.',
            },
            {
              type: 'code',
              lang: 'bash',
              code: `# Dùng Docker daemon của Minikube
eval $(minikube docker-env)

# Build image (từ thư mục có Dockerfile)
docker build -t my-node-app:1.0 .

# Kiểm tra image
docker images | grep my-node-app`,
            },
            {
              type: 'text',
              html: 'Tạo file Deployment + Service trong cùng 1 file YAML (ngăn cách bằng <code>---</code>):',
            },
            {
              type: 'code',
              lang: 'yaml',
              filename: 'k8s-app.yaml',
              code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: node-app
spec:
  replicas: 2
  selector:
    matchLabels:
      app: node-app
  template:
    metadata:
      labels:
        app: node-app
    spec:
      containers:
        - name: node-app
          image: my-node-app:1.0
          imagePullPolicy: Never  # Dùng local image
          ports:
            - containerPort: 3000
          env:
            - name: NODE_ENV
              value: "production"
---
apiVersion: v1
kind: Service
metadata:
  name: node-app-service
spec:
  type: NodePort
  selector:
    app: node-app
  ports:
    - port: 80
      targetPort: 3000`,
            },
            {
              type: 'code',
              lang: 'bash',
              code: `# Deploy tất cả
kubectl apply -f k8s-app.yaml

# Kiểm tra
kubectl get pods
# NAME                        READY   STATUS    RESTARTS   AGE
# node-app-7d8f9b6c5-abc12   1/1     Running   0          30s
# node-app-7d8f9b6c5-def34   1/1     Running   0          30s

kubectl get services
# NAME               TYPE       CLUSTER-IP     PORT(S)
# node-app-service   NodePort   10.96.xxx.xx   80:3xxxx/TCP

# Mở trình duyệt
minikube service node-app-service`,
            },
          ],
        },
        {
          id: 'scale-and-update',
          title: 'Scale & Rolling Update',
          subtitle: 'Mở rộng và cập nhật không downtime',
          icon: '📈',
          iconColor: 'bg-orange-100',
          blocks: [
            {
              type: 'text',
              html: 'K8s cho phép scale số replicas và cập nhật image mà không cần dừng ứng dụng.',
            },
            {
              type: 'code',
              lang: 'bash',
              code: `# ── Scale ────────────────────────────────
# Tăng lên 5 replicas
kubectl scale deployment node-app --replicas=5

# Xem pods mới tạo
kubectl get pods -w  # -w = watch realtime

# ── Rolling Update ───────────────────────
# Build phiên bản mới
docker build -t my-node-app:2.0 .

# Cập nhật image
kubectl set image deployment/node-app node-app=my-node-app:2.0

# Theo dõi quá trình rollout
kubectl rollout status deployment/node-app
# Waiting for deployment "node-app" rollout to finish...
# deployment "node-app" successfully rolled out

# ── Rollback nếu có lỗi ─────────────────
kubectl rollout undo deployment/node-app

# Xem lịch sử rollout
kubectl rollout history deployment/node-app`,
            },
            {
              type: 'callout',
              variant: 'ok',
              title: 'Zero Downtime',
              html: 'Rolling update tạo Pods mới trước, đợi chúng healthy, rồi mới xóa Pods cũ. Người dùng không bị gián đoạn.',
            },
          ],
        },
      ],
    },
    {
      id: 'chapter5',
      title: 'Config & Storage',
      sections: [
        {
          id: 'configmap-secrets',
          title: 'ConfigMap & Secrets',
          subtitle: 'Quản lý cấu hình và thông tin nhạy cảm',
          icon: '🔐',
          iconColor: 'bg-red-100',
          blocks: [
            {
              type: 'text',
              html: '<strong>ConfigMap</strong> lưu cấu hình dạng key-value. <strong>Secret</strong> lưu thông tin nhạy cảm (password, API key) được mã hóa base64.',
            },
            {
              type: 'code',
              lang: 'yaml',
              filename: 'config.yaml',
              code: `# ConfigMap — cấu hình thường
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  APP_PORT: "3000"
  LOG_LEVEL: "info"
  API_URL: "https://api.example.com"
---
# Secret — thông tin nhạy cảm
apiVersion: v1
kind: Secret
metadata:
  name: app-secrets
type: Opaque
stringData:
  DB_PASSWORD: "super-secret-password"
  JWT_SECRET: "my-jwt-secret-key"`,
            },
            {
              type: 'text',
              html: 'Sử dụng trong Deployment:',
            },
            {
              type: 'code',
              lang: 'yaml',
              filename: 'deployment-with-config.yaml',
              code: `spec:
  containers:
    - name: my-app
      image: my-app:1.0
      envFrom:
        - configMapRef:
            name: app-config    # Inject tất cả keys từ ConfigMap
        - secretRef:
            name: app-secrets   # Inject tất cả keys từ Secret`,
            },
            {
              type: 'callout',
              variant: 'danger',
              title: 'Bảo mật Secrets',
              html: 'K8s Secrets chỉ mã hóa base64 (dễ decode). Trong production, dùng thêm <strong>Sealed Secrets</strong> hoặc <strong>External Secrets Operator</strong> kết hợp với AWS Secrets Manager / HashiCorp Vault.',
            },
          ],
        },
        {
          id: 'persistent-volumes',
          title: 'Persistent Volumes',
          subtitle: 'Lưu trữ bền vững cho containers',
          icon: '💾',
          iconColor: 'bg-teal-100',
          blocks: [
            {
              type: 'text',
              html: 'Containers là ephemeral — dữ liệu mất khi Pod bị xóa. <strong>PersistentVolume (PV)</strong> và <strong>PersistentVolumeClaim (PVC)</strong> cung cấp storage bền vững.',
            },
            {
              type: 'code',
              lang: 'yaml',
              filename: 'pvc.yaml',
              code: `apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: db-storage
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 5Gi  # Yêu cầu 5GB storage`,
            },
            {
              type: 'text',
              html: 'Mount PVC vào Pod:',
            },
            {
              type: 'code',
              lang: 'yaml',
              code: `spec:
  containers:
    - name: postgres
      image: postgres:16-alpine
      volumeMounts:
        - name: db-data
          mountPath: /var/lib/postgresql/data
  volumes:
    - name: db-data
      persistentVolumeClaim:
        claimName: db-storage`,
            },
          ],
        },
      ],
    },
    {
      id: 'chapter6',
      title: 'Kubectl Cheat Sheet',
      sections: [
        {
          id: 'essential-commands',
          title: 'Lệnh thường dùng',
          subtitle: 'Tham khảo nhanh các lệnh kubectl',
          icon: '📋',
          iconColor: 'bg-amber-100',
          blocks: [
            {
              type: 'table',
              caption: 'Quản lý resources',
              headers: ['Lệnh', 'Mô tả'],
              rows: [
                ['kubectl get pods', 'Liệt kê tất cả Pods'],
                ['kubectl get all', 'Liệt kê mọi resource'],
                ['kubectl get pods -o wide', 'Xem thêm IP, Node'],
                ['kubectl describe pod &lt;name&gt;', 'Chi tiết Pod (events, config)'],
                ['kubectl apply -f file.yaml', 'Tạo/cập nhật resource từ YAML'],
                ['kubectl delete -f file.yaml', 'Xóa resource từ YAML'],
                ['kubectl delete pod &lt;name&gt;', 'Xóa Pod cụ thể'],
              ],
            },
            {
              type: 'table',
              caption: 'Debug & Troubleshoot',
              headers: ['Lệnh', 'Mô tả'],
              rows: [
                ['kubectl logs &lt;pod&gt;', 'Xem logs của Pod'],
                ['kubectl logs -f &lt;pod&gt;', 'Theo dõi logs realtime'],
                ['kubectl logs &lt;pod&gt; -c &lt;container&gt;', 'Logs container cụ thể trong Pod'],
                ['kubectl exec -it &lt;pod&gt; -- /bin/sh', 'Truy cập shell trong Pod'],
                ['kubectl port-forward &lt;pod&gt; 8080:3000', 'Forward port để test local'],
                ['kubectl top pods', 'Xem CPU/memory usage'],
              ],
            },
          ],
        },
        {
          id: 'debugging-tips',
          title: 'Mẹo Debug',
          subtitle: 'Xử lý các lỗi thường gặp',
          icon: '🔧',
          iconColor: 'bg-rose-100',
          blocks: [
            {
              type: 'table',
              caption: 'Pod status & cách xử lý',
              headers: ['Status', 'Nguyên nhân', 'Cách xử lý'],
              rows: [
                ['ImagePullBackOff', 'Không pull được image', 'Kiểm tra image name, registry credentials'],
                ['CrashLoopBackOff', 'Container liên tục crash', 'Xem logs: kubectl logs &lt;pod&gt; --previous'],
                ['Pending', 'Không đủ tài nguyên', 'Kiểm tra node resources: kubectl describe node'],
                ['ErrImageNeverPull', 'imagePullPolicy: Never nhưng image không có', 'Build image trên Minikube: eval $(minikube docker-env)'],
              ],
            },
            {
              type: 'code',
              lang: 'bash',
              code: `# Quy trình debug Pod lỗi
# 1. Xem status
kubectl get pods

# 2. Xem events và chi tiết
kubectl describe pod <pod-name>

# 3. Xem logs (thêm --previous nếu container đã crash)
kubectl logs <pod-name>
kubectl logs <pod-name> --previous

# 4. Truy cập container đang chạy
kubectl exec -it <pod-name> -- /bin/sh

# 5. Kiểm tra tài nguyên Node
kubectl top nodes
kubectl describe node <node-name>`,
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Cleanup khi học xong',
              html: 'Xóa toàn bộ resources: <code>kubectl delete all --all</code>. Dừng Minikube: <code>minikube stop</code>. Xóa cluster hoàn toàn: <code>minikube delete</code>.',
            },
          ],
        },
      ],
    },
  ],
};

export default tutorial;
