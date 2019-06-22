class Entry{
  constructor() {
  };

  fromJSON(data) {
    this.accession = data.accession;
    this.minimal = data.minimal;
    this.product = data.product;
    this.class = data.class;
    this.css_class = data.css_class;
    this.organism = data.organism;
    // Make chainable
    return this;
  };
}

export default class RepositoryService{
  constructor($http, $q){
    this.$http = $http;
    this.$q = $q;
    this.loading = true;

    // TODO: Get this from the API
    this.entries = [
      new Entry().fromJSON({
        accession: 'BGC0001234',
        minimal: false,
        product: 'demomycin',
        'class': 'Lipopeptide',
        css_class: 'nrps',
        organism: 'E. xample'
      }),
      new Entry().fromJSON({
        accession: 'BGC0002345',
        minimal: true,
        product: 'lackomicin',
        'class': 'Type II polyketide',
        css_class: 'pks',
        organism: 'E. xample'
      }),
    ];
  };

  getEntries() {
    return this.entries;
  }

}
