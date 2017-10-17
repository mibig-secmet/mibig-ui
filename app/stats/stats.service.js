class GeneralStats {
  constructor(num_clusters, value) {
    this.num_clusters = num_clusters;
  };
}

class Record {
  constructor(type, count, description) {
    this.type = type;
    this.count = count;
    this.description = description;
  }
}

export default class StatsService{
  constructor($http){
    this.$http = $http;
  };

  generalStats() {
    let general_stats = new GeneralStats(1234);
    return general_stats;
  };

  getRecords() {
    return [
      new Record('nrps', 17, 'Nonribosomal peptide'),
      new Record('t1pks', 23, 'Type I polyketide'),
    ];
  }
}
