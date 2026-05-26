# ⚡ MRD MHRDAYAT — Premium Systems Analyst & Creative AI Portfolio 2026

An Awwwards-standard, high-density interactive creative portfolio for **Muhammad Rahmat Hidayat (S.Kom)**. Built using modern web technologies to demonstrate systems analysis rigor combined with premium, photorealistic AI fashion & skincare campaign synthesis.

---

## 🚀 Key Features & Architectural Pillars

### 1. Asymmetric Bento Grid Card Architecture
* Modular grid layout inspired by iOS widget styles (Small, Medium, Large) using premium Apple Squircing (`border-radius: 24px` to `32px` transitions).
* Full glassmorphism backing (`backdrop-filter: blur(25px)`) with subtle volumetric box-shadows.

### 2. Humanized Ads Engine (Deterministic Synthesis)
* Expels oily, generic "AI slop" skin layers in favor of high-fidelity dermis micro-pore mapping.
* Employs deterministic joint structures (Skeletal body locking) and analog studio light replication formulas (CMOS sensor / 35mm grain mapping).
* Fully integrated 14 photoshoot campaigns categorized dynamically:
  * **Fashion & Editorial**: `photoshoot brand 1` s.d. `8` (Y2K high-fashion, Museum Steps, Brutalist concrete backdrops).
  * **Skincare & Product**: `skincare` hero product campaigns featuring dual-layer packaging/skin isolation.
  * **AI Photoshoot**: `ai photoshoot 1` s.d. `4` showcasing identity-locked multi-stage face embeddings.

### 3. Tactile Magnetic Cursor Engine
* A smooth linear-interpolated (LERP) custom cursor tracking coordinates using hardware-accelerated transforms.
* Dynamic mouse state awareness that morphs into a detailed pointer bubble showing custom instructions (e.g., `EXPLORE`, `SWIPE`, `SIMULATE`) upon hovering interactive elements.
* Pointer-event safeguards automatically enabling native cursor fallbacks for touch-only mobile devices.

### 4. Interactive Proximity Avoidance decals
* Aesthetic badges (e.g., `IBM Certified`, `BNSP Certified`) that react elastically to cursor proximity using GSAP physical spring avoidance algorithms, returning to their default state with spring physics when the cursor leaves.

### 5. Ambient 3D WebGL Clay Geometry
* A live, responsive Three.js canvas rendering low-poly matte-clay objects that rotate orbital-style and dynamically track light highlights relative to mouse coordinates.

### 6. Interactive Campaign Budget Simulator
* An Apple-style control slider featuring rubber-banding boundary physics.
* Calculates rates dynamically based on Upwork/Fiverr models with transparent parameter breakdowns (Identity locking, Commercial rights).

### 7. Spatial Audio Click Feedback
* Generates mechanical tactile clicks using the Web Audio API (Synthesized on-the-fly, zero audio file download footprint) with live balance-panning mapped to the cursor's horizontal pixel coordinates.

---

## 🛠️ Technology Stack

* **Core Framework**: React 19 + Vite 5
* **Styling & Theme**: Tailwind CSS v4 + PostCSS 8
* **Animation & Motion**: GSAP 3 (GreenSock), Lenis (Smooth Scroll)
* **3D Renderer**: Three.js (WebGL)
* **Deployment & Serving**: Vite configured with custom serving middlewares to load raw project folders dynamically from the parent workspace.

---

## 📦 Directory Structure

```bash
├── photoshoot brand/   # Brand I campaign high-res photography
├── photoshoot brand2-8/# Apparel, twisted silhouette, museum series
├── skincare/           # Skincare product layer isolation assets
├── ai photoshoot1-4/   # AI-generated identity-locked synthesis
└── web-portfolio/      # Main React Application Directory
    ├── src/
    │   ├── App.jsx     # Main React Tree with layout bento grid, calculations & hooks
    │   ├── index.css   # Main styles, Tailwind v4 imports, keyframe animations
    │   └── main.jsx    # React mounting point
    ├── vite.config.js  # Dynamic server middleware serving parent image assets
    ├── tailwind.config.js
    └── package.json
```

---

## 💻 Local Setup & Development

### 1. Prerequisites
Ensure you have Node.js (v18+) and npm installed on your machine.

### 2. Installation
Navigate into the `web-portfolio` directory and install all dependencies:
```bash
cd web-portfolio
npm install
```

### 3. Running Dev Server
Launch Vite's hot-reloading development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Production Build
To build and optimize the site for static hosting:
```bash
npm run build
```
Production assets will be output to the `dist/` directory.

---

## 🎹 Easter Eggs (Secret Codes)
* **Konami Code**: Pressing `↑ ↑ ↓ ↓ ← → ← → B A` sequentially on your keyboard triggers a golden coin rain overlay with physical drop gravity.

---
Created with passion by **Muhammad Rahmat Hidayat** (2026).
