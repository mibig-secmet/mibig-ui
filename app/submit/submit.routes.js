routes.$inject = ['$stateProvider'];
export default function routes($stateProvider) {
  $stateProvider
  .state('submit', {
    url: '/submit',
    template: require('./submit.html')
  });
};
