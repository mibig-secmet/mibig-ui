class RepositoryCtrl {
  showEntry(entry) {
    window.open('/go/' + entry.accession, '_blank');
  }
}

module.exports = {
  template: require('./repository-component.html'),
  controller: RepositoryCtrl,
  bindings: {
    entries: '=',
  }
};
