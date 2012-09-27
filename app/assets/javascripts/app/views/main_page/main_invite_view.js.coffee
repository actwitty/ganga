App.MainInviteView = Ember.View.extend
  templateName: 'main_page/main_invites'
  inviteError: 'reset'
  isBusy: false
  stateIsReset: (-> 
    @get("inviteError") is "reset"
  ).property("inviteError")

  stateIsSuccess: (->
    @get("inviteError") is "done"
  ).property("inviteError")

  stateIsError: (->
    @get("inviteError") is "error"
  ).property("inviteError")

  stateIsBusy: (->
    @get("isBusy") is true
  ).property("isBusy")

  addInviteAccount: (router, jqueryEvent) ->
    viewObj = this
    viewObj.set('isBusy', true);
    viewObj.set('inviteError', 'reset');
    App.log App.DBG,'AJAX: invite clicked'
    
    

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
        
        if data and data.processed and data.processed is "true"
          App.log App.DBG,'AJAX: invite success'
          viewObj.set('inviteError', 'done');
        else
          App.log App.DBG,'AJAX: invite failed with 200'
          viewObj.set('inviteError', 'error');
        viewObj.set('isBusy', false);
        
      error: (jqXHR, textStatus, errorThrown) ->
        App.log App.ERR,'AJAX: Failed invite status:' + jqXHR.status + ' error: ' + errorThrown 
        viewObj.set('inviteError', 'error');
        viewObj.set('isBusy', false);

    false


