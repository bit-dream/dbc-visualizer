import * as  d3 from 'd3';
import type { Graph } from './types';
import _ from 'lodash'
import type { init } from 'svelte/internal';
import mySvg from '/Users/headquarters/Documents/Code/dbc-visualizer/src/network-tree-svgrepo-com.svg'

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
        chargeStrength: -300,
        centeringStrength: 0.1,
    };

    // Class properties
    svgId = 'simulationContainer';
    forceSimulation: any;
    mainContainer: any;
    zoom: any;
    node: any

    circles: any;

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
        console.log(mySvg)
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
        let group = this.mainContainer
            .selectAll("g")
            .attr("transform", function(d: any) {
                return "translate(" + d.x + "," + d.y + ")";
            })
            .data(this.graph.nodes)
            .enter().append("g")
            .on("dblclick", (d:any) => {this.onClickCallback(d.target.id)})
            .on("click", (event:any, d:any) => {
                d.fx = null;
                d.fy = null;})
            //.on("mouseover", (d) => {
            //  console.log(`Moused over node ${d.target.id}`)
            //})

        let circle = group.append("circle")
            .attr("r", (d:any) => d.radius)
        
        /*
        <svg width="48px" height="48px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" fill="white" fill-opacity="0.01"/>
        <rect x="4" y="34" width="8" height="8" fill="#2F88FF" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <rect x="8" y="6" width="32" height="12" fill="#2F88FF" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M24 34V18" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M8 34V26H40V34" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <rect x="36" y="34" width="8" height="8" fill="#2F88FF" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <rect x="20" y="34" width="8" height="8" fill="#2F88FF" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M14 12H16" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        */
        //group.append('rect').attr('width',48).attr('height',48).attr('fill','white').attr('fill-opacity',0.01)
        //group.append('rect').attr('x',4).attr('y',34).attr('width',8).attr('height',8).attr('fill','#2F88FF').attr('stroke', 'black').attr('stroke-width', 4).attr('stroke-linecap','round').attr('stroke-linejoin','round')
        //group.append("img").attr("src",'https://www.svgrepo.com/show/213625/handcuffs.svg')
        
        //group.append('text').text((d: any)=>d.name).attr('dy',20)
            //.on("mouseover", (d) => {
            //  console.log(`Moused over node ${d.target.id}`)
            //})
        group.call(this.drag(this.forceSimulation));
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
                .call(d3.zoom().on("zoom", (event: any, d: any) => {
                    this.mainContainer.attr("transform", event.transform);
                  }))
                .append("g");
    }

    getRootSvg() {
        return d3.select(this.svgId);
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
            event.subject.fx = event.x;
            event.subject.fy = event.y
            //event.fx = d3.event.x;
            //event.fy = d3.event.y;
            //event.subject.fx = null;
            //event.subject.fy = null;
        }
        
        return d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended)
    }
    
}

export default Simulation;

//var zoom = d3.behavior.zoom().scaleExtent([min_zoom,max_zoom])

