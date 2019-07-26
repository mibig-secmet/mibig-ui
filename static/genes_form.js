$(document).ready(function () {

  var data = [
      ["", true, 0, 0, "", "", "", "", "", "", ""],
    ];

  var validate_table = function (data) {
      for (var i = data.length - 1; i >= 0; i--) {
          if (data[i][0] === null || data[i][0] === ""){
            return "The genome/contig accession number seems to be missing for at least one of the entries. Please correct this.";
          }
          else if (data[i][1] === false && (data[i][2] === null || data[i][2] === "" || data[i][3] === null || data[i][3] === "")){
            return "For at least one of the genes that is indicated not to be annotated in GenBank, no start/end coordinates have been provided yet. Please correct this.";
          }
          else if (data[i][1] === true && (data[i][4] === null || data[i][4] === "")){
            return "For at least one of the genes that is indicated to be annotated in GenBank, a protein ID is missing. Please correct this.";
          }
          else if (data[i][8] === null || data[i][8] === ""){
            return "The tailoring reaction type is missing for at least one of the genes. Please correct this.";
          }
          else if ((data[i][7] !== null && data[i][7] !== "") && (data[i][9] === null || data[i][9] === "")){
            return "The evidence for function is missing for at least one of the genes. Please correct this.";
          }
      }
      return "Perfect";
  }

  var accession_validator = function (value, callback) {
    var letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    var numbers = ["0","1","2","3","4","5","6","7","8","9"];
    var allowed_chars = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","0","1","2","3","4","5","6","7","8","9",".","_"];
    value = value.toUpperCase().replace(/\s/g, '');
    setTimeout(function(){
      var wrongchar = false;
      var numbers_counted = 0;
      for(i=0; i < value.length; i++){
          if (i === 0 && letters.indexOf(value[i]) === -1){
            wrongchar = true;
          }
          else if (allowed_chars.indexOf(value[i]) === -1){
            wrongchar = true
          }
          if (numbers.indexOf(value[i]) !== -1){
            numbers_counted++;
          }
       }
      if (wrongchar || (numbers_counted <= 3)){
        callback(false);
      }
      else {
        callback(true);
      }
    }, 100);
  };



  var container = $("#example1");
  var parent = container.parent();
  container.handsontable({
    data: data,
    height: 300,
    startRows: 4,
    startCols: 13,
    minRows: 1,
    minCols: 11,
    maxRows: 100,
    maxCols: 13,
    minSpareRows: 1,
    fixedColumnsLeft: 2,
    stretchH: 'all',
    contextMenu: true,
    colHeaders: ["Genome/contig accession","CDS in annotation", "Start coordinate", "End coordinate", "Protein ID", "Gene ID", "Gene function annotation", "Gene function category", "Tailoring reaction type", "Evidence for function", "Knockout mutation phenotype", "Publication on this gene", "Comments"],
    columns: [
      {
        validator: accession_validator,
        allowInvalid: true
      },
      {
        type: "checkbox"
      },
      {type: 'numeric'},
      {type: 'numeric'},
      {
        validator: accession_validator,
        allowInvalid: true
      },
      {},
      {},
      {
        type: 'dropdown',
        source: ["Unknown", "Scaffold biosynthesis", "Precursor biosynthesis", "Tailoring", "Activation / processing", "Other enzymatic", "Transport", "Regulation", "Resistance/immunity", "Other"],
        strict: false
      },
      {
        type: 'dropdown',
        source: ["Unknown", "Acetylation", "Acylation", "Amination", "Carboxylation", "Deamination", "Decarboxylation", "Dehydration", "Demethylation", "Deoxygenation", "Monooxygenation", "Dioxygenation", "Epimerization", "Glycosylation", "Halogenation", "Heterocyclization", "Hydrolysis", "Hydroxylation", "Methylation", "Oxidation", "Phosphorylation", "Prenylation", "Reduction", "Sulfation", "Other"],
        strict: false
      },
      {
        type: 'autocomplete',
        source: ["N/A", "Knock-out", "Other in vivo study", "Activity assay", "Sequence-based prediction", "Other"],
        strict: false
      },
      {},
      {},
      {}
    ],
    beforeChange: function (changes, source) {
      for (var i = changes.length - 1; i >= 0; i--) {
        if ((changes[i][1] === 0)) {
          changes[i][3] = changes[i][3].toUpperCase().replace(/\s/g, ''); //capitalise first letter in column 1 and 2
        }
      }
    },
    cells: function (row, col, prop) {
      var cellProperties = {};
      if (container.handsontable('getData').length > row && col === 8 && container.handsontable('getData')[row][col-1] != 'Tailoring' && row != container.handsontable('getData').length - 1) {
        container.handsontable('getData')[row][col] = "N/A";
        cellProperties.readOnly = true;
      }
      else if (container.handsontable('getData').length > row && col === 8 && container.handsontable('getData')[row][col-1] == 'Tailoring' && container.handsontable('getData')[row][col] == "N/A") {
        container.handsontable('getData')[row][col] = "";
        cellProperties.readOnly = false;
      }
      return cellProperties;
    }
  });
  var handsontable = container.data('handsontable');

parent.find('button[name=load]').click(function () {
  $.ajax({
    url: "/mibig_genes_json/" + document.getElementById("mibig_acc").value + ".json",
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
  window.location = "nrpspks_form.html";
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
  data.tablename = "gene_info";
  data.version = "3";

  if ( data.bgc_id.substring(0,5) !== "BGC00") {
    alert("Please enter a correct MIBiG accession number for your gene cluster.");
    return 1;
  }

  data_json = JSON.stringify(data);

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
     window.location = "/static/nrpspks_form.html";
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
