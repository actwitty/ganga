class Obj
  include Mongoid::Document
  
  belongs_to :app
  belongs_to :obj_meta
end
