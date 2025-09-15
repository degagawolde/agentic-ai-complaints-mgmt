agentic-complaints/                # root of repo
├─ .env.example
├─ README.md
├─ docker-compose.yml
├─ k8s/                            # k8s manifests (deployments, kustomize)
├─ infra/                          # terraform / infra scripts (optional)
│
├─ services/
│  ├─ api/                         # FastAPI backend (public API + admin endpoints)
│  │  ├─ Dockerfile
│  │  ├─ src/
│  │  │  ├─ app/
│  │  │  │  ├─ main.py
│  │  │  │  ├─ api/
│  │  │  │  │  ├─ routes/
│  │  │  │  │  └─ schemas/
│  │  │  │  ├─ core/                # config, logging, auth
│  │  │  │  ├─ models/              # SQLAlchemy models
│  │  │  │  ├─ db/                  # session, migrations helper
│  │  │  │  └─ services/            # thin wrappers for business logic
│  │  │  └─ requirements.txt
│  │  └─ tests/
│  │
│  ├─ ai-orchestration/            # LangGraph workflows + LangChain tool wrappers
│  │  ├─ Dockerfile
│  │  ├─ src/
│  │  │  ├─ workflows/              # LangGraph definition & nodes
│  │  │  │  ├─ nodes/
│  │  │  │  │  ├─ ingestion_node.py
│  │  │  │  │  ├─ relevance_node.py
│  │  │  │  │  └─ validation_node.py
│  │  │  ├─ tools/                  # LangChain Tools: SQLTool, VectorTool, NotifierTool
│  │  │  ├─ prompts/                # centralized prompt templates
│  │  │  ├─ embeddings/             # embedding & index scripts
│  │  │  ├─ config.py
│  │  │  └─ app.py                  # runner (exposes gRPC/HTTP to API service)
│  │  └─ requirements.txt
│  │
│  ├─ worker/                       # Celery / RQ workers for async email/SMS & indexing
│  │  ├─ Dockerfile
│  │  ├─ src/
│  │  │  ├─ tasks/
│  │  │  │  ├─ notifications.py
│  │  │  │  └─ indexer.py
│  │  │  └─ worker.py
│  │  └─ requirements.txt
│  │
│  └─ web/                          # React admin/department portal & customer portal
│     ├─ Dockerfile
│     ├─ src/
│     │  ├─ pages/
│     │  ├─ components/
│     │  └─ services/
│     └─ package.json
│
├─ scripts/
│  ├─ seed_kb.py                    # split & embed policies into vector DB
│  ├─ migrate.sh
│  └─ import_samples.py
│
├─ docs/
│  ├─ prompts.md
│  ├─ arch-diagram.png
│  └─ runbook.md
│
└─ tests/
   ├─ e2e/
   └─ unit/
