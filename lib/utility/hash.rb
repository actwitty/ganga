module Utility
  class Hash
    # Desc => Returns type and structure of hash keys
    # Example Input => {name: "sign_up", properties: {customer: {id: 123, address: {city: "bangalore"}}}}
    # Example Output => { :name=>{
    # 								:type=>String,
    # 								:structure=>{}
    # 						    },
    # 					 :properties=>
    # 								{
    # 									:type=>Hash,
    #  								 	:structure=>
    #   									{
    #   										:customer=>
    #     											{
    #     												:type=>Hash,
    #      												:structure=>
    #       												{
    #       													:id=>{
    #       															:type=>Fixnum, :structure=>{}
    #       													 	 },
    #        													:address=>
    #         														 {
    #         															:type=>Hash,
    #          															:structure=>{:city=>{:type=>String, :structure=>{}}}
    #          														 }
    #          												}
    #          										}
    #          								}
    #          						}
    #          				}
    def self.hash_structure(params)

      params[:hash].each do |k,v|
        params[:schema][k] = { type: v.class, structure: {}}
        if v.class.name == "Hash"
          hash_structure(hash: v, schema: params[:schema][k][:struct])
        end
      end
      params[:schema]

    rescue => e
      Rails.logger.error("[Lib] [Utility] [Hash] [structure] **** ERROR **** => #{e.message}")
      {}
    end
  end
end
