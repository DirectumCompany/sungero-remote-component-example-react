import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Task } from 'gantt-task-react';
import { ControlUpdateHandler, IRemoteComponentApi, IRemoteComponentContext } from '@directum/sungero-remote-component-types';

import '../../../i18n';
import { dataSource } from './gantt-data-source'

import GanttView from './gantt-view';

interface IProps {
  initialContext: IRemoteComponentContext;
  api: IRemoteComponentApi;
}

/** Пример контрола-виджета, отображающего диаграмму Ганта, используя данные из контекста. */
const Gantt: React.FC<IProps> = ({ initialContext, api }) => {
  // Используем контекст, полученный в момент загрузки стороннего контрола, в качестве начального.
  // После обновления контрола, берем новый контекст.
  const [ context, setContext ] = React.useState(initialContext);

  // Задаем локализацию внутри контрола в соответствии с локализацией в контексте, в котором находится контрол.
  const currentCulture = context.currentCulture ?? 'en';
  const { i18n } = useTranslation();
  React.useEffect(() => {      
    i18n.changeLanguage(currentCulture);
  }, [ currentCulture ]);

  // Задаем обработчик события обновления контрола.
  const handleControlUpdate: ControlUpdateHandler = React.useCallback(updatedContext => {
    // Устанавливаем в state актуальный контекст.
    setContext(updatedContext);
  }, [ api ]);
  api.onControlUpdate = handleControlUpdate;

  // Инициализируем данные контрола данными из хоста.
  const tasks = dataSource.map<Task>(l => 
    ({
      start: l.start,
      end: l.end,
      name: l.name,
      id: l.name,
      type: 'task',
      progress: l.progress,
      isDisabled: true,
      styles: { progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d' },
    })
  );

  return <GanttView tasks={tasks} />
};

export default Gantt;
