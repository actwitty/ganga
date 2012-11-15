App.HomeSideView = Ember.View.extend
  templateName: 'home_page/home_side'
  menuMapper:
              appNew: 'newProjMenu'
              appList: 'projListMenu'
              appEdit: 'editProjMenu'

              eventList: 'eventsMenu'
              ruleList: 'rulesMenu'

              eventReport: 'eventReportMenu'
              actionReport: 'actionReportMenu'

              settings: 'settingsMenu'
              team: 'teamMenu'

    
  highlightChangeView: (->    
    menu = App.get 'router.homeSideController.selectedMenu'
    $(".side_link_box").removeClass("menu_selected")
    menuMapper = @get 'menuMapper'
    if menuMapper.hasOwnProperty menu     
      selector = menuMapper[menu]
      $("." + selector).addClass("menu_selected")
    
  ).observes("App.router.homeSideController.selectedMenu")




