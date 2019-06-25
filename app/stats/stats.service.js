class GeneralStats {
  constructor(num_clusters) {
    this.num_clusters = num_clusters;
  };
}

class Record {
  constructor(type, count, description, css_class) {
    this.type = type;
    this.count = count;
    this.description = description;
    this.css_class = css_class;
  }
}

export default class StatsService{
  constructor($http){
    this.$http = $http;
    this.general_stats = new GeneralStats("?");
    this.records = [];

    $http.get("/api/v1/stats").then((response) => {
      this.general_stats.num_clusters = response.data.num_records;
      response.data.clusters.forEach((cluster) => {
        this.records.push(new Record(cluster.type, cluster.count, cluster.description, cluster.css_class));
      });
    });
  };

  generalStats() {
    return this.general_stats;
  };

  getRecords() {
    return this.records;
  }
}

StatsService.$inject = ['$http']
