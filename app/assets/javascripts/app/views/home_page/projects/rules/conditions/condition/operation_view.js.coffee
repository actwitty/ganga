App.OperationView = Ember.View.extend  
  templateName: 'home_page/projects/rules/conditions/condition/operation'

  operationList: {}
  operation: null
  # ------------------------------------------
  init: ->
  	@_super()
  	@observeOperationsChange()
  	@observeOperationChange()
  # ------------------------------------------
  applyJqueryConstructs: ->
    $(".select2Props").not(".select2-container").select2(
                                minimumInputLength: 0                                      
                                closeOnSelect: true
                                openOnEnter: true
                              )
  # ------------------------------------------
  observeOperationsChange: (->  	
  	opList = @get "condition.opList"
  	@set 'operationList', opList
  	@rerender()
  	Ember.run.next(this, 'applyJqueryConstructs')
  ).observes('condition.opList')

  # ------------------------------------------
  observeOperationChange: (->
  	operation = @get "condition.operation"
  	@set 'operation', operation  	
  ).observes('condition.operation')
  # ------------------------------------------
  getNewOperation: (event) ->
    target = $(event.target)
    val = target.select2("val")

