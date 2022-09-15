class GeneralStats {
  constructor(counts) {
    this.reload(counts);
  };

  reload(counts) {
    this.total = counts.total;
    this.minimal = counts.minimal;
    this.non_minimal = this.total - this.minimal;
    this.complete = counts.complete;
    this.incomplete = counts.incomplete;
    this.retired = counts.retired;
    this.pending = counts.pending;
  }
}

class Record {
  constructor(type, count, description, css_class) {
    this.type = type;
    this.count = count;
    this.description = description;
    this.css_class = css_class;
  }
}

class TaxonStats {
  constructor(phylum, count) {
    this.phylum = phylum;
    this.count = count;
  };
}

export default class StatsService {
  constructor($http) {
    this.$http = $http;
    this.general_stats = new GeneralStats({ total: "?", minimal: "?" });
    this.records = [];
    this.taxon_stats = [];

    $http.get("/api/v1/stats").then((response) => {
      this.general_stats.reload(response.data.counts);
      response.data.clusters.forEach((cluster) => {
        this.records.push(new Record(cluster.type, cluster.count, cluster.description, cluster.css_class));
      });
      response.data.phylum_stats.forEach((stat) => {
        this.taxon_stats.push(new TaxonStats(stat.phylum, stat.count));
      });
    });
  };

  generalStats() {
    return this.general_stats;
  };

  getRecords() {
    return this.records;
  }

  taxonStats() {
    return this.taxon_stats;
  }
}

StatsService.$inject = ['$http']
