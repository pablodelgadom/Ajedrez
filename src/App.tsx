import { useState } from 'react';
import { ChessGame } from './games/chess/ChessGame';
import { Home } from './pages/Home';

function App() {
  const [currentScreen, setCurrentScreen] = useState<'home' | 'chess'>('home');

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'start',
      minHeight: '100%',
      width: '100%',
      paddingTop: currentScreen === 'chess' ? '2rem' : '0'
    }}>
      {currentScreen === 'home' && <Home onSelectGame={(game) => setCurrentScreen(game as 'chess')} />}
      {currentScreen === 'chess' && <ChessGame onBack={() => setCurrentScreen('home')} />}
    </div>
  );
}

export default App;
