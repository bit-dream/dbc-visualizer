<script>
    import * as  d3 from 'd3';
	import { onMount } from 'svelte';

    let graph = {
  "nodes": [
    {
      "id": 1,
      "name": "A"
    },
    {
      "id": 2,
      "name": "B"
    },
    {
      "id": 3,
      "name": "C"
    },
    {
      "id": 4,
      "name": "D"
    },
    {
      "id": 5,
      "name": "E"
    },
    {
      "id": 6,
      "name": "F"
    },
    {
      "id": 7,
      "name": "G"
    },
    {
      "id": 8,
      "name": "H"
    },
    {
      "id": 9,
      "name": "I"
    },
    {
      "id": 10,
      "name": "J"
    }
  ],
  "links": [

    {
      "source_id": 1,
      "target_id": 2
    },
    {
      "source_id": 1,
      "target_id": 5
    },
    {
      "source_id": 1,
      "target_id": 6
    },

    {
      "source_id": 2,
      "target_id": 3
    },
            {
      "source_id": 2,
      "target_id": 7
    }
    ,

    {
      "source_id": 3,
      "target_id": 4
    },
     {
      "source_id": 8,
      "target_id": 3
    }
    ,
    {
      "source_id": 4,
      "target_id": 5
    }
    ,

    {
      "source_id": 4,
      "target_id": 9
    },
    {
      "source_id": 5,
      "target_id": 10
    }
  ]
}

    onMount(()=>{
        var svg = d3.select('#nodeChart').append('svg');
        let width = svg.attr("width", 500);
        let height = svg.attr("height", 300);

        var simulation = d3.forceSimulation()
            .force("link", d3.forceLink().id(d => { return d.id; }))
            .force("charge", d3.forceManyBody().strength(-400))
            .force("center", d3.forceCenter(width / 2, height / 2));

        console.log(simulation)
        graph.links.forEach(d => {
            d.source = d.source_id;    
            d.target = d.target_id;
        });           

        var link = svg.append("g")
                        .style("stroke", "#aaa")
                        .selectAll("line")
                        .data(graph.links)
                        .enter().append("line");

        var node = svg.append("g")
            .attr("class", "nodes")
            .selectAll("circle")
            .data(graph.nodes)
            .enter().append("circle")
            .attr("r", 6)
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));
        
        var label = svg.append("g")
            .attr("class", "labels")
            .selectAll("text")
            .data(graph.nodes)
            .enter()
            .append("text")
            .attr("class", "label")
            .text(d => { return d.name; });

        simulation
            .nodes(graph.nodes)
            .on("tick", ticked);

        simulation.force("link")
            .links(graph.links);

        console.log(simulation)

        function ticked() {
            link
                .attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });

            node
                .attr("r", 20)
                .style("fill", "#d9d9d9")
                .style("stroke", "#969696")
                .style("stroke-width", "1px")
                .attr("cx", function (d) { return d.x+6; })
                .attr("cy", function(d) { return d.y-6; });
            
            label
                    .attr("x", function(d) { return d.x; })
                    .attr("y", function (d) { return d.y; })
                    .style("font-size", "20px").style("fill", "#4393c3");
        }

        function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart()
        simulation.fix(d);
        }

        function dragged(d) {
        simulation.fix(d, d3.event.x, d3.event.y);
        }

        function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        simulation.unfix(d);
        }
    });
</script>

<div id="nodeChart" style="height: 100%; width: 100%;"></div>