class QueryCtrl {
  constructor(){
  };

  isPending(){
    return this.queryService.search_pending;
  };

  isDone(){
    return this.queryService.search_done;
  };

};

module.exports = {
  template: require('./query-component.html'),
  controller: QueryCtrl,
  bindings: {
    queryService: '<',
  }
};
