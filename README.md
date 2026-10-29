# MB School Trip Interest — MB Learning Assessment

A full-stack School Trip Interest web application built with **Next.js (App Router)**, **JavaScript**, **Tailwind CSS**, and **Supabase (PostgreSQL & Auth)** for **MB Learning**.

---

## 🚀 How to Run It

### 1. Prerequisites
- **Node.js** (v18+)
- **npm** (v9+)

### 2. Clone & Install
```bash
git clone https://github.com/NaveedAfraz/school-trip-interest.git
cd school-trip-interest
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory (or copy from `.env.example`):
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_your_key_here
```

### 4. Run Development Server
```bash
npm run dev
```
- **Public Homepage**: [http://localhost:3000](http://localhost:3000)
- **Admin Portal**: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
  - **Demo Admin Email**: `admin@mblearning.com`
  - **Demo Admin Password**: `AdminSecurePass2026!`
  - *(Tip: You can click the **"Fill Demo Admin"** button on the login screen to auto-fill credentials instantly)*

### 5. Production Build
```bash
npm run build
npm run start
```

---

## 🌟 What Was Built

### 1. Public Homepage (`/`)
- **Atmospheric Hero Section with Stock Video**: Features a background video overlay with clean contrast, live stats ticker strip, and syllabus-aligned messaging.
- **Sample Educational Expeditions**:
  - **Singapore STEM Explorer** (Robotics & AI workshops, A*STAR Labs, NEWater sustainability)
  - **Jaipur Heritage & Culture** (Amber Fort, Jantar Mantar observatory, block-printing crafts)
  - **London Universities Discovery** (Imperial College, Oxford, UCL campus tours)
  - Dynamic support for newly added itineraries (e.g. custom trips created via Admin).
- **Interactive Trip Selection**: Clicking *"Select & Register Interest"* smoothly scrolls down, selects the itinerary, and highlights batch limits.
- **Teacher / Coordinator Registration Form**:
  - Full Name, School Name, Official Email, Phone Number, Selected Trip, and Estimated Students (1–500).
  - Pure JavaScript server-side validation with instant client-side feedback.
  - **Smart Multi-Cohort Delegation Advisory**: Dynamically advises coordinators when student counts exceed single-cohort capacity.
  - Saved directly to Supabase with PostgreSQL foreign key relations.

### 2. Protected Admin Suite (`/admin`)
- **Supabase Email Authentication**: Secure session-based authentication with role verification in PostgreSQL.
- **Executive Analytics Overview**:
  - Live aggregated KPIs: Total Registrations, Total Student Travelers, Average Batch Size, Active Itineraries.
  - Per-trip student distribution cards with animated capacity share bars.
- **Registered Inquiries Management**:
  - Searchable table across coordinator names, schools, emails, and phone numbers.
  - Filter inquiries by itinerary with real-time submission count badges.
  - One-click CSV export (`Export CSV`) formatted for spreadsheet review.
- **Trip Catalog Management (Full CRUD)**:
  - Add new trips with name, destination, duration, category, and student cohort limits.
  - Edit existing trip details with live toast notifications.
  - Delete trips with confirmation modal.
  - Clean decoupled metadata architecture.

---

## 🔮 What I Would Add Next

1. **Automated Proposal PDF & Email Delivery**: Integrate Resend or AWS SES to send an instant, branded itinerary PDF to the coordinator right upon submission.
2. **Inquiry Workflow Statuses**: Add status tracking (`New`, `Under Review`, `Proposal Sent`, `Confirmed`) so tour coordinators can update lead stages.
3. **Bot Protection & Rate Limiting**: Add Cloudflare Turnstile and Upstash Redis rate limiting on the registration server action.
4. **Calendar Consultation Integration**: Allow coordinators to book a 15-minute Google Meet / Cal.com consultation with the tour director right from the success screen.
5. **WhatsApp Notifications**: Trigger an instant alert to the MB Learning operations team when a large delegation (>50 students) registers interest.

---

## 🤖 AI Tools Disclosure

In line with MB Learning's assessment request for complete honesty:
- **Google Antigravity & LLMs (Claude Sonnet & Gemini)**:
  - Used as an AI pair programmer for rapid UI scaffolding with Tailwind CSS.
  - Assisted in structuring Supabase Row Level Security (RLS) policies and Next.js App Router Server Actions.
  - Assisted with responsive CSS debugging, palette refinements, and copy drafting.
- Every architectural decision (plain JavaScript validation without bloated libraries, decoupled metadata storage, mobile responsiveness, and security boundary checks) was reviewed, tested, and verified directly.
