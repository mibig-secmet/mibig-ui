import angular from 'angular';
import uiRouter from 'angular-ui-router';
import tooltip from 'angular-ui-bootstrap/src/tooltip';
import angularInview from 'angular-inview';

import routes from './repository.routes';
import RepositoryService from './repository.service';
import repository from './repository.component';

export default angular.module('mibig.repository', [uiRouter, tooltip, angularInview])
  .component('mibigRepository', repository)
  .service('RepositoryService', RepositoryService)
  .config(routes)
  .name;
