module Events
	def self.check_query
	  acc = FactoryGirl.create(:account)
	  app = FactoryGirl.create(:app)
	  actor = FactoryGirl.create(:actor)

	  Event.add!( app_id: app._id, actor_id: actor._id,  properties: { :email => "john.doe@example.com",
	          															:customer => {:address => {:city => "Bangalore"}}})

	  Event.add!( app_id: app._id, actor_id: actor._id,  properties: { :email => "tommy@example.com",
	          															:customer => {:address => {:city => "Bangalore"}}})

	  Event.add!( app_id: app._id, actor_id: actor._id,  properties: { :email => "zzzzz@example.com",
	          															:customer => {:address => {:city => "Pune"}}})

	  h = Event.where("properties.k" => "customer[address][city]", "properties.v" => "Bangalore").hint('properties.k_1_properties.v_1').explain
	  puts h.inspect
	  p = Event.where("properties.k" => "customer[address][city]", "properties.v" => "Bangalore").all
	  p.each {|attr| puts attr.inspect}
	end
end
