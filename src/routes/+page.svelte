<script type="ts">
import { onMount } from 'svelte';
import Simulation from './simulation';
import createGraph from './transforms';
import _ from 'lodash'
import type { DbcData } from 'dbc-can/lib/dbc/types';
import Dialog, { Title, Content, Actions } from '@smui/dialog';
import Button, {Label} from '@smui/button';
import SettingsButton from './SettingsButton.svelte';
 
let isStartup = true;
let open: boolean = true;
let dialogTitle = 'Getting Started';
function dialogHandler(e: CustomEvent<{ action: string }>) {
    switch (e.detail.action) {
      case 'close':
        open = false
        if (isStartup) {
            isStartup = false;
        }
        break;
    }
}

/** @type {import('./$types').PageData} */  export let data: DbcData;
let graph = createGraph(data);
const nodeDoubleClickHandler = (e: any, d: any) => {
    dialogTitle = d.name;
    open = true;
}
const nodeHoverHandler = (e: any, d: any) => {
    console.log(e,d);
}
const sim = new Simulation('#DBC_SIMULATION', graph, nodeDoubleClickHandler, nodeHoverHandler);
onMount(() => {

    sim.setWidth = window.innerWidth;
    sim.setHeight = window.innerHeight;
    sim.init();
    sim.documentResizeHandler(window);
})

</script>

<div id="DBC_SIMULATION" style="height: 100vh; width: 100vw; display: block;"></div>

<Dialog
  bind:open
  scrimClickAction=""
  escapeKeyAction=""
  aria-labelledby="large-scroll-title"
  aria-describedby="large-scroll-content"
  surface$style="width: 850px; max-width: calc(100vw - 32px);"
  on:SMUIDialog:closed={dialogHandler}
>
  <Title id="large-scroll-title">{dialogTitle}</Title>
  <Content id="large-scroll-content">
    {#if isStartup}
    <ul>
        <li>
            The displayed graph can be both panned and zoomed
            <ol>
                <li>
                    To zoom the graph, simply use your mouse's scroll wheel (or the appropriate touch gesture for your device)
                </li>
                <li>
                    To pan the graph, press and hold your mouse button on any area with out a node, and drag in the direction you wish to pan
                </li>
            </ol>
        </li>
        <li>
            Double clicking on any node will bring up a dialog indicating various properties that were pulled in from the DBC file
        </li>
        <li>
            Graph interactivity
            <ol>
                <li>
                    You can drag any node on the graph. On release, the node will stick to the place it was dragged to
                </li>
                <li>
                    You can unstick a dragged node by clicking on the node a single time
                </li>
            </ol>
        </li>
    </ul>
    {/if}
  </Content>
  <Actions>
    <Button action="close">
      <Label>Done</Label>
    </Button>
  </Actions>
</Dialog>

<SettingsButton 
    settings={{
        simulation: sim,
        minZoom: sim.settings.minZoom,
        maxZoom: sim.settings.maxZoom,
        chargeStrength: sim.settings.chargeStrength,
        centeringStrength: sim.settings.centeringStrength,
        linkLength: sim.settings.linkLength
    }}
/>

