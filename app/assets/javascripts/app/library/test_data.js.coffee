App.sampleRule = [
                  { 
                    id: 1000001
                    name: 'A fancy rule'
                    event: 'sign_up'
                    action: 'topbar.generic.normal'
                    action_param: [
                                    {
                                      key:'rb.bottombar.generic.fblike.text.cr.color'
                                      value:'#333'
                                    },
                                    { 
                                      key:'rb.bottombar.generic.fblike.text.nr.fontsize'
                                      value:'12'
                                    },
                                    { 
                                      key:'rb.bottombar.generic.fblike.text.nr.textshadow'
                                      value: '12'
                                    },
                                    { 
                                      key:'rb.bottombar.generic.fblike.text.ft.fontfamily'
                                      value:'"Lucida Sans Unicode", "Lucida Grande", sans-serif'
                                    }
                                    { 
                                      key:'rb.bottombar.generic.fblike.base.nr.zIndex'
                                      value:'11'
                                    },
                                    { 
                                      key:'rb.bottombar.generic.fblike.base.nr.width'
                                      value: '30'
                                    },
                                    { 
                                      key:'rb.bottombar.generic.fblike.base.nr.height'
                                      value: '10'
                                    },
                                    { 
                                      key:'rb.bottombar.generic.fblike.base.cr.bgColor'
                                      value: '#777'
                                    },
                                    { 
                                      key:'rb.bottombar.generic.fblike.base.an.textalign'
                                      value: 'center'
                                    },                                      
                                    { 
                                      key:'rb.bottombar.generic.fblike.left.sg.text'
                                      value: 'hello'
                                    },
                                    { 
                                      key:'rb.topbar.generic.fblike.button.ul.ahref'
                                      value: 'http://www.google.com'
                                    },
                                    { 
                                      key:'rb.bottombar.generic.fblike.right.sg.text'
                                      value: 'world' 
                                    },
                                    { 
                                      key:'rb.action.bottombar.generic.fblike.ul.ahref'
                                      value: 'http://www.reddit.com'
                                    }
                                ]
                    conditions: [
                                  {
                                    property: 'customer[email]'
                                    type: 'String'                  
                                    negation: 'true'
                                    operation: 'ewh'
                                    value1: '@gmail.com'
                                    connect: 'and'
                                  },
                                  {
                                    property: 'customer[counter]'                   
                                    type: 'Fixnum'                  
                                    negation: 'false'
                                    operation: 'gtn'
                                    value1: 5
                                    connect: 'and'
                                  },
                                  {
                                    property: '$country'            
                                    type: 'String'                         
                                    negation: 'false'
                                    operation: 'cns'
                                    value1: 5
                                  },
                                  {
                                    property: '#gender'             
                                    type: 'String'                        
                                    negation: 'true'
                                    operation: 'eql'
                                    value1: 5
                                  }                                  
                                ] 
                  }  ,
                  {
                    id: 1000002
                    name: 'Yet another rule'
                    event: 'sign_in'
                    action: 'topbar.generic.normal'
                    action_param: [
                                    {
                                      key:'rb.bottombar.generic.fblike.text.cr.color'
                                      value:'#333'
                                    },
                                    { 
                                      key:'rb.bottombar.generic.fblike.text.nr.fontsize'
                                      value:'12'
                                    },
                                    { 
                                      key:'rb.bottombar.generic.fblike.text.nr.textshadow'
                                      value: '12'
                                    },
                                    { 
                                      key:'rb.bottombar.generic.fblike.text.ft.fontfamily'
                                      value:'"Lucida Sans Unicode", "Lucida Grande", sans-serif'
                                    }
                                    { 
                                      key:'rb.bottombar.generic.fblike.base.nr.zIndex'
                                      value:'11'
                                    },
                                    { 
                                      key:'rb.bottombar.generic.fblike.base.nr.width'
                                      value: '30'
                                    },
                                    { 
                                      key:'rb.bottombar.generic.fblike.base.nr.height'
                                      value: '10'
                                    },
                                    { 
                                      key:'rb.bottombar.generic.fblike.base.cr.bgColor'
                                      value: '#777'
                                    },
                                    { 
                                      key:'rb.bottombar.generic.fblike.base.an.textalign'
                                      value: 'center'
                                    },                                      
                                    { 
                                      key:'rb.bottombar.generic.fblike.left.sg.text'
                                      value: 'hello'
                                    },
                                    { 
                                      key:'rb.topbar.generic.fblike.button.ul.ahref'
                                      value: 'http://www.google.com'
                                    },
                                    { 
                                      key:'rb.bottombar.generic.fblike.right.sg.text'
                                      value: 'world' 
                                    },
                                    { 
                                      key:'rb.action.bottombar.generic.fblike.ul.ahref'
                                      value: 'http://www.reddit.com'
                                    }
                                ]
                    conditions:[
                                  {
                                    property: 'customer[email]'     
                                    type: 'String'                                
                                    negation: 'true'
                                    operation: 'ewh'
                                    value1: '@gmail.com'
                                    connect: 'and'
                                  },
                                  {
                                    property: 'customer[klout]'     
                                    type: 'Fixnum'                                 
                                    negation: 'false'
                                    operation: 'gtn'
                                    value1: 1000
                                    connect: 'and'
                                  },
                                  {
                                    property: 'cutomer[signin_date]'                    
                                    type: 'Date'                                 
                                    negation: 'false'
                                    operation: 'dag'
                                    value1: 15
                                    value2: 30
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
                                            "customer[counter]" : 'String'
                                            "customer[klout]" : 'Fixnum'
                                            "customer[name]": 'String'
                                            "customer[signup_date]" : 'Date'
                                            "address[city]" : 'String'
                                            "address[country]" : 'String'
                                            "address[country][std]" : 'Fixnum'
                                          

                              'sign_in' : 
                                            "customer[email]" : 'String'
                                            "customer[id]" : 'String'
                                            "customer[klout]" : 'String'
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
                                "location" : 'String'
                                'source' : 'String'
                                'search_term' : 'String'                                
                                "page_view_time" : 'Date'
                              

                   
                    


