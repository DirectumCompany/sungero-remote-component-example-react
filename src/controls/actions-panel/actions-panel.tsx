import React from 'react';
import { IRemoteComponentContext, IRemoteComponentCoverApi } from '@sungero/remote-component-types';

import ButtonsPanel from './actions-panel-view';

interface IProps {
  initialContext: IRemoteComponentContext;
  api: IRemoteComponentCoverApi;
}

/** Пример контрола с панелью кнопок, запускающих действия на обложке модуля. */
const ActionsPanel: React.FC<IProps> = ({ api }) => {
  // Получаем метаданные действий на обложке модуля с помощью API.
  const metadata = api.getActionsMetadata();

  const buttons = metadata.map(m => ({
    name: m.title,
    title: m.description,
    onClick() {
      // Запускаем выполнение соответствующего действия обложки с помощью API.
      api.executeAction(m.id);
    }
  }));

  return <ButtonsPanel buttons={buttons} />;
};

export default ActionsPanel;
