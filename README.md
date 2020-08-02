# enginavigator
 
 ## Team Members

 [@neilbaner](https://github.com/neilbaner) : Neil Banerjee

 [@yAOwzers](https://github.com/yAOwzers) : Neo Yao Jie, Joel

 ## Proposed Level of Acheivement 

 Gemini

 ## The Problem

 ### What?

 #### What is the exact nature of the problem? (Problem Specification)

NUS Engineering is a labyrinth to navigate. Ever tried finding LT1? I have. It took me and a friend half an hour of walking (running), including under the hot August afternoon sun, only to still be 10 minutes late. The signs don't help matters; try following the signs from, say, E4 to EA. Even after a year of studying there, I still get lost at NUS FoE. It's a massive faculty spread over so many different buildings that it's inevitably really hard to navigate. Plus, whenever I ask the class Whatsapp group how to get somewhere, the answer is "just use google maps lol" which is not very helpful because Google Maps can't exactly take me from E3-06-05 to EA-06-23 or something. - Neil

 ### Who?

 #### Who is facing the problem? Who will benefit from the final product? (Target Audience) 

* NUS Engineering students like ourselves who constantly get lost in the labyrinth that is the Faculty of Engineering

* Visitors to NUS Engineering, such as prospective students during open days/information sessions, guest speakers etc.

* Staff, professors, lecturers, and other faculty members who may also get lost at times. 

 ### Why?

 #### What benefits will the product bring to the user? Why would they want to use this product? (Justification)

No one likes being late to class, whether as a student or a teacher. Sometimes, you just get lost and waste time just wandering around in the completely wrong place. Other times, you underestimate just how long the walk to LT7 is from E5, and leave for a 17:00 lecture at 16:55. If you have an exam or test you cannot be late for, being able to find the classroom/location on time becomes even more important. 


 ## Our Solution

 ### What?

 #### What kind of product will we produce? What features will it have? (Important Features)

* Web app similar to Google Maps, but specifically for the NUS Faculty of Engineering. 

* Enter a start and end point and get turn-by-turn directions to where you want to go, with the shortest route.

* Find wheelchair-friendly routes if you can't, or don't want to, use the stairs for whatever reason. 

* **Possible extension**: Find nearby toilets/food outlets/staircases/other facilities

* **Possible extension**: Progresssive Web App which can be installed on any device with a supported web browser. No proprietary app stores needed! (plus we save on the developer account fees)

 ### How?

 #### What technologies, programming languages and tools will we use to produce the final product? How will it work? (Implementation details) 

* Front-end client made with node (server-side), Express (in-between), React (client-side) **tentatively: hosted on AWS EC2**

* API for getting location and direction information with AWS Lambda and AWS API gateway

* MySQL database on AWS RDS for data storage

 ### When?

 #### A rough timeline of when our final product will be completed

 // timeline (rough)

## UPDATE: Milestone 2

1. We changed plans a bit, and instead of building a full MERN-stack style application, which would be a monolithic application, we decided to adopt a more microservice-style approach. Now, we have an API that we can access that will allow us to search for locations on the map, as well as return a route given a start and end point. This will work alongside the web application, which will still be coded with node, express and react. It is considered good software engineering practice to break up the application into microservices in this fashion. The advantage of this approach is that it's much more scaleable and easy to maintain. For example, if we decide to make an Android or iOS application, we can simply use the API to generate routes and get map data, instead of rewriting the mapping code over and over. We could also potentially open up the API for other developers to use if they want to try and make a better version of our product. Additionally, it makes the application easier to debug, since we can easily isolate errors, and easier to maintain, since there is more defined separation and we can have different people in charge of different parts who can work independently without affecting the others' code. 

![meme-software-engineer](https://github.com/NeilBaner/enginavigator/blob/master/meme-2.jpg)

2. We now have a (somewhat) functional back end. We have an API, accessible at [this link](https://0997tcpnme.execute-api.us-east-1.amazonaws.com/testing/) which allows us to search for locations and then get a route from one location to another. Instructions for how to use this API are available [here](https://github.com/neilbaner/enginavigator/blob/master/api_instructions.md), feel free to test it out!

Here is the sample map we're using for the prototype:

![sample-map](https://github.com/NeilBaner/enginavigator/blob/master/prototype_one_map.jpg)

## UPDATE: Milestone 3

Our web application includes the feature of providing a set of instructions for students who plan to get from a specific point to another. On the front page, the 2 auto complete search bars enable users to input their desired start and end locations. When the search button is clicked, the API fetches data from the data base correspoinding to the vertex names provided in the search bar with the reespective vertex ids. After which, a set of directions will be produced in the space below the search button.

Simple to use, 3 Simple steps.

Try it here: https://bit.ly/2WSc6zm

Video: https://youtu.be/ppMojLehukI


We initially planned to create a monolithic MERN stack application.  

Later we changed plans to use a more microservice-oriented approach 

 - An API is used to retrieve data from the database and for the route calculation 

 - The actual web application is built with React.js (using create-react-app and node.js) 

 - All storage and computation is done on the cloud; with AWS Lambda for the routing algorithm, AWS S3 for images (we weren’t able to implement this for Milestone 3 but are on    our way to doing so), AWS API gateway to create the API, AWS RDS for a MySQL database with the map data, Github to host our code, and Heroku to host the final web app.  

   * The Lambda component was done by Neil using Node.js 

   * The database system was done by Neil using MySQL (this is the only technology we were familiar with) 

   * The API, S3, GitHub repository and Heroku were set up by Neil 

   * The front end was built by Joel, using the React.js framework and the create-react-app tool to create a skeleton file.  

Issues encountered along the way: 

 - Node.js uses asynchronous functions, which was very unintuitive for me coming from purely synchronous programming languages like C++, Java and Python. This led to many hours troubleshooting why the code wouldn’t work as expected, and finding workarounds to do things that would have been easy with synchronous code. For example, for the routes algorithm, I needed to create a for loop that would retrieve the list of edges for each node using an SQL query. However, because the SQL query function from the MySQL library is asynchronous and doesn’t use the new Promise architecture, I wasn’t able to figure out how to make it work properly, as the for loop would just execute a bunch of queries asynchronously and move on to process the retrieved data even though the queries hadn’t been completed yet and there was no data to process. I’ve currently fixed this by adding a static delay of 2 seconds before starting the processing, but I have read up on how to fix this using the async library (I was unable to implement this in time for Milestone 3). – Neil 

 - We initially planned on creating our own library for Dijkstra’s algorithm. However, after many, many hours coding and troubleshooting and deleting and rewriting code we decided to use a prebuilt library for the Dijkstra’s algorithm (node-dijkstra from npm). This caused the problem mentioned before about the asynchronous MySQL queries, because of the format in which this library expects to be input the graph. We may consider implementing a customised version of Dijkstra’s algorithm (or perhaps a more advanced one like A*) in the future but it is not in the plans for now.  

 - We found a bug in the AWS Lambda online code editor where it would sometimes not save all the changes made; for example, if we changed 10 characters and saved, it might save only 5 changed characters. This led to a lot of frustration and wasted time. After the first few times, we did figure out that we should probably save multiple times just to be sure. We also found out that Heroku has an issue where hosting an application made with create-react-app will cause the application to crash on launch. We found a fix on stackoverflow.com that said using the library serve and changing the start script from “react-scripts start” to “serve” would work, and indeed it did. This does appear to be an issue with Heroku, as even the stock, unchanged create-react-app template will not launch correctly.  

Features implemented successfully: 

* Search bar for start and end points with suggestions 

* Ability to search for routes 

Features not yet implemented: 

* Images for the routes (should be implemented within a week or two of Milestone 3 submission). 

* Ability to find wheelchair-friendly routes (should be implemented within a couple of days of Milestone 3 submission; in fact, if you’re evaluating this a few days later, our deployment may in fact be updated with this feature. The back end for this feature is already implemented) 

* Ability to find landmarks like toilets, food courts, staircases, lifts etc. (We received feedback from our peers that these are actually relatively easy to find anyway, so this is a lower priority for us. We may not implement these features for Orbital unless we have extra time) 

* Progressive Web App (we will attempt to finish this for Splashdown)

User Testing
* Directions provided by the API was still a little unclear, visuals might aid the users in finding their end location
* Live location of the user might help when clearing a particular checkpoint given in the directions
