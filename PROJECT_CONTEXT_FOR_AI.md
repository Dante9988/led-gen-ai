# Closely AI - Complete Implementation Document

This document provides a comprehensive and exhaustive overview of the Closely AI project, its architecture, database schemas, API routes, and all implemented components. This serves as the ultimate source of truth for AI assistants joining the project.

## 1. High-Level Overview
**Project Name:** Closely AI (MLM Growth Engine SaaS / Lead Generation AI Engine)
**Description:** A Next.js SaaS application providing network marketers and agents with robust lead capture, a dedicated CRM dashboard, Stripe-integrated billing, and AI-powered tools.
**Current Phase:** Production-ready MVP for Lead Capture, Profile Management, CRM, and Billing.

## 2. Tech Stack
*   **Framework:** Next.js 16.1.6 (App Router)
*   **Language:** TypeScript
*   **UI/Styling:** React 19.2.3, Tailwind CSS v4, `clsx`, `tailwind-merge`
*   **Backend & Database:** Supabase (PostgreSQL) (`@supabase/ssr` & `@supabase/supabase-js`)
*   **AI Integration:** OpenAI SDK (`openai` 6.29.0)
*   **Payments:** Stripe (`stripe` 20.4.1)
*   **Linting/Config:** ESLint 9, TypeScript 5

## 3. Database Schema & RLS (Supabase PostgreSQL)
Strict Row-Level Security (RLS) is applied to all tables to ensure data boundaries between agents.

*   `leads` **Table:** Primary CRM data.
    *   **Fields:** `id` (UUID), `owner_id` (References `auth.users`), `full_name`, `phone`, `email`, `source`, `status` (Enum: 'new', 'contacted', 'qualified', 'closed', 'lost'), `notes`, `last_contacted_at`, `next_follow_up_at`, `contact_attempts`, `last_message`, `activity_log` (JSONB), `created_at`, `updated_at`.
    *   **RLS:** Users manage only their own leads. Public can `INSERT` (for public forms/webhooks).
*   `profiles` **Table:** Agent public profiles for lead generation.
    *   **Fields:** `id` (References `auth.users`), `slug` (Unique path), `display_name`, `headline`, `description`, `created_at`, `updated_at`.
    *   **RLS:** Users manage their own profile. Public can `SELECT` (read).

## 4. Application Architecture & File Structure

The App Router (`app/`) is divided into distinct route groups:
*   `(auth)`: Authentication pages (Login, Signup).
*   `(dashboard)`: The main agent application. Includes `/dashboard`.
*   `(marketing)`: Public-facing landing pages and website content.
*   `(docs)`: Platform documentation containing UI mockups built with Tailwind.
*   `api`: Next.js Route Handlers (Backend).
*   `apply/[slug]`: Dynamic public lead capture forms belonging to an agent.
*   `actions`: Next.js Server Actions.

### 4.1. The Component Library (`components/`)
The UI is modularized into distinct business domains:
1.  **`components/billing`**: Handles Stripe subscription visual elements.
2.  **`components/docs`**: Handles documentation layout and mockups.
3.  **`components/import`**: UI for CSV parsing and bulk lead ingestion.
4.  **`components/layout`**: Core layout wrappers (Navbars, Footers, sidebars).
5.  **`components/leads`**: Data tables, lead Kanban cards, Activity Timelines, AI Assistant Modals, and CRM specific UI.
6.  **`components/marketing`**: Landing page hero sections, pricing tables.
7.  **`components/profile`**: Forms and UI for agents to edit their `slug` and profile data.
8.  **`components/ui`**: Reusable atomic UI components (Buttons, Inputs, Modals, Shareable Links).

### 4.2. Core Logic & Libraries (`lib/`)
Business logic is decoupled from UI into the `lib/` folder:
1.  `supabase/`: DB Clients (Browser and Server).
2.  `access.ts`: Data access controls and permission checks.
3.  `billing.ts` & `stripe.ts`: Wrapper for Stripe plans and webhook verifications.
4.  `leads.ts`: CRUD operations and queries for the CRM.
5.  `profiles.ts`: Fetching and updating agent profiles by ID or Slug.
6.  `import/` : Functions for parsing CSV data (`parseCSV.ts`).
7.  `ai/`: Helpers interfacing with the OpenAI SDK (specifically `followupGenerator.ts`).
8.  `docs-nav.ts`: Navigation configuration for the documents section.
9.  `utils.ts`: General utilities (like `cn` for Tailwind class grouping).

### 4.3. API Routes (`app/api/`)
1.  `api/leads`: Internal endpoints for the SPA to fetch/mutate CRM data (if not using Server Actions completely).
2.  `api/webhooks/leads`: Generic intake webhook. Any external service (e.g., Zapier) can POST JSON to this endpoint to create a lead for a specific `owner_id`.
3.  `api/stripe/webhook`: Handles Stripe subscription events (`customer.subscription.updated`, `customer.subscription.deleted`, `checkout.session.completed`).
4.  `api/ai/followup`: Next.js Route handlers for generating dynamic outbound context-aware messages via OpenAI.

## 5. Fully Implemented User Flows

1.  **Public Lead Intake Flow (Phase 3 Complete):**
    *   Agent generates a unique slug.
    *   Agent shares `closely.ai/apply/AGENT-SLUG`.
    *   Prospect fills out the form.
    *   Data bypasses RLS read (using public insert policy), mapping the lead to the agent's `owner_id`.
    *   Lead immediately appears in Agent's `(dashboard)` CRM with source marked as "Public Form".
2.  **Bulk Lead Import Flow:**
    *   Agent navigates to CRM dashboard.
    *   Selects CSV file containing offline contacts.
    *   `lib/import/parseCSV.ts` validates columns.
    *   Leads are bulk-inserted directly into Supabase.
3.  **Automated Webhook Flow:**
    *   Agent uses their unique identifier to configure generic webhooks via third party apps.
    *   `POST /api/webhooks/leads` processes payload and inserts securely into the DB.
4.  **Billing & Monetization Flow:**
    *   Stripe Checkout integrated.
    *   Webhook validates Stripe events securely via `route.ts`.
5.  **AI Follow-Up Assistant Flow (Phase 4):** 
    *   Generates contextual messages leveraging lead and profile data. 
    *   Modal interface triggers directly from the Kanban board.
    *   Native outbound message hooks (`sms:`, `mailto:`) that seamlessly capture `<textarea>` outputs into `last_message` states and automated status progression.
6.  **Active Follow-Up CRM Engine (Phase 5):** 
    *   Kanban cards auto-calculate urgency bounds (e.g. 24h neglected orange badges, Scheduled Follow-up countdown pills).
    *   Lead Profiles render vertical `Activity Timeline` components unpacking structured `activity_log` JSON to trace exact dates of status changes, notes, and explicit communication attempts.

## 6. What is Pending / Future Phases
*   **Deep RAG (Retrieval-Augmented Generation):** Pre-allocated blocks inside `followupGenerator.ts` await LangChain + Supabase pgvector embedding to scrape agent-provided PDFs for perfect autonomous script replication.
*   **Advanced CRM Analytics:** Dashboards showing charts/graphs for lead conversion rates over 30/60/90 day periods.

---
*End of Document. Use this entire context to answer architectural or implementation questions accurately.*
