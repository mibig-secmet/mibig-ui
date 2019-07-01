import angular from 'angular';
import uiRouter from 'angular-ui-router';

import routes from './submit.routes';
import mibigSubmission from './submit.component';

export default angular.module('mibig.submit', [uiRouter])
  .config(routes)
  .component('mibigSubmission', mibigSubmission)
  .name;


