<script type="ts">
	import Dialog from "@smui/dialog";
	import type { DbcData } from "dbc-can/lib/dbc/types";
	import { onMount } from "svelte";
	import SettingsButton from "./SettingsButton.svelte";
	import Simulation from "./simulation";
	import createGraph from "./transforms";
  import { Title, Content, Actions } from '@smui/dialog';
  import Button, {Label} from '@smui/button';

  function dialogHandler(e: CustomEvent<{ action: string }>) {
    switch (e.detail.action) {
      case 'close':
        open = false;
        break;
    }
  }

  export let selector: string;
  export let data: DbcData;

  let open = false; let dialogTitle = '';
  const nodeDoubleClickHandler = (e: any, d: any) => {
      dialogTitle = d.name;
      open = true;
  }
  const nodeHoverHandler = (e: any, d: any) => {
      console.log(e,d);
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
  </Content>
  <Actions>
    <Button action="close">
      <Label>Done</Label>
    </Button>
  </Actions>
</Dialog>
