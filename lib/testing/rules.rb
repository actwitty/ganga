

CLAUSE = 
  {
    "sign_in" => 
    [
      {
        name: "Sign-in-test",
        conditions:
      	[ 
      	  { context: "Event", type: "String",  k: "email", no: false, op: "contains", v: "gmail.com", con: "AND"},
      	  { context: "Event", type: "String",  k: "email", no: true, op: "ends_with", v: "gmail.com", con: ""}
      	],
        action: { owner: "ruby", handler: "notification" }
      }
    ]
  }

OPERATIONS = {
  "ruby" => {
      "String" => {"contains" => "str_regex", "ends_with" => "str_regex", "gte" => "str_equality"},
  }
}

NEGATE = {true: '!', false: ""}

def execute(params)
  #raise "rule empty" if params[:rule].nil? or params[:rule].empty? 

  CLAUSE["sign_in"].each do |rule|
    conditions = rule[:conditions]
    owner = rule[:action][:owner]
    conditions.each  do |condition|
      type = condition[:type]
      op = condition[:op]
      handler = OPERATIONS[owner][type][op]
      result = send(handler, params[:event], condition)
      puts "yay" if result
    end
  end
rescue => e
  puts "**** ERROR **** #{e.message}"
end

def str_regex(event, condition)
  op = condition[:op]

  if op == "contains"
    return eval(NEGATE[condition[:not]]) (event[condition[:k].to_sym] =~ /#{condition[:v]}/ )
  end
end

def str_equality(event, condition)
end


execute(event: {email: "alok@gmail.com"})