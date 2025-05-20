### Whack-a-Mole

A fun arcade game rebuilt with Next.js, React, TypeScript, and Supabase, designed to test your reflexes and speed.

## Description

Whack-a-Mole is a simple yet highly engaging and interactive arcade game developed with modern web technologies. Originally built with React, TypeScript, HTML, and CSS, the project has now been migrated to Next.js to enhance performance and maintainability while still leveraging React. Supabase powers the backend, providing a robust cloud-based database and RPC-based data access.
The gameplay is intuitive and fun: moles pop up at random locations on the screen, and the player earns points by clicking them before they disappear. As time passes, the speed at which the moles appear increases, pushing the player's reflexes to the limit. The game ends after a fixed period, at which point the player can enter their name and save their score to a leaderboard managed through Supabase.

## Core Features

- **Random Mole Spawning**: Moles appear randomly at different positions on the game board.
- **Score System**: Players accumulate points by successfully clicking on moles.
- **Speed Progression**: As the game advances, mole appearance intervals become shorter.
- **Responsive Design**: Playable on all modern browsers and devices.
- **Leaderboard Integration**: Save and view top scores using Supabase.
- **Supabase Backend**: Cloud database for efficient, scalable data handling.
-**Admin Functionality**: Ability to adjust cost, stamp, and metal 

### Technologies Used

# Frontend:

- **HTML**: Game structure and layout.
- **CSS**: Styling, animations, and responsive design.
- **React**: Component-based UI library for interactive interfaces.
- **Typescript**: Static typing for improved developer experience and safety.

# Backend:

- **Supabase**: Cloud-based backend with PostgreSQL and RPC functions.
- **Next.js API Routes**: For handling server-side logic when needed.


## Project Structure

```
📦Tivoli-Mole
 ┣ 📂app / pages      # Next.js routing
 ┃ ┣ 📜page.tsx / index.tsx  # Main game screen
 ┃ ┣ 📜admin.tsx     # Admin panel for game adjustments
 ┣ 📂components
 ┃ ┣ 📜HighScores.tsx       # Displays the leaderboard
 ┃ ┣ 📜GameOver.tsx         # Game over screen
 ┣ 📂lib
 ┃ ┣ 📜supabase.ts  # Supabase client integration
 ┣ 📜.env.local              # Environment variables
 ┣ 📜next.config.js          # Next.js configuration
 ┣ 📜README.md               # Project documentation
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
- * A configured Supabase project with the necessary tables

# Steps:

1. Clone the repository:

```bash
git clone https://github.com/Henke-gh/tivoli-mole.git
cd whack-a-mole
npm install
```
1. Set up your .env.local file in the root directory:

SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-supabase-key
TIVOLI_BANK_KEY=your-tivoli-bank-key

⚠️ Note: Never commit .env.local to version control. It contains sensitive credentials.

2. Start the development server:

bash
npm run dev

3. Visit:

http://localhost:3000
```

```

## Supabase Setup

Log in to your Supabase Dashboard
Go to app.supabase.com and sign in to your account Select your project
Open the Table Editor
In the left sidebar, click on "Table Editor" Click the "New Table" button in the top-right corner
Enter Table Details
Name: Enter a name for your table (e.g., "high_scores") Description (optional): Add a brief description
Add Columns
For each column you need, click "Add column" and enter:
Name: Column name (e.g., "id", "name", "score") Type: Data type (e.g., "int8" for numbers, "text" for text) Default Value (optional): Set a default value if needed Check "Primary Key" for your ID column Check "Is Identity" if you want auto-incrementing IDs
Configure RLS (Row Level Security)
You can enable RLS for added security For a basic setup, you can leave it disabled initially
Save the Table
Click "Save" to create your table

## 👥 Contributing
Contributions are welcome! To get involved:
1. Fork the repository.
2. Create a new branch:

```bash
git checkout -b feature-name

1. Make your changes and commit:

 ``` bash
git commit -m "Describe your feature"
1. Push your branch:

```bash
git push origin feature-name
1. Open a Pull Request.
```

### License and Credits

This project is licensed under the MIT License.

Developed by Henrik Andersen, Josefin Wetterberg, and Luis Arranz García as part of a learning project at YH School in Gothenburg, Sweden. The project was created for educational purposes and enjoyment, combining practical coding skills with game development concepts in a fun, interactive application.

© 2025 All Rights Reserved
