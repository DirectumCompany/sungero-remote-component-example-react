import { IChildEntity, IChildEntityCollection, IEntity } from '@directum/sungero-remote-component-types';

export enum EmployeeStatusEnum {
  RatingRequired,
  Signed,
}

export interface IEmployeeRatingDetaildEmployee {
  Id: number;
  Name: string;
  Status: EmployeeStatusEnum;
}

export interface IEmployeeRatingDetails extends IChildEntity<IEmployeeRating> {
  Employees: Array<IEmployeeRatingDetaildEmployee>;
}

export interface IEmployeeRating extends IEntity {
  EmployeeRatingDetails: IChildEntityCollection<IEmployeeRating, IEmployeeRatingDetails>;
}
