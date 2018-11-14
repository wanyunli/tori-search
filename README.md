tori-search
==========
Get the search result from tori.fi via email, will receive the new posted item via email. Script is running on Nodejs.

This script is created because we want to buy a baby eating chair from tori.fi, which turn out to be very popular one. When we find the one we would like to buy, buy manytimes it was already reserved by other person. I made this script so that can get the new posted item info earlier than many others.

## Usage
node index.js your search words
e.g. node index.js stokke tripp

Before running the script, you need to modify the sender email and receive email info. Aslo you can modify the interval of search action, default value is checking your search words every half hours.