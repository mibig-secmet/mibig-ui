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

class Cluster{
  constructor() {
  };

  fromJSON(data) {
    this.accession = data.accession;
    this.completeness = data.completeness;
    this.product = data.product;
    this.class = data.class;
    this.subclass = data.subclass;
    this.organism = data.organism;
    // Make chainable
    return this;
  };
}

export default class QueryService{
  constructor($http, $q){
    this.$http = $http;
    this.$q = $q;
    this.search_pending = false;
    this.search_done = false;
    this.ran_simple_search = false;
    this.results = new Results();
  };

  simpleSearch(search_string) {
    console.log('Searching "' + search_string + '"');
    this.search_pending = true;
    // $http.post('/api/v1.0/search', {search_string: search_string})
    // Instead, use a fake result for now
    let fake_json = {
      total: 2,
      clusters: [
        {
          accession: 'BGC000023',
          completeness: 'full',
          product: 'aurafuron',
          class: 'polyketide',
          subclass: 'modular type I',
          organism: 'Stigmatella aurantiaca DW4/3-1',
        },
        {
          accession: 'BGC000042',
          completeness: 'partial',
          product: 'cremimycin',
          class: 'polyketide',
          subclass: 'modular type I',
          organism: 'Streptomyces sp. MJ635-86F5',
        },
      ],
      offset: 0,
      paginate: 50,
      stats: null,
    };
    this.results.fromJSON(fake_json);
    this.search_pending = false;
    this.search_done = true;
    this.ran_simple_search = true;
  };
}
