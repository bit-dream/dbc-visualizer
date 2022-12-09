<script type="ts">
import { onMount } from 'svelte';
import Simulation from './dbcNodeSim';
import transformDataToGraph from './transforms';
import _ from 'lodash'
import Dialog, { Title, Content, Actions } from '@smui/dialog';
import Button, { Label } from '@smui/button';
import type { DbcData } from 'dbc-can/lib/dbc/types';

let open = false;
let clicked = 'Nothing yet.';
let title = '';
let dialog = '';

const nodeClickHandler = (e: any) => {
    open = true;
    title = e;
    const msg = data.messages.get(title);
    if (msg) {
        dialog = `
            ${msg.name}
            ${msg.description}
            ${msg.signals}
        `
    }
}

/** @type {import('./$types').PageData} */  export let data: DbcData;
let graph = transformDataToGraph(data);
const sim = new Simulation('#test', graph);

onMount(() => {

    sim.setWidth = window.innerWidth;
    sim.setHeight = window.innerHeight;
    sim.init();
})

</script>

<Dialog
  bind:open
  aria-labelledby="simple-title"
  aria-describedby="simple-content"
>
  <!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
  <Title id="simple-title">{title}</Title>
  <Content id="simple-content">{dialog}</Content>
  <Actions>
    <Button on:click={() => (clicked = 'No')}>
      <Label>No</Label>
    </Button>
    <Button on:click={() => (clicked = 'Yes')}>
      <Label>Yes</Label>
    </Button>
  </Actions>
</Dialog>
 
<div id="test" style="height: 100vh; width: 100vw; display: block;"></div>