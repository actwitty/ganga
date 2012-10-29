# Operations Library
App.opLookup = 
                        'gtn': 'greater than'
                        'ltn': 'lesser than'
                        'eql': 'equal to'
                        'swh': 'starts with'
                        'ewh': 'ends with'
                        'cns': 'contains'
                        'btn': 'between'
                        'rgx': 'regex'
                        'dag': 'days ago'                                               
                        'drg': 'date range'
                        'set': 'set'
App.opRevLookup = 
                        'greater than' : 'gtn'
                        'lesser than'  : 'ltn'
                        'equal to' : 'eql'
                        'starts with' : 'swh'
                        'ends with'  :  'ewh'
                        'contains'  : 'cns'
                        'between'  : 'btn'
                        'regex'  :  'rgx'
                        'days ago'  :  'dag'                                         
                        'date range'  :  'drg'
                        'set'  :  'set'
                        
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
App.operationsList = {
                      'String' :  [
                                      'equal to',
                                      'starts with',
                                      'ends with',
                                      'contains',
                                      'matches regex',
                                      'set'

                                  ],
                      'Fixnum' :  [
                                      'greater than',
                                      'lesser than',
                                      'equals to',
                                      'between',
                                      'set'

                                  ],
                      'Date' :    [
                                      'greater than',
                                      'lesser than',
                                      'equal to',
                                      'days ago',
                                      'date range',
                                      'set'

                                  ]
                  }

# Operation negations
App.negationValues = [ 
                        { key: 'false', value:'Is'},
                        { key: 'true', value:'Is not'} 
                     ]

#Data Types
App.dataTypes = [       
                  { key:'String', value: 'String'},
                  { key:'Fixnum', value: 'Number'},
                  { key:'Date', value: 'Date'}
                ]                     








