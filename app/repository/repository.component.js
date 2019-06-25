class RepositoryCtrl {
  showEntry(entry) {
    alert('Would show ' + entry.accession);
  }
}

module.exports = {
  template: require('./repository-component.html'),
  controller: RepositoryCtrl,
  bindings: {
    entries: '=',
  }
};
