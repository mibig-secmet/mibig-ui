import angular from 'angular';
import uiRouter from 'angular-ui-router';
import buttons from 'angular-ui-bootstrap/src/buttons';
import collapse from 'angular-ui-bootstrap/src/collapse';
import tabs from 'angular-ui-bootstrap/src/tabs';
import typeahead from 'angular-ui-bootstrap/src/typeahead';

import routes from './query.routes';
import QueryService from './query.service';
import CategoryService from './builder/term/category.service';
import query from './query.component';
import simple from './simple/query-simple.component';
import builder from './builder/query-builder.component';
import term from './builder/term/term.component';
import results from './results/query-results.component';

export default angular.module('mibig.query', [uiRouter, buttons, collapse, tabs, typeahead])
  .component('mibigQuery', query)
  .component('mibigSimpleSearch', simple)
  .component('mibigQueryBuilder', builder)
  .component('mibigQueryResults', results)
  .component('mibigQueryTerm', term)
  .service('QueryService', QueryService)
  .service('CategoryService', CategoryService)
  .config(routes)
  .name;
