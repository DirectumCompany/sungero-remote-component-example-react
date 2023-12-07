import React from 'react';

import './actions-panel-view.css';

export interface IButtonProps {
  name: string;
  title: string;
  onClick(): void;
}

interface IProps {
  buttons: Array<IButtonProps>;
}

const ButtonsPanel: React.FC<IProps> = ({ buttons }) => {
  const panelButtons = buttons.map(b => {
    return <button
      className='buttons-panel__button'
      title={b.title}
      onClick={b.onClick}
    >
      {b.name}
    </button>;
  });

  return <div className='buttons-panel'>{panelButtons}</div>;
};
  
export default ButtonsPanel;
