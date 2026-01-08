import React from 'react';
import styles from '../styles.module.css';

interface PieceProps {
    type: string;
    color: 'w' | 'b';
    animate?: boolean;
}

export const Piece: React.FC<PieceProps> = ({ type, color, animate }) => {
    const imgSrc = `/pieces/${color}${type.toUpperCase()}.png`;

    return (
        <div
            className={`${styles.piece} ${animate ? styles.animate : ''}`}
            style={{ backgroundImage: `url(${imgSrc})` }}
        />
    );
};
