import angular from 'angular';
import uiRouter from 'angular-ui-router';

routes.$inject = ['$stateProvider'];
export default function routes($stateProvider) {
  $stateProvider
  .state('download', {
    url: '/download',
    template: require('./download.html')
  });
};
