<script type="ts">
    import { onMount } from 'svelte';
    import Simulation from './simulation';
    import createGraph from './transforms';
    import _ from 'lodash'
    import type { DbcData } from 'dbc-can/lib/dbc/types';
    import Dialog, { Title, Content, Actions } from '@smui/dialog';
    import Button, {Label} from '@smui/button';
    import SettingsButton from './SettingsButton.svelte';
    import DbcSimulation from './DbcSimulation.svelte';
	import GettingStarted from './GettingStarted.svelte';
    
    /** @type {import('./$types').PageData} */  export let data: DbcData;

</script>

<DbcSimulation 
    selector={'DBC_SIMULATION'}
    data={data}
/>
<GettingStarted/>
