import React from 'react';
import { Gantt, Task, ViewMode } from 'gantt-task-react';
import { useTranslation } from 'react-i18next';

import 'gantt-task-react/dist/index.css';

import './gantt-view.css';

interface IProps {
  tasks: Array<Task>
}

const GanttView: React.FunctionComponent<IProps> = ({ tasks }) => {
  const { t, i18n } = useTranslation();

  return (
    <div className='gantt'>
      <div className='gantt__title'>{t('gantt.title')}</div>
      <Gantt 
        tasks={tasks}
        locale={i18n.language}
        viewMode={ViewMode.HalfDay}
      />
    </div>
  );
}

export default GanttView;
