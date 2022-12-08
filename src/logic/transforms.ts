import type { DbcData } from "dbc-can/lib/dbc/types";
import type { Graph } from './types'

const transformDataToGraph = (data: DbcData) => {

    let graph: Graph = {
        nodes: new Array(), 
        links: new Array()
    };
    let globalIdx = -1;
    data.messages.forEach((message,messageName)=>{
        globalIdx++;
        // Add message to nodes
        graph.nodes.push({
            id: globalIdx,
            name: messageName,
            type: 'message',
            radius: 10});
        let messageLink = globalIdx;
        message.signals.forEach((signal,signalName)=>{
            globalIdx++;
            graph.nodes.push({
                id: globalIdx,
                message: messageLink,
                name: signalName,
                type: 'signal',
                radius: 5});
            graph.links.push({source: messageLink, target:globalIdx})
        })
    });

    return graph;
}

export default transformDataToGraph