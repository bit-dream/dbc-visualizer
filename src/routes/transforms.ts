import type { DbcData, Attributes, Message, Signal } from "dbc-can/lib/dbc/types";
import type { Graph, GraphLinkProps, GraphNodeProps } from './types'

export const createGraph = (data: DbcData) => {

    let graph: Graph = {
        nodes: new Array(), 
        links: new Array()
    };

    const networkName = 'network'

    graph.nodes.push({
        name: networkName,
        radius: 5,
        obj: null,
        type: networkName
    });

    // Append all messages as nodes
    data.messages.forEach((message: Message) => {
        graph.nodes.push({
            name: message.name,
            radius: message.dlc,
            obj: message,
            type: 'message'
        });

        // Create link from message to network
        graph.links.push({
            source: networkName,
            target: message.name
        })

        // Append all signals as nodes
        message.signals.forEach((signal: Signal) => {
            graph.nodes.push({
                name: signal.name,
                radius: signal.length,
                obj: signal,
                type: 'signal'
            })

            // Create link from message to signal
            graph.links.push({
                source: message.name,
                target: signal.name
            })
        })
    })

    graph.links = graph.links.map((link: GraphLinkProps, linkIdx: number) => {
        let sources: number[] = []; let targets: number[] = [];
        graph.nodes.forEach((node: GraphNodeProps, nodeIdx: number) => {
            if (node.name === link.source) {
                sources.push(nodeIdx);
            }
        })
        graph.nodes.forEach((node: GraphNodeProps, nodeIdx: number) => {
            if (node.name === link.target) {
                targets.push(nodeIdx);
            }
        })
        return {
            source: sources[0],
            target: targets[0]
        }
    })

    /*
    graph.links = graph.links.map(function(l) {
        var sourceNode = graph.nodes.filter(n => {return n.name === l.source;})[0],
            targetNode = graph.nodes.filter(n => {return n.name === l.target;})[0];
    
        return {
            source: sourceNode,
            target: targetNode
        };
    });
    */
   return graph;
}
