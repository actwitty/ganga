class Actor
  include Mongoid::Document

  belongs_to      :app

  embeds_many     :events

  field   :name,    :type => String, 	:default => ""
  validates_presence_of  :name

  field   :uid,		:type => String, 	:default => ""
  validates_presence_of  :uid
end
