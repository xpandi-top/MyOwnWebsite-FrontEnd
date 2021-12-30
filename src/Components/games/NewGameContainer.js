import React, {useState} from "react";
import {Button, Checkbox, FormControlLabel, Grid, TextField, Typography} from "@mui/material";

export default function NewGameContainer() {
    const emptyGame = {
        ratings: {},
        relatedLinks: {},
        images: {},
        gameProperties: {}
    }
    const [newGame, setNewGame] = useState(emptyGame);
    const [supportPlayersList, setSupportPlayersList] = useState(Array(10).fill(false));
    // const [property, setProperty] = useState({})

    const onClear = () => {
        setNewGame(emptyGame);
        setSupportPlayersList(Array(10).fill(false));
    }

    const onSubmit = () => {

        let gameToSave = {
            ...newGame,
            supportedPlayers: []
        }
        supportPlayersList.forEach((n, idx) => {
            if (n) {
                gameToSave.supportedPlayers.push(idx+1);
            }
        })
        if (gameToSave.supportedPlayers.length === 0){
            delete gameToSave.supportedPlayers;
        }
        console.log(gameToSave);
    }


    return (
            <Grid container alignItems={"center"}>
                <Grid container rowSpacing={2}>
                    <Grid item>
                        <TextField
                            label="Game Name"
                            value={newGame.displayName || ""}
                            onChange={(e) => {
                                setNewGame({
                                    ...newGame,
                                    displayName:e.target.value
                                })
                            }}/>
                    </Grid>
                    <Grid item>
                        <TextField
                            label="Short Description"
                            value={newGame.desc || ""}
                            onChange={(e) => {
                                setNewGame({
                                    ...newGame,
                                    desc:e.target.value
                                })
                            }}/>
                    </Grid>
                    <Grid item>
                        <TextField
                            label="Weight"
                            value={newGame.weight || ""}
                            onChange={(e) => {
                                setNewGame({
                                    ...newGame,
                                    weight:e.target.value
                                })
                            }}/>
                    </Grid>
                </Grid>
                <Grid container alignItems={"center"}>
                    <Grid item>
                        <Typography>Support Players:&nbsp;</Typography>
                    </Grid>
                    {supportPlayersList.map((supported, n) => (
                        <Grid item key={n}>
                            <FormControlLabel
                                label={(n+1).toString()}
                                control={
                                    <Checkbox
                                        checked={supported}
                                        onChange={(e) => {
                                            let supportPlayersListCopy = [...supportPlayersList];
                                            supportPlayersListCopy[n] = e.target.checked;
                                            setSupportPlayersList(supportPlayersListCopy);
                                        }}
                                    />}
                            />
                        </Grid>
                    ))}
                </Grid>
                <Grid container alignItems={"center"}>

                    <Grid item>
                        <Button disabled={false} onClick={onSubmit}>Add New</Button>
                    </Grid>
                    <Grid item>
                        <Button disabled={false} onClick={onClear}>Save</Button>
                    </Grid>
                    <Grid item>
                        <Button disabled={false} onClick={onClear}>Cancel</Button>
                    </Grid>
                </Grid>

                <Grid container direction="row">
                    <Grid item>
                        <Button disabled={false} onClick={onSubmit}>Submit</Button>
                    </Grid>
                    <Grid item>
                        <Button disabled={false} onClick={onClear}>Clear</Button>
                    </Grid>
                </Grid>
            </Grid>
    )
}