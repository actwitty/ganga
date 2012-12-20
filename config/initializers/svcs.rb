
# svcs = {}
# Dir.glob("#{Rails.root}/config/svcs/*.yml") do |rb_file|
#   # do work on files ending in .rb in the desired directory
#   thing = YAML.load_file(rb_file)
#   key = thing["svc"].keys[0]
#   svcs[thing["svc"].keys[0]]=thing["svc"][key]
# end