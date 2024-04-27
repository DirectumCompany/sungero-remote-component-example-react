import { IEntity, IRemoteComponentCardApi } from '@directum/sungero-remote-component-types';
import { EmployeeStatusEnum } from './src/controls/employees-rating/types';

/** Заглушка API для отладки в режиме standalone. */
class HostStubApi implements IRemoteComponentCardApi {
  public executeAction(actionName: string): Promise<void> {
    console.log(`Action ${actionName} executed.`)
    return Promise.resolve();
  }

  public canExecuteAction(actionName: string): boolean {
    return true;
  }

  public getEntity<T extends IEntity>(): T {
    return {
      Id: 1,
      DisplayValue: 'Производственный отдел',
      EmployeeRatingDetails: [
        {
          Id: 42,
          DisplayValue: 'Начальники проекта',
          Employees: [
            {
              Id: 232,
              Name: 'Первый работник',
              Status: EmployeeStatusEnum.RatingRequired,
            },
            {
              Id: 23213,
              Name: 'Второй работник',
              Status: EmployeeStatusEnum.Signed,
            }
          ]
        },
        {
          Id: 43,
          DisplayValue: 'Руководители разработки',
          Employees: [
            {
              Id: 233,
              Name: 'Первый работник',
              Status: EmployeeStatusEnum.RatingRequired,
            },
            {
              Id: 2312313,
              Name: 'Второй работник',
              Status: EmployeeStatusEnum.Signed,
            }
          ]
        },
      ]
    } as unknown as T;
  }

  public onControlUpdate?: (() => void);
}

const api: IRemoteComponentCardApi = new HostStubApi();
export default api;
