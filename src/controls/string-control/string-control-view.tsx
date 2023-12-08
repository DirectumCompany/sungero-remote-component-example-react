import React from 'react';
import { Theme } from '@directum/sungero-remote-component-types';

import './string-control-view.css';

interface IProps {
  label: string;
  value?: string;
  onChange(newValue?: string): Promise<void>;
  theme: Theme;
  isEnabled: boolean;
}

const DEFAULT_THEME_ICON = '☀';
const NIGHT_THEME_ICON = '☾';

const StringControlView: React.FC<IProps> = ({ label, value, onChange, theme, isEnabled }) => {
  const [ editorValue, setEditorValue ] = React.useState(value ?? '');

  React.useEffect(() => setEditorValue(value ?? ''), [ value ]);

  const handleBlur = React.useCallback(() => {
    if (editorValue !== value)
      onChange(editorValue);
  }, [ onChange, value, editorValue ]);
  
  const icon = theme === Theme.Default ? DEFAULT_THEME_ICON : NIGHT_THEME_ICON;

  const labelClassName = `string-control__label${!isEnabled ? ' string-control__label_disabled' : ''}`;
  const inputClassName = `string-control__input${!isEnabled ? ' string-control__input_disabled' : ''}`;

  return (
    <div className='string-control'>
      <span className={labelClassName}>{icon} {label}</span>
      <input
        className={inputClassName}
        type='text'
        value={editorValue}
        onBlur={handleBlur}
        onChange={e => setEditorValue(e.target.value)}
        disabled={!isEnabled}
      />
    </div>
  );
};
  
export default StringControlView;
