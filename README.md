# GC Training Programme

Doctrinal initiation platform for Maison Grande Charte ambassadors. Built with Next.js 14, Supabase, and Tailwind CSS.

---

## Setup

### 1. Clone and install

```bash
git clone https://github.com/wondertracker/gc-training.git
cd gc-training
npm install
```

### 2. Configure environment variables

Copy the example file and fill in your Supabase credentials:

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Run Supabase migration

In the Supabase dashboard → SQL Editor, paste and run the contents of:

```
supabase/migrations/001_initial.sql
```

This creates the following tables:
- `profiles` — user profiles (extends `auth.users`)
- `training_sessions` — one per user
- `module_progress` — one row per module per session
- `certificates` — issued when all 6 modules are passed

Row-level security policies are applied so users can only see their own data.

### 4. Configure Supabase Auth

In the Supabase dashboard:
- **Authentication → Settings**: Disable "Confirm email" for development (or configure SMTP for production)
- **Authentication → URL Configuration**: Add `http://localhost:3000/auth/callback` to "Redirect URLs"
- For production, add your Vercel URL as well

### 5. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Setting admin role

To grant admin access to a user, run this in the Supabase SQL Editor:

```sql
UPDATE profiles
SET role = 'admin'
WHERE id = 'paste-user-uuid-here';
```

You can find user UUIDs in Supabase → Authentication → Users.

Admins can access `/admin` to view the dashboard, trainee table, and individual trainee progress.

---

## Deployment (Vercel)

1. Push to GitHub
2. Import the repository in Vercel
3. Add all four environment variables in Vercel project settings
4. Deploy — `vercel.json` is already configured

In Supabase Auth settings, add your Vercel production URL to "Redirect URLs":
```
https://your-app.vercel.app/auth/callback
```

---

## Environment variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon (public) key |
| `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase service role key (admin operations) |
| `NEXT_PUBLIC_APP_URL` | Your app URL (e.g. `https://gc-training.vercel.app`) |

---

## Application structure

```
app/
  auth/login/          Sign in / Register
  auth/callback/       Supabase OAuth callback
  (training)/          Auth-guarded training routes
    page.tsx           Home: module grid
    prologue/          Doctrinal prologue
    module/[index]/    Module reading view
    module/[index]/quiz/  Quiz (MCQ + scenario)
    result/[index]/    Pass / fail result
  certificate/[id]/    Printable certificate (public)
  admin/               Admin section (role-guarded)
    page.tsx           Dashboard
    trainees/          Trainee table
    trainees/[user_id] Trainee detail

lib/
  supabase/            Supabase client helpers
  training/            All content and types
    data-prologue.ts
    data-modules-1-3.ts
    data-modules-4-6.ts
    data.ts            Re-exports + MODULES() function
    types.ts
    constants.ts
```

---

## Training logic

- **Pass threshold**: 2 of 3 MCQ questions correct (≥ 2/3)
- **Module progression**: Module N unlocks only when Module N-1 is passed
- **Retakes**: Unlimited. `best_score` records the highest score across all attempts
- **Certificate**: Automatically issued when all 6 modules are passed. Accessible at `/certificate/[id]`
- **Language**: EN / FR togglable at any time, stored in `profiles.language`

---

## Content

All training content (prologues, sections, quizzes) lives in `/lib/training/data-modules-*.ts`. Content is sourced verbatim from `gc_training_v2_1.jsx`.

To update content, edit those files directly. No database migration required for content changes.
