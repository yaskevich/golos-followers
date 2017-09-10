# golos-followers
## Prototype of Interface (visualization) of Follower/Following Relations for Golos Blockchain Social Network
### @ Imaguru Blockchain Hackathon (September 8—10, 2017)

Dataset of followers/following relations of users was loaded into Neo4j graph database (≈ 80k users).

*Cypher query for Neo4j which loads dataset from CSV*:

`LOAD CSV WITH HEADERS FROM "file:///var/www/followers.csv" AS line
MERGE (u:User { name: line.follower})
MERGE (u2:User { name: line.following})
CREATE (u)-[r:FOLLOWS]->(u2)
`
![Neo4j interface and query](http://projects.yaskevich.com/followers/neo4j.png)

![Demo Neo4j](http://projects.yaskevich.com/followers/golos-network.gif)

Now Neo4j provides API to query the dataset via REST API.

`match (n:User)-[r:FOLLOWS*]-(m) where n.name='username' return n as person,r,m limit 50`

**[Customized interface to the data via D3.js](http://projects.yaskevich.com/followers/)**

Partial dataset loaded into D3 directed graph

![Demo D3 UI](http://projects.yaskevich.com/followers/golos-d3.gif)

**Data source:** [GolosSQL by **arcange**@golos.io](https://golos.io/ru--golos/@arcange/golossql-baza-dannykh-sql-so-vsemi-dannymi-blokchein).
