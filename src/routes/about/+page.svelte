<script>
	import Dbc from 'dbc-can';
	import { onMount } from 'svelte';
    import RunSimulation from './simulation';
    /** @type {import('./$types').PageData} */  
    export let data;

    const transformDbcData = (data) => {

        let graph = {nodes: new Array(),links: new Array()};
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
                graph.links.push({source:messageLink, target:globalIdx})
            })
        });

        return graph;
    }

    let newData = transformDbcData(data);
    console.log(newData);
    let width = '100%', height = '100%'
    onMount(() => {
        const graph = {
            nodes: [
                {
                    id: 1,
                    name: 'name1',
                    radius: 2
                }, 
                {
                    id: 2,
                    name: 'name2',
                    radius: 4
                }, 
                {
                    id: 3,
                    name: 'name3',
                    radius: 6
                }, 
                {
                    id: 4,
                    name: 'name4',
                    radius: 8
                }, 
                {
                    id: 5,
                    name: 'name5',
                    radius: 10
                },
                {
                    id: 6,
                    name: 'name6',
                    radius: 12
                },
                {
                    id: 7,
                    name: 'name7',
                    radius: 14
                },
                {
                    id: 8,
                    name: 'name8',
                    radius: 15
                },
                {
                    id: 9,
                    name: 'name9',
                    radius: 16
                }
            ],
            links: [
                {source: 1, target: 6},
            ]
        };
        RunSimulation(newData, (message) => {message.preventDefault(); console.log('hello')}, '#test');
    })

</script>

<div id="test" style="width: 100vw; height:100vh;">
</div>