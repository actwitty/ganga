App.ActionParamsView = Ember.View.extend
  templateName: 'home_page/projects/rules/actions/actions_params'  
  
  didContentChange: (->        
    #Put to execute in next runloop
    Ember.run.next( this, 'applyJqueryConstructs')
  ).observes('actionParams')
  

  applyJqueryConstructs: ->  
    $(".colorpickerProps").colorpicker()    
    $(".select2Props").not(".select2-container").select2(
                                minimumInputLength: 0                                      
                                closeOnSelect: true
                                openOnEnter: true)
   