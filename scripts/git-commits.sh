#!/usr/bin/env bash
# Creates a clean 10-commit history from the finished project.
# Usage: bash scripts/git-commits.sh   (run once, from the project root)
set -e
[ -d .git ] || git init -b main
c() { git add $2 && git commit -q -m "$1" && echo "✓ $1"; }

c "chore: initial Next.js project setup" "package.json package-lock.json next.config.mjs jsconfig.json .gitignore .env.example"
c "style: configure Tailwind CSS and DaisyUI theme" "tailwind.config.js postcss.config.js app/globals.css"
c "feat: add mock market data and Bengali formatters" "lib/data.js"
c "feat: integrate BetterAuth with email and social login" "lib/mongodb.js lib/auth.js lib/auth-client.js lib/session.js app/api"
c "feat: add header, price ticker, category nav and footer" "components/Header.js components/Ticker.js components/CategoryNav.js components/Footer.js components/Avatar.js app/layout.js"
c "feat: build home page with hero and price sections" "app/page.js components/ProductCard.js components/PriceBadge.js public"
c "feat: add category page with sorting" "app/category components/SortSelect.js"
c "feat: add protected product details page" "app/products"
c "feat: add sign in and sign up pages" "app/signin app/signup components/AuthForm.js"
c "feat: add profile page with update form and custom 404" "app/profile app/not-found.js components/SignOutButton.js components/UpdateProfileForm.js"
c "docs: add README and commit helper" "README.md scripts"
