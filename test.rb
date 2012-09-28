#regex = Regexp.escape('/ruby/|activerecord|active_support|__DELEGATION__|/.rvm|/vendor/|script/rails|/config/initializers')
puts Regexp.escape('\*?{}.|/')   #=> \\\*\?\{\}\.
if "/vendor" =~ /#{regex}/i
  puts "found"
end



