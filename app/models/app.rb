class App
  include Mongoid::Document
  include Mongoid::Timestamps
  
  # Relations
  belongs_to  :account

  has_many    :actors,  :dependent => :destroy
  has_many    :events
  has_many    :properties

  embeds_many :rules

  # Attributes
  field		    :description,    :type => Hash,    :default => {}
  validates_presence_of    :description

  field       :schema, :type => Hash,      :default => {}
end