function taxonStatsCtrl(){
};

module.exports = {
  template: require('./taxon-stats.html'),
  controller: taxonStatsCtrl,
  bindings: {
    taxa: '='
  }
};
