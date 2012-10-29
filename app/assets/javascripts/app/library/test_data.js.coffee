App.sampleRule = [
                  { 
                    id: 1000001
                    name: 'A fancy rule'
                    event: 'sign_up'
                    action: 'bottombar.generic.fblike':'rbTemplBottombarGenericFblikeHTML'
                    action_param: [
                                    {key:'rb.t.cr.textColor ',value:'#F2F0F0'},
                                    {key:'rb.t.nr.textFontsize',value:'15'},
                                    {key:'rb.t.ft.textFontfamily',value:'Arial'},
                                    {key:'rb.f.nr.baseZindex',value:'1000'},
                                    {key:'rb.t.nr.baseWidth',value:'100'},
                                    {key:'rb.t.nr.baseHeight',value:'40'},
                                    {key:'rb.t.cr.baseBgColor',value:'#3C5891'},
                                    {key:'rb.t.an.baseTextalign',value:'center'},
                                    {key:'rb.t.sg.textLeft',value:'Hello Hello'},
                                    {key:'rb.t.ul.facebookPage',value:'http://www.google.com'},
                                    {key:'rb.t.sg.textRight',value:'Hello Hello'},
                                    {key:'rb.t.ul.helpLink',value:'http://www.rulebot.com'}
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
                                    {key:'rb.t.cr.textColor ',value:'#333'},
                                    {key:'rb.t.nr.textFontsize',value:'15'},
                                    {key:'rb.t.ft.textFontfamily',value:'Arial'},
                                    {key:'rb.f.nr.baseZindex',value:'100'},
                                    {key:'rb.t.nr.baseWidth',value:'100'},
                                    {key:'rb.t.nr.baseHeight',value:'40'},
                                    {key:'rb.t.cr.baseBgColor',value:'#DCDCDC'},
                                    {key:'rb.t.an.baseTextalign',value:'center'},
                                    {key:'rb.t.sg.textLeft',value:'Hello Hello Hello Hello'},
                                    {key:'rb.t.nr.btnFontSize',value:'14'},
                                    {key:'rb.t.cr.btnBgColor',value:'#548AC7'},
                                    {key:'rb.t.cr.btnColor',value:'white'},
                                    {key:'rb.t.ul.btnLink',value:'http://www.google.com'},
                                    {key:'rb.t.sg.btnLable',value:'Click'},
                                    {key:'rb.t.sg.textRight',value:'Hello Hello'},
                                    {key:'rb.t.ul.helpLink',value:'http://www.rulebot.com'}
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
                              

                   
                    


