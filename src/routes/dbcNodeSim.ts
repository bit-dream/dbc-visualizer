import * as  d3 from 'd3';
import type { Graph } from './types';
import _ from 'lodash'
import type { init } from 'svelte/internal';

type SimulationCallback = (event: any) => void;

class Simulation {

    // Constructor properties
    selector: string;
    graph: Graph;
    width: number;
    height: number;
    onClickCallback: SimulationCallback;
    settings = {
        minZoom: 0.1,
        maxZoom: 7,
        chargeStrength: -20,
        centeringStrength: 0.1,
    };

    // Class properties
    forceSimulation: any;
    mainContainer: any;

    constructor(selector: string, graph: Graph, callback=(d: any)=>{}) {
        this.selector = selector;
        this.graph = graph;
        this.width = 1000;
        this.height = 700;
        this.onClickCallback = callback;
    };

    set setWidth(width: number) {
        this.width = width;
    }

    set setHeight(height: number) {
        this.height = height;
    }

    init() {
        this.createMainContainer();
        this.createForceSimulation();
    }

    createForceSimulation() {
        this.forceSimulation = 
            d3.forceSimulation(this.graph.nodes, this.graph.links)
                .force('charge', d3.forceManyBody()
                    .strength(this.settings.chargeStrength))
                .force("x", d3.forceX(this.width / 2)
                    .strength(this.settings.centeringStrength))
                .force("y", d3.forceY(this.height / 2)
                    .strength(this.settings.centeringStrength))
                .force('collision', d3.forceCollide()
                    .radius((d:any) => d.radius))
                .force('link', d3.forceLink()
                    .links(this.graph.links))
                .on('tick', this.simulationRunningCallback);
    }

    updateNodes = () => {
        let u = this.mainContainer
            .selectAll('circle')
            .data(this.graph.nodes)
            .join('circle')
            .attr('r', (d:any) => d.radius)
            .attr('cx', (d:any) => d.x)
            .attr('cy', (d:any) => d.y)
            .attr('id', (d:any) => d.name)
            .on("dblclick", (d:any) => {this.onClickCallback(d.target.id)})
            //.on("mouseover", (d) => {
            //  console.log(`Moused over node ${d.target.id}`)
            //})
            .call(this.drag(this.forceSimulation));
    };
    
    updateLinks = () => {
        let u = this.mainContainer
            .selectAll('line')
            .data(this.graph.links)
            .join('line')
            .attr('x1', (d:any) => d.source.x)
            .attr('y1', (d:any) => d.source.y)
            .attr('x2', (d:any) => d.target.x)
            .attr('y2', (d:any) => d.target.y)
            .attr('style','stroke: #ccc;')
    }

    simulationRunningCallback = () => {
        this.updateLinks();
        this.updateNodes();
    }

    createMainContainer() {
        this.mainContainer = 
            d3.select(this.selector)
                .style('display', 'inline-block')
                .style('position','relative')
                .style('width', '100%')
                .style('padding-bottom', '0%')
                .style('vertical-align','top')
                .style('overflow','hidden')
                .append('svg')
                .attr('id', 'simulationContainer')
                .attr("preserveAspectRatio", "xMinYMin meet")
                .attr("viewBox", `0 0 ${this.width} ${this.height}`)
                .style('display', 'inline-block')
                .style('position', 'absolute')
                .style('top', '10px')
                .style('left', '0')
    }

    drag(simulation: any) {    
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
            //event.fx = d3.event.x;
            //event.fy = d3.event.y;
            event.subject.fx = null;
            event.subject.fy = null;
        }
        
        return d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended)
    }
    
}

export default Simulation;

//var zoom = d3.behavior.zoom().scaleExtent([min_zoom,max_zoom])

