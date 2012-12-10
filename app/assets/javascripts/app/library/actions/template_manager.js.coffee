App.templateConstants = 
                        fixedVals :
                                    font  : [
                                              "Arial",
                                              "Arial, Helvetica, sans-serif",
                                              "\'Arial Black\', Gadget, sans-serif",
                                              "\'Comic Sans MS\', cursive, sans-serif",
                                              "Impact, Charcoal, sans-serif",
                                              "\'Lucida Sans Unicode\', \'Lucida Grande\', sans-serif",
                                              "Tahoma, Geneva, sans-serif",
                                              "\'Trebuchet MS\', Helvetica, sans-serif",
                                              "Verdana, Geneva, sans-serif",
                                              "\'Courier New\', Courier, monospace",
                                              "'Lucida Console\', Monaco, monospace"
                                             ],
                                    align : [
                                              'center',
                                              'left',
                                              'right'
                                            ],
                                    weight : [
                                                'normal',
                                                'bold',
                                                'bolder'
                                             ]

App.ActionTemplateHelper = Ember.Object.extend  
  name : null
  serviceDisplay: 'templatized interface:'

  configs:
  	parse : 
        show  : 1
        varType  : 2
        level : 3
        label : 4
  	label_parse :
                category : 1
                name : 2
    vars:
      color : 'cr'
      numeric : 'nr'
      font : 'ft'
      align : 'an'
      string : 'sg'
      url : 'ul'
      weight: 'fw'
      vstring : 'vsg'
      image : 'imgl'




  params : null

  apis : null

  displayNames : null


  init : () ->
    @_super()
    # Initialize the code to variables.    
    @set 'params', trigger_fish.rbT.templateArgs
    @set 'displayNames', trigger_fish.rbT.templateName
    @set 'choices', trigger_fish.rbT.templateLib
    @set 'default', 'topbar'

  getKey: (type, api)->
    key = type + '.' + api 

  getDisplayName: (type, api) ->
    names = @get 'displayNames'
    key = @getKey(type, api)    
    @get('serviceDisplay') + names[key]

  getDefaultType: ()->
    @get 'default'

  getDefaultApi: (type)->
    choices = @get 'choices'    
    apis = choices[type]
    api = null
    for k,v of apis
      api = k
      break
    api
 

  getParamList: (type, api)->
    key = @getKey(type, api)
    params = @get 'params' 
    params[key]

  getTypeChoices: ->
    @get 'choices'

  getApiChoices: (type) ->    
    choices = @get 'choices'    
    choices[type]


  getApiName: (type, api) ->
    key = @getKey(type, api)    
    names = @get 'displayNames'
    names[key]

