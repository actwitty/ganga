module ErrorTranslator
	def __error_translate(*argv)
		
		# if no message return nil
		return nil if argv[0].blank?

		argv[1] = {} if argv[1].blank?

		self.class.module_eval do 
			attr_accessor :__err_locale		
			attr_accessor :__err_default	
		end	

		# check if the message is coming from locale translation yml 
		# expecting one dot atleast
		if argv[0].scan(/\s/).blank? and !argv[0].scan(/\./).blank?
			 		
	 		argv[1][:locale] = I18n.locale
			self.__err_locale=  I18n.t(argv[0],argv[1])

			argv[1][:locale] = I18n.default_locale
			self.__err_default= I18n.t(argv[0], argv[1])
		else
			self.__err_locale = self.__err_default = argv[0]
		end
		self.__err_locale
	end

	alias_method :et, :__error_translate 

	def __error_return(exception)
		return self.__err_default if self.instance_variable_defined?(:@__err_default)
		return exception.message unless exception.blank?
		return nil
	end

	alias_method :er, :__error_return
end

module Kernel
	include ErrorTranslator
end

# Reloads Object class with kernel module so that 
# new methods become visible
class Object
	include Kernel
end




