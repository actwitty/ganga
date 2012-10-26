# Operations Library
App.operationsLibrary = 
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
App.operationsPermission = 
                        'String': [ 'eql', 'swh','ewh','cns','rgx','set' ]
                        'Date': [ 'gtn','ltn','eql','dag','drg','set' ]  
                        'Fixnum': [ 'gtn','ltn','eql','btn','rgx','set']
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








