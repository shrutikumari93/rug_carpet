# Weftly — Rug & Carpet MERN E-commerce Site

A full-stack rug and carpet business website built with MongoDB, Express, React, and Node.js (MERN),
styled with Tailwind CSS. Fully responsive across mobile and desktop.

## What's included

**Backend** (`/backend`)
- User auth (register/login) with JWT + hashed passwords
- Product & Category models with filtering (type, category, search, price range)
- Wishlist, Interests, and Order History — all tied to the logged-in user
- Admin-protected routes for managing products/categories

**Frontend** (`/frontend`)
- React (Vite) + Tailwind CSS, fully responsive
- Pages: Home, Shop (with filters), Product Detail, Login, Register, My Account
  (Interests / Wishlist / Orders tabs), About, Contact
- Auth context with token stored in localStorage
- Wishlist heart-toggle on every product card

## Setup instructions

### 1. Database — MongoDB Atlas
1. Go to https://www.mongodb.com/cloud/atlas and create a free account.
2. Create a free (M0) cluster.
3. Under **Database Access**, create a database user with a password.
4. Under **Network Access**, add your IP (or `0.0.0.0/0` for development).
5. Click **Connect → Drivers**, copy the connection string. It looks like:
   `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/rugcarpet?retryWrites=true&w=majority`

### 2. Backend
```bash
cd backend
npm install
cp .env.example .env
```
Edit `.env` and paste in:
- `MONGO_URI` — your Atlas connection string from above
- `JWT_SECRET` — any long random string (e.g. generate one with `openssl rand -base64 32`)

Then run:
```bash
npm run dev
```
The API will run on `http://localhost:5000`.

### 3. Frontend
```bash
cd frontend
npm install
cp .env.example .env
```
The default `VITE_API_URL=http://localhost:5000/api` is already correct for local dev.

Then run:
```bash
npm run dev
```
The site will run on `http://localhost:5173`.

### 4. Add your first data
Since there's no admin UI yet, add categories/products directly via the Atlas dashboard
(Collections → Insert Document) or with a quick script/Postman call to:
- `POST /api/categories` (requires an admin user — see below)
- `POST /api/products`

**To make a user an admin:** register normally through the site, then in MongoDB Atlas find that
user document in the `users` collection and change `role` from `"user"` to `"admin"`.

## Deploying live

- **Backend:** Render or Railway (free tiers available) — connect your GitHub repo, set the same
  env vars as your `.env`.
- **Frontend:** Vercel or Netlify — connect your GitHub repo, set `VITE_API_URL` to your deployed
  backend URL, deploy.
- **Domain:** buy from Namecheap/GoDaddy, point it at your Vercel/Netlify deployment.

## Notes
- Product images currently use placeholder URLs — replace with real photos (upload to Cloudinary
  or similar, or store URLs directly in the `images` array on each product).
- Payment integration (Stripe/Razorpay) isn't wired up yet — orders are currently created directly
  without payment processing. Let me know when you're ready to add that.
