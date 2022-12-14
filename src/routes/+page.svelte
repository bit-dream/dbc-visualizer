<script type="ts">
    import Card from '@smui/card';
    import Paper, { Title, Subtitle, Content } from '@smui/paper';
    import Button, { Label, Icon } from '@smui/button';
</script>

<style>
    .flex-container {
        height: 100%;
        padding: 0;
        margin: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .row {
        width: auto;
    }
    .flex-item {
        padding: 5px;
        width: 20px;
        height: 20px;
        margin: 10px;
        line-height: 20px;
        font-weight: bold;
        font-size: 2em;
        text-align: center;
    }

    .flex-btn-container {
        display: flex;
        justify-content: space-between;
    }

</style>

<div class="flex-container">
    <div class="paper-container">
        <Paper elevation={10}>
            <div style="text-align: center;"><h1>CANDIED</h1></div>
            <div style="text-align: center;">
                <Subtitle>
                    A tool to help visualize CAN (Controller-Area-Network) 
                    networks with the 
                    help of a database file (.dbc).
                </Subtitle>
            </div>
            <Content>Get started by loading your own database file (.dbc) or by 
                taking a quick tour by clicking the demo button.
            </Content>
            <br/>
            <br/>
            <div class=flex-btn-container>
                <Button
                    href='/demo'
                    variant="outlined"
                    class="button-shaped-round"
                    >
                    <Icon class="material-icons">preview</Icon>
                    <Label>DEMO</Label>
                </Button>
                <div class="button-shaped-round mdc-button mdc-button--outlined mdc-ripple-upgraded">
                    <label style="cursor:pointer" for="file_input">Upload Database File</label>
                    <input type="file" id="file_input" accept=".dbc" style="opacity: 0; display: none;" multiple/>
                </div>
            </div>
        </Paper>
    </div>
</div>
<!---
<div class="flex-container">
    <div class="row"> 
        <div class="flex-item">1</div>
        <div class="flex-item">2</div>
        <div class="flex-item">3</div>
        <div class="flex-item">4</div>
        <div class="card-display">
            <div class="card-container">
              <Card padded>A simple padded card.</Card>
            </div>
           
            <div class="card-container">
              <Card>
                <Content>You can also use <code>Content</code>.</Content>
              </Card>
            </div>
           
            <div class="card-container">
              <Card variant="outlined" padded>An outlined, padded card.</Card>
            </div>
          </div>
    </div>
</div>
-->