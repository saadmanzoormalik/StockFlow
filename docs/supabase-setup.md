# Supabase Setup

## Goal

Turn the local SQL schema into a live database for onboarding profiles, portfolio connections, personalized recommendations, learning events, and evaluations.

## Create Project

1. Go to [Supabase](https://supabase.com).
2. Create a new project.
3. Recommended project name: `stock-pick-check`.
4. Save the database password somewhere secure.

## Run Migration

In the Supabase dashboard:

1. Open the project.
2. Go to SQL Editor.
3. Open `supabase/migrations/001_initial.sql` from this repo.
4. Paste the SQL into Supabase SQL Editor.
5. Run it.

## Environment Variables

In Supabase dashboard:

1. Project Settings.
2. API.
3. Copy:
   - Project URL
   - anon public key
   - service_role secret key

Add them to `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

Never commit `.env.local`.

## API Routes Now Ready

- `POST /api/onboarding`
  - Persists risk appetite, strategy preference, and onboarding answers.
- `POST /api/portfolio`
  - Persists provider and holdings snapshot.
- `GET /api/personalized-picks`
  - Returns demo personalized top picks.
- `POST /api/learning`
  - Accepts learning events.

## Production Security

Before launch:

- Add Supabase Row Level Security policies.
- Use authenticated user IDs instead of demo UUIDs.
- Keep `SUPABASE_SERVICE_ROLE_KEY` server-side only.
- Encrypt/secure provider tokens.
- Add account deletion and data export paths.
