# Chess SPA with Stockfish AI

A modern, production-ready Single Page Application (SPA) for playing Chess against a professional-level AI (Stockfish). Built with **React**, **TypeScript**, and **Vite**, focusing on clean code, performance, and a premium user experience.

## Features

- **Expert AI**: Integrated Stockfish 16 (WASM) for professional-level gameplay.
- **Modern UI**: Clean, dark-themed interface with smooth animations.
- **Game Features**:
    - Play as White or Black.
    - Adjustable difficulty levels (Elo 0 - 2800+ equivalent).
    - Move validation and highlighting.
    - Check/Checkmate detection.
- **Performance**: Optimized rendering and Web Worker offloading for the engine.
- **Responsive**: Fully playable on desktop and mobile devices.

## Tech Stack

- **Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Vanilla CSS (Variables & Modules) for zero-runtime overhead.
- **Logic**: `chess.js` (Move validation)
- **Engine**: `stockfish.js` (WebAssembly)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd luminescent-cosmos
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
   > Note: This will also download and place the Stockfish WASM files in the `public/` directory.

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) to play.

## Deployment to Vercel

This project is optimized for deployment on [Vercel](https://vercel.com).

1. Push your code to a GitHub repository.
2. Login to Vercel and "Add New Project".
3. Import your repository.
4. Vercel will automatically detect the Vite settings.
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**.

## Architecture

- `src/games/chess/`: Modular chess feature containing logic (`useChessGame`), engine wrapper (`Engine`), and UI components (`Chessboard`).
- `src/styles/`: Global design tokens and resets.
- `public/engine/`: Static assets for the Stockfish WebAssembly worker.
- `public/pieces/`: Chess piece assets.

---
Created with ❤️ by Antigravity.
