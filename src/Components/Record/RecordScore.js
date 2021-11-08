import React from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import {Grid, TextField} from "@mui/material";

function RowRadioButtonsGroup() {
    //https://mui.com/components/radio-buttons/
    return (
        <FormControl component="fieldset">
            <RadioGroup row aria-label="status" name="row-radio-buttons-group">
                <FormControlLabel value="Win" control={<Radio />} label="Win" />
                <FormControlLabel value="Loss" control={<Radio />} label="Loss" />
                <FormControlLabel value="Tie" control={<Radio />} label="Tie" />
            </RadioGroup>
        </FormControl>
    );
}
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
                <RowRadioButtonsGroup/>
            </Grid>
            <Grid item>
                <TextField label={"Player"} value={props.player} onChange={handleChangePlayer}/>
            </Grid>

            <Grid item>
                <TextField type="number" label={"Score"} value={props.score} onChange={handleChangeScore}/>
            </Grid>
            <Grid item>
                <TextField label={"Notes"}
                           multiline={true}
                           rows={4}
                           maxRows={4}
                           value={props.notes}
                           onChange={handleChangeNotes}/>
            </Grid>

        </Grid>
    );
}
export default RecordScore;