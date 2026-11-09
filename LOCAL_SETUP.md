# ROSELLE — Local Development & Setup Guide

**Welcome to ROSELLE Lip Lab Engineering.** This guide explains how to set up, run, and test the project on Windows or any modern OS.

---

## 1. Prerequisites

- **Node.js:** v18.17.0 or higher (Tested on Node v22.18.0)
- **Package Manager:** `npm` (v10+), `pnpm`, or `yarn`
- **Shell:** Windows PowerShell or Bash
- **WebGL 2.0 Browser:** Chrome, Edge, Firefox, or Safari

---

## 2. Quick Start (PowerShell)

Run the automated scripts in Windows PowerShell:

```powershell
# 1. First-time setup (installs dependencies and prepares .env.local)
.\scripts\setup.ps1

# 2. Start local development server
.\scripts\start.ps1
```

Or execute standard npm commands:

```bash
# Install dependencies
npm install

# Start Next.js development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 3. Project Scripts

| Command | Script | Description |
|---------|--------|-------------|
| `npm run dev` | `.\scripts\start.ps1` | Starts the Next.js development server with hot-module reloading. |
| `npm run check` | — | Runs `tsc --noEmit` to verify TypeScript types without emitting files. |
| `npm run build` | — | Compiles optimized production Next.js bundle. |
| `npm run start` | — | Starts the compiled production server. |
| — | `.\scripts\check.ps1` | Runs complete end-to-end verification (type-checking + production build). |

---

## 4. Environment Variables

Copy `.env.example` to `.env.local` (done automatically by `setup.ps1`):

```bash
cp .env.example .env.local
```

All external services (Stripe, Resend, database) operate with built-in high-fidelity local mocks when keys are omitted, ensuring instantaneous offline development with full interactive checkout and cart functionality.

---

## 5. Troubleshooting Common Issues

### WebGL Canvas not rendering
- Ensure hardware acceleration is enabled in your browser settings (`chrome://settings/system`).
- Check if another 3D-heavy application is monopolizing GPU memory.

### Port 3000 in use
- Next.js will automatically suggest running on port 3001 if 3000 is occupied.
- To free port 3000 on Windows:
  ```powershell
  Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process
  ```
