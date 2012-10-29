App.ActionParamsView = Ember.View.extend
  templateName: 'home_page/projects/rules/actions/actions_params'  

  init: ->
    @_super()       

  didInsertElement: ->
    @_super()

  didContentChange: (->        
    Ember.run.schedule('render', this, 'applyJqueryConstructs')
  ).observes('actionParams')
  

  applyJqueryConstructs: ->
     
    $(".select2Props").not(".select2-container").select2(
                                minimumInputLength: 0                                      
                                closeOnSelect: true
                                openOnEnter: true
                              )