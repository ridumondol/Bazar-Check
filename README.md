# বাজার দর (Bazardor)

Bazardor is a Next.js 15 App Router app using Better Auth, MongoDB Atlas, Tailwind CSS 3, and DaisyUI 4.

## 1. Requirements

- Node.js 20.19+ (Node.js 22 or 24 LTS recommended)
- npm
- A MongoDB Atlas cluster, database user, and allowed client IP

## 2. Configure MongoDB Atlas

1. In Atlas, create/open a cluster.
2. Under **Database Access**, create a database user and password. This is separate from your Atlas website login.
3. Under **Network Access**, allow your current public IP address. Avoid `0.0.0.0/0` except for temporary troubleshooting, because it allows connections from anywhere.
4. Open **Connect → Drivers → Node.js** and copy the connection string.
5. URL-encode special characters in the database password (for example `@` becomes `%40`). Do not share the URI or password.

## 3. Create `.env.local`

Copy `.env.example` to `.env.local` in the project root. On Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Put your Atlas URI and generated secret in `.env.local`:

```env
MONGODB_URI=mongodb+srv://<USERNAME>:<URL_ENCODED_PASSWORD>@<CLUSTER_HOST>/bazardor?retryWrites=true&w=majority
MONGODB_DB_NAME=bazardor
BETTER_AUTH_SECRET=PASTE_YOUR_GENERATED_SECRET_HERE
BETTER_AUTH_URL=http://localhost:3000
```

Replace every example value. Do not commit `.env.local` or paste it into chats. Google/GitHub login is optional; configure the corresponding client ID and secret only if you want social login.

## 4. Install and test the connection

Open a terminal in the project root and run:

```powershell
npm install
npm run db:check
```

The check command should print `MongoDB connection successful`. If it fails, check the Atlas URI, database user/password, IP access list, and network connection.

## 5. Run the application

```powershell
npm run dev
```

Open http://localhost:3000. Test sign-up with an email and a password of at least 8 characters, then sign in and open `/profile`. Better Auth's MongoDB adapter creates/uses collections as needed; do not run the old SQLite migration command.

## 6. Verify production compilation

Stop the dev server with `Ctrl+C`, then run:

```powershell
npm run build
```

A successful build confirms compilation, but live authentication still needs to be tested against your own Atlas database.

## Notes

- Product prices in `lib/data.js` are sample/mock data and are not verified live market prices.
- `.env.local`, MongoDB credentials, and `BETTER_AUTH_SECRET` must remain private.
- The project cannot be fully live-tested without the owner's valid Atlas credentials and network access.
