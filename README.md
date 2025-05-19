### Whack-a-Mole

A fun arcade game built with modern web technologies that tests your reflexes.

## Description

Whack-a-Mole is a simple yet highly engaging and interactive arcade game developed with modern web technologies. Built with React, TypeScript, HTML, and CSS, and powered by Supabase on the backend, the game challenges players to click on randomly appearing moles before they disappear. As time passes, the speed at which the moles appear increases, pushing the player's reflexes to the limit.

The gameplay is intuitive and fun: moles pop up at random locations on the screen, and the player earns points by clicking them before they disappear. The game ends after a fixed period, at which point the player can enter their name and save their score to a leaderboard. This leaderboard is managed through Supabase, which handles data persistence using Remote Procedure Calls (RPCs).

## Core Features

- **Random Mole Spawning**: Moles appear randomly at different positions on the game board.
- **Score System**: Players accumulate points by successfully clicking on moles.
- **Speed Progression**: As the game advances, mole appearance intervals become shorter.
- **Responsive Design**: Playable on all modern browsers and devices.
- **Leaderboard Integration**: Save and view top scores using Supabase.
- **Supabase Backend**: Uses RPC functions for efficient, scalable data handling.

### Technologies Used

# Frontend:

- **HTML**: Game structure and layout.
- **CSS**: Styling, animations, and responsive design.
- **React + TypeScript**: Component logic, state management, timers, scoring.

# Backend:

- **Supabase**: Cloud-based backend with PostgreSQL and RPC functions.
- **Vite**: Lightweight and fast bundler with Hot Module Replacement (HMR).

## Vite + React + TypeScript Setup

This project uses Vite for fast development and build processes. Two official plugins are supported:

- `@vitejs/plugin-react`: Uses Babel for Fast Refresh.
- `@vitejs/plugin-react-swc`: Uses SWC for faster performance.

## ESLint Configuration

To enable type-aware linting in production environments, extend the config with tseslint.config:

```js
export default tseslint.config({
  extends: [
    ...tseslint.configs.recommendedTypeChecked,
    // or stricter:
    ...tseslint.configs.strictTypeChecked,
    // optionally:
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

You can enhance linting with React-specific rules by installing:

```js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config({
  plugins: {
    "react-x": reactX,
    "react-dom": reactDom,
  },
  rules: {
    ...reactX.configs["recommended-typescript"].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```

## Project Structure

```
📦whack-a-mole
 ┣ 📂src
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📜HighScores.tsx       # Displays the leaderboard
 ┃ ┃ ┣ 📜GameOver.tsx         # Game over screen
 ┃ ┣ 📂lib
 ┃ ┃ ┣ 📜databaseFunction.ts  # Supabase RPC integration
 ┃ ┣ 📜App.tsx                # Main game logic and UI
 ┣ 📜README.md                # Project documentation
```

### How to Play

1. Start the game by clicking the start button.
2. Click on the moles when they appear to earn points.
3. The game gets faster as time passes, challenging your reflexes.
4. When time is up, enter your name and submit your score.
5. View the leaderboard to see how you rank among other players.

### Installation Instructions

# Prerequisites:

- Node.js v14 or higher
- A configured Supabase project with RPC functions

# Steps:

1. Clone the repository:

```bash
git clone https://github.com/your-username/whack-a-mole.git
cd whack-a-mole
npm install
```

2. Set up your `.env` file:

```
REACT_APP_SUPABASE_URL=your-supabase-url
REACT_APP_SUPABASE_ANON_KEY=your-supabase-key
```

3. Start the development server:

```bash
npm start
```

4. Visit:

```
http://localhost:3000
```

## Supabase Setup

Log in to your Supabase Dashboard

Go to app.supabase.com and sign in to your account
Select your project

Open the Table Editor

In the left sidebar, click on "Table Editor"
Click the "New Table" button in the top-right corner

Enter Table Details

Name: Enter a name for your table (e.g., "high_scores")
Description (optional): Add a brief description

Add Columns

For each column you need, click "Add column" and enter:

Name: Column name (e.g., "id", "name", "score")
Type: Data type (e.g., "int8" for numbers, "text" for text)
Default Value (optional): Set a default value if needed
Check "Primary Key" for your ID column
Check "Is Identity" if you want auto-incrementing IDs

Configure RLS (Row Level Security)

You can enable RLS for added security
For a basic setup, you can leave it disabled initially

Save the Table

Click "Save" to create your table

## 👥 Contributing

Contributions are welcome! To get involved:

1. Fork the repository.
2. Create a new branch:

```bash
git checkout -b feature-name
```

3. Make your changes and commit:

```bash
git commit -m "Describe your feature"
```

4. Push your branch:

```bash
git push origin feature-name
```

5. Open a Pull Request.

### License and Credits

This project is licensed under the MIT License.

Developed by Henrik Andersen, Josefin Wetterberg, and Luis Arranz García as part of a learning project at YH School in Gothenburg, Sweden. The project was created for educational purposes and enjoyment, combining practical coding skills with game development concepts in a fun, interactive application.

© 2025 All Rights Reserved
