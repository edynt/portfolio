import type { Tutorial } from '@/types/tutorial';

const tutorial: Tutorial = {
  id: 'k8s',
  title: 'Kubernetes for Beginners',
  description: 'Install, set up, and deploy your first app on Kubernetes',
  icon: '☸',
  chapters: [
    {
      id: 'chapter1',
      title: 'Introduction to Kubernetes',
      sections: [
        {
          id: 'what-is-k8s',
          title: 'What is Kubernetes?',
          subtitle: 'Container orchestration for production',
          icon: '☸',
          iconColor: 'bg-blue-100',
          blocks: [
            {
              type: 'text',
              html: 'Kubernetes (K8s) is an open-source <strong>container orchestration</strong> system that automates deploying, scaling, and managing containerized applications. Originally developed by Google, now maintained by CNCF.',
            },
            {
              type: 'compare',
              left: {
                title: 'Docker Only',
                blocks: [
                  {
                    type: 'step-list',
                    items: [
                      'Manually manage each container',
                      'No auto-restart when a container crashes',
                      'Scale manually, SSH into servers',
                      'Load balancing configured by hand',
                      'Complex rolling updates, high downtime',
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
                      'Automatically manage hundreds of containers',
                      'Self-healing: auto-restart failed containers',
                      'Auto-scaling based on CPU/memory',
                      'Built-in load balancing',
                      'Zero-downtime rolling updates',
                    ],
                  },
                ],
              },
            },
            {
              type: 'callout',
              variant: 'info',
              title: 'When do you need K8s?',
              html: 'If your app runs only 1-2 containers on a single server, Docker Compose is enough. K8s is useful when you need <strong>high availability</strong>, <strong>auto-scaling</strong>, or managing multiple services across multiple servers.',
            },
          ],
        },
        {
          id: 'k8s-architecture',
          title: 'K8s Architecture',
          subtitle: 'Control Plane and Worker Nodes',
          icon: '🏗',
          iconColor: 'bg-indigo-100',
          blocks: [
            {
              type: 'text',
              html: 'A K8s cluster has two main parts: the <strong>Control Plane</strong> (the brain) and <strong>Worker Nodes</strong> (machines that run containers).',
            },
            {
              type: 'feature-grid',
              items: [
                { icon: '🧠', title: 'API Server', description: 'The main communication gateway. All kubectl commands go through here.' },
                { icon: '💾', title: 'etcd', description: 'Database storing cluster state. A distributed key-value store.' },
                { icon: '📋', title: 'Scheduler', description: 'Decides which Node a Pod runs on based on resources.' },
                { icon: '🔄', title: 'Controller Manager', description: 'Ensures actual state matches the desired state.' },
                { icon: '🤖', title: 'kubelet', description: 'Agent on each Node. Receives instructions and manages containers.' },
                { icon: '🌐', title: 'kube-proxy', description: 'Manages network rules, enabling Pod communication.' },
              ],
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Declarative vs. Imperative',
              html: 'K8s works with a <strong>declarative</strong> model: you declare the desired state (e.g., "run 3 replicas") in a YAML file, and K8s ensures that state is achieved. Different from imperative (running commands step by step).',
            },
          ],
        },
      ],
    },
    {
      id: 'chapter2',
      title: 'Installation & Setup',
      sections: [
        {
          id: 'install-kubectl',
          title: 'Install kubectl',
          subtitle: 'CLI tool to interact with K8s clusters',
          icon: '⌨️',
          iconColor: 'bg-gray-100',
          blocks: [
            {
              type: 'text',
              html: '<code>kubectl</code> is the primary CLI tool for managing K8s clusters. Install it before setting up your cluster.',
            },
            {
              type: 'table',
              caption: 'Install kubectl by platform',
              headers: ['Platform', 'Command', 'Notes'],
              rows: [
                ['macOS', 'brew install kubectl', 'Or download binary from kubernetes.io'],
                ['Windows', 'choco install kubernetes-cli', 'Or download .exe from kubernetes.io'],
                ['Ubuntu/Debian', 'sudo snap install kubectl --classic', 'Or use apt with K8s repo'],
              ],
            },
            {
              type: 'code',
              lang: 'bash',
              code: '# Verify installation\nkubectl version --client\n# Client Version: v1.31.x',
            },
          ],
        },
        {
          id: 'install-minikube',
          title: 'Install Minikube',
          subtitle: 'Run a K8s cluster on your local machine',
          icon: '💻',
          iconColor: 'bg-green-100',
          blocks: [
            {
              type: 'text',
              html: '<strong>Minikube</strong> creates a single-node K8s cluster on your local machine — ideal for learning and development. Requires Docker to be installed.',
            },
            {
              type: 'table',
              caption: 'Install Minikube by platform',
              headers: ['Platform', 'Command'],
              rows: [
                ['macOS', 'brew install minikube'],
                ['Windows', 'choco install minikube'],
                ['Linux', 'curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64 && sudo install minikube-linux-amd64 /usr/local/bin/minikube'],
              ],
            },
            {
              type: 'code',
              lang: 'bash',
              code: `# Start a cluster (using Docker driver)
minikube start --driver=docker

# Verify the cluster
kubectl cluster-info
# Kubernetes control plane is running at https://127.0.0.1:xxxxx

# View nodes
kubectl get nodes
# NAME       STATUS   ROLES           AGE   VERSION
# minikube   Ready    control-plane   1m    v1.31.x

# Open K8s dashboard (optional)
minikube dashboard`,
            },
            {
              type: 'callout',
              variant: 'info',
              title: 'Alternative: kind',
              html: '<strong>kind</strong> (Kubernetes in Docker) is a lighter alternative to Minikube — starts faster. Install with <code>brew install kind</code> then <code>kind create cluster</code>.',
            },
            {
              type: 'callout',
              variant: 'warn',
              title: 'Resources',
              html: 'Minikube requires at least <strong>2 CPUs</strong> and <strong>2GB RAM</strong>. On low-end machines, use <code>minikube start --cpus=2 --memory=2048</code> to limit resources.',
            },
          ],
        },
      ],
    },
    {
      id: 'chapter3',
      title: 'Core Concepts',
      sections: [
        {
          id: 'pods',
          title: 'Pods',
          subtitle: 'The smallest deployable unit in K8s',
          icon: '🫛',
          iconColor: 'bg-green-100',
          blocks: [
            {
              type: 'text',
              html: 'A <strong>Pod</strong> is the smallest deployable unit in K8s. Each Pod contains one or more containers sharing the same network and storage. In practice, 99% of the time each Pod runs just 1 container.',
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
              code: `# Create a Pod from YAML
kubectl apply -f pod.yaml

# List Pods
kubectl get pods

# View Pod details
kubectl describe pod my-app

# View logs
kubectl logs my-app

# Access shell inside Pod
kubectl exec -it my-app -- /bin/sh

# Delete Pod
kubectl delete pod my-app`,
            },
            {
              type: 'callout',
              variant: 'ok',
              title: 'Verify',
              html: 'After <code>kubectl apply -f pod.yaml</code>, confirm the Pod is running:<br><br><code>kubectl get pods</code><br><br>Expected output:<pre>NAME     READY   STATUS    RESTARTS   AGE\nmy-app   1/1     Running   0          15s</pre>If status is <code>ContainerCreating</code>, wait a few seconds and re-run. For more detail: <code>kubectl describe pod my-app</code>.',
            },
            {
              type: 'callout',
              variant: 'warn',
              title: "Don't deploy Pods directly",
              html: 'In practice, <strong>never</strong> create Pods directly. Use a <strong>Deployment</strong> instead — it manages Pods, restarts on crash, and supports rolling updates.',
            },
          ],
        },
        {
          id: 'deployments',
          title: 'Deployments',
          subtitle: 'Manage and scale your applications',
          icon: '🚀',
          iconColor: 'bg-blue-100',
          blocks: [
            {
              type: 'text',
              html: 'A <strong>Deployment</strong> manages a set of identical Pods (replicas). It ensures the desired number of Pods is always running, auto-restarts failed Pods, and supports rolling updates when deploying new versions.',
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
              code: `# Create Deployment
kubectl apply -f deployment.yaml

# View Deployments
kubectl get deployments

# Scale to 5 replicas
kubectl scale deployment my-app --replicas=5

# Update image (rolling update)
kubectl set image deployment/my-app my-app=my-app:2.0

# Check rollout status
kubectl rollout status deployment/my-app

# Rollback to previous version
kubectl rollout undo deployment/my-app`,
            },
            {
              type: 'callout',
              variant: 'ok',
              title: 'Verify',
              html: 'After <code>kubectl apply -f deployment.yaml</code>, confirm all replicas are running:<br><br><code>kubectl get deployments</code><br><code>kubectl get pods</code><br><br>Expected output:<pre>NAME     READY   UP-TO-DATE   AVAILABLE\nmy-app   3/3     3            3</pre>All pods should show <code>1/1 Running</code>. Inspect a pod with <code>kubectl describe pod &lt;pod-name&gt;</code> if any show errors.',
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Resource Requests & Limits',
              html: 'Always set <code>resources.requests</code> (minimum) and <code>resources.limits</code> (maximum) for CPU and memory. The Scheduler uses requests to select a Node; limits prevent a container from consuming too many resources.',
            },
          ],
        },
        {
          id: 'services',
          title: 'Services',
          subtitle: 'Expose your application to the outside world',
          icon: '🌐',
          iconColor: 'bg-purple-100',
          blocks: [
            {
              type: 'text',
              html: 'A <strong>Service</strong> provides a stable network address for a group of Pods. Pods can be created and destroyed constantly, but the Service keeps a consistent IP and DNS name.',
            },
            {
              type: 'table',
              caption: 'Service types',
              headers: ['Type', 'Description', 'Use case'],
              rows: [
                ['ClusterIP', 'Accessible only within the cluster', 'Internal service-to-service communication'],
                ['NodePort', 'Opens a port on each Node (30000-32767)', 'Dev/test, external access'],
                ['LoadBalancer', 'Creates a load balancer on cloud providers', 'Production on AWS/GCP/Azure'],
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
    app: my-app        # Select Pods with label app=my-app
  ports:
    - port: 80          # Service port
      targetPort: 3000  # Container port
      nodePort: 30080   # External access port`,
            },
            {
              type: 'code',
              lang: 'bash',
              code: `# Create Service
kubectl apply -f service.yaml

# View Services
kubectl get services

# Access app via Minikube
minikube service my-app-service --url
# http://192.168.49.2:30080`,
            },
            {
              type: 'callout',
              variant: 'ok',
              title: 'Verify',
              html: 'After <code>kubectl apply -f service.yaml</code>, confirm the Service is created and has correct endpoints:<br><br><code>kubectl get services</code><br><code>kubectl get endpoints my-app-service</code><br><br>The endpoints list should show Pod IPs — if it is empty, the Service selector labels do not match the Pod labels. Use <code>kubectl describe service my-app-service</code> to inspect.',
            },
          ],
        },
        {
          id: 'namespaces',
          title: 'Namespaces',
          subtitle: 'Partition resources within a cluster',
          icon: '📁',
          iconColor: 'bg-yellow-100',
          blocks: [
            {
              type: 'text',
              html: '<strong>Namespaces</strong> divide a cluster into separate logical partitions. Useful when multiple teams or environments (dev/staging/prod) share the same cluster.',
            },
            {
              type: 'code',
              lang: 'bash',
              code: `# List namespaces
kubectl get namespaces

# Create a namespace
kubectl create namespace staging

# Deploy to a specific namespace
kubectl apply -f deployment.yaml -n staging

# View resources in a namespace
kubectl get all -n staging

# Set default namespace for context
kubectl config set-context --current --namespace=staging`,
            },
            {
              type: 'callout',
              variant: 'ok',
              title: 'Verify',
              html: 'After <code>kubectl create namespace staging</code>, confirm it exists:<br><br><code>kubectl get namespaces</code><br><br>Expected: <code>staging</code> appears with <code>Active</code> status. Then verify your deployment landed in the correct namespace: <code>kubectl get all -n staging</code>.',
            },
            {
              type: 'callout',
              variant: 'info',
              title: 'Default namespaces',
              html: 'K8s comes with: <code>default</code> (default), <code>kube-system</code> (system components), <code>kube-public</code> (public resources). Avoid deploying apps into <code>kube-system</code>.',
            },
          ],
        },
      ],
    },
    {
      id: 'chapter4',
      title: 'Hands-on: Deploy an App',
      sections: [
        {
          id: 'deploy-nodejs-app',
          title: 'Deploy a Node.js App',
          subtitle: 'From Docker image to K8s cluster',
          icon: '🎯',
          iconColor: 'bg-emerald-100',
          blocks: [
            {
              type: 'text',
              html: "Let's deploy a simple Node.js application to Minikube. First step: build a Docker image and load it into Minikube.",
            },
            {
              type: 'callout',
              variant: 'tip',
              title: "Use Minikube's Docker daemon",
              html: "Run <code>eval $(minikube docker-env)</code> to use Minikube's internal Docker daemon. Images built here will be available in the cluster without pushing to a registry.",
            },
            {
              type: 'code',
              lang: 'bash',
              code: `# Use Minikube's Docker daemon
eval $(minikube docker-env)

# Build image (from directory with Dockerfile)
docker build -t my-node-app:1.0 .

# Verify image
docker images | grep my-node-app`,
            },
            {
              type: 'text',
              html: 'Create a Deployment + Service in a single YAML file (separated by <code>---</code>):',
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
          imagePullPolicy: Never  # Use local image
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
              code: `# Deploy everything
kubectl apply -f k8s-app.yaml

# Verify
kubectl get pods
# NAME                        READY   STATUS    RESTARTS   AGE
# node-app-7d8f9b6c5-abc12   1/1     Running   0          30s
# node-app-7d8f9b6c5-def34   1/1     Running   0          30s

kubectl get services
# NAME               TYPE       CLUSTER-IP     PORT(S)
# node-app-service   NodePort   10.96.xxx.xx   80:3xxxx/TCP

# Open in browser
minikube service node-app-service`,
            },
            {
              type: 'callout',
              variant: 'ok',
              title: 'Verify',
              html: 'After <code>kubectl apply -f k8s-app.yaml</code>, both pods should reach <code>Running</code> state within ~30 seconds. Confirm with:<br><br><code>kubectl get pods -w</code><br><br>Then get the app URL and test it:<br><code>minikube service node-app-service --url</code><br><br>Open the printed URL in your browser — you should see your Node.js app respond.',
            },
          ],
        },
        {
          id: 'scale-and-update',
          title: 'Scale & Rolling Update',
          subtitle: 'Scale and update with zero downtime',
          icon: '📈',
          iconColor: 'bg-orange-100',
          blocks: [
            {
              type: 'text',
              html: 'K8s lets you scale the number of replicas and update images without stopping the application.',
            },
            {
              type: 'code',
              lang: 'bash',
              code: `# ── Scale ────────────────────────────────
# Scale up to 5 replicas
kubectl scale deployment node-app --replicas=5

# Watch new pods being created
kubectl get pods -w  # -w = watch in real-time

# ── Rolling Update ───────────────────────
# Build a new version
docker build -t my-node-app:2.0 .

# Update the image
kubectl set image deployment/node-app node-app=my-node-app:2.0

# Watch rollout progress
kubectl rollout status deployment/node-app
# Waiting for deployment "node-app" rollout to finish...
# deployment "node-app" successfully rolled out

# ── Rollback if something goes wrong ─────
kubectl rollout undo deployment/node-app

# View rollout history
kubectl rollout history deployment/node-app`,
            },
            {
              type: 'callout',
              variant: 'ok',
              title: 'Zero Downtime',
              html: 'Rolling updates create new Pods first, wait for them to be healthy, then remove old Pods. Users experience no interruption.',
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
          subtitle: 'Manage configuration and sensitive data',
          icon: '🔐',
          iconColor: 'bg-red-100',
          blocks: [
            {
              type: 'text',
              html: '<strong>ConfigMap</strong> stores configuration as key-value pairs. <strong>Secret</strong> stores sensitive data (passwords, API keys) encoded in base64.',
            },
            {
              type: 'code',
              lang: 'yaml',
              filename: 'config.yaml',
              code: `# ConfigMap — general configuration
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  APP_PORT: "3000"
  LOG_LEVEL: "info"
  API_URL: "https://api.example.com"
---
# Secret — sensitive data
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
              html: 'Use them in a Deployment:',
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
            name: app-config    # Inject all keys from ConfigMap
        - secretRef:
            name: app-secrets   # Inject all keys from Secret`,
            },
            {
              type: 'callout',
              variant: 'danger',
              title: 'Securing Secrets',
              html: 'K8s Secrets are only base64-encoded (easily decoded). In production, use <strong>Sealed Secrets</strong> or <strong>External Secrets Operator</strong> with AWS Secrets Manager / HashiCorp Vault.',
            },
          ],
        },
        {
          id: 'persistent-volumes',
          title: 'Persistent Volumes',
          subtitle: 'Durable storage for containers',
          icon: '💾',
          iconColor: 'bg-teal-100',
          blocks: [
            {
              type: 'text',
              html: 'Containers are ephemeral — data is lost when a Pod is deleted. <strong>PersistentVolume (PV)</strong> and <strong>PersistentVolumeClaim (PVC)</strong> provide durable storage.',
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
      storage: 5Gi  # Request 5GB of storage`,
            },
            {
              type: 'text',
              html: 'Mount a PVC into a Pod:',
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
          title: 'Essential Commands',
          subtitle: 'Quick reference for kubectl commands',
          icon: '📋',
          iconColor: 'bg-amber-100',
          blocks: [
            {
              type: 'table',
              caption: 'Resource management',
              headers: ['Command', 'Description'],
              rows: [
                ['kubectl get pods', 'List all Pods'],
                ['kubectl get all', 'List all resources'],
                ['kubectl get pods -o wide', 'Show additional info (IP, Node)'],
                ['kubectl describe pod &lt;name&gt;', 'Pod details (events, config)'],
                ['kubectl apply -f file.yaml', 'Create/update resource from YAML'],
                ['kubectl delete -f file.yaml', 'Delete resource from YAML'],
                ['kubectl delete pod &lt;name&gt;', 'Delete a specific Pod'],
              ],
            },
            {
              type: 'table',
              caption: 'Debug & Troubleshoot',
              headers: ['Command', 'Description'],
              rows: [
                ['kubectl logs &lt;pod&gt;', 'View Pod logs'],
                ['kubectl logs -f &lt;pod&gt;', 'Follow logs in real-time'],
                ['kubectl logs &lt;pod&gt; -c &lt;container&gt;', 'Logs for a specific container in Pod'],
                ['kubectl exec -it &lt;pod&gt; -- /bin/sh', 'Access shell inside Pod'],
                ['kubectl port-forward &lt;pod&gt; 8080:3000', 'Forward port for local testing'],
                ['kubectl top pods', 'View CPU/memory usage'],
              ],
            },
          ],
        },
        {
          id: 'debugging-tips',
          title: 'Debugging Tips',
          subtitle: 'Handle common errors',
          icon: '🔧',
          iconColor: 'bg-rose-100',
          blocks: [
            {
              type: 'table',
              caption: 'Pod status & solutions',
              headers: ['Status', 'Cause', 'Solution'],
              rows: [
                ['ImagePullBackOff', 'Cannot pull image', 'Check image name, registry credentials'],
                ['CrashLoopBackOff', 'Container keeps crashing', 'Check logs: kubectl logs &lt;pod&gt; --previous'],
                ['Pending', 'Insufficient resources', 'Check node resources: kubectl describe node'],
                ['ErrImageNeverPull', 'imagePullPolicy: Never but image missing', 'Build image on Minikube: eval $(minikube docker-env)'],
              ],
            },
            {
              type: 'code',
              lang: 'bash',
              code: `# Debugging workflow for a failing Pod
# 1. Check status
kubectl get pods

# 2. View events and details
kubectl describe pod <pod-name>

# 3. Check logs (add --previous if container has crashed)
kubectl logs <pod-name>
kubectl logs <pod-name> --previous

# 4. Access running container
kubectl exec -it <pod-name> -- /bin/sh

# 5. Check Node resources
kubectl top nodes
kubectl describe node <node-name>`,
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Cleanup when done',
              html: 'Delete all resources: <code>kubectl delete all --all</code>. Stop Minikube: <code>minikube stop</code>. Delete cluster entirely: <code>minikube delete</code>.',
            },
          ],
        },
        {
          id: 'troubleshooting',
          title: 'Troubleshooting',
          subtitle: 'Common Kubernetes issues and solutions',
          icon: '🩺',
          iconColor: 'bg-red-100',
          blocks: [
            {
              type: 'text',
              html: '<strong>Pod stuck in ImagePullBackOff</strong>',
            },
            {
              type: 'callout',
              variant: 'danger',
              title: 'Cause',
              html: 'Wrong image name or tag, or the image is in a private registry and the cluster has no credentials to pull it.',
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Fix',
              html: 'Double-check the image name and tag in your Deployment spec. For private registries, create an <code>imagePullSecrets</code> entry: <code>kubectl create secret docker-registry regcred --docker-server=... --docker-username=... --docker-password=...</code> and reference it in the Pod spec.',
            },
            {
              type: 'text',
              html: '<strong>Pod stuck in CrashLoopBackOff</strong>',
            },
            {
              type: 'callout',
              variant: 'danger',
              title: 'Cause',
              html: 'The application inside the container is crashing on startup — due to a bug, missing env variable, failed health check, or misconfigured command.',
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Fix',
              html: 'Inspect logs from the last crash: <code>kubectl logs &lt;pod&gt; --previous</code>. Get full Pod details and events: <code>kubectl describe pod &lt;pod&gt;</code>. Fix the root cause in your app or Deployment config, then re-apply.',
            },
            {
              type: 'text',
              html: '<strong>Service not accessible</strong>',
            },
            {
              type: 'callout',
              variant: 'danger',
              title: 'Cause',
              html: 'The Service selector labels do not match the Pod labels, or the <code>targetPort</code> does not match the port the container listens on — so the Service has no endpoints.',
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Fix',
              html: 'Verify labels match between Service selector and Pod template: <code>kubectl get pods --show-labels</code>. Check endpoints: <code>kubectl get endpoints &lt;service-name&gt;</code> — it must not be empty. Confirm <code>targetPort</code> matches <code>containerPort</code> in the Deployment.',
            },
            {
              type: 'text',
              html: '<strong>PersistentVolumeClaim stuck in Pending</strong>',
            },
            {
              type: 'callout',
              variant: 'danger',
              title: 'Cause',
              html: 'No PersistentVolume matches the PVC request — either no PV has been provisioned, the <code>storageClassName</code> is wrong, or the requested storage size exceeds available PVs.',
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Fix',
              html: 'List available PVs: <code>kubectl get pv</code>. Check the PVC spec matches a PV in terms of <code>storageClassName</code>, access modes, and size. On Minikube, use <code>storageClassName: standard</code> (the default provisioner) or leave <code>storageClassName</code> unset.',
            },
          ],
        },
      ],
    },
  ],
};

export default tutorial;
