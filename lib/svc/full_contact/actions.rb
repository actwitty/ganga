# NOTE - Implement Actions on Full Contact
module Svc
	module FullContact
    class Actions
      
      # NOTE: Search Profile by Email
      # INPUT: 
      # {
      #   params: { email: "abc@gmail.com"},
      #   c_http: CHttp::Fbr,
      #   config: {...} # config for "search_by_mail" method in full_contact.yml
      # }
      # OUTPUT:
      # 
      def self.search_by_email(params)
        Rails.logger.info("Entering Search by Email")
              
        params[:params].merge!(Svc::FullContact.key)

        resp = params[:klass].get(:url => params[:config]["end_point"], :params => params[:params], :method => "get",  :handle =>1, :cb => params[:cb])

        Rails.logger.info("#{resp.inspect}")
      rescue => e 
        Rails.logger.error("**** ERROR **** #{e.message}")
      end
    end
  end
end