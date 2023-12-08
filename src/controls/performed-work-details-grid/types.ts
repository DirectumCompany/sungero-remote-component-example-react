import { IChildEntity, IChildEntityCollection, IEntity, INavigationPropertyValue } from '@directum/sungero-remote-component-types';

export interface IPerformedWorkDetails extends IChildEntity<IPerformedWork> {
  Title: string;
  Comment: string | null;
  Duration: number;
  JobKind: INavigationPropertyValue | null;
}

export interface IPerformedWork extends IEntity {
  PerformedWorkDetails: IChildEntityCollection<IPerformedWork, IPerformedWorkDetails>;
}
