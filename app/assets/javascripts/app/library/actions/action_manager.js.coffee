App.ActionHelper = Ember.Object.extend  
  services : {}

  init: ()->
    @_super()
    services = @get 'services'
    services.rb_template_lib = App.ActionTemplateHelper.create({name:'rb_template_lib'})
    # services.email = App.ActionEmailHelper.create('email')
    # to give special handling to template
    @set 'template', services.rb_template_lib
    @set 'default', 'rb_template_lib'

  getDisplayName: (service, type, api) ->    
    services = @get 'services'
    services[service].getDisplayName(type, api)

  getDefaultService: ->
    @get 'default'

  getDefaultType: (service)->
    services = @get 'services'
    services[service].getDefaultType()

  getDefaultApi: (service, type)->
    services = @get 'services'
    services[service].getDefaultApi(type)

  getParamList: (service, type, api)->    
    services = @get 'services'    
    services[service].getParamList(type, api)

  getTypeChoices: (service) ->
    services = @get 'services'
    services[service].getTypeChoices()

  getApiChoices: (service, type) ->
    services = @get 'services'
    services[service].getApiChoices(type)

  getApiName: (service, type, api)->
    services = @get 'services'
    services[service].getApiName(type, api)

  preview: (service, params)->
    services = @get 'services'
    services[service].preview(params)

