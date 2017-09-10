# golos-followers
Visualization of Follower/Following Relations of Golos Blockchain Social Network

Dataset of followers/following relations of users was loaded into Neo4j graph database (≈ 80k users).

![Neo4j interface and query](http://projects.yaskevich.com/followers/neo4j.png)

![Demo Neo4j](http://projects.yaskevich.com/followers/golos-network.gif)

Now Neo4j provides API to query the dataset via REST API.

`match (n:User)-[r:FOLLOWS*]-(m) where n.name='username' return n as person,r,m limit 50`

**[Customized interface to the data via D3.js](http://projects.yaskevich.com/followers/)**

Partial dataset loaded into D3 directed graph

![Demo D3 UI](http://projects.yaskevich.com/followers/golos-d3.gif)
