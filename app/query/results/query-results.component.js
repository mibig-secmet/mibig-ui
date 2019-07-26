class QueryResultsCtrl {
  constructor() {
    this.reverseSort = false;
    this.orderByField = 'accession';
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

};

module.exports = {
  template: require('./query-results.html'),
  controller: QueryResultsCtrl,
  bindings: {
    queryService: '<',
  }
};
