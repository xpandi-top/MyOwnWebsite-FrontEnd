import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import {Grid} from "@material-ui/core";
import {TextField} from "@material-ui/core";

const useStyles = makeStyles({
    table: {
        minWidth: 150,
        maxWidth:200,
    },
});

function createData(player, score) {
    return { player,score };
}
function BasicTable() {
    const rows = [
        createData('player1',100),
        createData('player2',200),
    ];

    const classes = useStyles();

    return (
        <Grid container direction={"column"}>
            <Grid item>
                <TextField label={"Player Name"}></TextField>
            </Grid>
            <Grid item>
                <TextField label={"Score"}></TextField>
            </Grid>
            <Grid item>
                <TextField label={"Notes"}></TextField>
            </Grid>
        </Grid>
    );
}
export default BasicTable;