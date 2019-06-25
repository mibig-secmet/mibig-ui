class Entry{
  constructor() {
    this.tags = [];
  };

  fromJSON(data) {
    this.accession = data.accession;
    this.minimal = data.minimal;
    this.product = data.products.join(', ');
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
    this.entries = [];

    $http.get("/api/v1/repository").then((response) => {
      response.data.forEach((entry) => {
        this.entries.push(new Entry().fromJSON(entry))
      });
    });
  };

  getEntries() {
    return this.entries;
  }

}
