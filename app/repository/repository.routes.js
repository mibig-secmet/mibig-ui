routes.$inject = ['$stateProvider'];
export default function routes($stateProvider) {
  $stateProvider
    .state('repository', {
      url: '/repository',
      template: require('./repository.html'),
      resolve: {
        entries: ['RepositoryService', (RepositoryService) => {
          return RepositoryService.getEntries();
        }],
      },
    });
};
