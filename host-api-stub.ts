import { IEntity, IRemoteComponentCardApi } from '@directum/sungero-remote-component-types';

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
      DisplayValue: 'Test Entity',
      PerformedWorkDetails: [
        { Id: 42, DisplayValue: 'Child Entity', Title: 'Work', JobKind: 1, Duration: 8, Comment: 'Работал' },
        { Id: 43, DisplayValue: 'Child Entity', Title: 'Work', JobKind: 1, Duration: 5, Comment: 'Работал' }
      ]
    } as unknown as T;
  }

  public onControlUpdate?: (() => void);
}
  
const api: IRemoteComponentCardApi = new HostStubApi();
export default api;
  