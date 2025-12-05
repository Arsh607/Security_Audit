# New Component – Scheduled Pick-Up System (Planned with Node-cron)

## Chosen Back-End Component
For my new back-end component, I plan to use **Node-cron (Scheduled Tasks)** in a later milestone.

Node-cron will let the Smart Waste API run background jobs on a schedule (for example, every hour), instead of only doing work when an HTTP request comes in.

## Moving forward, I will add the following:
- Designing the `Schedule` data model (binId, requestedDate, status, notes).
- Building basic CRUD endpoints under `/api/v1/schedules`.
- Storing schedule data in Firestore.
- Documenting these endpoints in my API docs.

## When I implement Node-cron, I plan to:

1. Install and configure `node-cron` in the project.
2. Create a job file (for example: `src/jobs/scheduleJobs.ts`).
3. Schedule a recurring task (e.g., every 5–10 minutes) that:
   - Reads pending schedules from Firestore.
   - Logs them or flags ones that are overdue.
4. Later, extend this job to:
   - Update `status` (e.g., from `pending` to `overdue`).
   - Integrate with an email or notification service.

## Why This Component Is a Good Fit
- It directly supports the **core goal** of the Smart Waste API: managing bin pick-ups efficiently.
- It shows that the back-end can do more than simple CRUD; it can also run **automated background tasks**.