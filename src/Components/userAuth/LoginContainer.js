import {useState} from "react";
import {Button, Stack, TextField, Typography} from "@mui/material";

export default function LoginContainer(props) {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const signOut = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        props.signOut();
    }

    const renderSignedIn = () => (
        <Stack spacing={2}>
            <Typography>Logged in as {props.user}</Typography>
            <Button
                variant="contained"
                onClick={signOut}
            >
                Sign Out
            </Button>
        </Stack>
    );

    // todo: set width for this stack
    const renderNotSignedIn = () => (
        <Stack spacing={2}>
            {props.msg === undefined ? null : <Typography>{props.msg}</Typography>}
            <TextField
                label="username"
                variant="outlined"
                onChange={(e) => {
                    setUsername(e.target.value);
                }}/>
            <TextField
                label="password"
                variant="outlined"
                onChange={(e) => {
                    setPassword(e.target.value);
                }}/>
            <Button
                variant="contained"
                onClick={() => props.callBack({username: username, password: password})}
            >
                Submit
            </Button>
        </Stack>
    )

    return props.user !== undefined ? renderSignedIn() : renderNotSignedIn();
}