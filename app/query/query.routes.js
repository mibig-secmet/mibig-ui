routes.$inject = ['$stateProvider'];
export default function routes($stateProvider) {
  $stateProvider
    .state('query', {
      url: '/query',
      template: require('./query.html'),
      resolve: {
        queryService: ['QueryService', (QueryService) => { return QueryService; }],
      },
    });
};
