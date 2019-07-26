var MegxFormWidget = new MegxFormWidget(
  {
    target : "bgc-registration-form",
    schemaLocation : "/static/mibig_schema_short.json",
    optionsLocation : "/static/mibig_options_short.json",
    formId : "mibig-form",
    wizard : {
      "renderWizard" : true,
      "statusBar" : true,

      "steps" : 3,
      "bindings" : {
        "personal" : 1,
        "general_params" : 2,
        "comments" : 3,
        "embargo" : 3
      },
      "stepTitles" : [ {
        "title" : "Personal",
        "description" : "Name, E-mail, etc."
      }, {
        "title" : "MIBiG Data",
        "description" : "Annotation of the gene cluster"
      }, {
        "title" : "Comments",
        "description" : "Clarifications, comments, etc."
      } ]
    }
  });
