App.sampleRule = [
                  { 
                    id: 1000001
                    name: 'A fancy rule'
                    event: 'singup'
                    action: 'topbar'
                    action_param: 
                            text: "A quickbrown fox jumps over a lazy <script>abc{{signup.name}}</script>script> from $${{system.country}}$$"
                            href: "http://www.google.com"
                            color: "#333333"
                            width: "50"
                    conditions: [
                                  {
                                    property: 'person[email]'                   
                                    negation: 'true'
                                    operation: 'ew'
                                    value1: '@gmail.com'
                                    connect: 'and'
                                  },
                                  {
                                    property: 'person[counter]'                   
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
                    event: 'purchase'
                    action: 'modal'
                    action_param: 
                                  text: "Some beautiful weather in bangalore"
                                  href: "http://www.google.com"
                                  color: "#ffffff"
                                  width: "100"
                    conditions:[
                                  {
                                    property: 'person[email]'                   
                                    negation: 'true'
                                    operation: 'ew'
                                    value1: '@gmail.com'
                                    connect: 'and'
                                  },
                                  {
                                    property: 'purchase'                    
                                    negation: 'false'
                                    operation: 'gt'
                                    value1: 1000
                                    connect: 'and'
                                  },
                                  {
                                    property: 'date'                    
                                    negation: 'false'
                                    operation: 'dag'
                                    value1: 15
                                  }
                                ]
                  }


                    
  
        ]

App.sampleRule1 = [
                  { 
                    id: 1000003
                    name: 'A foo bar rule'
                    event: 'singup'
                    action: 'topbar'
                    action_param: 
                            text: "A quickbrown fox jumps over a lazy <script>abc{{signup.name}}</script>script> from $${{system.country}}$$"
                            href: "http://www.google.com"
                            color: "#333333"
                            width: "50"
                    conditions: [
                                  {
                                    property: 'person[email]'                   
                                    negation: 'true'
                                    operation: 'ew'
                                    value1: '@gmail.com'
                                    connect: 'and'
                                  },
                                  {
                                    property: 'person[counter]'                   
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
                    event: 'purchase'
                    action: 'modal'
                    action_param: 
                                  text: "Some beautiful weather in bangalore"
                                  href: "http://www.google.com"
                                  color: "#ffffff"
                                  width: "100"
                    conditions:[
                                  {
                                    property: 'person[email]'                   
                                    negation: 'true'
                                    operation: 'ew'
                                    value1: '@gmail.com'
                                    connect: 'and'
                                  },
                                  {
                                    property: 'purchase'                    
                                    negation: 'false'
                                    operation: 'gt'
                                    value1: 1000
                                    connect: 'and'
                                  },
                                  {
                                    property: 'date'                    
                                    negation: 'false'
                                    operation: 'dag'
                                    value1: 15
                                  }
                                ]
                  }


                    
  
        ]