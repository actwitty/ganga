class ObjMeta
  include Mongoid::Document
  
  embedded_in :app
  has_many :obj
end
