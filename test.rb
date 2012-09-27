require 'pp'
class Object
	def _error(*argv)
		self.class.module_eval do 
			attr_accessor :_log_message		
			attr_accessor :_log_hash	
		end
		self._log_message=  argv[0]
		self._log_hash= argv[1]
	end
end

class Hello
	def testing
		_e("hello world", "name" => "alok", "age" => 33)
		puts @_log_message
		puts @_log_hash
	end
end
a =Hello.new
a.testing
a.testing
a.testing