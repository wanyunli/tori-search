tori-search
==========
Get the search result from tori.fi via email, will receive the new posted items via email. Script is running on Nodejs.

This script is created because we want to buy a baby eating chair from tori.fi, which turn out to be very popular one. When we find the one we would like to buy, manytimes it was already reserved by other person. I made this script so that can get the new posted item info earlier than many others. 

## Usage
node index.js your search words
e.g. node index.js stokke tripp

Before running the script, you need to modify the sender email and receiver email info. Also you can modify the interval of search action, default value is checking search words every half hour. This script only get items from the first result page, in my case it is enough. The searching area in the script is in Uusimaa, if you want to use it in some other area, you need to get the corresponding uri and modify it.



