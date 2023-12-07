module.exports = {
  vendorName: 'Directum',
  componentName: 'ReactExample',
  componentVersion: '1.0',
  // Описание контролов, которые есть в компоненте. Реализация контролов находится в папке ./src/controls.
  controls: [
    {
      name: 'Gantt',
      // Загрузчики контрола. Загрузчик - это функция, принимающая информацию о контексте и точку доступа к API.
      // Задача загрузчика - смонтировать корневой UI-компонент контрола в указанный DOM-элемент.
      // Один и тот же контрол может отображаться в разных контекстах (карточка и обложка модуля). Если контрол должен отображаться и в карточке и в обложке, 
      // то для него следует создать разные загрузчики для этих контекстов (*-cover-loader и *-card-loader).
      loaders: [
        {
          // Имя загручика должно соответствовать имени загрузчика в файле component.loaders.ts.
          name: 'gantt-cover-loader',
          // Контекст для которого предназначен загрузчик.
          scope: 'Cover'
        }
      ]
    },
    {
      name: 'PerformedWorkDetailsGrid',
      loaders: [
        {
          name: 'performed-work-details-grid-card-loader',
          scope: 'Card'
        }
      ]
    },
    {
      name: 'ActionsPanel',
      loaders: [
        {
          name: 'actions-panel-cover-loader',
          scope: 'Cover'
        }
      ]
    },
    {
      name: 'StringControl',
      loaders: [
        {
          name: 'string-control-card-loader',
          scope: 'Card'
        }
      ]
    }
  ]
};
