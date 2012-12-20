App.ProjectEditController = Em.ObjectController.extend
  isNew : false
  content: null

  updateUrl: 'app/update'
  createUrl: 'app/create' 
  deleteUrl: 'app/delete'

  projectChanged: (->
   @set('content',App.get('router.projectsController').get('selected'))
  ).observes('App.router.projectsController.selected')
  

  deleteProject: ->   
    url = @deleteUrl
    controllerObj = this
    if @get("isNew") is false      
      del_id = @get('content').get('id')

      # Success callback -------------------------
      success= (data) ->
       
        if data.status is true          
          projsController = App.router.get('projectsController')
          content = controllerObj.get('content')
          projsController.deleteProj(content)    
        
        App.get("router").send("listProject")
      # Error callback -------------------------
      error= ()->

      App.postRequest url, {id : del_id}, success, error

    else
      return false

  validateEdit: ->
    project = @get 'content'

    name = project.get 'description.name'
    email = project.get 'description.email'
    origin = project.get 'description.origin'
    
    nameReg = /^[-a-zA-Z0-9_ ]+$/
    
    urlReg = /http(s?):\/\/[A-Za-z0-9\.-]{3,}\.[0-9A-Za-z]{1,4}/
    emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/    
    if email is null or name is null and origin is null or
       email.length is 0 or name.length is 0 or origin.length is 0 or
        not emailReg.test(email) or not nameReg.test(name) 
      # TODO: Commented to accept port
      #or not urlReg.test(origin)      
      message = "Domain, email and name are mandatory. Please correct the settings"
      App.get('router.applicationController').setInlineAlert('error', 'Validation Failed !', message )   
      false
    else
      true


  postProject: ->       
    validated = @validateEdit()
    
    if validated is true
      url = @updateUrl

      if @get("isNew") is true
        url = @createUrl

       controllerObj = this



      # Success callback -------------------------
      success= (data) ->
        projsController = App.router.get('projectsController')
        if controllerObj.get("isNew") is true
          newProj = App.Project.create(data)
          projsController.addNewProj(newProj)                       
          projsController.set 'selected', newProj
          App.get("router").send "forceProjectRules", newProj 
        else
          message = "Application changes updated at the server."
          App.get('router.applicationController').setInlineAlert('success', 'Application updated!', message )   
        
      # Error Callback -------------------------    
      error= () ->
        message = "Unable to save the editted project, there is some problem."
        App.get('router.applicationController').setInlineAlert('error', 'Failed to communicate!', message )   
        
      content = @get 'content'    
      App.postRequest url, content.filterData(), success, error
  
