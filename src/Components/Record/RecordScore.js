import React from "react";
import {Grid} from "@material-ui/core";
import {TextField} from "@material-ui/core";

function RecordScore(props) {
    const playerScoreLists = props.numsPlayer;
    const currIndex = props.index;
    const handleChangePlayer = (event) => {
      let val = event.target.value;
      let playerScoreListsCopy = [...playerScoreLists];
      playerScoreListsCopy[currIndex].player = val;
      props.mySetPlayer(playerScoreListsCopy);
    }
    const handleChangeScore = (event) => {
        let val = event.target.value;
        let playerScoreListsCopy = [...playerScoreLists];
        playerScoreListsCopy[currIndex].score = val;
        props.mySetPlayer(playerScoreListsCopy);
    }
    const handleChangeNotes = (event) => {
        let val = event.target.value;
        let playerScoreListsCopy = [...playerScoreLists];
        playerScoreListsCopy[currIndex].notes = val;
        props.mySetPlayer(playerScoreListsCopy);
    }
    return (
        <Grid container direction={"column"}>
            <Grid item>
                <TextField label={"Player"} value={props.player} onChange={handleChangePlayer}/>
            </Grid>
            <Grid item>
                <TextField type="number" label={"Score"} value={props.score} onChange={handleChangeScore}/>
            </Grid>
            <Grid item>
                <TextField label={"Notes"}
                           rows={3}
                           value={props.notes}
                           onChange={handleChangeNotes}/>
            </Grid>
        </Grid>
    );
}
export default RecordScore;