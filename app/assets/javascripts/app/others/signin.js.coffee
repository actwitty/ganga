$(".trigger_js_event").live "click", ->
  
  btn_type = undefined
  email = undefined
  form = undefined
  name = undefined

  form = $(this).closest("form")
  email = form.find("#account_email").attr('value')
  name = form.find("#account_name").attr('value')

  btn_type = $(this).attr("btn_type")
    
  # if btn_type is "registration"
  #   App.mixpanel.trackSignUp email, name

  # else if btn_type is "session"
  # 	App.mixpanel.trackSignIn email

