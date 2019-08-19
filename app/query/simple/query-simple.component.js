class QuerySimpleCtrl{
  constructor($stateParams) {
    this.search_string = '';
    this.$stateParams = $stateParams;
  }

  $onInit() {
    if (this.$stateParams.search_string) {
      this.search_string = this.$stateParams.search_string;
      this.simpleSearch();
    }
  }

  loadExample() {
    this.search_string = 'lanthipeptide';
  }

  simpleSearch() {
    this.queryService.simpleSearch(this.search_string);
  };

  validSearch() {
    if (this.search_string != '') {
      return true;
    }
    return false;
  };

}

QuerySimpleCtrl.$inject = ['$stateParams'];

module.exports = {
  template: require('./query-simple.html'),
  controller: QuerySimpleCtrl,
  bindings: {
    queryService: '<',
  }
};
