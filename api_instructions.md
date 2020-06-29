# Instructions for using the Enginavigator API

## Getting nodes/locations

Use the following URL https://0997tcpnme.execute-api.us-east-1.amazonaws.com/testing/nodes

### Parameters:

* type: Either "search" or "retrieve". "search" means you are searching for locations matching a text string, to be put into the key parameter. "retrieve" means you want to retrieve the details of a particular node with a specific id, given in the key parameter. 

* key: Either the search key if the type is "search" or an integer if the type is "retrieve". See above for more details.

* eg: https://0997tcpnme.execute-api.us-east-1.amazonaws.com/testing/nodes?type=search&key=E1

* eg: https://0997tcpnme.execute-api.us-east-1.amazonaws.com/testing/nodes?type=retrieve&key=4

## Getting a route

Use the following URL https://0997tcpnme.execute-api.us-east-1.amazonaws.com/testing/routes

### Parameters:

* start: id of the starting location/node

* end: id of the ending location/node

* eg: https://0997tcpnme.execute-api.us-east-1.amazonaws.com/testing/routes?start=2&end=5