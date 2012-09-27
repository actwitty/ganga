App.MainInviteView = Ember.View.extend
  templateName: 'main_page/main_invites'

  addInviteAccount: (router, jqueryEvent) ->
    target = event.target || event.srcElement
     
    form = $(target).closest 'form'    
    emailInput = form.find '#account_email'    
    
    accountEmail = if emailInput.length then emailInput.attr('value')  else ""

    
    #Post the invitation to the Rails server
    $.ajax
      type: "POST"
      url: "/invite_request"
      dataType: "json"
      
      #Allow for gmail style aliases (e.g. user+foo@example.com)
      data:
          "account[email]": accountEmail
          authenticity_token: App.AUTH_TOKEN

      success: (data) ->
          console.log 'success'

    false


