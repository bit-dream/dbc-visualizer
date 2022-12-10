import * as  d3 from 'd3';
import type { Graph } from './types';
import _ from 'lodash'
import type { init } from 'svelte/internal';
import networkSvg from '/Users/headquarters/Documents/Code/dbc-visualizer/src/network-tree-svgrepo-com.svg'
import messageSvg from '/Users/headquarters/Documents/Code/dbc-visualizer/src/message-svgrepo-com.png'

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
        baseRadius: 20,
        linkLength: 200
    };

    // Class properties
    svgId = 'simulationContainer';
    forceSimulation: any;
    mainContainer: any;
    zoom: any;
    node: any;

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
        console.log(messageSvg)
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
                    .links(this.graph.links).distance(this.settings.linkLength))
                .on('tick', this.simulationRunningCallback);
    }

    updateNodes2 = () => {
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
        
        group.call(this.drag(this.forceSimulation));
    };

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
            .attr("r", (d:any) => this.settings.baseRadius + d.radius)
            .attr('fill', '#fff')
            .attr('stroke', '#000');
        
        let image = group.append('image')
            .attr('x','-15px')
            .attr('y','-16px')
            .attr('height','30px')
            .attr('width','30px')
            .attr('xlink:href', (d:any)=>{
                if (d.type === 'message') {
                    return messageSvg
                } else if (d.type === 'signal') {
                    return networkSvg
                }
            })
        
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
            
        u.append('text')
            .attr('class', 'text')
            .attr('fill', '#000000')
            .attr('font-size', '8px')
            .attr('pointer-events', 'none')
            .attr('text-anchor', 'middle')
            .text(function(d: any) {
                return 'test';
            });
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

    documentResizeHandler(document: any) {
        addEventListener("resize", _.debounce(
            () => {
                this.forceSimulation.stop();
                d3.select(this.selector).html("");
                this.setWidth = document.innerWidth;
                this.setHeight = document.innerHeight;
                this.createMainContainer();
                this.updateLinks();
                this.updateNodes();
                this.forceSimulation.restart();
            }, 10)
        );
    }
    
}

export default Simulation;

//var zoom = d3.behavior.zoom().scaleExtent([min_zoom,max_zoom])

