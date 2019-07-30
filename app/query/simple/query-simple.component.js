function querySimpleCtrl(){
  let vm = this;
  vm.search_string = '';

  vm.loadExample = () => {
    vm.search_string = 'lanthipeptide';
  };

  vm.simpleSearch = () => {
    vm.queryService.simpleSearch(vm.search_string);
  };

  vm.validSearch = () => {
    if (vm.search_string != '') {
      return true;
    }
    return false;
  }

};

module.exports = {
  template: require('./query-simple.html'),
  controller: querySimpleCtrl,
  bindings: {
    queryService: '<',
  }
};
