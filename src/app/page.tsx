import { GameProvider } from '../components/GameContext';
import GameWrapper from '../components/GameWrapper'
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <GameProvider>
        <GameWrapper />
      </GameProvider>
    </main>
  );
}