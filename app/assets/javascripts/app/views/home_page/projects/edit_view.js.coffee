App.ProjectEditView = Ember.View.extend(
  isNew = false

  stateIsNew: (-> 
    @get("isNew") is true
  ).property("isNew")

  setStateNew: (-> 
    @set "isNew", true
  )

  submitProject: (->
    isNewProject = @isNew
    if isNewProject is true
      # Code to create a new project must be invoked
      App.log App.DBG, "Project is new submitted")
    else
      # Code to update the existing project must be invoked
      App.log App.DBG,  "Project is old submitted"

  )
)
