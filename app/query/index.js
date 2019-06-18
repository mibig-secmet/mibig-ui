import angular from 'angular';
import uiRouter from 'angular-ui-router';
import collapse from 'angular-ui-bootstrap/src/collapse';
import tabs from 'angular-ui-bootstrap/src/tabs';

import routes from './query.routes';
import QueryService from './query.service';
import query from './query.component';
import simple from './simple/query-simple.component';
import results from './results/query-results.component';

export default angular.module('mibig.query', [uiRouter, collapse, tabs])
  .component('mibigQuery', query)
  .component('mibigSimpleSearch', simple)
  .component('mibigQueryResults', results)
  .service('QueryService', QueryService)
  .config(routes)
  .name;
