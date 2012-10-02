App.MainTopbarView = Ember.View.extend
  templateName: 'main_page/main_topbar'

  clickMainHeader: (event) ->         
    target = event.target || event.srcElement
    divID = $(target).attr('href')      
    App.mixpanel.trackMainPage divID
    $("html, body").animate
        scrollTop: $("#" + divID).position().top
      , "slow"
    


	




