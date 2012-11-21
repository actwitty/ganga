=begin
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


#pp profile.analytic(:filters => {:visitors.gt => 0, :visitCount.matches => 4},:start_date => Date.new(2012, 10, 1), :end_date => Date.new(2012, 11, 30) )

require 'openssl'

key = OpenSSL::PKey::RSA.new 2048

str = key.public_encrypt 'top secret document'
puts key.private_decrypt str


puts key.to_pem
puts key.public_key.to_pem
=end

require 'rubygems'
require 'domainatrix'

def parse(url)
  url = "http://" + url if url !~ /^http\:\/\/|^https\:\/\//
  url = Domainatrix.parse(url)
  p url.url       # => "http://www.pauldix.net" (the original url)
  p url.public_suffix       # => "net"
  p url.domain    # => "pauldix"
  p url.canonical # => "net.pauldix"
  p url.subdomain
  p url.path

  p url.domain + "." + url.public_suffix
end


def base(url)
    url = "http://" + url if url !~ /^http\:\/\/|^https\:\/\//
    
    u = Domainatrix.parse(url)
    p u.domain + "." + u.public_suffix
  rescue => e 
    puts("**** ERROR **** #{e.message}")
    nil  
  end

u = "apu.actwitty.com/dcsd?23432&fjwe"
#parse(u)
base(u)
