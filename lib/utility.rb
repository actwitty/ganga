require 'utility/hash'

module Utility
  def self.method_missing(name, *args, &block)
    self.constants.each do |constant|
      klass = constant.to_s.split("_").collect(&:capitalize).join.constantize
      klass = "Utility::#{klass}".constantize

      if klass.class == Class and klass.respond_to?(name) == true

      	#define the method from sub classes as wrappers
        block = Proc.new {|v| klass.send(name,v)}
        self.class.send(:define_method, name, &block)

        #assumption that method takes one argument
        return klass.send(name,args[0])
      end
    end
  end
end
