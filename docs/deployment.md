# Deployment Plan

## Web Deployment

Preferred MVP path:

1. Push repo to GitHub.
2. Create Supabase project.
3. Run SQL migration from `supabase/migrations/001_initial.sql`.
4. Add environment variables from `.env.example`.
5. Connect repo to Vercel or Render.
6. Set build command: `npm run build`.
7. Set start command: `npm run start`.
8. Add health endpoint before production launch.

## Subscription

Use Stripe Checkout:

- $29.99/month price
- 3-4 day free trial
- webhook updates subscription state
- gate premium recommendation details by subscription status

## Portfolio Connection

Start in sandbox:

- Plaid for broad account connectivity
- SnapTrade for brokerage holdings
- Yodlee/MX as alternatives if needed

Production must use read-only access, token encryption, user consent, and disconnect controls.
