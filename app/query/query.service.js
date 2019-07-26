class Results{
  constructor(){
    this.total = 0;
    this.clusters = [];
    this.offset = 0;
    this.paginate = 0;
    this.stats = null;
  };

  fromJSON(data) {
    this.total = data.total;
    for(var i = 0; i < data.clusters.length; i++){
      this.clusters.push(new Cluster().fromJSON(data.clusters[i]));
    }
    this.offset = data.offset;
    this.paginate = data.paginate;

    // Make chainable
    return this;
  };
}


class Tag{
  constructor(name, css_class) {
    this.name = name;
    this.css_class = css_class;
  };
}

class Cluster{
  constructor() {
    this.tags = [];
  };

  fromJSON(data) {
    this.accession = data.accession;
    this.completeness = data.completeness;
    this.product = data.products.join(', ');
    data.classes.forEach((tag) => {
      this.tags.push(new Tag(tag.name, tag.css_class));
    });
    this.organism = data.organism;
    // Make chainable
    return this;
  };
}

export default class QueryService{
  constructor($http, $q){
    this.$http = $http;
    this.search_pending = false;
    this.search_done = false;
    this.ran_simple_search = false;
    this.results = new Results();
  };

  simpleSearch(search_string) {
    this.search_pending = true;
    this.$http.post('/api/v1/search', {search_string: search_string}).then(results => {
      this.results.fromJSON(results.data);
      this.search_pending = false;
      this.search_done = true;
      this.ran_simple_search = true;
    });
  };

  reset() {
    this.results = new Results();
    this.search_done = false;
  }
}

QueryService.$inject = ["$http"]
