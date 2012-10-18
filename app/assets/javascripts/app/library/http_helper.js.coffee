
App.getRequest = (req_url, req_data, req_success_cb, req_error_cb) ->

  if typeof req_url is 'undefined'
    App.log App.ERR, "No URL requested returning "
    return
  if typeof req_data is 'undefined'
    req_data = {}

  $.ajax
    type: "get"
    url: req_url
    contentType: "json"
    data: req_data

    success: (data) ->
      App.log App.DBG, "Received success with data for " + req_url
      if typeof req_success_cb isnt 'undefined'
        req_success_cb(data)
    
    error: (request, status, error) ->
      App.log App.ERR, "Received error with status " + status + " " + error + " for " + req_url
      if typeof req_error_cb isnt 'undefined'
        req_error_cb()

App.postRequest = (req_url, req_data, req_success_cb, req_error_cb)->
  if typeof req_url is 'undefined'
    App.log App.ERR, "No URL requested returning "
    return

  console.log App.AUTH_TOKEN
  # Post needs the csrf token
  if typeof req_data is 'undefined'
    req_data = { authenticity_token : App.AUTH_TOKEN }
  else
    req_data.authenticity_token = App.AUTH_TOKEN

  App.log App.DBG, "Received request param " + JSON.stringify(req_data)

  $.ajax
    type: "post"
    data: req_data
    url: req_url  

    success: (data) ->
      App.log App.DBG, "Received success with data for " + req_url
      if typeof req_success_cb isnt 'undefined'
        req_success_cb(data)
    
    error: (request, status, error) ->
      App.log App.ERR, "Received error with status " + status + " " + error + " for " + req_url
      if typeof req_error_cb isnt 'undefined'
        req_error_cb()  



