import React from 'react';
import { useTranslation } from 'react-i18next';
import DataGrid, { textEditor, renderValue, RenderCellProps, Column } from 'react-data-grid';
import 'react-data-grid/lib/styles.css';

import { IPerformedWork, IPerformedWorkDetails } from './types';
import './performed-work-details-grid-view.css';

interface IProps {
  entity: IPerformedWork;
}

interface IRowData {
  _entity?: IPerformedWorkDetails;
  Id?: number | string;
  Title?: string;
  JobKind?: string;
  Duration?: number;
  Comment?: string | null;
}

const CopyRowButton: React.FC<RenderCellProps<IRowData>> = ({ row }) => {
  const handleClick = async () => {
    const oldChild = row._entity!;

    // Добавляем новую дочернюю сущность в коллекцию.
    const newChild = await oldChild.RootEntity.PerformedWorkDetails.addNew();

    // Изменяем свойства дочерней сущности в коллекции.
    await newChild.changeProperty('Title', oldChild.Title);
    await newChild.changeProperty('Comment', oldChild.Comment ?? '');
    await newChild.changeProperty('Duration', oldChild.Duration);
    await newChild.changeProperty('JobKind', oldChild.JobKind as any);
  };

  const { t } = useTranslation();
  return <button className='preformed-work-details-grid__row-button' onClick={handleClick}>{t('performedWorkDetailsGrid.buttons.copy')}</button>;
};

const RemoveRowButton: React.FC<RenderCellProps<IRowData>> = ({ row }) => {
  const handleClick = () => {
    // Удаляем дочернюю сущность из коллекции.
    row._entity!.RootEntity.PerformedWorkDetails.remove(row._entity!);
  };

  const { t } = useTranslation();
  return <button className='preformed-work-details-grid__row-button' onClick={handleClick}>{t('performedWorkDetailsGrid.buttons.remove')}</button>;
};

const rowKeyGetter = (row: IRowData): number => {
  return row._entity?.Id ?? -1;
};

const handleRowsChange = (rows: Array<IRowData>, info: any) => {
  const changedRow = rows[info.indexes[0]] as any;
  let newValue = changedRow[info.column.key];
  if (info.column.key === 'Duration') {
    newValue = parseInt(newValue, 10);
    if (isNaN(newValue))
      throw new Error('Incorrect value.');
  }

  // Изменение свойства дочерней сущности.
  changedRow._entity?.changeProperty(info.column.key, newValue);
};

const sum = (arr: Array<number>): number => {
  return arr.reduce((partialSum, a) => partialSum + a, 0);
}

const PerformedWorkDetailsGridView: React.FC<IProps> = ({ entity }) => {
  const { t, i18n } = useTranslation();
  const works = entity.PerformedWorkDetails;
  const durationSum = sum(works.map(w => w.Duration));
  const summaryRowId = t('performedWorkDetailsGrid.summary.total');
  const [ summaryRows, setSummaryRows ] = React.useState<Array<IRowData>>([{ Id: summaryRowId, Duration: durationSum }]);
  if (summaryRows[0].Duration !== durationSum) {
    setSummaryRows([{ Id: summaryRowId, Duration: durationSum }]);
  }

  const handleAddEntryClick = React.useCallback(async () => {
    // Добавляем новую дочернюю сущность в коллекцию.
    await works.addNew();
  }, [ works ]);

  const columns: Array<Column<IRowData>> = React.useMemo(() => [
    { key: 'Id', name: t('performedWorkDetailsGrid.columns.id'), sortable: true, width: 60, summaryCellClass: 'preformed-work-details-grid__summary-cell', renderSummaryCell: renderValue as any },
    { key: 'Title', name: t('performedWorkDetailsGrid.columns.title'), sortable: true, summaryCellClass: 'preformed-work-details-grid__summary-cell', renderEditCell: textEditor },
    { key: 'JobKind', name: t('performedWorkDetailsGrid.columns.jobKind'), sortable: true, summaryCellClass: 'preformed-work-details-grid__summary-cell' },
    { key: 'Duration', name: t('performedWorkDetailsGrid.columns.duration'), sortable: true, summaryCellClass: 'preformed-work-details-grid__summary-cell', renderEditCell: textEditor, renderSummaryCell: renderValue as any },
    { key: 'Comment', name: t('performedWorkDetailsGrid.columns.comment'), sortable: true, summaryCellClass: 'preformed-work-details-grid__summary-cell', renderEditCell: textEditor },
    { key: 'CopyButton', name: '', summaryCellClass: 'preformed-work-details-grid__summary-cell', renderCell: CopyRowButton, width: 104 },
    { key: 'RemoveButton', name: '', summaryCellClass: 'preformed-work-details-grid__summary-cell', renderCell: RemoveRowButton, width: 91 }
  ], [ i18n.language ]);

  const data: Array<IRowData> = React.useMemo(() => works.map(work => ({
    _entity: work,
    Id: work.Id,
    Title: work.Title,
    JobKind: work.JobKind?.DisplayValue,
    Duration: work.Duration,
    Comment: work.Comment
  })), [ works ]);

  return (
    <div className='preformed-work-details-grid'>
      <div className='preformed-work-details-grid__top-buttons'>
        <button className='preformed-work-details-grid__add-new-button' onClick={handleAddEntryClick}>{t('performedWorkDetailsGrid.buttons.add')}</button>
      </div>
      <DataGrid
        className='preformed-work-details-grid__grid'
        columns={columns}
        rows={data}
        rowKeyGetter={rowKeyGetter}
        bottomSummaryRows={summaryRows}
        onRowsChange={handleRowsChange}
      />
    </div>
  );
};

export default PerformedWorkDetailsGridView;
