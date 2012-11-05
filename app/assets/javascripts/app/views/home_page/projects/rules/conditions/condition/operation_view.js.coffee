App.OperationView = Ember.View.extend  
  templateName: 'home_page/projects/rules/conditions/condition/operation'

  operationList: {}
  # ------------------------------------------
  init: ->
  	@_super()
  	@observeOperationsChange()
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
  getNewOperation: (event) ->
    target = $(event.target)
    target.select2("val")

