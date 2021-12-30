import React, {useState} from "react";
import {Button, Grid, TextField} from "@mui/material";
import styled from "@emotion/styled";
import {saveRecord} from "../services";

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

function DateAndTimePickers(props) {
    const classes = useStyles();
    return (<TextField
        label={props.label ? props.label : "Default"}
        value={props.value}
        onChange={props.onChange}
        type={"datetime-local"}
        className={classes.textField}
        fullWidth={true}
        InputLabelProps={{shrink: true}}
    />);
}

export default function NewRecordContainer() {
    const [startTime, setStartTime] = useState(""); // todo: default to what
    const [endTime, setEndTime] = useState("");
    const [gameId, setGameId] = useState("");
    const [players, setPlayers] = useState([]);

    const clear = () => {
        setStartTime("");
        setEndTime("");
        setGameId("");
        setPlayers([]);
    }

    const removePlayer = (key) => {
        let playersCopy = [...players];
        let index = 0;
        for (let p of playersCopy) {
            if (p.key === key) {
                break;
            }
            index++;
        }
        playersCopy.splice(index, 1);
        setPlayers(playersCopy);
    }

    const addPlayer = () => {
        let playersCopy = [...players];
        let candidates = new Set(Array(playersCopy.length + 1).keys());
        for (let p of playersCopy) {
            candidates.delete(parseInt(p.key));
        }
        const k = candidates.values().next().value;
        playersCopy.push({
            key: k.toString(),
            player: `player${k}`,
            username: "",
            score: k * k,
            notes: "",
            win: false
        })
        setPlayers(playersCopy);
    }

    const updatePlayer = (newPlayer, idx) => {
        let playersCopy = [...players];
        playersCopy[idx] = newPlayer;
        setPlayers(playersCopy);
    }

    const submit = () => {
        let recordToSave = {
            "gameId": gameId,
            "description": `Description for ${gameId}`,
            "startTime": startTime,
            "endTime": endTime,
            "players": players
        }
        saveRecord(recordToSave).then(() => {
            console.log("saved successfully");
            clear();
        });
    }

    return (
        <Grid container alignItems={"center"}>
            <Grid container>
                <Grid item>
                    <DateAndTimePickers
                        label="Start Time"
                        value={startTime}
                        onChange={(e) => {
                            setStartTime(e.target.value);
                            console.log(startTime)
                        }}/>
                </Grid>
                <Grid item>
                    <DateAndTimePickers
                        label="End Time"
                        value={endTime}
                        onChange={(e) => {
                            setEndTime(e.target.value)
                        }}/>
                </Grid>
                <Grid item>
                    <TextField
                        label="BoardGame"
                        value={gameId}
                        onChange={(e) => {
                            setGameId(e.target.value)
                        }}/>
                </Grid>
                <Grid item>
                    <Button onClick={addPlayer}>Add Player</Button>
                </Grid>
            </Grid>
            <Grid container direction={"row"} spacing={3}>
                {/*todo: need better naming here*/}
                {players.map((play_er, idx) =>
                    <Grid item key={play_er.key}>
                        <Grid container direction={"column"}>
                            {/* todo: win/lost radio button*/}
                            <Grid item>
                                <TextField
                                    label="Player"
                                    value={play_er.player}
                                    onChange={(e) => {
                                        updatePlayer({
                                            ...play_er,
                                            player: e.target.value
                                        }, idx)
                                    }}/>
                            </Grid>
                            <Grid item>
                                <TextField
                                    type="number"
                                    label="Score"
                                    value={play_er.score}
                                    onChange={(e) => {
                                        updatePlayer({
                                            ...play_er,
                                            score: e.target.value
                                        }, idx)
                                    }}/>
                            </Grid>
                            <Grid item>
                                <TextField
                                    label="Notes"
                                    multiline={true}
                                    rows={4}
                                    maxRows={4}
                                    value={play_er.notes}
                                    onChange={(e) => {
                                        updatePlayer({
                                            ...play_er,
                                            notes: e.target.value
                                        }, idx)
                                    }}/>
                            </Grid>

                        </Grid>
                        <Button onClick={() => removePlayer(play_er.key)}>Delete</Button>
                    </Grid>
                )}
            </Grid>
            <Grid container direction="row">
                <Grid item>
                    <Button onClick={submit} disabled={false}>Submit</Button>
                </Grid>
                <Grid item>
                    <Button onClick={clear}>Clear</Button>
                </Grid>
            </Grid>
        </Grid>
    )
}