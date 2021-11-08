import {Input, Modal} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {useState} from "react";

export default function LoginModal(props) {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    return (
        // todo: make the modal look better!
        <Modal
            open={props.open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box>
                <Input label="username" onChange={(e) => {
                    setUsername(e.target.value);
                }}/>
                <Input label="password" onChange={(e) => {
                    setPassword(e.target.value);
                }}/>
                <Button
                    type={"submit"}
                    onClick={() => props.callBack({username: username, password: password})}
                >
                    Submit
                </Button>
            </Box>
        </Modal>
    );
}