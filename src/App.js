import './App.css';

import {Grid, List} from "@material-ui/core";
import MenuItem from "./Components/Menu";
import GameSelectorComponent from "./Components/Game/GameSelectorComponent";
import BasicTable from "./Components/Record/RecordScore";
import RecordFrame, {dummy} from "./Components/Record/RecordFrame";
function App() {
    return (
        <div className="App">
            <RecordFrame />
        </div>
    );
}

export default App;
