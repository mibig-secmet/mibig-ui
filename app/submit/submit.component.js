class SubmitCtrl {
  constructor($http) {
    this.$http = $http;

    this.done = false;
    this.has_error = false;
    this.error = null;

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
      compounds: this.compounds.filter(compound => compound.isValid()).map(compound => compound.name),
      loci: this.loci.filter(locus => locus.isValid()),
    };
    console.log(submission);
    this.$http.post("/api/v1/submit", submission).then(result => {
      this.done = true;
    }).catch(err => {
      this.has_error = true;
      this.error = err.data;
      console.log(err);
    });
  }
  isValid() {
    if (!this.name) return false;
    if (!this.email) return false;
    if (this.compounds.filter(compound => compound.isValid()).length == 0) return false;
    if (this.loci.filter(locus => locus.isValid()).length == 0) return false;
    return true;
  }
}

SubmitCtrl.$inject = ['$http'];

class Compound {
  isValid() {
    return this.name && this.name !== "";
  }
}

class Locus {
  constructor(accession, start, end) {
    this.genbank_accession = accession;
    this.start = start;
    this.end = end;
  }

  isValid() {
    return this.genbank_accession && this.genbank_accession !== "";
  }

}

module.exports = {
  template: require('./submit.component.html'),
  controller: SubmitCtrl,
  bindings: {
  }
};
