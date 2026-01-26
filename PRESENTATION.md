---
marp: true
theme: default
paginate: true
style: |
  section {
    background-color: white;
    font-family: 'Arial', sans-serif;
    padding: 40px;
  }
  h1 {
    color: #2b6cb0;
  }
  h2 {
    color: #2c5282;
  }
  strong {
    color: #e53e3e;
  }

---

<!-- Slide 1: Thesis Title & Team -->
# SPINEVISION-AI
## AI-Based Spine Disease Detection & Analysis

**Final Year Project (FYP-I) Progress**

### 👥 Team Members
*   **Imad Ud Din**
*   **Hammad Ali Khan**
*   **Zia Ur Rahman**

### 👨‍🏫 Supervisor
*   **Dr. Suhaib Qureshi**

---

<!-- Slide 2: Problem & Motivation -->
## 📌 Problem Statement & Motivation

### The Challenge
*   **Manual Diagnosis:** Analyzing spine X-rays is time-consuming and prone to human error (fatigue/subjectivity).
*   **Subtle Pathologies:** Early signs of disc narrowing or spondylolisthesis are easily missed.
*   **Radiologist Shortage:** High patient volume vs. limited experts leads to delayed treatments.

### Our Motivation
To assist radiologists—not replace them—by providing a **Second Opinion System** that ensures:
*   ⚡ **Speed:** Instant analysis.
*   🎯 **Accuracy:** AI-driven detection.
*   📄 **Automation:** Auto-generated diagnostic reports.

---

<!-- Slide 3: Previous Evaluation -->
## 📝 Previous Evaluation Comments

*   **Dataset Scope:** "Clarify the source and size of the dataset; ensure it covers local demographics if possible."
*   **Model Validation:** "Need robust metrics beyond just accuracy (e.g., F1-score, Recall)."
*   **Real-world Applicability:** "How will this integrate into a doctor's actual workflow?"
*   **Data Imbalance:** "Address how the system handles rare diseases vs. common ones."

*(Note: These points address the supervisor's earlier feedback on data and practical usage)*

---

<!-- Slide 4: Progress & Addressed Issues -->
## 🚀 Progress & Addressed Issues

### ✅ Current Status
*   **Authentication & Backend:** Fully functional (FastAPI/JWT).
*   **Deployment:** Initial deployment pipeline established.
*   **Report Generation:** working prototype using **RAG (Retrieval-Augmented Generation)**.

### 🚧 Challenges & Solutions
1.  **Data Imbalance:**
    *   *Issue:* Uneven distribution of disease classes in RSNA/MURA datasets.
    *   *Solution:* Applying **Data Augmentation** and class weighting mechanisms.
2.  **Model Selection:**
    *   **U-Net:** Employed for precise segmentation of spinal vertebrae.
    *   **DenseNet:** Utilized for high-accuracy disease classification.
3.  **Data Strategy:** actively curating a balanced subset under Dr. Qureshi's guidance.

---

<!-- Slide 5: Timeline -->
## 📅 Timeline (8th Semester)

| Phase | Timeline | Key Activities |
| :--- | :--- | :--- |
| **Phase 1** | **Feb - Mar** | • Train & Fine-tune **U-Net** & **DenseNet** models<br>• Address data imbalance with synthetic data |
| **Phase 2** | **April** | • Full Frontend (**React**) integration with Backend<br>• Refine **RAG** report engine |
| **Phase 3** | **May** | • System Testing & Validation<br>• Final Cloud Deployment |
| **Phase 4** | **June** | • Final Thesis Writing<br>• Project Defense Preparation |

---

<!-- Slide 6: Deliverables -->
## 📦 Deliverables & Outcomes

Upon completion, **SPINEVISION-AI** will deliver:

1.  **Web-Based Platform:** A fully responsive diagnostic portal for doctors.
2.  **AI Engine:** Trained weights for **U-Net** (Segmentation) and **DenseNet** (Classification).
3.  **Automated Reporting:** PDF reports generated via RAG technology.
4.  **Documentation:** Complete Thesis Report and API Documentation.
5.  **Source Code:** GitHub repository with deployment scripts.

---
