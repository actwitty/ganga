class App
  include Mongoid::Document
  
  belongs_to  :account

  has_many    :actors,  :dependent => :destroy
  embeds_many :rules

  field       :schema,  :type => Hash
  field		  :name,    :type => String

  validates_presence_of    :name
end
