class SubmitCtrl {
  constructor($http) {
    this.$http = $http;

    this.done = false;

    this.compounds = [
      new Compound(),
    ];
    this.loci = [
      new Locus()
    ];
  }
  addCompound() {
    this.compounds.push(new Compound());
  }
  addLocus() {
    this.loci.push(new Locus());
  }
  submit() {
    let submission = {
      name: this.name,
      email: this.email,
      compounds: this.compounds.filter(compound => compound.name).map(compound => compound.name),
      loci: this.loci.filter(locus => locus.genbank_accession),
    };
    console.log(submission);
    this.$http.post("/api/v1/submit", submission).then(result => {
      this.done = true;
    });
  }
}

SubmitCtrl.$inject = ['$http'];

class Compound {
}

class Locus {
  constructor(accession, start, end) {
    this.genbank_accession = accession;
    this.start = start;
    this.end = end;
  }
}

module.exports = {
  template: require('./submit.component.html'),
  controller: SubmitCtrl,
  bindings: {
  }
};

