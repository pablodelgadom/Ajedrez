import { useState, useEffect, useCallback, useRef } from 'react';
import { Chess } from 'chess.js';
import type { Move, Color } from 'chess.js';
import { Engine } from '../engine/Engine';

export type GameStatus = 'playing' | 'checkmate' | 'draw' | 'check';

export interface UseChessGameOptions {
    difficulty?: number; // 0-20 for Stockfish
    playerColor?: 'w' | 'b';
}

export function useChessGame({ difficulty = 10, playerColor = 'w' }: UseChessGameOptions) {
    const [game, setGame] = useState(new Chess());
    const [fen, setFen] = useState(game.fen());
    const [history, setHistory] = useState<string[]>([]);
    const [status, setStatus] = useState<GameStatus>('playing');
    const [turn, setTurn] = useState<Color>('w');
    const [lastMove, setLastMove] = useState<Move | null>(null);

    const engine = useRef<Engine | null>(null);

    // Initialize Engine
    useEffect(() => {
        engine.current = new Engine((data) => {
            // Parse engine output
            // Example: 'bestmove e2e4'
            if (data.startsWith('bestmove')) {
                const moveStr = data.split(' ')[1];
                if (moveStr && moveStr !== '(none)') {
                    makeAMove({
                        from: moveStr.substring(0, 2),
                        to: moveStr.substring(2, 4),
                        promotion: moveStr.length > 4 ? moveStr[4] : undefined,
                    });
                }
            }
        });

        engine.current.init();

        // Configure difficulty (Skill Level 0-20)
        engine.current.setOption('Skill Level', difficulty);

        return () => {
            engine.current?.terminate();
        };
    }, [difficulty]);

    const updateGameStatus = useCallback((newGame: Chess) => {
        setFen(newGame.fen());
        setTurn(newGame.turn());

        if (newGame.isCheckmate()) setStatus('checkmate');
        else if (newGame.isDraw()) setStatus('draw');
        else if (newGame.isCheck()) setStatus('check');
        else setStatus('playing');
    }, []);

    const makeAMove = useCallback((move: string | { from: string; to: string; promotion?: string }) => {
        setGame((prev) => {
            // Create a copy to mutate
            const gameCopy = new Chess(prev.fen());
            try {
                const result = gameCopy.move(move);
                if (result) {
                    setLastMove(result);
                    setHistory(h => [...h, result.san]);
                    updateGameStatus(gameCopy);
                    return gameCopy;
                }
            } catch (e) {
                // Invalid move
                return prev;
            }
            return prev;
        });
    }, [updateGameStatus]);

    // AI Turn Trigger
    useEffect(() => {
        if (game.isGameOver()) return;

        console.log(`Turn: ${game.turn()}, Player: ${playerColor}`);

        if (game.turn() !== playerColor) {
            console.log("AI Turn. Analyzing...");
            // AI's turn
            // Small delay for realism
            const timer = setTimeout(() => {
                engine.current?.analyze(game.fen(), 10); // Depth 10 for now
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [game, playerColor, fen]); // Depend on fen to trigger after move

    const resetGame = () => {
        const newGame = new Chess();
        setGame(newGame);
        setFen(newGame.fen());
        setHistory([]);
        setLastMove(null);
        setStatus('playing');
        setTurn('w');
        engine.current?.newGame();
    };

    return {
        game,
        fen,
        turn,
        status,
        lastMove,
        history,
        makeMove: makeAMove,
        resetGame
    };
}
