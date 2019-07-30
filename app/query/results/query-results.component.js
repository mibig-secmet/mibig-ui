class QueryResultsCtrl {
  constructor($window) {
    this.reverseSort = false;
    this.orderByField = 'accession';
    this.$window = $window;
  }

  $onInit() {
    this.s = this.queryService;
    this.results = this.queryService.results;
  }


  changeSortOrder(order_by_field) {
    if (this.orderByField != order_by_field) {
      this.orderByField = order_by_field;
    } else {
      this.reverseSort = !this.reverseSort;
    }
  }

  searchIconClass(){
    if (this.reverseSort) {
      return 'fa-arrow-down';
    }
    return 'fa-arrow-up';
  };

  resetSearch() {
    this.queryService.reset()
  };

  showCluster(entry) {
    this.$window.open('/go/' + entry.accession, '_blank');
  }

};

QueryResultsCtrl.$inject = ["$window"];

module.exports = {
  template: require('./query-results.html'),
  controller: QueryResultsCtrl,
  bindings: {
    queryService: '<',
  }
};
