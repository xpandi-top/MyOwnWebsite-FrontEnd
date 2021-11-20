import {useState} from "react";
import {Button, Stack, TextField, Typography} from "@mui/material";

export default function LoginContainer(props) {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    return (
        // todo: set width for this stack
        <Stack spacing={2}>
            <Typography>{props.msg}</Typography>
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
    );
}