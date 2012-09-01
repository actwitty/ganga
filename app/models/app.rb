class App
  include Mongoid::Document
  
  has_many :objs, :dependent => :destroy
  embeds_many :obj_metas
  
end
