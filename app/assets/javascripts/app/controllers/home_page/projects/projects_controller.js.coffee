App.ProjectsController = Em.ArrayController.extend(
  content: []
  selected: null    
  url: "/account/list_apps"
  #########################################################
  translatePropertyName: (property) ->
    property.replace('][',".").replace("[",".").replace("]","")

  #########################################################
  loadSchema: (schema) ->
    
    if typeof schema is "undefined"
      return {}

    propertySchema = {}
    for property, details in schema.properties
      propertyName = @translatePropertyName property
      for type, events in details
        propertySchema[propertyName] = type
    return propertySchema

  #########################################################
  loadRules: (rules) ->
    #define a new rule content
    rulesContent = Ember.ArrayProxy.create(
      content: []
    )
    
    for rule of rules 

      conditionContent = Ember.ArrayProxy.create(content: [])

      (for condition of rule.conditions
        newCondition = App.Condition.create(condition)
        conditionContent.pushObject(newCondition)
      )
      

      
      newRule = App.Rule.Create(
        name: rule.name
        id: rule.id
        conditions: rule.conditions
      )
      
      ruleContent.pushObject(newRule)
    
    return ruleContent
  
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





)