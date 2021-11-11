import React from "react";
import RecordScore from "./RecordScore";
import {Button, Grid, TextField} from "@mui/material";
import styled from "@emotion/styled";

// purpose: for create record and save to file
const useStyles = styled((theme) => ({
    root: {
        flexGrow: 1,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

// remember in function parameters, add props
function DateAndTimePickers(props) {
    const classes = useStyles();
    return (<TextField
                    label={props.label ? props.label : "Default"}
                    value={props.value}
                    onChange={props.onChange}
                    type={"datetime-local"}
                    className={classes.textField}
                    fullWidth={true}
                />);
}

function RecordFrame(props) {
    console.log("numsplayer: ", props.numPlayer);
    const numsPlayer = props.numPlayer;
    const setNumsPlayer = props.setNumsPlayer;
    const listItems = numsPlayer.map((playmakers,index) =>
        <Grid item key={index}>
            <RecordScore
                player={playmakers.player}
                score={playmakers.score}
                notes={playmakers.notes}
                numsPlayer={numsPlayer}
                mySetPlayer={setNumsPlayer}
                index={index}
            />
            <Button onClick={()=>deletePlayer(index)}>Delete</Button>
        </Grid>
    );
    function deletePlayer(i) {
        let arr;
        if (i===0){
            arr = numsPlayer.slice(1);
        }else {
            arr = numsPlayer.slice(0, i).concat(numsPlayer.slice(i+1))
        }
        setNumsPlayer(arr);
    }
    function addPlayer(){
        let numP = numsPlayer.map(p => p.player);
        let i = 0;
        while (numP.includes("player".concat(i.toString()))){
            i ++;
        }
        let numsPlayerCopy = numsPlayer.slice();
        numsPlayerCopy.push({
            player: "player".concat(i.toString()),
                score:i,
                notes:"notes".concat(i.toString())
        });
        console.log(numsPlayerCopy);
        setNumsPlayer(numsPlayerCopy);
    }
    const handleChangeBoardGameName = (event) =>{
        let val = event.target.value;
        props.setBoardGameName(val);
    }
    const handleChangeStartTime = (event) =>{
        let val = event.target.value;
        props.setStartTime(val);
    }
    const handleChangeEndTime = (event) =>{
        let val = event.target.value;
        props.setEndTime(val);
    }
    const submit = () => {
      console.log(props.boardGameName);
      console.log(props.startTime);
      console.log(props.endTime);
      let gameName = props.boardGameName;
      let starTime = props.startTime;
      let endTime = props.endTime;
      let recordId = props.recordId;
        props.addToDataBase(recordId,gameName,starTime,endTime,numsPlayer);
      // reload games getAllRecords()
        props.refreshRecords();
        window.alert("submit success!!")
        window.location.reload();
    }
    const redo = () => {
        window.location.reload();
    }
    return (
        <Grid container alignItems={"center"}>
            <Grid container>
                <Grid item >
                    <DateAndTimePickers label="Start Time" value={props.startTime} onChange={handleChangeStartTime}/>
                </Grid>
                <Grid item >
                    <DateAndTimePickers label="End Time" value={props.endTime} onChange={handleChangeEndTime}/>
                </Grid>
                <Grid item >
                    <TextField label={"BoardGame"} value={props.boardGameName} onChange={handleChangeBoardGameName} />
                </Grid>
                <Grid item >
                    <Button onClick={submit}> Submit </Button>
                </Grid>
                <Grid item >
                    <Button onClick={redo}> Redo </Button>
                </Grid>
            </Grid>
            <Grid container direction="row">
                <Grid item>
                    <Button onClick={addPlayer}> Add Player</Button>
                </Grid>
            </Grid>
            <Grid container direction={"row"} spacing={3}>
                {listItems}
            </Grid>
        </Grid>

    );


}

export default RecordFrame;