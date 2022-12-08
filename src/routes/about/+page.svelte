<script type="ts">
	import { onMount } from 'svelte';
    import RunSimulation from '../simulation';
    import transformDataToGraph from '../transforms';

    export let data;

    let newData = transformDataToGraph(data);
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
        RunSimulation(
            newData, 
            (message) => {console.log(message)}, 
            '#test',
            window.innerWidth,
            window.innerHeight);
    })

</script>

<div id="test" style="height: 100vh; width: 100vw; display: block;"></div>