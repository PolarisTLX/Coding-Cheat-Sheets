DELETE ONLY CERTAIN ELEMENTS FROM HASH BASED ON CONDITION with ",delete_if {...}" :


    x = { "a" => 100, "b" => 20 }
    x.delete_if { |key, value| value < 25 }
    print x

    #=> {"a"=> 100 }

# IMPORTANT NOTE a code block on a HASH works much clearer if passed |key, value| as arguments.
# The first arg passed, whatver its called, is seens as the key, even if its only arg passed.
# So x.delete_if { |value| value < 25 }  will not work, as it will just refer to the key, even if you call the arg "value".
