import React from "react";
import {Grid} from "@material-ui/core";
import {TextField} from "@material-ui/core";

function BasicTable() {

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