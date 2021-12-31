import React, {useEffect, useState} from "react";
import {Button, Grid, InputLabel, MenuItem, Select, Stack, TextField} from "@mui/material";
import styled from "@emotion/styled";
import {getGame, getGameNames, getPlayers, saveRecord} from "../services";
import FormControl from "@mui/material/FormControl";

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
    const emptyRecord = {};

    const [record, setRecord] = useState(emptyRecord);
    const [players, setPlayers] = useState([]);
    const [gameList, setGameList] = useState({});
    const [playerList, setPlayerList] = useState({});
    const [gameSelected, setGameSelected] = useState();
    const [gameDetail, setGameDetails] = useState({});

    useEffect(() => {
        getGameNames().then(response => {
            setGameList(response.data);
        });
        getPlayers().then(response => {
            setPlayerList(response.data);
        });
    }, []);

    useEffect(() => {
        if (gameSelected){
            getGame(gameSelected).then(response => {
                setGameDetails(response.data);
            }).catch(error => {
                console.log(error);
            })
        }
    }, [gameSelected]);

    const handleSelectGame = (e) => {
        setGameSelected(e.target.value);
    }

    const clear = () => {
        setRecord(emptyRecord);
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
            ...record,
            gameId:gameSelected,
            players: players
        }
        console.log(recordToSave);
        saveRecord(recordToSave).then(() => {
            console.log("saved successfully");
            clear();
        });
    }

    return (
        <Grid container alignItems={"center"}>
            <Grid container>
                <Grid item rowSpacing={3}>
                    <FormControl sx={{m: 1, minWidth: 80, maxWidth: 300}}>
                        <InputLabel id="demo-simple-select-label">Game</InputLabel>
                        <Select autoWidth
                                value={gameSelected || ""}
                                onChange={handleSelectGame}
                        >
                            {Object.keys(gameList).map((g, index) => {
                                return <MenuItem value={gameList[g]} key={index}>{g}</MenuItem>;
                            })}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item rowSpacing={3}>
                    <DateAndTimePickers
                        label="Start Time"
                        value={record.startTime || ""}
                        onChange={(e) => {
                            setRecord({
                                ...record,
                                startTime: e.target.value
                            });
                        }}/>
                </Grid>
                <Grid item rowSpacing={3}>
                    <DateAndTimePickers
                        label="End Time"
                        value={record.endTime || ""}
                        onChange={(e) => {
                            setRecord({
                                ...record,
                                endTime: e.target.value
                            });
                        }}/>
                </Grid>
            </Grid>
            <Grid container>
                {players.map((playerObj, idx) =>
                    <Grid item key={playerObj.key} rowSpacing={2}>
                        <Stack spacing={1}>
                            {/* todo: win/lost radio button*/}
                            <FormControl fullWidth>
                                <InputLabel>Player</InputLabel>
                                <Select autoWidth
                                        value={playerObj.player || ""}
                                        onChange={(e) => {
                                            updatePlayer({
                                                ...playerObj,
                                                player: e.target.value
                                            }, idx)
                                        }}
                                >
                                    {Object.keys(playerList).map((p, index) => {
                                        return <MenuItem value={p} key={index}>{p}</MenuItem>;
                                    })}
                                </Select>
                            </FormControl>
                            {gameDetail.factionDisplayName?(<FormControl fullWidth>
                                <InputLabel>{gameDetail.factionDisplayName}</InputLabel>
                                <Select autoWidth
                                        value={playerObj.faction || ""}
                                        onChange={(e) => {
                                            updatePlayer({
                                                ...playerObj,
                                                faction: e.target.value
                                            }, idx)
                                        }}
                                >
                                    {gameDetail.factions.map((f, index) => {
                                        return <MenuItem value={f} key={index}>{f}</MenuItem>;
                                    })}
                                </Select>
                            </FormControl>): null}
                            <TextField
                                type="number"
                                label="Score"
                                value={playerObj.score}
                                onChange={(e) => {
                                    updatePlayer({
                                        ...playerObj,
                                        score: e.target.value
                                    }, idx)
                                }}/>
                            <TextField
                                label="Notes"
                                multiline={true}
                                rows={4}
                                maxRows={4}
                                value={playerObj.notes}
                                onChange={(e) => {
                                    updatePlayer({
                                        ...playerObj,
                                        notes: e.target.value
                                    }, idx)
                                }}/>
                            <Button onClick={() => removePlayer(playerObj.key)}>Delete</Button>
                        </Stack>
                    </Grid>
                )}
            </Grid>
            <Grid container direction="row">
                <Button onClick={addPlayer}>Add Player</Button>
                <Grid item>
                    <Button onClick={submit}>Submit</Button>
                </Grid>
                <Grid item>
                    <Button onClick={clear}>Clear</Button>
                </Grid>
            </Grid>
        </Grid>
    )
}