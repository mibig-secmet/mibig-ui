class GeneralStatsCtrl{
  constructor($state){
    this.$state = $state;
  }

  goTo(search_string) {
    this.$state.go('query', {search_string: search_string});
  }
};

GeneralStatsCtrl.$inject = ['$state'];

module.exports = {
  template: require('./general-stats.html'),
  controller: GeneralStatsCtrl,
  bindings: {
    stats: '='
  }
};
