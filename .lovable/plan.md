## Hustle Nation — Start Now landing page

Recreate the structure of enhancefitness.com/en/start-now, rebranded with the Hustle Nation logo and the provided orange/charcoal/black palette.

### Design tokens (src/styles.css)
- Background: `#0D0D0D` (near-black)
- Surface/Card: `#1a1a1a` with subtle borders
- Primary (CTA / accents): `#F26E22` orange, hover `#F25D27`
- Secondary text / muted: `#666873` gray
- Deep accent: `#732F16` (brown) for gradients/shadows
- Foreground: white / off-white
- Bold sans typography (Bebas Neue display + Inter body) to match the aggressive "Hustle" vibe

### Assets
- Copy `user-uploads://476477014_1578278566188423_8441828356647757311_n.jpg` → `src/assets/hustle-nation-logo.jpg`
- Generate a hero gym/training image for the right-side panel
- Generate 3 category images (Longevity / Strength / Fun → renamed for Hustle Nation: **Endurance**, **Strength**, **Mindset**)

### Page structure (`src/routes/start-now.tsx` + update `src/routes/index.tsx` to render it, or put on index directly)
1. **Top bar** — Hustle Nation logo left, language pill right (matches reference)
2. **Hero split (2 columns)**
   - Left: headline "Train that **hits hard** and lasts." + sub copy
   - Multi-step lead form: First name, Last name, phone (+country), email, Your Goal (select), When would you like to start (select), How quickly do you want results (select), CTA button "Start Now — It's on us!"
   - Right: hero training image
3. **3 category cards** with image + label overlay (Endurance / Strength / Mindset) with short description
4. **"This is more than a workout. It's a lifestyle. Are you ready?"** + CTA "Own Your Strength"
5. **Trusted by community** section with 4 stat cards (years, success stories, rating, technology)
6. **Footer** — logo, nav links (Home, About Us, Careers, Privacy, Terms, Payment, Cookie), app store badges placeholders, social icons

### Technical
- Single route file with form using local state (no backend) — submission shows a toast
- Use shadcn `Input`, `Select`, `Button`, `Card`, `sonner` for toast
- Update `__root.tsx` head meta: title "Start Now — Hustle Nation", description
- Add per-route `head()` with title/description/og tags
- Replace placeholder index with this landing page content

### Out of scope
- No backend submission / database
- No auth
- No real app store links (placeholder buttons)