import {useEffect, useState} from "react";
import RecordsList from "./RecordsList";
import {getALLRecords} from "../services";


export default function RecordsContainer() {
    const [recordsList, setRecordsList] = useState([]);

    useEffect(() => {
        getALLRecords()
            .then((response) => setRecordsList(response.data))
            .catch((error) => console.log(error));
    },[]);

    return (
        <div>
            <RecordsList records={recordsList} />
        </div>
    );
}