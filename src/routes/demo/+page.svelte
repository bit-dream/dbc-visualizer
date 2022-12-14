<script type="ts">
    import _ from 'lodash'
    import type { DbcData } from 'dbc-can/lib/dbc/types';
    import DbcSimulation from '../../components/SimulationComponents/DbcSimulation.svelte';
	import GettingStarted from '../../components/SimulationComponents/GettingStarted.svelte';
    
    /** @type {import('./$types').PageData} */  export let data: DbcData;

</script>

<DbcSimulation data={data}/>
<GettingStarted/>
