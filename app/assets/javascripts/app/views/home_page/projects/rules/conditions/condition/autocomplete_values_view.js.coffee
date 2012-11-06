App.AutocompelteValueView = Ember.View.extend
  # templateName: 'home_page/projects/rules/conditions/condition/autocomplete_values'

  init: ->
    @_super()
    @viewHandleBarCompile()

  viewHandleBarCompile: ->
    compiled = Ember.Handlebars.compile('<select class="select2Props value_sel" {{action "changeConditionValue" condition }}>
                        {{#eachProperty view.values}}    
                          {{#ifequal iter_key view.selectedVal}}
                              <option  value="{{getvalue iter_key}}" selected >{{iter_val}}</option>
                          {{else}}
                              <option value="{{getvalue iter_key}}" >{{iter_val}}</option>
                          {{/ifequal}}
                        {{/eachProperty}}
                    </select>')
    @set 'template', compiled
    @rerender()
    Ember.run.next(this, 'applyJqueryConstructs')

  observesValueOptions: (->
    
    condition = @get 'condition'
    @set 'values', condition.get('valueOptions')
    @viewHandleBarCompile()
  ).observes('condition.valueOptions')

      

  
  # -----------------------------------------------------
  applyJqueryConstructs: ->    

    $(".select2Props").not(".select2-container").select2(
                                minimumInputLength: 0                                      
                                closeOnSelect: true
                                openOnEnter: true
                              )
  #------------------------------------------------------
  getConditionValue: (event) ->
    target = $(event.target)
    target.select2("val")



    



