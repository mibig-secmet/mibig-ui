function queryCtrl(){
  let vm = this;

  vm.isPending = () => {
    return vm.queryService.search_pending;
  };

  vm.isDone = () => {
    return vm.queryService.search_done;
  };
};

module.exports = {
  template: require('./query-component.html'),
  controller: queryCtrl,
  bindings: {
    queryService: '<',
  }
};
