import React, { useState } from 'react';
import { Chess } from 'chess.js';
import type { Move, Square as SquareType } from 'chess.js';
import { Square } from './Square';
import { Piece } from './Piece';
import styles from '../styles.module.css';

interface ChessboardProps {
    game: Chess;
    onMove: (move: { from: string; to: string; promotion?: string }) => void;
    lastMove: Move | null;
    playerColor: 'w' | 'b';
    turn: 'w' | 'b';
}

export const Chessboard: React.FC<ChessboardProps> = ({ game, onMove, lastMove, playerColor, turn }) => {
    const [selectedSquare, setSelectedSquare] = useState<SquareType | null>(null);

    // Get valid moves for current selection
    const validMoves = selectedSquare
        ? game.moves({ square: selectedSquare, verbose: true }) as Move[]
        : [];

    const handleSquareClick = (square: SquareType) => {
        // If not our turn, mostly ignore unless pre-moving (not implemented)
        // Actually we should allow selecting to see moves even if not turn? 
        // Usually only allow interaction if it's player's turn or exploring.
        // For now, allow selection always but move only on turn.

        // If clicking same square, deselect
        if (selectedSquare === square) {
            setSelectedSquare(null);
            return;
        }

        // If clicking a valid move target
        const move = validMoves.find(m => m.to === square);

        if (move) {
            // Execute move
            onMove({ from: selectedSquare!, to: square, promotion: 'q' }); // Auto promote to queen for MVP
            setSelectedSquare(null);
        } else {
            // Select new piece if it belongs to turn/player
            const piece = game.get(square);
            if (piece) { // Allow selecting any piece to see potential moves? or only own?
                // Standard behavior: select own color pieces
                // Restrict selection to player's color
                if (piece.color === game.turn() && piece.color === playerColor) {
                    setSelectedSquare(square);
                } else {
                    // Clicked opponent piece or not their turn
                    setSelectedSquare(null);
                }
            } else {
                setSelectedSquare(null);
            }
        }
    };

    const board = [];
    // Render board based on orientation (playerColor)
    // If player is white, a8 at top-left.
    // If player is black, h1 at top-left.

    const isFlipped = playerColor === 'b';

    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

    if (isFlipped) {
        files.reverse();
        ranks.reverse();
    }

    for (const rank of ranks) {
        for (const file of files) {
            const square = (file + rank) as SquareType;
            const piece = game.get(square);


            // My loop uses ranks '8'...'1' (indices 0...7).
            // files 'a'...'h' (indices 0...7).
            // rank '8' is index 0. file 'a' is index 0.
            // a8 is light. sum 0. So Even = Light.
            // Therefore Odd = Dark.



            const isSumEven = ((file.charCodeAt(0) - 97) + (parseInt(rank) - 1)) % 2 === 0;
            // if sum even -> Dark.

            const isDarkSquare = isSumEven;

            const isSelected = selectedSquare === square;
            const isLast = lastMove && (lastMove.from === square || lastMove.to === square);
            const isCheck = piece && piece.type === 'k' && piece.color === turn && game.isCheck();

            const movingTo = validMoves.find(m => m.to === square);
            const isValidMove = !!movingTo && !movingTo.captured;
            const isValidAttack = !!movingTo && !!movingTo.captured;

            board.push(
                <Square
                    key={square}
                    isDark={isDarkSquare}
                    isSelected={isSelected}
                    isLastMove={!!isLast}
                    isCheck={!!isCheck}
                    isValidMove={isValidMove}
                    isValidAttack={isValidAttack}
                    onClick={() => handleSquareClick(square)}
                >
                    {piece && (
                        <Piece
                            type={piece.type}
                            color={piece.color}
                        // Simple animation trigger if it was just moved to? 
                        // For now, no fancy animation prop logic, CSS transitions handle some.
                        />
                    )}
                </Square>
            );
        }
    }

    return (
        <div className={styles.boardContainer}>
            <div className={styles.board}>
                {board}
            </div>
        </div>
    );
};
