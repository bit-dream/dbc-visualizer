<script type='ts'>
    import Fab, { Icon } from '@smui/fab';
    import Dialog, { Title, Content, Actions } from '@smui/dialog';
    import Button, {Label} from '@smui/button';
    import Slider from '@smui/slider';
    import Switch from '@smui/switch';
    import FormField from '@smui/form-field';
    import type Simulation from './simulation';
	  import type { GraphLinkProps, GraphNodeProps } from '../../routes/types';
	  import { onMount } from 'svelte';
    type Settings = {
      simulation: Simulation;
      minZoom: number;
      maxZoom: number;
      chargeStrength: number;
      centeringStrength: number;
      linkLength: number;
    }
    export let settings: Settings;

    let memGraph = settings.simulation.graph;
    onMount(() => {memGraph = settings.simulation.graph;})
    
    let open = false; let checked = true;
    function dialogHandler(e: CustomEvent<{ action: string }>) {
      switch (e.detail.action) {
        case 'close':
          open = false;
          if (!checked) {
            let graph = settings.simulation.graph;
            let newNodes = graph.nodes.filter((node: GraphNodeProps)=>{
              return node.type !== 'signal';
            });
            graph.nodes = newNodes;
            settings.simulation.graph = graph;
          } else {
            settings.simulation.graph = memGraph;
          }
          settings.simulation.settings.chargeStrength = settings.chargeStrength;
          settings.simulation.settings.linkLength = settings.linkLength;
          settings.simulation.simulationRestart();
          break;
    }}

    let value = settings.chargeStrength;
</script>
  
<div class="flexy" style="position: absolute; bottom: 10px; right: 10px;">
    <div class="margins">
      <Fab color="primary" on:click={() => {open = true}}>
        <Icon class="material-icons">settings</Icon>
      </Fab>
    </div>
</div>

<Dialog
  bind:open
  scrimClickAction=""
  escapeKeyAction=""
  aria-labelledby="large-scroll-title"
  aria-describedby="large-scroll-content"
  surface$style="width: 850px; max-width: calc(100vw - 32px);"
  on:SMUIDialog:closed={dialogHandler}
>
  <Title id="large-scroll-title">Settings</Title>
  <Content id="large-scroll-content">
    <h3>Zoom</h3>
    <Slider
      range
      bind:start={settings.minZoom}
      bind:end={settings.maxZoom}
      min={0}
      max={100}
      step={0.1}
      minRange={0.1}
      input$aria-label="Min range slider"
    />
    <pre class="status">Min: {settings.minZoom} Max: {settings.maxZoom}</pre>
    <h3>Charge Strength</h3>
    <Slider
      bind:value = {settings.chargeStrength}
      min={-5000}
      max={5000}
      step={1}
      input$aria-label="Discrete slider"
    />
    <pre class="status">Value: {settings.chargeStrength}</pre>
    <h3>Centering Strength</h3>
    <Slider
      bind:value = {settings.centeringStrength}
      min={-10}
      max={10}
      step={0.01}
      input$aria-label="Discrete slider"
    />
    <pre class="status">Value: {settings.centeringStrength}</pre>
    <h3>Link Length</h3>
    <Slider
      bind:value = {settings.linkLength}
      min={2}
      max={1000}
      step={1}
      input$aria-label="Discrete slider"
    />
    <pre class="status">Value: {settings.linkLength}</pre>
    <div>
      <FormField>
        <Switch bind:checked />
        <span slot="label">Display Signals</span>
      </FormField>
    </div>
    <pre class="status">Having this not selected can significantly increase performance for larger files</pre>
  </Content>
  <Actions>
    <Button action="close">
      <Label>Done</Label>
    </Button>
  </Actions>
</Dialog>