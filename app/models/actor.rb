class Actor
  include Mongoid::Document

  belongs_to      :app

  embeds_many     :properties
  embeds_many     :events

  field           :name,    :type => String
  validates_presence_of  :name
end
