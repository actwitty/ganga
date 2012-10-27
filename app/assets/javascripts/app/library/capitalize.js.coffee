String::capitalize = ->
  if this.length <= 0 
    "" 
  this[0].toUpperCase() + this.substr(1)