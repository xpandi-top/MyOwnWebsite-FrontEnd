import './App.css';

import {Grid, List} from "@material-ui/core";
import MenuItem from "./Components/Menu";
import GameSelectorComponent from "./Components/Game/GameSelectorComponent";

function App() {
    return (
        <div className="App">
            <Grid container spacing={3}>
                <Grid item>
                    <List>
                        <MenuItem category="GameShelf"/>
                        <MenuItem category="Records"/>
                    </List>
                </Grid>
                <Grid item>
                    <GameSelectorComponent />
                </Grid>
            </Grid>
        </div>
    );
}

export default App;
