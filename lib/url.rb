require 'domainatrix'

# parses the url for example http://api.actwitty.co.uk/tytyt?s=8&ert=34
module Url
  # INPUT - http://api.actwitty.co.uk/tytyt?s=8&ert=34  # url linke this
  # OUTPUT - {
  #            "url" => "http://api.actwitty.co.uk/tytyt?s=8&ert=34",
  #            "domain" => "actwitty",
  #            "suffix" => "co.uk", 
  #            "subdomain" => "api"
  #            "canonical" => "uk.co.actwitty.api/tytyt?s=8&ert=34"
  #            "path" => "/tytyt?s=8&ert=34"
  #          }  

  def self.parse(url)
    url = "http://" + url if url !~ /^http\:\/\/|^https\:\/\//

    u = Domainatrix.parse(url)
    {url: u.url, domain: u.domain, suffix: u.public_suffix, subdomain: u.subdomain, canonical: u.canonical, path: u.path}
  rescue => e 
    Rails.logger.error("**** ERROR **** #{e.message}")
    {}
  end

  # INPUT - http://api.actwitty.co.uk/tytyt?s=8&ert=34  # url linke this
  # OUTPUT - actwitty.co.uk
  def self.base(url)
    url = "http://" + url if url !~ /^http\:\/\/|^https\:\/\//
    
    u = Domainatrix.parse(url)
    u.domain + "." + u.public_suffix
  rescue => e 
    Rails.logger.error("**** ERROR **** #{e.message}")
    nil  
  end
end