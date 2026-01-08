import React from 'react';
import styles from '../styles.module.css';

interface SquareProps {
    isDark: boolean;
    isSelected: boolean;
    isLastMove: boolean;
    isCheck: boolean;
    isValidMove: boolean;
    isValidAttack: boolean; // True if valid move captures something
    onClick: () => void;
    children?: React.ReactNode;
}

export const Square: React.FC<SquareProps> = ({
    isDark, isSelected, isLastMove, isCheck, isValidMove, isValidAttack, onClick, children
}) => {
    let className = `${styles.square} ${isDark ? styles.dark : styles.light}`;

    if (isSelected) className += ` ${styles.selected}`;
    else if (isLastMove) className += ` ${styles.lastMove}`;

    if (isCheck) className += ` ${styles.check}`;

    if (isValidAttack) className += ` ${styles.validAttack}`;
    else if (isValidMove) className += ` ${styles.validMove}`;

    return (
        <div className={className} onClick={onClick}>
            {children}
        </div>
    );
};
