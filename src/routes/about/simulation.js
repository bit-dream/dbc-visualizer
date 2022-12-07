import * as  d3 from 'd3';

const RunSimulation = (graph, onClickCallback) => {

    let chargeStrength = -5;

    function drag(simulation) {    
        function dragstarted(event) {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          event.subject.fx = event.subject.x;
          event.subject.fy = event.subject.y;
        }
        
        function dragged(event) {
          event.subject.fx = event.x;
          event.subject.fy = event.y;
        }
        
        function dragended(event) {
          if (!event.active) simulation.alphaTarget(0);
          event.subject.fx = null;
          event.subject.fy = null;
        }
        
        return d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended);
    }

    const updateNodes = () => {
        let u = d3.select('svg')
            .selectAll('circle')
            .data(graph.nodes)
            .join('circle')
            .attr('r', d => d.radius)
            .attr('cx', d => d.x)
            .attr('cy', d => d.y)
            .attr('id', d => d.name)
            .on("dblclick", (d) => {onClickCallback(d.target.id)})
            .on("mouseover", (d) => {
              console.log(`Moused over node ${d.target.id}`)
            })
            .call(drag(simulation));
    };

    const updateLinks = () => {
        let u = d3.select('svg')
            .selectAll('line')
            .data(graph.links)
            .join('line')
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y)
            .attr('style','stroke: #ccc;')
    }

    const ticked = () => {
        updateLinks();
        updateNodes();
    }

    var element = d3.select('svg').node();
    let simulation = d3.forceSimulation(graph.nodes, graph.links)
        .force('charge', d3.forceManyBody().strength(chargeStrength))
        .force('center', d3.forceCenter(element.width.animVal.value / 2, element.height.animVal.value / 2).strength(1))
        .force('collision', d3.forceCollide().radius(d => d.radius))
        .force('link', d3.forceLink().links(graph.links))
        .on('tick', ticked);
};

export default RunSimulation;