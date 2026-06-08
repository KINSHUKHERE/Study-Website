# TrigTechMath - Educational Portal

TrigTechMath is a premium, serverless, glassmorphic educational portal website built for **TrigTech Solutions** (led by instructor Pankaj Gadwal). The application aggregates YouTube video lectures and handwritten PDF notes dynamically using a Google Sheets database and a keyless YouTube scraper script, removing the need for a paid database backend.

---

## 🚀 Key Features

* **Custom Overlay Video Player:** Built-in player wrapping YouTube's Iframe API featuring play/pause, progress slider, skip backward/forward 10s buttons, and a volume mute switch.
* **On-Screen Seek Tap Zones:** Double-tapping the left or right halves of the video screen on mobile seeks 5 seconds backward/forward with a pulsing chevron overlay animation.
* **Laptop Hotkeys:** Native controls for desktop browsers:
  * `ArrowLeft` / `ArrowRight` to skip 5 seconds.
  * `Spacebar` to toggle Play/Pause.
  * `F` / `f` to toggle Fullscreen theater mode.
  * *Disabled automatically when typing inside input elements.*
* **YouTube-Style Watch Progress:** Stores watch duration percentages in `localStorage` and renders a red progress bar beneath course video cards on the lectures and homepages.
* **Direct Notes Downloads:** Converts Google Drive viewer URLs on-the-fly to direct download URLs, allowing direct PDF downloads without leaving the page.
* **Google Sheets Integration:** Standardized schema maps spreadsheets to note assets dynamically.
* **Keyless YouTube Scraper:** Scrapes public playlist pages (supporting traditional lists and mobile Shorts grids) without requiring paid API keys, outputting a static JSON database of course lectures.
* **WhatsApp Floating Action Button:** Sticky floating action button linking users to chat on WhatsApp.

---

## 🛠️ Tech Stack

* **Core:** React 19 + Vite 8
* **Styling:** Vanilla CSS (HSL Color Variables, Glassmorphism panels, Ambient glow backdrops)
* **Icons:** Lucide React (with custom Youtube brand logo SVG)

---

## ⚙️ Local Setup and Installation

### 1. Clone the repository and install dependencies
```bash
# Clone the repository
git clone https://github.com/KINSHUKHERE/Study-Website.git

# Navigate to the workspace
cd Study-Website

# Install node dependencies
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
Open `http://localhost:5173/` in your browser to view the application.

### 3. Build for Production
```bash
npm run build
```
This builds the production-ready assets into the `dist/` directory.

---

## 🤖 Playlist Scraper Tool

To populate the website's lectures with the creator's actual YouTube playlists, we include a keyless scraper tool. It fetches course metadata and populates the local database.

To execute the scraper:
```bash
node scripts/scrapePlaylists.js
```

### Scraped Course Playlists:
* Printing Tools / Softwares – Trigtech Solutions
* NEET Shorts
* Excel Shorts 🔥 | Daily Excel Tricks & Shortcuts
* Automation Shorts 🤖 | Python, Excel & Web Automation
* Multivariable Calculus (Differentiation) || RTU Kota || 1st Year
* Random Variables | 2nd Year | RTU Kota
* LDE of Higher order with const. coeff. RTU Kota
* Differential Equations RTU Kota
* Unit-1 MATRIX RTU Kota

---

## 📊 Google Sheets Onboarding Guide

To configure a new Google Sheets database for notes and manual lecture overrides:

1. Create a **Google Sheet**.
2. Define the header row (first row) with these exact column names:
   `Title`, `Type`, `URL`, `Category`, `Description`, `Date`, `SecondaryURL`
3. Add rows:
   * **Type:** `video` (or `lecture`) / `note` (or `pdf`)
   * **URL:** The video's watch URL or the PDF's Google Drive sharing link
   * **SecondaryURL:** Link to notes (for videos) or a Telegram post (optional)
4. Click **Share** -> Set access to **"Anyone with the link can view"** (Viewer permission).
5. Copy the Sheet ID from the URL (the long hash between `/d/` and `/edit`).
6. Replace the `SHEET_ID` constant in `src/services/sheetsService.js`.
