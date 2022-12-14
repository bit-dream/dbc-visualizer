<script type='ts'>
	import Dialog, { Title, Content, Actions } from '@smui/dialog';
    import Button, {Label} from '@smui/button';

    let open: boolean = true;
    let dialogTitle = 'Getting Started';
    function dialogHandler(e: CustomEvent<{ action: string }>) {
        switch (e.detail.action) {
        case 'close':
            open = false
            break;
        }
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
  <Title id="large-scroll-title">{dialogTitle}</Title>
  <Content id="large-scroll-content">
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
  </Content>
  <Actions>
    <Button action="close">
      <Label>Done</Label>
    </Button>
  </Actions>
</Dialog>