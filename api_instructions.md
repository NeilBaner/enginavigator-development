# Instructions for using the Enginavigator API

## Getting nodes/locations

Use the following URL https://0997tcpnme.execute-api.us-east-1.amazonaws.com/testing/nodes

### Parameters:

* type: Either "search", "list", or "retrieve". "search" means you are searching for locations matching a text string, to be put into the key parameter. "list" means you want to get every single node in the map for some reason. (this will only return a list of names + IDs). "retrieve" means you want to retrieve the details of a particular node with a specific id, given in the key parameter. 

* key: Either the search key if the type is "search" or an integer if the type is "retrieve". See above for more details.

* eg: https://0997tcpnme.execute-api.us-east-1.amazonaws.com/testing/nodes?type=search&key=E1

Result:

![search_screenshot](https://github.com/neilbaner/enginavigator/blob/master/screenshot_search_location.png)

* eg: https://0997tcpnme.execute-api.us-east-1.amazonaws.com/testing/nodes?type=retrieve&key=4

Result:

![retrieve_screenshot](https://github.com/neilbaner/enginavigator/blob/master/screenshot_retrieve_location.png)

## Getting a route

Use the following URL https://0997tcpnme.execute-api.us-east-1.amazonaws.com/testing/routes


### Parameters:

* start: id of the starting location/node

* end: id of the ending location/node

* eg: https://0997tcpnme.execute-api.us-east-1.amazonaws.com/testing/routes?start=2&end=5

Result:

![route_screenshot](https://github.com/neilbaner/enginavigator/blob/master/screenshot_get_route.png)