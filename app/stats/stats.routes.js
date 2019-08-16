routes.$inject = ['$stateProvider'];
export default function routes($stateProvider) {
  $stateProvider
  .state('stats', {
    url: '/stats',
    template: require('./stats.html'),
    resolve: {
      general_stats: ['StatsService', (StatsService) => {
        return StatsService.generalStats();
      }],
      records: ['StatsService', (StatsService) => {
        return StatsService.getRecords();
      }],
      taxon_stats: ['StatsService', (StatsService) => {
        return StatsService.taxonStats();
      }],
    },
  });
};
