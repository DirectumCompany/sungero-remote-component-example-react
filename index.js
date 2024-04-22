// Точка входа для отладки контролов в режиме standalone (отдельное приложение, без веб клиента Sungero).

import api from './host-api-stub';
import context from './host-context-stub';
import loadApp from './src/loaders/performed-work-details-grid-card-loader';

let args = {
  container: document.getElementById('app'),
  initialContext: context,
  api: api,
  controlInfo: null
}

loadApp(args);
