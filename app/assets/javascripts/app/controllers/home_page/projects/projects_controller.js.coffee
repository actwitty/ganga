App.ProjectsController = Em.ArrayController.extend(
  content: []
  selected: null  
  url: "/apps/all"
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
    for project in apps
      newProject = {}
      newProject.id = project.id
      newProject.name = project.description.name
      newProject.domain = project.description.domain
      newProject.schema = @loadSchema project.schema.properties
      newProject.rules = @loadRules project.rules

      projectData = App.Project.create(project)
      content.pushObject projectData

      

  #########################################################
  load: ()->
    controllerObj = this
    controllerObj.set 'content', []

    success= (data) ->
      controllerObj.loadAll(data)

    error= () ->

    App.getRequest controllerObj.url, {events : false}, success, error

  #########################################################   


  #########################################################
   update: () -> 

  #########################################################
   create: () -> 

  #########################################################
   delete: () ->
)