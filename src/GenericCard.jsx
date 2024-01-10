import React from 'react';

const GenericCard = ({
  title,
  content,
  onClick,
  onDetailsClick,
  customStyle,
  children,
}) => {
  const cardStyle = {
    backgroundColor: '#ABB2B9',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '8px',
    marginTop: '8px',
    transition: 'background-color 0.3s',
    ...customStyle,
  };

  return (
    <div className="card" style={cardStyle} onClick={onClick}>
      <h3>{title}</h3>
      <div>{content}</div>
      {children && <div>{children}</div>}
      <button
        style={{
          backgroundColor: 'blue',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '4px',
          marginTop: '8px',
        }}
        onClick={onDetailsClick}
      >
        Details
      </button>
    </div>
  );
};

export default GenericCard;
