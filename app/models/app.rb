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
  field		    :name,    :type => String,    :default => ""
  validates_presence_of    :name

  ## unique uid of the actor. can be email or any othe guid
  field		    :uid,    :type => String,    :default => ""
  validates_presence_of    :uid

  field       :schema, :type => Hash,      :default => {}
end