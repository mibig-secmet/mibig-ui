class QueryBuilderCtrl{
  constructor(QueryService) {
    this.qs = QueryService;
    this.query = {
      search: 'cluster',
      return_type: 'json',
      verbose: false,
      terms: {
        term_type: 'expr',
        category: '',
        term: '',
      },
    };
  }

  loadExample(){
    this.query = {
      search: 'cluster',
      return_type: 'json',
      verbose: false,
      terms: {
        term_type: 'op',
        operation: 'and',
        left: {
          term_type: 'expr',
          category: 'type',
          term: 'ripp',
        },
        right: {
          term_type: 'op',
          operation: 'and',
          left: {
            term_type: 'expr',
            category: 'completeness',
            term: 'complete',
          },
          right: {
            term_type: 'expr',
            category: 'genus',
            term: 'Streptomyces',
          },
        },
      },
    };
  };

  search(){
    if (!this.validSearch()) {
      return;
    }
    this.qs.search(this.query);
  };

  validTerm(term) {
    if (term.term_type == 'expr') {
      if (term.category === '') {
        return false;
      }
      if (term.term === '') {
        return false;
      }
      return true;
    }
    if (term.term_type == 'op') {
      return this.validTerm(term.left) && this.validTerm(term.right);
    }
    return false;
  }

  validSearch() {
    if (!this.query) {
      return false;
    }
    if (!this.query.terms) {
      return false;
    }

    return this.validTerm(this.query.terms);
  };

  graphicalPossible() {
    if (this.query.search == 'cluster') {
      return true;
    }
    return false;
  };

  showSearch() {
    if (this.graphicalPossible() && this.query.return_type == 'json') {
      return true;
    }
    return false;
  };

};

QueryBuilderCtrl.$inject = ['QueryService'];

module.exports = {
  template: require('./query-builder.html'),
  controller: QueryBuilderCtrl,
  bindings: {}
};

