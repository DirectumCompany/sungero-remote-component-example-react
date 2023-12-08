import { ILogger, IRemoteComponentContext, Theme } from '@directum/sungero-remote-component-types';

/** Заглушка контекста для отладки в режиме standalone. */
const context: IRemoteComponentContext = {
  userId: 1,
  currentCulture: 'ru',
  tenant: null,
  theme: Theme.Default,
  clientId: '',
  logger: {
    error(errorOrmessageTemplate: Error | string, messageTemplateOrArgs?: string | string[], ...args: string[]) {
      console.error(errorOrmessageTemplate, messageTemplateOrArgs, args);
    },
    warning(messageTemplate: string, ...args: string[]){
      console.warn(messageTemplate, args);
    },
    info(messageTemplate: string, ...args: string[]) {
      console.log(messageTemplate, args);
    },
    debug(messageTemplate: string, ...args: string[]){
      console.log(messageTemplate, args);
    }
  } as unknown as ILogger,
  moduleLicenses: [ 
    { name: 'module1', version: '1.0' },
    { name: 'module2', version: '1.0' }
  ]
};

export default context;
