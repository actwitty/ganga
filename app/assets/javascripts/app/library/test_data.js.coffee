App.sampleRule = [
                  { 
                    id: 1000001
                    name: "A fancy rule"
                    event: "sign_up"
                    action: "bottombar.generic.fblike"
                    action_param: {
                                  "rb.t.cr.textColor ":"#F2F0F0"
                                  "rb.t.nr.textFontsize":"15"
                                  "rb.t.ft.textFontfamily":"Arial"
                                  "rb.f.nr.baseZindex":"1000"
                                  "rb.t.nr.baseWidth":"100"
                                  "rb.t.nr.baseHeight":"40"
                                  "rb.t.cr.baseBgColor":"#3C5891"
                                  "rb.t.an.baseTextalign":"center"
                                  "rb.t.sg.textLeft":"Hello Hello"
                                  "rb.t.ul.facebookPage":"http://www.google.com"
                                  "rb.t.sg.textRight":"Hello Hello"
                                }
                                  
                    conditions: [
                                  {
                                    property: "customer[email]"
                                    type: "String"                  
                                    negation: "true"
                                    operation: "ewh"
                                    value1: "@gmail.com"
                                    connect: "and"
                                    scope: "e"
                                  },
                                  {
                                    property: "customer[counter]"                   
                                    type: "Fixnum"                  
                                    negation: "false"
                                    operation: "gtn"
                                    value1: 5
                                    connect: "and"
                                    scope: "e"
                                  },
                                  {
                                    property: "country"            
                                    type: "String"                         
                                    negation: "false"
                                    operation: "cns"
                                    value1: 'IN'
                                    scope: "s"
                                  },
                                  {
                                    property: "gender"             
                                    type: "String"                        
                                    negation: "true"
                                    operation: "eql"
                                    value1: 5
                                    scope: "a"
                                  },
                                  {
                                    property: "device[name]"             
                                    type: "String"                        
                                    negation: "true"
                                    operation: "eql"
                                    value1: 'ipad'
                                    scope: "s"
                                  }                                  
                                ] 
                  }  ,
                  {
                    id: 1000002
                    name: "Yet another rule"
                    event: "sign_in"
                    action: "topbar.generic.normal"
                    action_param:{
                                  "rb.t.cr.textColor ":"#333"
                                  "rb.t.nr.textFontsize":"15"
                                  "rb.t.ft.textFontfamily":"Arial"
                                  "rb.f.nr.baseZindex":"100"
                                  "rb.t.nr.baseWidth":"100"
                                  "rb.t.nr.baseHeight":"40"
                                  "rb.t.cr.baseBgColor":"#DCDCDC"
                                  "rb.t.an.baseTextalign":"center"
                                  "rb.t.sg.textLeft":"Hello Hello Hello Hello"
                                  "rb.t.nr.btnFontSize":"14"
                                  "rb.t.cr.btnBgColor":"#548AC7"
                                  "rb.t.cr.btnColor":"white"
                                  "rb.t.ul.btnLink":"http://www.google.com"
                                  "rb.t.sg.btnLable":"Click"
                                  "rb.t.sg.textRight":"Hello Hello"
                                  }
                    conditions:[
                                  {
                                    property: "customer[email]"     
                                    type: "String"                                
                                    negation: "true"
                                    operation: "ewh"
                                    value1: "@gmail.com"
                                    connect: "and"
                                    scope: "e"
                                  },
                                  {
                                    property: "customer[klout]"     
                                    type: "Fixnum"                                 
                                    negation: "false"
                                    operation: "gtn"
                                    value1: 1000
                                    connect: "and"
                                    scope: "e"
                                  },
                                  {
                                    property: "cutomer[signin_date]"                    
                                    type: "Date"                                 
                                    negation: "false"
                                    operation: "dag"
                                    value1: 15
                                    value2: 30
                                    scope: "e"
                                  }
                                ]
                  }


                    
  
        ]


App.sampleSchema = 
                      properties:
                                    "customer[email]" : 
                                                      "String" : ["sign_in", "sign_up"]
                                                     
                                    "customer[id]" : 
                                                    "String" : ["sign_in", "purchase"]
                                                     
                                    "customer[klout]" : 
                                                      "Fixnum" : ["sign_in"]
                                                      

                                  
                                  

                      events:
                              "sign_up" : 
                                            "customer[email]" : "String"
                                            "customer[counter]" : "String"
                                            "customer[klout]" : "Fixnum"
                                            "customer[name]": "String"
                                            "customer[signup_date]" : "Date"
                                            "address[city]" : "String"
                                            "address[country]" : "String"
                                            "address[country][std]" : "Fixnum"
                                          

                              "sign_in" : 
                                            "customer[email]" : "String"
                                            "customer[id]" : "String"
                                            "customer[klout]" : "String"
                                            "customer[signin_date]" : "Date"                                            
                                          

                              "purchase" : 
                                            "customer[id]" : "String"
                                            "product[id]" : "String"
                                            "product[source][brand]" : "String"
                                            "product[source][warranty]" : "Fixnum"
                                            "product[deal][sell_price]" : "Fixnum"
                                            "product[deal][discount]" : "Fixnum"
                                            "product[offer]" : "String"
                                                                                    


                             

                      actor: 
                               "gender" : "String"
                               "age" : "Fixnum"
                               "dob" : "Date"
                             

                      system: 
                                "location" : "String"
                                "country" : "String"
                                "source" : "String"
                                "search_term" : "String"                                
                                "page_view_time" : "Date"
                              

                   
                    


