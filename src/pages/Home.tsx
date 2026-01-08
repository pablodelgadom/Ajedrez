import React from 'react';
import { Crown } from 'lucide-react';

interface HomeProps {
    onSelectGame: (game: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onSelectGame }) => {
    return (
        <div style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            gap: '3rem'
        }}>
            <div style={{ textAlign: 'center' }}>
                <h1 style={{
                    fontSize: '3.5rem',
                    fontWeight: 900,
                    marginBottom: '1rem',
                    background: 'linear-gradient(135deg, #fff 0%, #9aa0a6 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                }}>
                    Game Hub
                </h1>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.2rem' }}>
                    Select a game to start playing
                </p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '2rem',
                maxWidth: '1000px',
                width: '100%'
            }}>
                {/* Chess Card */}
                <div
                    onClick={() => onSelectGame('chess')}
                    style={{
                        backgroundColor: 'var(--color-bg-secondary)',
                        borderRadius: 'var(--radius-lg)',
                        padding: '2rem',
                        cursor: 'pointer',
                        border: '1px solid var(--border-color)',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '1.5rem',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.borderColor = 'var(--color-accent-primary)';
                        e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.borderColor = 'var(--border-color)';
                        e.currentTarget.style.boxShadow = 'none';
                    }}
                >
                    <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--color-bg-tertiary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--color-accent-primary)'
                    }}>
                        <Crown size={48} />
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Chess</h3>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                            Classic chess engine vs Stockfish AI. Test your skills!
                        </p>
                    </div>

                    <div style={{
                        marginTop: 'auto',
                        padding: '0.5rem 1rem',
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: 'var(--color-bg-tertiary)',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        color: 'var(--color-accent-primary)'
                    }}>
                        Play Now
                    </div>
                </div>

                {/* Placeholder for future games */}
                <div style={{
                    backgroundColor: 'var(--color-bg-secondary)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '2rem',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1.5rem',
                    opacity: 0.5,
                    cursor: 'not-allowed'
                }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--color-bg-tertiary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--color-text-secondary)'
                    }}>
                        <span style={{ fontSize: '2rem' }}>?</span>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Coming Soon</h3>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                            More games are under development.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};
