require 'domainatrix'

# parses the url for example http://api.actwitty.co.uk/tytyt?s=8&ert=34
module Url
  # OUTPUT - {
  #            "url" => "http://api.actwitty.co.uk/tytyt?s=8&ert=34",
  #            "domain" => "actwitty",
  #            "suffix" => "co.uk", 
  #            "subdomain" => "api"
  #            "canonical" => "uk.co.actwitty.api/tytyt?s=8&ert=34"
  #            "path" => "/tytyt?s=8&ert=34"
  #          }  

  def self.parse(url)
    u = Domainatrix.parse(url)
    {url: u.url, domain: u.domain, suffix: u.public_suffix, subdomain: u.subdomain, canonical: u.canonical, path: u.path}
  end

  def self.base(url)
    
  end
end