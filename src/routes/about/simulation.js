import * as  d3 from 'd3';

const RunSimulation = (graph, onClickCallback, selection) => {

    let chargeStrength = -20;
    let centeringStrength = 0.2;

    function drag(simulation) {    
        function dragstarted(event, d) {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d3.select(this).raise().attr("stroke", "white");
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

    const mainContainer = 
      d3.select(selection)
        .style('display', 'inline-block')
        .style('position','relative')
        .style('width', '100%')
        .style('padding-bottom', '100%')
        .style('vertical-align','top')
        .style('overflow','hidden')
        .append('svg')
        .attr('id', 'simulationContainer')
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 600 400")
        .style('display', 'inline-block')
        .style('position', 'absolute')
        .style('top', '10px')
        .style('left', '0')

    const updateNodes = () => {
        let u = mainContainer
            .selectAll('circle')
            .data(graph.nodes)
            .join('circle')
            .attr('r', d => d.radius)
            .attr('cx', d => d.x)
            .attr('cy', d => d.y)
            .attr('id', d => d.name)
            .on("click", (d) => {onClickCallback(d.target.id)})
            //.on("mouseover", (d) => {
            //  console.log(`Moused over node ${d.target.id}`)
            //})
            .call(drag(simulation));
    };

    const updateLinks = () => {
        let u = mainContainer
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

    const element = d3.select('#simulationContainer').node();
    let simulation = d3.forceSimulation(graph.nodes, graph.links)
        .force('charge', d3.forceManyBody().strength(chargeStrength))
        //element.width.animVal.value / 2, element.height.animVal.value / 2
        //.force('center', d3.forceCenter(element.width.animVal.value / 2, element.height.animVal.value / 2).strength(0.5))
        .force("x", d3.forceX(element.width.animVal.value / 2).strength(centeringStrength))
        .force("y", d3.forceY(element.height.animVal.value / 2).strength(centeringStrength))
        .force('collision', d3.forceCollide().radius(d => d.radius))
        .force('link', d3.forceLink().links(graph.links))
        .on('tick', ticked);
};

export default RunSimulation;