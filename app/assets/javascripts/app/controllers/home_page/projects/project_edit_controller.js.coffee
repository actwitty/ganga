App.ProjectEditController = Em.ObjectController.extend(
  isNew : false
  isBusy: false
  isError: false
  isSuccess: false
  content: null

  updateUrl: 'app/update'
  createUrl: 'app/create' 
  deleteUrl: 'app/delete'

  resetStates: (->
  	@set 'isBusy', false
  	@set 'isError', false
  	@set 'isSuccess', false

  )

  stateIsBusy: (-> 
    @get("isBusy") is true
  ).property("isBusy")

  stateIsError: (->
    @get("isError") is true
  ).property("isError")

  stateIsSuccess: (->
    @get("isSuccess") is true
  ).property("isSuccess")
  deleteProject: ->
    @set 'isBusy', true

    url = @deleteUrl
    controllerObj = this
    if @get("isNew") is false      
      del_app_id = @get('content').get('app_id')
    

      # Success callback -------------------------
      success= (data) ->
        console.log data
        
        if data.status is true          
          projsController = App.router.get('projectsController')
          content = controllerObj.get('content')
          projsController.deleteProj(content)          

        controllerObj.set 'isBusy', false
      # Error callback -------------------------
      error= ()->
        controllerObj.set 'isBusy', false

      App.postRequest url, {app_id : del_app_id}, success, error

    else
      return false

  postProject: ->  	
  	@set 'isBusy', true
  	url = @updateUrl
  	if @get("isNew") is true
  	  url = @createUrl

  	 controllerObj = this

    # Success callback -------------------------
  	success= (data) ->
      controllerObj.set 'isBusy', false
      controllerObj.set 'isSuccess', true
      projsController = App.router.get('projectsController')
      if controllerObj.get("isNew") is true
      	newProj = App.Project.create(data)
      	projsController.addNewProj(newProj)      	      	      	
      else
      	#TODO handle error
      controllerObj.set 'isBusy', false
    # Error Callback -------------------------  	
    error= () ->
      controllerObj.set 'isBusy', false
      controllerObj.set 'isError', false
      
    content = @get 'content'
    console.log content.filterData()
    App.postRequest url, content.filterData(), success, error
  
 )