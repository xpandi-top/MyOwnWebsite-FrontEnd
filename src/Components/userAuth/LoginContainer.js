import {useState} from "react";
import {Button, Stack, TextField, Typography} from "@mui/material";
import {login} from "../services";

export default function LoginContainer(props) {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const signIn = () => {
        login({username: username, password: password}).then(response => {
            // todo: redirect after login successful
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", response.data.username);
            props.signIn(response.data.username);
        }).catch(error => {
            // https://axios-http.com/docs/handling_errors
            if (error.response) {
                if (error.response.status === 401) {
                    // use alert or toast
                    console.log("Invalid Credentials");
                } else {
                    console.log("Something wrong at backend");
                }
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
        })
    }

    const signOut = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        props.signOut();
    }

    const renderSignedIn = () => (
        <Stack spacing={2}>
            <Typography>Logged in as {props.user}</Typography>
            <Button variant="contained" onClick={signOut}>
                Sign Out
            </Button>
        </Stack>
    );

    // todo: set width for this stack
    const renderNotSignedIn = () => (
        <Stack spacing={2}>
            <TextField label="username" variant="outlined"
                onChange={(e) => {
                    setUsername(e.target.value);
                }}/>
            <TextField label="password" variant="outlined"
                onChange={(e) => {
                    setPassword(e.target.value);
                }}/>
            <Button variant="contained" onClick={signIn}>
                Submit
            </Button>
        </Stack>
    )

    return props.user !== undefined ? renderSignedIn() : renderNotSignedIn();
}