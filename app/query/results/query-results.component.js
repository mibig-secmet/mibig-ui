function queryResultsCtrl(){
  let vm = this;

  vm.$onInit = () => {
    vm.s = vm.queryService;
    vm.results = vm.queryService.resutls;
  };

  vm.reverseSort = false;
  vm.orderByField = 'accession';

  vm.changeSortOrder = (order_by_field) => {
    if (vm.orderByField != order_by_field) {
      vm.orderByField = order_by_field;
    } else {
      vm.reverseSort = !vm.reverseSort;
    }
  };

  vm.searchIconClass = () => {
    if (vm.reverseSort) {
      return 'fa-arrow-down';
    }
    return 'fa-arrow-up';
  };

};

module.exports = {
  template: require('./query-results.html'),
  controller: queryResultsCtrl,
  bindings: {
    queryService: '<',
  }
};
