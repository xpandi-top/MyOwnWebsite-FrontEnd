import React from "react";
import {Button, Grid, makeStyles} from "@material-ui/core";
import {TextField} from "@material-ui/core";
import RecordScore from "./RecordScore";
const useStyles = makeStyles((theme) => ({
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

export const dummy = function () {
    console.log("clicked!");
}

// remember in function parameters, add props
function DateAndTimePickers(props) {
    const classes = useStyles();
    return (
        <>
            <form className={classes.container} noValidate>
                <TextField
                    id="datetime-local"
                    // here simply use props.whatever
                    label={props.label ? props.label: "Default"}
                    type={"datetime-local"}
                    defaultValue={"2020-08-10T12:00"}
                    className={classes.textField}
                    inputProps={{shrink: "true"}}
                />
            </form>
        </>
    );
}

function RecordFrame() {
    const classes = useStyles();
        return (
            <Grid container alignItems={"center"}>
                <Grid container>
                    <Grid item>
                        <DateAndTimePickers label="Start Time"/>
                    </Grid>
                    <Grid item>
                        <DateAndTimePickers label="End Time" />
                    </Grid>
                    <Grid item>
                        <TextField label={"BoardGame"}></TextField>
                    </Grid>
                    <Grid item>
                        <Button> Save </Button>
                    </Grid>
                    <Grid item>
                        <Button> Redo </Button>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid>
                        <Grid item direction={"column"}>
                            <Button> Add Player</Button>
                        </Grid>
                        <Grid item>
                            <Button> Delete Player</Button>
                        </Grid>

                    </Grid>
                    <Grid item>
                        <RecordScore />
                    </Grid>
                </Grid>
            </Grid>

        );


}

export default RecordFrame;