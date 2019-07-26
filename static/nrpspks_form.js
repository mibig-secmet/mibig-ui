// noprotect

$(document).ready(function () {

  var data = [
      [0, "", "", "", "", "", "", "", "", "", "", "", false],
    ];


  var validate_table = function (data) {
      for (var i = data.length - 1; i >= 0; i--) {
          if (data[i][0] === null || data[i][0] === ""){
            return "The module number seems to be missing for at least one of the entries. Please correct this.";
          }
          else if (data[i][1] === null || data[i][1] === ""){
            return "The protein ID seems to be missing for at least one of the entries. Please correct this.";
          }
          else if (data[i][2] === null || data[i][2] === ""){
            return "For at least one of the modules, it has not been indicated whether the module is a PKS or NRPS module. Please correct this.";
          }
          else if (data[i][3] === null || data[i][3] === ""){
            return "For at least one of the modules, it has not been indicated whether it is skipped or iterated. Please correct this.";
          }
          else if (data[i][4] === null || data[i][4] === ""){
            return "The evidence for skipping/iteration seems to be missing for at least one of the modules. Please correct this.";
          }
          else if (data[i][5] === null || data[i][5] === ""){
            return "The core domains seem to be missing for at least one of the entries. Please correct this.";
          }
          else if (data[i][6] === null || data[i][6] === ""){
            return "The presence/absence of scaffold-modifying domains has not been indicated for one of the modules. Please correct this.";
          }
          else if (data[i][7] === null || data[i][7] === "" || data[i][8] === null || data[i][8] === ""){
            return "The substrate specificities seem to be missing for at least one of the modules. Please correct this.";
          }
          else if (data[i][9] === null || data[i][9] === ""){
            return "The evidence for the provided substrate specificity seems to be missing for at least one of the entries. Please correct this.";
          }
          else if (data[i][10] === null || data[i][10] === ""){
            return "The KR stereochemistry/activity seems to be missing for at least one of the modules. Please correct this.";
          }
          else if (data[i][11] === null || data[i][11] === ""){
            return "The C domain subtype seems to be missing for at least one of the modules. Please correct this.";
          }
      }
      return "Perfect";
  }

  var domains_validator = function (value, callback) {
    var valid_domains = ["KS", "AT", "CAL", "DH", "KR", "ER", "T", "C", "A", "E", "TE"];
    setTimeout(function(){
      if (value.indexOf(",") >= 0){
        domains = value.toUpperCase().replace(/\s/g, '').split(",");
      }
      else {
        domains = [value];
      }
      var wrongdomain = false;
      for(i=0; i < domains.length; i++){
          if (valid_domains.indexOf(domains[i]) == -1){
            wrongdomain = true;
          }
       }
      if (wrongdomain){
        callback(false);
      }
      else {
        callback(true);
      }
    }, 100);
  };

  var cal_at_domain_present = function(value) {
    if (value === null) {
      return false;
    }
    domains = value.toUpperCase().replace(/\s/g, '').split(",");
    present = false;
    for(i=0; i < domains.length; i++){
      if (domains[i] == "AT" || domains[i] == "CAL") {
        present = true;
      }
    }
    return present;
  }

  var a_domain_present = function(value) {
    if (value === null) {
      return false;
    }
    domains = value.toUpperCase().replace(/\s/g, '').split(",");
    present = false;
    for(i=0; i < domains.length; i++){
      if (domains[i] == "A") {
        present = true;
      }
    }
    return present;
  }

  var modulenr_validator = function (value, callback) {
    var valid_chars = ["A", "B", "C", "D", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "X", "x"];
    var numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "X", "x"]
    setTimeout(function(){
      var wrongchar = false;
      var numbers_counted = 0;
      for(i=0; i < value.length; i++){
          if (valid_chars.indexOf(value[i]) == -1){
            wrongchar = true;
          }
          if (numbers.indexOf(value[i]) !== -1){
            numbers_counted++;
          }
       }
      if (wrongchar || (numbers_counted === 0)){
        callback(false);
      }
      else {
        callback(true);
      }
    }, 100);
  };

  var container = $("#tablediv");
  var parent = container.parent();
  container.handsontable({
    data: data,
    height: 300,
    startRows: 4,
    startCols: 14,
    minRows: 1,
    minCols: 11,
    maxRows: 100,
    maxCols: 14,
    minSpareRows: 1,
    fixedColumnsLeft: 2,
    stretchH: 'all',
    contextMenu: true,
    colHeaders: ["Module number", "Protein ID", "PKS / NRPS", "Skipped/iterated", "Evidence for skipping/iteration", "Core domains", "Modifying domain", "Acyltransferase / CAL domain specificity", "Adenylation domain specificity", "Evidence for specificity", "KR stereochemistry / activity", "Condensation domain subtype", "Epimerization", "Comments"],
    columns: [
      {
        validator:  modulenr_validator
      },
      {
      },
      {
        type: 'dropdown',
        source: ["NRPS", "PKS"],
        strict: false
      },
      {
        type: 'dropdown',
        source: ["Neither", "Skipped", "Iterated", "Non-elongating"],
        strict: false
      },
      {
        type: 'dropdown',
        source: [ "None", "Activity assay", "Structure-based inference", "Sequence-based prediction", "Other"],
        strict: false
      },
      {
        validator: domains_validator,
        allowInvalid: true
      },
      {
        type: 'autocomplete',
        source: ["None", "Oxidation", "Methylation", "Pyran synthase", "Michael branching", "Beta-branching", "Amination", "Crotonase / Enoyl-CoA dehydratase", "GNAT", "FkbH", "Other"],
        strict: false
      },
      {
      type: 'autocomplete',
      source: ["None", "Malonyl-CoA", "Methylmalonyl-CoA", "Methoxymalonyl-CoA", "Ethylmalonyl-CoA", "Hydroxymalonyl-CoA", "Aminomalonyl-CoA", "Malonamyl-CoA", "Acetyl-CoA", "Acetoacetyl-CoA", "Propionyl-CoA", "Benzoyl-CoA", "Isobutyryl-CoA", "2-Methylbutyryl-CoA", "3-Methylbutyryl-CoA", "Cyclohexylcarbonyl-CoA ", "Trans-cyclopentane-(1R, 2R)-dicarboxylic acid", "Mycolate", "Glycolate", "3,5-AHBA-CoA", "3-Amino-2-Methylpropionate", "p-Coumaroyl-CoA", "p-Nitrobenzoate", "p-Aminobenzoate", "Butyryl-ACP", "Hexanoyl-ACP"],
      strict: false
      },
      {
      type: 'autocomplete',
      source: ["None", "Alanine", "Arginine", "Asparigine", "Aspartate", "Cysteine", "Glutamine", "Glutamate", "Glycine", "Histidine", "Isoleucine", "Leucine", "Lysine", "Methionine", "Phenylalanine", "Proline", "Serine", "Threonine", "Tryptophan", "Tyrosine", "Valine", "(2R,3R)-2,3-Diaminobutyric acid", "(2S,3S)-2,3-Diaminobutyric acid", "(2S)-2,3-Diaminobutyric acid", "1-Methoxy-beta-alanine-thiazole", "2-Aminoadipic acid", "2-Aminobutyric acid", "2-Aminoisobutyric acid", "2-Bromo-5-hydroxytryptophan", "2-Carboxy-6-hydroxyoctahydroindole", "2-Carboxyquinoxaline", "2-Hydroxy-3-methyl-pentanoic acid", "2-Hydroxyisovalerate", "2-Hydroxyphenyl-2-oxo-ethanoic acid", "2-Methyl-3-aminobutanoic acid", "2-Methyl-3-aminopentanoic acid", "2-Methylamino-2-dehydrobutyric acid", "2,3-Dehydro-2-aminobutyric acid", "2,3-Dehydro-tryptophan", "2,3-Diaminopropionic acid", "2,3-Dihydroxybenzoic acid", "2,3-Dimethylpyroglutamic acid", "2,4-Diaminobutyric acid", "2,6-Diamino-7-hydroxyazelaic acid", "3-Amino-6-hydroxy-2-piperidone", "3-Chloro-4-hydroxyphenylglycine", "3-Desoxy-Methyl-4-butenyl-4-methylthreonine", "3-Hydroxy-5-methylproline", "3-Hydroxyleucine", "3-Hydroxyproline", "3-Methyl-glutamate", "3-Methyl-homotyrosine", "3-Methylphenylalanine", "3-Methylproline", "3-Methylvaleric acid", "3-Nitrotyrosine", "3,4-Dichloro-proline", "3,4-Dihydroxyarginine", "3,4-Dihydroxyphenylalanine", "3,4-Dimethylglutamine", "3,5-Dichloro-4-hydroxyphenylglycine", "3,5-Dihydroxyphenylglycine", "4-Amino-2,2-dimethyl-3-oxopentanoic acid", "4-Amino-3-hydroxybutyric acid", "4-Amino-7-guanidino-2,3-dihydroxyheptanoic acid", "4-Butenyl-4-methylthreonine", "4-Butenyl-4-methyl-N,4-methyl threonine", "4-Chlorothreonine", "4-Hydroxy-D-phenyllactate", "4-Hydroxyproline", "4-Hydroxythreonine", "4-Methyl-D-2-hydroxy-valeric acid", "4-Methylproline", "4-Oxo-5-methylproline", "4-Oxo-homoproline", "4-Oxo-proline", "4-Oxovancosamine", "4-Propenoyl-2-tyrosylthiazole acid", "5-Bromo-tryptophan", "5-Hydroxy-capreomycidine", "5-Hydroxytryptophan", "5-Methylproline", "5,6-Dihydropyoverdin chromophore", "8,10-Dimethyl-9-hydroxy-7-methoxytridecadienoic acid", "Actinomycin chromophore", "Alanine-thiazole", "Allo-Isoleucine", "Allo-Threonine", "Alpha-amino-hydroxyadipic acid", "Alpha-amino-hydroxyphenyl-valeric acid", "Alpha-amino-methoxyphenyl-valeric acid", "Alpha-amino-phenyl-valeric acid", "Alpha-ethylnorvaline", "Alpha-formylglycine", "Alpha-guanidinoserine", "Alpha-ketoarginine", "Alpha-methylcysteine", "Anticapsin", "Arginal", "Aziridine dicarboxylic acid", "Azotobactins chromophore", "Benzoic acid", "Beta-lysine", "Beta-phenylalanine", "Beta-alanine", "Beta-hydroxy-bromophenylalanine", "Beta-hydroxy-chloro-tyrosine", "Beta-hydroxy-N-methylphenylalanine", "Beta-hydroxy-N-methylvaline", "Beta-hydroxytyrosine", "Beta-hydroxyglutamine", "Beta-hydroxyvaline", "Beta-methoxyaspartate", "Beta-methoxytyrosine", "Beta-methylasparagine", "Beta-methylaspartate", "Beta-methylbromophenylalanine", "Beta-methylglutamine", "Beta-methylisoleucine", "Beta-tyrosine", "Beta-ureido-dehydroalanine", "Beta,beta-dimethylmethionine-S-oxide", "Beta,beta,N-trimethyltryptophan", "Beta,beta,N1,N-tetramethyltryptophan", "Bromophenylalanine", "Bromotyrosine", "Capreomycidine", "Chloroisoleucine", "Chloro-N-methyl-tyrosine", "Chloro-tyrosine", "Citrulline", "Coronamic acid", "Cyclo alpha-ketoarginine", "Cysteic acid", "D-2-aminobutyric acid", "D-2-carboxy-tryptophan", "D-2-hydroxy-3-methylpentanoic acid", "D-2-hydroxyisovalerate", "D-2,4-diaminobutyric acid", "D-3-bromo-N-methyltyrosine", "D-3-chloro-N-methyltyrosine", "D-3-iodo-N-methyltyrosine", "D-3-methoxyalanine", "D-3,5-dihydroxyphenylglycine", "D-4-fluorophenylglycine", "D-6-chloro-N2-formamidotryptophan", "D-6’-chlorotryptophan", "D-alloisoleucine", "D-allothreonine", "D-arginine", "D-asparagine", "D-aspartic acid", "D-beta-hydroxy-N2-methylasparagine", "D-beta-hydroxyvaline", "D-beta-methyl-aspartic acid", "D-beta-methylglutamine", "D-beta-phenylalanine", "D-citrulline", "D-cysteic acid", "D-cysteine", "D-enduracididine", "D-formyl-hydroxyornithine", "D-glutamate", "D-glutamate methyl ester", "D-glutamate methyl ester", "D-glutamine", "D-homoarginine", "D-homoproline", "D-homoserine", "D-hydroxy-cycloornithine", "D-hydroxyasparagine", "D-hydroxyaspartic acid", "D-hydroxyphenylglycine", "D-hydroxyproline", "D-isoleucine", "D-isovaline", "D-kynurenine", "D-lactic acid", "D-leucine", "D-lysine", "D-N-acetylhydroxyornithine", "D-N-formylalanine", "D-N-hydroxydehydrohydroxyphenylglycine", "D-N-methylalloisoleucine", "D-N-methylleucine", "D-N-methylnorvaline", "D-N-methylphenylalanine", "D-N-methylvaline", "D-N,O-dimethyl-tyrosine", "D-N2-methylasparagine", "D-N5-hydroxyornithine", "D-norvaline", "D-ornithine", "D-phenyllactate", "D-phenylalanine", "D-phenylglycine", "D-phosphate-asparagine", "D-proline", "D-serine", "D-tert-leucine", "D-threonine", "D-tryptophan", "D-tyrosine", "D-valine", "Dehydro vinylogous tyrosine", "Dehydrocysteine", "Dehydroalanine", "Dehydropyrrolidone", "DHP-methyloxazolinyl group", "Di-chloro-N-methyl-dehydroLeucine", "Di-chloro-N-methyl-Leucine", "Dihydroxyphenylthiazol group", "Dolaisoleucine", "Dolaphenine", "Dolaproine", "Dolapyrrolidone", "Dolavaline", "enduracididine", "Ethanolamine", "Gamma-hydroxy-N-methylvaline", "Glutamate methyl ester", "Guanylspermidine", "Homoarginine", "Homoisoleucine", "Homophenylalanine", "Homoproline", "Homoserine", "Homoserine lactone", "Homotyrosine", "Hydrated alpha-ketoarginine", "Hydroxypyrrolidone", "Hydroxy-beta-lysine", "Hydroxy-cycloornithine", "Hydroxyacetylpropionyl group", "Hydroxyasparagine", "Hydroxyaspartic acid", "Hydroxyhistidine", "Hydroxyisovalerylpropionyl group", "Hydroxyphenylglycine", "Hydroxypicolinic acid", "Hydroxysecbutylacetylpropionyl group", "Isoleucinol", "Isopyoverdin chromophore", "Isoserine", "Isostatine", "Isovaline", "Isovalinol", "Keto-Leucine", "Kynurenine", "L-acosamine", "L-actinosamine", "L-eremosamine", "L-ristosamine", "Lactic acid", "Leucinol", "Methionine sulfone", "Methionine-S-oxide", "Methoxyaspartic acid", "Methoxytryptophan", "Methyl-2-aminooctanoic acid", "Methyloxazoline-isoleucine", "N-acetyl-2-aminoisobutyric acid", "N-acetyl-hydroxyornithine", "N-acetyl-isovaline", "N-acetyl-leucine", "N-acetyl-N6-formyl-N6-hydroxyornithine", "N-acetylphenylalanine", "N-acetyltryptophan", "N-acetylvaline", "N-desmethyldolaisoleuine", "N-dimethylalanine", "N-dimethylleucine", "N-formylalanine", "N-formyl-D-aminobyric acid", "N-formylglutamine", "N-formylisoleucine", "N-formylisoserine", "N-formylleucine", "N-formylproline", "N-formylvaline", "N-hydroxy-dehydro-hydroxyphenylglycine", "N-Hydroxy-histamine", "N-methoxyacetyl-D-phenylalanine", "N-methoxyacetyl-valine", "N-methyl homo vinylogous valine", "N-methyl-2-bromo-tryptophan", "N-methyl-2,3-dehydrophenylalanine", "N-methyl-4-butenyl-4-methylthreonine", "N-methyl-4-dimethylamino-phenylalanine", "N-methyl-4-methylamino-phenylalanine", "N-methyl-5-hydroxytryptophan", "N-methyl-6-chloro-5-hydroxytryptophan", "N-methyl-6-chloro-tryptophan", "N-methylalanine", "N-methylalloisoleucine", "N-methyl-beta-alanine", "N-methyl-D-serine", "N-methyldehydroalanine", "N-methylglycine", "N-methylglycine-thiazole", "N-methylhomotyrosine", "N-methylhydroxyisoleucine", "N-methylhydroxyphenylglycine", "N-methylisoleucine", "N-methylieucine", "N-methylphenylalanine", "N-methylphenylglycine", "N-methylserine", "N-methylvaline", "N-methylasparagine", "N-methylchloropyrrole", "N-methylcysteine", "N-methyldichloropyrrole-2-carboxylic acid", "N-methylglutamine", "N-methylthreonine", "N-methyltyrosine", "N-trimethylleucine", "N,beta-dimethylleucine", "N,gamma-alloisoleucine", "N,O-dimethyl-isoleucine", "N,O-dimethyl-tyrosine", "N,O-dimethyl-tyrosinecarboxamid", "N,S-dimethylcysteine", "N1-acetyl-2,3-diaminopropionic acid", "N1-carboxy-bichomotryptophan", "N1-formyl-2,3-diaminopropionic acid", "N1-methyltryptophan", "N5-hydroxyornithine", "N6-formylhydroxyornithine", "Norcoronamic acid", "Norspermidine", "Norstatine", "Norvaline", "O-acetylleucinol", "O-acetylserine", "O-desmethyldolaproine", "O-methylthreonine", "O-sulfate-2-hydroxy-3-methylpentanoic acid", "Ornithine", "Para-hydroxy-benzoic acid", "Pentanedioic acid", "Phenyl-lactate", "Phenylacetic acid", "Phenylalaninol", "Phenylglycine", "Phenylserine", "Phosphinothricin", "Phototryptophan", "Proline carboxamid", "Propenoyl-2-aminobutanoyloxazole acid", "Propenoyl-alanyloxazole acid", "Propenoyl-O-methylserinylthiazole acid", "Putrescine", "Pyoverdin chromophore", "Pyroglutamic acid", "Pyrrolidone", "Pyruvate", "Serinol", "Spermidine", "Statine", "Tert-leucine", "Thiazolylphenylalanine", "Tri-chloro-2-hydroxy-N-methylleucine", "Tri-chloro-5-hydroxy-N-methylleucine", "Tri-chloro-N-methyl-dehydroLeucine", "Tri-chloro-N-methyl-Leucine", "Tryptophanol", "Valinol", "Vinylogous arginine", "Vinylogous hydroxytyrosine", "Vinylogous tyrosine"],
      strict: false
      },
      {
        type: 'dropdown',
        source: [ "None", "Activity assay", "Structure-based inference", "Isotope labeling", "Feeding study", "Sequence-based prediction", "Other"],
        strict: false
      },
      {
        type: 'dropdown',
        source: ["Unknown", "Inactive", "L-OH", "D-OH"],
        strict: false
      },
      {
        type: 'dropdown',
        source: ["LCL", "DCL", "Dual", "Starter", "Heterocyclization", "Other"],
        strict: false
      },
      {
        type: "checkbox"
      },
      {
      }
    ],
    beforeChange: function (changes, source) {
      for (var i = changes.length - 1; i >= 0; i--) {
        if ((changes[i][1] === 5)) {
          changes[i][3] = changes[i][3].toUpperCase().replace(/\s/g, ''); //capitalise first letter in column 1 and 2
        }
      }
    },

    cells: function (row, col, prop) {
      var cellProperties = {};
      //Make AT/CAL specificity cells N/A and read-only for NRPS modules
      if (container.handsontable('getData').length > row && col === 7 && cal_at_domain_present(container.handsontable('getData')[row][5]) === false && row != container.handsontable('getData').length - 1) {
        container.handsontable('getData')[row][col] = "N/A";
        cellProperties.readOnly = true;
      }
      else if (container.handsontable('getData').length > row && col === 7 && cal_at_domain_present(container.handsontable('getData')[row][5]) === true && container.handsontable('getData')[row][col] == "N/A") {
        container.handsontable('getData')[row][col] = "";
        cellProperties.readOnly = false;
      }
      //Make A specificity cells N/A and read-only for PKS modules
      if (container.handsontable('getData').length > row && col === 8 && a_domain_present(container.handsontable('getData')[row][5]) === false && row != container.handsontable('getData').length - 1) {
        container.handsontable('getData')[row][col] = "N/A";
        cellProperties.readOnly = true;
      }
      else if (container.handsontable('getData').length > row && col === 8 && a_domain_present(container.handsontable('getData')[row][5]) === true && container.handsontable('getData')[row][col] == "N/A") {
        container.handsontable('getData')[row][col] = "";
        cellProperties.readOnly = false;
      }
      //Make Skipping/Iteration evidence cells N/A and read-only if not skipped/iterated
      if (container.handsontable('getData')[row][3] === null && col === 4 && row != container.handsontable('getData').length - 1|| container.handsontable('getData').length > row && col === 4 && container.handsontable('getData')[row][3] !== null && (container.handsontable('getData')[row][3].toLowerCase().indexOf("skipped") === -1 && container.handsontable('getData')[row][3].toLowerCase().indexOf("iterated") === -1) && row != container.handsontable('getData').length - 1) {
        container.handsontable('getData')[row][col] = "N/A";
        cellProperties.readOnly = true;
      }
      else if (container.handsontable('getData')[row][3] === null && col === 4 || container.handsontable('getData').length > row && col === 4 && ( container.handsontable('getData')[row][3].toLowerCase().indexOf("skipped") >= 0 || container.handsontable('getData')[row][3].toLowerCase().indexOf("iterated") >= 0) && container.handsontable('getData')[row][col] == "N/A") {
        container.handsontable('getData')[row][col] = "";
        cellProperties.readOnly = false;
      }
      //Make KR stereochemistry cells N/A and read-only if no KR domain present
      if (container.handsontable('getData')[row][5] === null && col === 10 && row != container.handsontable('getData').length - 1|| container.handsontable('getData').length > row && col === 10 && container.handsontable('getData')[row][5] !== null && container.handsontable('getData')[row][5].toLowerCase().indexOf("kr") === -1 && row != container.handsontable('getData').length - 1) {
        container.handsontable('getData')[row][col] = "N/A";
        cellProperties.readOnly = true;
      }
      else if (container.handsontable('getData')[row][5] === null && col === 10 || container.handsontable('getData').length > row && col === 10 && container.handsontable('getData')[row][5].toLowerCase().indexOf("kr") >= 0 && container.handsontable('getData')[row][col] == "N/A") {
        container.handsontable('getData')[row][col] = "";
        cellProperties.readOnly = false;
      }
      //Make C domain type cells N/A and read-only if no C domain present
      if (container.handsontable('getData')[row][5] === null && col === 11 && row != container.handsontable('getData').length - 1 || container.handsontable('getData').length > row && col === 11 && container.handsontable('getData')[row][5] !== null && container.handsontable('getData')[row][5].toLowerCase().indexOf("c") === -1 && row != container.handsontable('getData').length - 1) {
        container.handsontable('getData')[row][col] = "N/A";
        cellProperties.readOnly = true;
      }
      else if (container.handsontable('getData')[row][5] === null && col === 11 || container.handsontable('getData').length > row && col === 11 && container.handsontable('getData')[row][5].toLowerCase().indexOf("c") >= 0 && container.handsontable('getData')[row][col] == "N/A") {
        container.handsontable('getData')[row][col] = "";
        cellProperties.readOnly = false;
      }
      //Make Epimerization checkboxes read-only if no C domain present
      if (container.handsontable('getData').length > row && col === 12 && container.handsontable('getData')[row][2] != 'NRPS' && row != container.handsontable('getData').length - 1) {
        container.handsontable('getData')[row][col] = false;
        cellProperties.readOnly = true;
      }
      else if (container.handsontable('getData').length > row && col === 12 && container.handsontable('getData')[row][2] == 'NRPS') {
        cellProperties.readOnly = false;
      }
      return cellProperties;
    }
  });
  var handsontable = container.data('handsontable');

parent.find('button[name=load]').click(function () {
  $.ajax({
    url: "/nrpspks_json/" + document.getElementById("mibig_acc").value + "_NRPSPKS.json",
    dataType: 'json',
    type: 'GET',
    statusCode: {
      404: function (res) {
        alert("Could not load " + document.getElementById("mibig_acc").value + ". Please check if your accession number is correct or contact us by e-mail for more information.");
      }
    },
    success: function (res) {
      handsontable.loadData(res.data);
    }
  });
});

parent.find('button[name=skip]').click(function () {
  window.location = "thankyou.html";
});

parent.find('button[name=submit]').click(function () {
  var data_json;
  var data;

  //alert("bgc_id=" + document.getElementById("mibig_acc").value);

  data = {"data": handsontable.getData().slice(0, -1)};

  var validation = validate_table(data.data);
  if (validation !== "Perfect"){
    alert(validation);
    return 1;
  }

  data.bgc_id = document.getElementById("mibig_acc").value;
  data.tablename = "nrps_info";
  data.version = "4";

  if ( data.bgc_id.substring(0,5) !== "BGC00") {
    alert("Please enter a correct MIBiG accession number for your gene cluster.");
    return 1;
  }

  data_json = JSON.stringify(data);

  // alert(data_json);
  $.ajax({
    url: "/api/v1/bgc-detail-registration",
    data: {
      "data": data_json,
      "version" : data.version,
      "bgc_id" : data.bgc_id,
      "target" : data.tablename
    },
    dataType: 'json',
    type: 'POST'
  })
  .done(function() {
     window.location = "/static/thankyou.html";
  })
  .fail(function(jqXHR, textStatus, errorThrown ) {

  alert("Error submitting data to server. Please check your internet connection. If the error persists, please contact us by email.");
  });
  //end click function
});

  function bindDumpButton() {
      $('body').on('click', 'button[name=dump]', function () {
        var dump = $(this).data('dump');
        var $container = $(dump);
        console.log('data of ' + dump, $container.handsontable('getData'));
      });
    }
  bindDumpButton();

});
