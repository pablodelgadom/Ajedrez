import { ChessGame } from './games/chess/ChessGame';

function App() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'start',
      minHeight: '100%',
      width: '100%',
      paddingTop: '2rem'
    }}>
      <ChessGame />
    </div>
  );
}

export default App;
