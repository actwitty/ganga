App.ProjectsController = Em.ArrayController.extend
  content: []
  selected: null    
  url: "/account/list_apps"
  rules_load: "/app/read"
  #########################################################
  serializeProj: ->
    project = @get 'selected'
    if project isnt null
      project.serialize
    else
      null

  #########################################################
  loadAll: (data)->
    content = @get 'content'    
    if 'accounts' of data
      for project in data.accounts 
        content.pushObject App.Project.create(project)

      if content.length > 0
        firstProject = content.objectAt(0)
        @set 'selected', firstProject
        App.get("router").send("listProject");
      else
        App.get("router").send("bareBoneAccount")
    else
      App.get("router").send("bareBoneAccount")
      

  #########################################################
  load: ()->
    controllerObj = this
    controllerObj.set 'content', []

    success= (data) ->
      controllerObj.loadAll(data)

    error= () ->

    App.getRequest controllerObj.url, {events : false}, success, error

  #########################################################
  loadProjectRules: (project)->
    if project.checkRulesIsNull() is true
      success= (data) -> 
        project.setRules(data.app.rules)      
        App.get("router").send("projectRulesLoaded", project)

      error= () ->
        #Todo error handling
      json = 
            app_id : project.get 'id'
            events : false
      App.getRequest @get('rules_load'), json, success, error
    else
      App.get("router").send("projectRulesLoaded", project)



  #########################################################   

  addNewProj: (obj)->
    @get('content').pushObject(obj)
    @set('selected', obj)

  #########################################################   

  deleteProj: (obj) ->
    content = @get('content')    
    content.removeObject(obj)    
    obj.destroy()
    

    if content.length > 0
      firstProject = content.objectAt(0)
      @set 'selected', firstProject
      App.get("router").send("listProject");
    else
      @set 'selected', null
      App.get("router").send("bareBoneAccount")  





