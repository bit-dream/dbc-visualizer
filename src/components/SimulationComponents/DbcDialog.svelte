<script type="ts">
    import Dialog from "@smui/dialog";
    import { Title, Content, Actions } from '@smui/dialog';
    import Chip, { Set, LeadingIcon, TrailingIcon, Text } from '@smui/chips';
    import Button, {Label} from '@smui/button';
    import List, { Group, Item, Subheader } from '@smui/list';
    export let open: boolean;
    export let node: any;

    function dialogHandler(e: CustomEvent<{ action: string }>) {
        switch (e.detail.action) {
        case 'close':
            open = false;
            break;
        }
    }

    let type: string | null = null;
    if (node.type) {
        type = node.type;
    }

</script>


<Dialog
  bind:open
  scrimClickAction=""
  escapeKeyAction=""
  aria-labelledby="large-scroll-title"
  aria-describedby="large-scroll-content"
  surface$style="width: 850px; max-width: calc(100vw - 32px);"
  on:SMUIDialog:closed={dialogHandler}
>
  <Title id="large-scroll-title">{node.name ? node.name : 'Unknown'}</Title>
  <Content id="large-scroll-content">
    {#if node.type === 'message'}
        <Set chips={[`ID: ${node.obj.id}`, `DLC: ${node.obj.dlc}`, `Signals: ${node.obj.signals.size}`]} let:chip nonInteractive>
            <Chip {chip}>
                {#if chip.startsWith('ID')}
                    <LeadingIcon class="material-icons">lan</LeadingIcon>{chip}
                {/if} 
                
                {#if chip.startsWith('DLC')}
                    <LeadingIcon class="material-icons">straighten</LeadingIcon>{chip}
                {/if}
                <Text></Text> 
                {#if chip.startsWith('Signals')}
                    <LeadingIcon class="material-icons">numbers</LeadingIcon>{chip}
                {/if}
            </Chip>
        </Set>
        <div>
            <Group>
              <Subheader><b>Signals</b></Subheader>
              <List class="demo-list">
                {#each Array.from(node.obj.signals.keys()) as signal}
                    <Item on:SMUI:action={() => {}}>
                        <Text>{signal}</Text>
                    </Item>
                {/each}
              </List>
            </Group>
        </div>
    {:else if node.type === 'signal'}
        <p>Signal</p>
    {:else}
        <p>Something Else</p>
    {/if}
  </Content>
  <Actions>
    <Button action="close">
      <Label>Done</Label>
    </Button>
  </Actions>
</Dialog>