function neo4j2d3(o) {
            function idIndex(a, id) {
                for (var i = 0; i < a.length; i++) {
                    if (a[i].id == id) return i;
                }
                return null;
            }

            var nodes = [], links = [];
            o.forEach(function (row) {
                row.graph.nodes.forEach(function (n) {
                    if (idIndex(nodes, n.id) == null) {
                        var ntitle = n.properties.name;                        
                        nodes.push({id: n.id, label: n.labels[0], title: ntitle, props: n.properties});
                    }
                });

                links = links.concat(row.graph.relationships.map(function (r) {
                    return {
                        source: idIndex(nodes, r.startNode),
                        target: idIndex(nodes, r.endNode),
                        type: r.type,
                        weight: 1
                    };
                }));
            });
            return ({nodes: nodes, links: links});
        }

	 var chartDiv = document.getElementById("svg");  
        var width = chartDiv.clientWidth;
        var height = chartDiv.clientHeight;
		
	var svg = d3.select(chartDiv).append("svg");
	
	svg
          .attr("width", width)
          .attr("height", height);
    
	
 // var width = 1200, height = 750;
  // force layout setup
   var colors = d3.scale.category10();

  var force = d3.layout.force()
          // .charge(-200)
          // .charge(0)
		  // .linkDistance(120)
		  .gravity(.05)
			.distance(100)
			.charge(-100)
		  .size([width, height]);

  // setup svg div
  // var svg = d3.select("#svg").append("svg")
          // .attr("width", "100%")
		  // .attr("height", "100%")
		   // .attr("width", width)
			// .attr("height", height)
          // .attr("pointer-events", "all");

  // load graph (nodes,links) json from /graph endpoint
  d3.json("/neo4j/graph2.json", function(error, obj) {
if (error) return;
	var graph = neo4j2d3(obj.results[0].data);
		// console.log(graph);
      force.nodes(graph.nodes).links(graph.links).start();

      // render relationships as lines
    var link = svg.selectAll(".link")
              .data(graph.links)
			  .enter()
              .append("line").attr("class", "link");

      // render nodes as circles, css-class from label
	  
	        // var node = svg.selectAll(".node")
              // .data(graph.nodes).enter()
              // .append("circle")
              // .attr("r", 10)			   
			  // .style("fill",function(d,i){return colors(i);})
              // .call(force.drag);

	var node = svg.selectAll(".node")
      .data(graph.nodes).enter()
	  .append("g")
      .attr("class", "node")
      .call(force.drag);
	  
	node.append("circle")		  
	  .attr("r", 10)			   
	  .style("fill",function(d,i){return colors(i);});
		  
	node.append("text")
      .attr("dx", 12)
      .attr("dy", ".35em")
      .text(function(d) { return d.title });
	  
      
      // force feed algo ticks for coordinate computation
      // force.on("tick", function() {
          // link.attr("x1", function(d) { return d.source.x; })
                  // .attr("y1", function(d) { return d.source.y; })
                  // .attr("x2", function(d) { return d.target.x; })
                  // .attr("y2", function(d) { return d.target.y; });

          // node.attr("cx", function(d) { return d.x; })
                  // .attr("cy", function(d) { return d.y; });
      // });
force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
  });
	  
  });
