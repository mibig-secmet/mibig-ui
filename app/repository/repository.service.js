class Entry{
  constructor() {
    this.tags = [];
  };

  fromJSON(data) {
    this.accession = data.accession;
    this.minimal = data.minimal;
    this.product = data.product;
    data.classes.forEach((tag) => {
      this.tags.push(new Tag(tag.name, tag.css_class));
    });
    this.organism = data.organism;
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
        classes: [{name: 'Lipopeptide',  css_class: 'nrps'}, {name: 'Modular type I polyketide', css_class: 'pks'}],
        organism: 'E. xample'
      }),
      new Entry().fromJSON({
        accession: 'BGC0002345',
        minimal: true,
        product: 'lackomicin',
        classes: [{name: 'Type II polyketide', css_class: 'pks'}],
        organism: 'E. xample'
      }),
    ];
  };

  getEntries() {
    return this.entries;
  }

}
