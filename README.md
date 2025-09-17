# Compliant Management System

[Documentatioin](docs/Agentic AI for Complaint Management.pdf)

## 1. Problem Statement & Objectives

Customers submit complaints through a structured web form. The system must triage, validate, route, resolve, and close complaints automatically or with human-in-the-loop, ensuring correctness, compliance, traceability, and continuous learning..

**Primary objectives**

* Accurately detect complaint relevance and required action (auto-resolve, human department, reject, ask for clarification).
* Validate human/department resolutions before they reach the customer using LLM + grounded company policy.
* Maintain auditability, SLAs, and feedback loops for model improvement.
* Stores complaints, resolutions, and communication logs in  **PostgreSQL/MySQL** .
* Reads from SQL when AI needs customer details, complaint history, or SLA deadlines.
* Sends **email and SMS notifications** with full logging in SQL.

**Success metrics**

* Accuracy of relevance classification (targetizable).
* % of resolutions accepted by LLM validation vs sent back for revision.
* Time-to-first-response (automated).
* Customer satisfaction (CSAT) post-resolution.
* False positive/negative rate for “not relevant”.

## **2. High-Level Workflow**

1. **Complaint Submission**
   * Complaint stored in  **SQL DB** .
   * Indexed in **Vector DB** if needed for semantic search.
2. **AI Initial Review**
   * AI pulls complaint data from SQL.
   * Uses RAG for relevance classification & completeness.
   * Retrieve policy/docs, ask LLM to decide relevance and produce a relevance score and explanation. Output: relevance decision + score + suggested category/department + confidence.
   * Updates SQL with complaint status (`pending`, `auto_resolved`, `forwarded`).
3. **AI Decision**
   * **Not relevant** → AI generates response, logs to SQL, sends via email/SMS.
   * **Auto-resolve** → AI generates resolution, saves in SQL, sends via email/SMS.
   * **Requires dept action** → complaint marked in SQL (`assigned`), routed to department.
4. **Department Handling**
   * Department user logs into portal, updates resolution in SQL.
5. **AI Validation**
   * AI fetches complaint & resolution from SQL.
   * Validates correctness vs policy (via RAG + rules).
   * Updates SQL with status (`validated`, `revision_requested`).
6. **Resolution Delivery**
   * AI triggers  **Notification Service** .
   * Email + SMS sent to customer, delivery logged in SQL.
7. **Feedback & Closure**
   * Final complaint status updated in SQL (`closed`).
   * Communication & resolution history archived.

## **3. System Architecture**

### **AI Layer**

* **LLM + SQL Agent + RAG**
  * **SQL Agent** : Converts natural language into SQL queries (e.g.,  *“fetch complaint history for customer X”* ).
  * **RAG** : Retrieves policy documents, FAQs, and legal texts.
  * **Combined** : Ensures consistency in decision-making.

### **Data Handling**

* **Structured Data** → Stored in  **SQL** .
* **Unstructured Data** → Stored in  **Vector DB** .

### **Vector Knowledge Store (RAG)**

* **Vector DB Options** : Pinecone, Milvus, Weaviate, or PostgreSQL + pgvector.
* **Content Stored** : Policy documents, SLA rules, product catalog, prior resolved cases, templates.
* **Retrieval & Context Builder** :
* Retriever (semantic + keyword hybrid).
* Top-k document selection.
* Relevance filters.
* **LLM Orchestration & Prompting Layer** :
* Relevance checking.
* Resolution generation.
* Resolution validation.
* Drafting clarification questions.
* Generating explanations.

### **Security & Compliance**

* Role-Based Access Control (RBAC).
* PII detection and redaction.
* Encryption (at rest & in transit).
* Consent tracking.

### **Human-in-the-Loop (HITL)**

* Department workbench.
* Validation review UI.
* Manual override capability.

### **Notifications**

* **Email** : SMTP / AWS SES / SendGrid.
* **SMS** : Twilio / AWS SNS.
* **Logging** : All notifications stored in SQL with delivery status.

## **4. Feature Set & Technical Requirements**

### **Core Features**

1. Complaint submission & storage (SQL).
2. AI initial review (SQL + RAG).
3. Department assignment & workflow (SQL-driven).
4. AI validation of resolution (SQL + RAG).
5. Multi-channel communication (email + SMS), with SQL logging.
6. Feedback loop & audit trail.

### **Technical Requirements**

* **Backend** : Django/FastAPI (Python) → ORM for SQL, LangChain for AI agents.
* **Database** : PostgreSQL / MySQL.
* **Vector DB** : Pinecone, Weaviate, or pgvector (Postgres extension).
* **AI Orchestration** : LangChain or LlamaIndex (for LLM + SQL + RAG).
* **Notification Service** : Celery/RQ workers for async email & SMS delivery.
* **Frontend** : React/Next.js portal for customers & departments.
* **Security** : JWT auth, RBAC, encryption of sensitive info.
* **Deployment** : Docker, Kubernetes for scaling.
