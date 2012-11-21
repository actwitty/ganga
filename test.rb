require 'garb'
require 'pp'
require 'date'

class Analytic
  extend Garb::Model

  metrics :exits, :pageviews, :visits, :unique_pageviews, :bounces, :timeOnSite, :avgTimeOnSite, :visitors
  dimensions :page_path, :visitCount

  def sign_in(username, password)
    Garb::Session.login(username, password)
  end

  def get_profile(id)
    Garb::Management::Profile.all.detect {|p| p.web_property_id == id}
  end

end

a = Analytic.new
session = a.sign_in("alok@actwitty.com", 'mhwy8skq')
#puts session.inspect

profile = a.get_profile('UA-24404937-1')
#puts profile.inspect


pp profile.analytic(:filters => {:visitors.gt => 0, :visitCount.matches => 4},:start_date => Date.new(2012, 10, 1), :end_date => Date.new(2012, 11, 30) )

