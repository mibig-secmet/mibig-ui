class Results {
  constructor() {
    this.total = 0;
    this.clusters = [];
    this.offset = 0;
    this.paginate = 0;
    this.stats = null;
  };

  fromJSON(data) {
    this.total = data.total;
    this.offset = data.offset;
    this.paginate = data.paginate;

    if (!data.clusters) {
      return this;
    }

    for (var i = 0; i < data.clusters.length; i++) {
      this.clusters.push(new Cluster().fromJSON(data.clusters[i]));
    }

    // Make chainable
    return this;
  };
}


class Tag {
  constructor(name, css_class) {
    this.name = name;
    this.css_class = css_class;
  };
}

class Cluster {
  constructor() {
    this.tags = [];
  };

  fromJSON(data) {
    this.accession = data.accession;
    this.complete = data.complete;
    this.minimal = data.minimal;
    let products = [];
    data.products.forEach((product) => {
      products.push(product.name);
    });
    this.product = products.join(", ");
    data.classes.forEach((tag) => {
      this.tags.push(new Tag(tag.name, tag.css_class));
    });
    this.organism = data.organism;
    // Make chainable
    return this;
  };

  completenessIcon() {
    switch (this.complete) {
      case "complete":
        return "fa-circle";
      case "incomplete":
        return "fa-circle-o";
      default:
        return "fa-question";
    }
  };
}

export default class QueryService {
  constructor($http) {
    this.$http = $http;
    this.search_pending = false;
    this.search_done = false;
    this.ran_simple_search = false;
    this.results = new Results();
  };

  simpleSearch(search_string) {
    this.reset()
    this.search_pending = true;
    this.$http.post('/api/v1/search', { search_string: search_string }).then(results => {
      this.results.fromJSON(results.data);
      this.search_pending = false;
      this.search_done = true;
      this.ran_simple_search = true;
    }).catch(error => {
      this.search_pending = false;
      this.search_done = true;
      this.ran_simple_search = true;
    });
  };

  search(query) {
    this.reset()
    this.search_pending = true;
    this.$http.post('/api/v1/search', { query: query }).then(results => {
      this.results.fromJSON(results.data);
      this.search_pending = false;
      this.search_done = true;
      this.ran_simple_search = false;
    }).catch(error => {
      this.search_pending = false;
      this.search_done = true;
      this.ran_simple_search = false;
    });
  }

  reset() {
    this.results = new Results();
    this.search_done = false;
  }
}

QueryService.$inject = ["$http"]
