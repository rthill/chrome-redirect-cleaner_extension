chrome-redirect-cleaner_extension
=================================

Google Chrome redirect cleaner


Simple extension with idea and most of the code from https://addons.mozilla.org/en-US/firefox/addon/redirect-cleaner/
Thanks to Alexander Bergmann for publishing his work under GPL.

This is an early and mostly untested extension!

The following patterns will be used:
www.example.com?url=www.mozilla.org -> www.mozilla.org
www.example.com?param1=value1&url=www.mozilla.org -> www.mozilla.org
www.example.com?param1=value1&url=www.mozilla.org&param2=value2 -> www.mozilla.org

www.example.com?url=http://www.mozilla.org -> www.mozilla.org
www.example.com?param1=value1&url=http://www.mozilla.org -> www.mozilla.org
www.example.com?param1=value1&url=http://www.mozilla.org&param2=value2 -> www.mozilla.org

