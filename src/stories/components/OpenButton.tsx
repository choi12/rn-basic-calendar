import { CSSProperties } from 'react';

import { COLORS } from '../../constants';

const buttonStyle: CSSProperties = {
  padding: '12px 20px',
  backgroundColor: COLORS.PRIMARY,
  borderRadius: 8,
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 16,
  color: 'white',
  fontWeight: '500',
  border: 'none',
  transition: 'transform 0.15s ease',
};

function OpenButton({ onPress }: { onPress: () => void }) {
  return (
    <button
      onClick={onPress}
      style={buttonStyle}
      onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.95)')}
      onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
    >
      📅 Open Calendar Modal
    </button>
  );
}

export default OpenButton;
