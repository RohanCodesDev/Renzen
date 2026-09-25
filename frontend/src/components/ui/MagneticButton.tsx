import { useRef, useState, ReactNode } from 'react';
import styles from './MagneticButton.module.css';

interface Props {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function MagneticButton({ children, className = '', onClick }: Props) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e;
    const { width, height, left, top } = buttonRef.current!.getBoundingClientRect();
    
    const x = (clientX - (left + width / 2)) * 0.3; // 0.3 is the pull strength
    const y = (clientY - (top + height / 2)) * 0.3;
    
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <button
      ref={buttonRef}
      className={`${styles.magneticBtn} ${className}`}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
    >
      <span 
        className={styles.content}
        style={{ transform: `translate(${position.x * 0.5}px, ${position.y * 0.5}px)` }}
      >
        {children}
      </span>
    </button>
  );
}
