App.MainView = Ember.View.extend  
  templateLib:
          home : 'main_page/index'
          pricing : 'main_page/pricing'
          faq : 'main_page/faq'
          features : 'main_page/features'
          contactus : 'main_page/contactus'
          aboutus : 'main_page/aboutus'

  init: ->
    @_super()
    @set 'template', Ember.TEMPLATES[@get 'templateLib.home']
    @set 'mode', 'home'


  applyModeChange: (event)->
    newmode =  null
    target = $(event.target)
    nav = target.attr('nav')
    templates = @get 'templateLib'


    if templates.hasOwnProperty nav      
      newmode = nav
      @set 'mode', nav
      @set 'template', Ember.TEMPLATES[templates[nav]]
      @rerender()

    newmode


App.MainHeaderView = Ember.View.extend
  templateName: 'main_page/header' 

  init: ->
    @_super()
    Ember.run.next(this, 'applyHighlight')

  applyHighlight: ->
    mode = @get 'mode'
    $(".nav_" + mode).addClass('active')



App.MainFooterView = Ember.View.extend  
  templateName: 'main_page/footer' 