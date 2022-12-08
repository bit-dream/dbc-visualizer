import * as  d3 from 'd3';
import type { Graph } from './types';

type SimulationCallback = (data: any) => {};

const RunSimulation = (
    graph: Graph, 
    onClickCallback: SimulationCallback, 
    selection: string, 
    width: number, 
    height: number
  ) => {

    let chargeStrength= -20;
    let centeringStrength = 0.1;

    function drag(simulation: any) {    
        function dragstarted(event: any) {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          event.subject.fx = event.subject.x;
          event.subject.fy = event.subject.y;
        }
        
        function dragged(event: any) {
          event.subject.fx = event.x;
          event.subject.fy = event.y;
        }
        
        function dragended(event: any) {
          if (!event.active) simulation.alphaTarget(0);
          event.subject.fx = null;
          event.subject.fy = null;
        }
        
        return d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
    }

    const mainContainer = 
      d3.select(selection)
        .style('display', 'inline-block')
        .style('position','relative')
        .style('width', '100%')
        .style('padding-bottom', '0%')
        .style('vertical-align','top')
        .style('overflow','hidden')
        .append('svg')
        .attr('id', 'simulationContainer')
        .attr("preserveAspectRatio", "xMinYMin meet") //xMinYMin meet
        .attr("viewBox", `0 0 ${width} ${height}`)
        .style('display', 'inline-block')
        .style('position', 'absolute')
        .style('top', '10px')
        .style('left', '0')

    const updateNodes = () => {
        let u = mainContainer
            .selectAll('circle')
            .data(graph.nodes)
            .join('circle')
            .attr('r', (d:any) => d.radius)
            .attr('cx', (d:any) => d.x)
            .attr('cy', (d:any) => d.y)
            .attr('id', (d:any) => d.name)
            .on("dblclick", (d:any) => {onClickCallback(d.target.id)})
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
            .attr('x1', (d:any) => d.source.x)
            .attr('y1', (d:any) => d.source.y)
            .attr('x2', (d:any) => d.target.x)
            .attr('y2', (d:any) => d.target.y)
            .attr('style','stroke: #ccc;')
    }

    const ticked = () => {
        updateLinks();
        updateNodes();
    }

    let simulation: any = d3.forceSimulation(graph.nodes, graph.links)
        .force('charge', d3.forceManyBody().strength(chargeStrength))
        //element.width.animVal.value / 2, element.height.animVal.value / 2
        //.force('center', d3.forceCenter(element.width.animVal.value / 2, element.height.animVal.value / 2).strength(0.5))
        .force("x", d3.forceX(width / 2).strength(centeringStrength))
        .force("y", d3.forceY(height / 2).strength(centeringStrength))
        .force('collision', d3.forceCollide().radius((d:any) => d.radius))
        .force('link', d3.forceLink().links(graph.links))
        .on('tick', ticked);
};

export default RunSimulation;