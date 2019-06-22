function repositoryCtrl(){
}

module.exports = {
  template: require('./repository-component.html'),
  controller: repositoryCtrl,
  bindings: {
    entries: '=',
  }
};
