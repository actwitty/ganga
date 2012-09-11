class App
  include Mongoid::Document
  
  belongs_to  :account

  has_many    :actors,  :dependent => :destroy
  embeds_many :rules

  field		  :name,    :type => String,    :default => ""
  validates_presence_of    :name

  field       :schema,  :type => Hash,      :default => {}
end
