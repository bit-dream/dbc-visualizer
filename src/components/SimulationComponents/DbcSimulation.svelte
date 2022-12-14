<script type="ts">
	import type { DbcData } from "dbc-can/lib/dbc/types";
	import { onMount } from "svelte";
	import SettingsButton from "./SettingsButton.svelte";
	import Simulation from "./simulation";
	import createGraph from "./transforms";
	import DbcDialog from "./DbcDialog.svelte";

  /* Component props */
  export let data: DbcData;

  const selector = 'DBC_SIMULATION';
  let openDialogBox = false; let node: any = {type: null};
  const nodeDoubleClickHandler = (e: any, d: any) => {
      openDialogBox = true;
      if (d) {
        node = d;
      }
  }
  const nodeHoverHandler = (e: any, d: any) => {
      
  }

  let graph = createGraph(data);
  const simulation = new Simulation(selector, graph);
  onMount(() => {

      simulation.setWidth = window.innerWidth;
      simulation.setHeight = window.innerHeight;
      simulation.onClickCallback = nodeDoubleClickHandler;
      simulation.onHoverCallback = nodeHoverHandler;
      simulation.init();
      simulation.documentResizeHandler(window);
  })


</script>

<div id={selector} style="height: 100vh; width: 100vw; display: block;"></div>

<SettingsButton 
    settings={{
        simulation: simulation,
        minZoom: simulation.settings.minZoom,
        maxZoom: simulation.settings.maxZoom,
        chargeStrength: simulation.settings.chargeStrength,
        centeringStrength: simulation.settings.centeringStrength,
        linkLength: simulation.settings.linkLength
    }}
/>

<DbcDialog 
    bind:open={openDialogBox}
    node={node}
/>
