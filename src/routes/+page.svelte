<script type="ts">
import { onMount } from 'svelte';
import Simulation from './dbcNodeSim';
import createGraph from './transforms';
import _ from 'lodash'
import type { DbcData } from 'dbc-can/lib/dbc/types';
import Dialog, { Title, Content, Actions } from '@smui/dialog';
import Snackbar from '@smui/snackbar';
import Button, {Label} from '@smui/button';


let open = false;
let dialogTitle = '';
let dialogDescription = '';
const nodeClickHandler = (e: any, d: any) => {
    console.log(e,d)
    dialogTitle = d.name;
    if (d.obj.description) {
        dialogDescription = d.obj.description;
    } else {
        dialogDescription = 'This node does not have a description'
    }
    open = true;
}

let snackbar: Snackbar;

function closeHandler(e: CustomEvent<{ action: string }>) {
    switch (e.detail.action) {
      case 'close':
        open = false
        break;
    }
}

/** @type {import('./$types').PageData} */  export let data: DbcData;
let graph = createGraph(data);
console.log(graph)
const selector = '#test'
const sim = new Simulation(selector, graph, nodeClickHandler);
onMount(() => {

    sim.setWidth = window.innerWidth;
    sim.setHeight = window.innerHeight;
    sim.init();
    sim.documentResizeHandler(window);

    snackbar.open
})


</script>

<div id="test" style="height: 100vh; width: 100vw; display: block;"></div>

<Dialog
  bind:open
  aria-labelledby="large-scroll-title"
  aria-describedby="large-scroll-content"
  surface$style="width: 850px; max-width: calc(100vw - 32px);"
  on:SMUIDialog:closed={closeHandler}
>
  <Title id="large-scroll-title">{dialogTitle}</Title>
  <Content id="large-scroll-content">
    {dialogDescription}
  </Content>
  <Actions>
    <Button action="accept">
      <Label>Done</Label>
    </Button>
  </Actions>
</Dialog>
 
<Snackbar bind:this={snackbar}>
    <Label>
        <h2>Using this simulation</h2>
        <ul>
            <li>You can pan/zoom the graph by clicking and draging in any white space as well as using your scroll wheel to zoom.</li>
            <li>You can drag any nodes on the graph. On release, the node will stick to that spot. To unstick the node, simply give it a single click.</li>
        </ul>
    </Label>
    <Actions>
     
    </Actions>
</Snackbar>
   