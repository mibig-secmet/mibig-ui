class TermCtrl {
  constructor($http, CategoryService){
    this.$http = $http;
    this.categories = CategoryService.categories;
  };

  add() {
    let new_op = {
      term_type: 'op',
      operation: 'and',
      left: this.term,
      right: {
        term_type: 'expr',
        category: '',
        term: '',
      },
    };
    this.term = new_op;
  };

  remove(term) {
    if (this.term.right == term) {
      this.term = this.term.left;
      return;
    }

    if (this.term.left == term) {
      this.term = this.term.right;
    }
  };

  swap() {
    let tmp = this.term.left;
    this.term.left = this.term.right;
    this.term.right = tmp;
  };

  getTerms(term) {
    if (this.term.category == '') {
      return [];
    }
    return this.$http.get(`/api/v1/available/${this.term.category}/${term}`)
      .then((response) => {
        return response.data;
      });
  };
};

TermCtrl.$inject = ['$http', 'CategoryService'];

module.exports = {
  template: require('./term.component.html'),
  controller: TermCtrl,
  bindings: {
    term: '=',
  }
};

