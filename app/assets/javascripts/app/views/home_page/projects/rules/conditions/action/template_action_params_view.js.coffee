App.TemplateActionParamsView = Ember.View.extend
  templateName: 'home_page/projects/rules/actions/template_actions_params'  
  
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
   

  showHards: (event) ->    
    target = $(event.target)   
    target.removeClass('show').addClass('hide')    
    target.closest('.coalese').find('.entry').removeClass('hard').addClass('easy')
    event.preventDefault()
