App.sampleRule = [
                  { 
                    id: 1000001
                    name: 'A fancy rule'
                    event: 'sign_up'
                    action: 'topbar'
                    action_param: 
                            text: "A quickbrown fox jumps over a lazy dog"
                            href: "http://www.google.com"
                            color: "#333333"
                            width: "50"
                    conditions: [
                                  {
                                    property: 'customer[email]'                   
                                    negation: 'true'
                                    operation: 'ew'
                                    value1: '@gmail.com'
                                    connect: 'and'
                                  },
                                  {
                                    property: 'customer[counter]'                   
                                    negation: 'false'
                                    operation: 'gt'
                                    value1: 5
                                    connect: 'and'
                                  },
                                  {
                                    property: '$coutry'                   
                                    negation: 'false'
                                    operation: 'gt'
                                    value1: 5
                                  },
                                  {
                                    property: '#gender'                   
                                    negation: 'false'
                                    operation: 'eq'
                                    value1: 5
                                  }                                  
                                ] 
                  }  ,
                  {
                    id: 1000002
                    name: 'Yet another rule'
                    event: 'sign_in'
                    action: 'modal'
                    action_param: 
                                  text: "Some beautiful weather in bangalore"
                                  href: "http://www.google.com"
                                  color: "#ffffff"
                                  width: "100"
                    conditions:[
                                  {
                                    property: 'customer[email]'                   
                                    negation: 'true'
                                    operation: 'ew'
                                    value1: '@gmail.com'
                                    connect: 'and'
                                  },
                                  {
                                    property: 'customer[klout]'                    
                                    negation: 'false'
                                    operation: 'gt'
                                    value1: 1000
                                    connect: 'and'
                                  },
                                  {
                                    property: 'cutomer[date]'                    
                                    negation: 'false'
                                    operation: 'dag'
                                    value1: 15
                                  }
                                ]
                  }


                    
  
        ]


App.sampleSchema = 
                      properties:
                                    'customer[email]' : 
                                                      "String" : ["sign_in", "sign_up"]
                                                     
                                    'customer[id]' : 
                                                    "String" : ["sign_in", "purchase"]
                                                     
                                    'customer[klout]' : 
                                                      "Fixnum" : ["sign_in"]
                                                      

                                  
                                  

                      events:
                              'sign_up' : 
                                            "customer[email]" : 'String'
                                            "customer[klout]" : 'Fixnum'
                                            "customer[name]": 'String'
                                            "customer[signup_date]" : 'Date'
                                            "address[city]" : 'String'
                                            "address[country]" : 'String'
                                            "address[country][std]" : 'Fixnum'
                                          

                              'sign_in' : 
                                            "customer[email]" : 'String'
                                            "customer[id]" : 'String'
                                            "customer[name]" : 'String'
                                            "customer[signin_date]" : 'Date'                                            
                                          

                              'purchase' : 
                                            "customer[id]" : 'String'
                                            "product[id]" : 'String'
                                            "product[source][brand]" : 'String'
                                            "product[source][warranty]" : 'Fixnum'
                                            "product[deal][sell_price]" : 'Fixnum'
                                            "product[deal][discount]" : 'Fixnum'
                                            "product[offer]" : 'String'
                                                                                    


                             

                      actor: 
                               "gender" : 'String'
                               "age" : 'Fixnum'
                               "dob" : "Date"
                             

                      system: 
                                "loaction" : 'String'
                                'source' : 'String'
                                'search_term' : 'String'                                
                                "page_view_time" : 'Date'
                              

                   
                    


