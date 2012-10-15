App.MainInviteView = Ember.View.extend
  templateName: 'main_page/main_invites'
  inviteError: 'reset'
  isBusy: false
  errorString: ""
  
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


  addInviteAccount: (event, params) ->
    viewObj = this
    @set 'isBusy', true 
    viewObj.set 'inviteError', 'reset' 
    App.log App.DBG,'AJAX: invite clicked'
  
    target = event.target || event.srcElement
    form = $(target).closest 'form'    
    emailInput = form.find '#account_email'    
    
    accountEmail = if emailInput.length then emailInput.attr('value')  else ""
    

    #Post the invitation to the Rails server
    #Handle success
    success = (data) ->
      if data and data.processed and data.processed is "true"

        App.log App.DBG,'AJAX: invite success'
        viewObj.set 'inviteError', 'done'
        viewObj.set 'isBusy', false
        # App.mixpanel.userInviteSet accountEmail
        # App.kissmetrics.userInviteSet accountEmail
      else

        App.log App.ERR,'AJAX: invite failed with 200'
        viewObj.set 'inviteError', 'error'          
        viewObj.set 'errorString', 'An error occurred : ' + data.error_str if data.error_str
        viewObj.set 'isBusy', false

    error = () ->
      viewObj.set 'inviteError', 'error'
      viewObj.set 'isBusy', false
      viewObj.set 'errorString', 'There is some error in reaching the server.'

    #Handle failure
    App.postRequest "/invite_request", {"account[email]": accountEmail}, success, error


   

    false


