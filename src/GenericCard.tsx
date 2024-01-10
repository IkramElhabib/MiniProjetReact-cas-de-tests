import React, { ReactNode } from 'react';
import "./app.css";

interface GenericCardProps {
  title: string;
  content: ReactNode;
  onClick?: () => void;
  onDetailsClick?: () => void;
  children?: ReactNode;
  flagUrl?: string;
}

const GenericCard: React.FC<GenericCardProps> = ({ title, content, onClick, onDetailsClick, children, flagUrl }) => {
  return (
    <div className="container">
      <div className="card" onClick={onClick}>

        {flagUrl && <img src={flagUrl} alt={`${title} Flag`} />} {/* Afficher le drapeau */}
        <h3>{title}</h3>
        <div>{content}</div>
        {children && <div>{children}</div>}
        <button onClick={onDetailsClick}>Details</button>
      </div>
    </div>
  );
};

export default GenericCard;
