OPERATIONS = {
	"String" => [""],
	"Fixnum" => [],
	"Boolean" => [],

}


Clause = {
  {
    event: "sign_in", 
    rules:
    [
      {
        name: "Sign-in-test",
        condition:
      	[ 
      	  { context: "Event", type: "String",  k: "user_name" op: "contains", v: "hello", con: "AND"},
      	  { context: "Event", type: "String",  k: "email" op: "ends_with", v: "gmail.com", con: ""}
      	]
        action: { owner: "client", handler: "notification" }
      }, 
      {}
    ]
  },
}


def server_query(params)
  if params[:condition][:context] == "Event"
  if params[:condition][:context] == "Actor"
    .where()
  end
end

def ruby_query(params)
end

def execute(params)
  raise "rule empty" if params[:rule].nil? or params[:rule].empty? 
  params[:rule][:condition].each do |attr|
    return if attr[:actor][:owner] == "client"
    send("#{attr[:actor][:owner]}_query", {event: params[:event], actor: params[:actor], condition: condition})
  end
rescue => e
  puts "**** ERROR **** #{e.message}"
end
