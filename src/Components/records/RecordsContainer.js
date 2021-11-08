import {useEffect, useState} from "react";
import {Typography} from "@mui/material";


export default function RecordsContainer(props) {
    const [recordsList, setRecordsList] = useState();

    useEffect(() => {
        // getALLRecords(setRecordsList, console.log);
        console.log("Initializing RecordsContainer", props);
        setRecordsList("settting state");
        // for testing for now, if error log out the error object
    },[]);

    return (
        <div>
            <Typography>
                This is RecordsContainer
            </Typography>
            <Typography>
                {recordsList}
            </Typography>
        </div>
    );
}