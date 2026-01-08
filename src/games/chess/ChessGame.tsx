import React, { useState } from 'react';
import { useChessGame } from './logic/useChessGame';
import { Chessboard } from './components/Chessboard';

export const ChessGame: React.FC = () => {
    const [playerColor, setPlayerColor] = useState<'w' | 'b'>('w');
    const [difficulty, setDifficulty] = useState(10);

    const { game, status, turn, makeMove, lastMove, resetGame, isThinking } = useChessGame({
        difficulty,
        playerColor
    });

    const [isGameStarted, setIsGameStarted] = useState(false);

    const handleRestart = () => {
        resetGame();
        setIsGameStarted(true);
    };

    const getStatusText = () => {
        switch (status) {
            case 'checkmate': return `Checkmate! ${turn === 'w' ? 'Black' : 'White'} wins.`;
            case 'draw': return 'Draw!';
            case 'check': return 'Check!';
            default: return `${turn === 'w' ? "White" : "Black"}'s turn`;
        }
    };

    if (!isGameStarted) {
        return (
            <div style={{
                height: '100vh',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '2rem',
                backgroundColor: 'var(--color-bg-primary)'
            }}>
                <h1 style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--color-text-primary)' }}>Chess vs AI</h1>
                <p style={{ color: 'var(--color-text-secondary)' }}>Ready to challenge the engine?</p>
                <button
                    onClick={() => setIsGameStarted(true)}
                    style={{
                        fontSize: '1.5rem',
                        padding: '1rem 3rem',
                        backgroundColor: 'var(--color-accent-primary)',
                        color: 'white',
                        borderRadius: 'var(--radius-full)',
                        border: 'none',
                        boxShadow: 'var(--shadow-lg)',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        transition: 'transform 0.2s ease'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    Start Game
                </button>
            </div>
        );
    }

    return (
        <div style={{ width: '100%', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>

            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '600px', alignItems: 'center', marginBottom: '1rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Chess vs AI</h2>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                        onClick={handleRestart}
                        style={{
                            padding: '0.5rem 1rem',
                            backgroundColor: 'var(--color-bg-tertiary)',
                            borderRadius: 'var(--radius-sm)',
                            border: '1px solid var(--border-color)'
                        }}
                    >
                        New Game
                    </button>
                </div>
            </div>

            <div style={{
                width: '100%',
                maxWidth: '600px',
                marginBottom: '1rem',
                display: 'flex',
                gap: '0.5rem',
                alignItems: 'center',
                backgroundColor: 'var(--color-bg-secondary)',
                padding: '0.5rem',
                borderRadius: 'var(--radius-md)'
            }}>
                <div style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: turn === 'w' ? '#fff' : '#000',
                    border: '1px solid #888'
                }} />
                <span style={{ fontWeight: 500 }}>
                    {getStatusText()}
                    {isThinking && <span style={{ marginLeft: '0.5rem', color: 'var(--color-accent-primary)', fontSize: '0.9em' }}>(Thinking...)</span>}
                </span>

                {/* Settings Controls */}
                <div style={{ marginLeft: 'auto', display: 'flex', gap: '1rem', fontSize: '0.9rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        Difficulty:
                        <select
                            value={difficulty}
                            onChange={(e) => setDifficulty(Number(e.target.value))}
                            style={{
                                background: 'var(--color-bg-tertiary)',
                                color: 'var(--color-text-primary)',
                                border: '1px solid var(--border-color)',
                                borderRadius: 'var(--radius-sm)',
                                padding: '0.25rem'
                            }}
                        >
                            <option value="0">Beginner (0)</option>
                            <option value="5">Casual (5)</option>
                            <option value="10">Intermediate (10)</option>
                            <option value="20">Expert (20)</option>
                        </select>
                    </label>

                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        Play as:
                        <select
                            value={playerColor}
                            onChange={(e) => {
                                setPlayerColor(e.target.value as 'w' | 'b');
                                handleRestart();
                            }}
                            style={{
                                background: 'var(--color-bg-tertiary)',
                                color: 'var(--color-text-primary)',
                                border: '1px solid var(--border-color)',
                                borderRadius: 'var(--radius-sm)',
                                padding: '0.25rem'
                            }}
                        >
                            <option value="w">White</option>
                            <option value="b">Black</option>
                        </select>
                    </label>
                </div>
            </div>

            <Chessboard
                game={game}
                onMove={makeMove}
                lastMove={lastMove}
                playerColor={playerColor}
                turn={turn}
            />

            <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                Stockfish 16 Lite (WASM) running in browser.
            </p>
        </div>
    );
};
