<script>
	import { onMount } from 'svelte';
    import RunSimulation from './simulation';
    let width = '100%', height = '100%'
    onMount(() => {
        const graph = {
            nodes: [
                {
                    id: 1,
                    name: 'name1',
                    radius: 8
                }, 
                {
                    id: 2,
                    name: 'name2',
                    radius: 4
                }, 
                {
                    id: 3,
                    name: 'name3',
                    radius: 10
                }, 
                {
                    id: 4,
                    name: 'name4',
                    radius: 15
                }, 
                {
                    id: 5,
                    name: 'name5',
                    radius: 4
                },
                {
                    id: 5,
                    name: 'name5',
                    radius: 4
                },
                {
                    id: 5,
                    name: 'name5',
                    radius: 4
                },
                {
                    id: 5,
                    name: 'name5',
                    radius: 4
                },
                {
                    id: 5,
                    name: 'name5',
                    radius: 4
                }
            ],
            links: [
                {source: 0, target: 1},
                {source: 0, target: 2},
                {source: 0, target: 2},
            ]
        };
        RunSimulation(graph, (message) => {alert(message)});
    })

</script>

<div style="width: 100vw; height:100vh;">
    <svg width=1000 height=500></svg>
</div>