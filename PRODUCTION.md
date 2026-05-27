# Production Deployment

## ⚠️ Important: Database

SQLite does not work on cloud hosting platforms (Render, Railway, Vercel, etc.).

### Option 1 — PostgreSQL

Switch to PostgreSQL on [Render](https://render.com), [Railway](https://railway.app), or [Supabase](https://supabase.com).

Update your `DATABASE_URL` in `.env` and run:

```bash
npx prisma db push
```

### Option 2 — Turso (SQLite in the cloud)

Use [Turso](https://turso.tech) to run SQLite in production with edge replication.
