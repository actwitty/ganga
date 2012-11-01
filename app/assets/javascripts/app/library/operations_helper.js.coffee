# Operations Library
                        
#Operation UI effect
App.operationsValuesCount = 
                            'gtn': 1
                            'ltn': 1
                            'eql': 1
                            'swh': 1
                            'ewh': 1
                            'cns': 1
                            'btn': 2
                            'rgx': 1
                            'dag': 1
                            'drg': 2
                            'set': 0
App.operationsValuesType = 
                            'gtn': 'type'
                            'ltn': 'type'
                            'eql': 'type'
                            'swh': 'type'
                            'ewh': 'type'
                            'cns': 'type'
                            'btn': 'type'
                            'rgx': 'type'
                            'dag': 'Fixnum'
                            'drg': 'type'
                            'set': 'na'                        
# Operations Permissions                   
App.operationsList = 
                      'String' :  
                                'eql' : 'equal to'
                                'swh' : 'starts with'
                                'ewh' : 'ends with'
                                'cns' : 'contains'
                                'rgx' : 'regular exp'
                                'set' : 'set'
                      'Fixnum' :  
                                'gtn' : 'greater than'
                                'ltn' : 'lesser than'
                                'eql' : 'equal to'
                                'btn' : 'between'
                                'set' : 'set'                                  
                      'Date' :    
                              'gtn' : 'greater than'
                              'ltn' : 'lesser than'
                              'eql' : 'equal to'
                              'dag' : 'days ago'
                              'drg' : 'date range'
                              'set' : 'set'
                      'Array' :
                              'cns' : 'contains'

                                  
                  

# Operation negations
App.negationValues = [ 
                        { key: 'false', value:'Is'},
                        { key: 'true', value:'Is not'} 
                     ]

#Data Types
App.dataTypes = [       
                  { key:'String', value: 'String'},
                  { key:'Fixnum', value: 'Number'},
                  { key:'Date', value: 'Date'},
                  { key:'Array', value: 'Array'}
                ]                     








