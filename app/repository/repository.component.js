const STEPS = 200;

class RepositoryCtrl {
  constructor() {
    this.limit = STEPS;
  }

  loadMore(last, inview) {
    if (last && inview) {
      this.limit += STEPS;
    }
  }

  resetLimit() {
    this.limit = STEPS;
  }

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
