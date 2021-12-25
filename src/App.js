import './App.css';
import {useEffect, useState} from "react";
import PermanentDrawerLeft from "./Components/Menu/MenuDrawer";
import React from "react";
import {getRecords} from "./Components/AllGetsSets/GetRecords";
import axios from "axios";




const addRecordToDataBase = function (recordId,boardGame, startTime, endTime, players) {
    let description = "";
    for (let i =0; i<players.length;i++){
        description=description+" "+players[i].player+":"+players[i].score
    }
    let newGame = {
        "recordId": recordId,
        "gameName": boardGame,
        "description": description,
        "startTime": startTime,
        "endTime": endTime,
        "players": players
    }

    axios.post(
        "http://localhost:8080/api/record",
        newGame
    );

    // axios.delete("http://localhost:8080/api/record/0")
}
// eslint-disable-next-line no-extend-native



function App() {
    const currString = (fmt,date) => {
        const o = {
            "M+": date.getMonth() + 1,                   //月份
            "d+": date.getDate(),                        //日
            "h+": date.getHours(),                       //小时
            "m+": date.getMinutes(),                     //分
            "s+": date.getSeconds(),                     //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds()                  //毫秒
        };

        if (/(y+)/i.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }

        for (const k in o) {
            if (new RegExp("(" + k + ")", "i").test(fmt)) {
                fmt = fmt.replace(
                    RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
      return fmt;
    }
    const laterString = (fmt,date) => {
      date.setHours(date.getHours()+1);
      return currString(fmt,date);
    }
    const now = new Date();
    const nowStr = currString("YYYY-MM-DDThh:mm",now);
    const [records, setRecords] = useState([]);
    const [gameName, setGameName] = useState("Brass");
    const [describe, setDescribe] = useState("this is brass");
    const [startTime, setStartTime] = useState(nowStr);
    const [endTime, setEndTime] = useState(laterString("YYYY-MM-DDThh:mm",now));
    const [numsPlayer, setNumsPlayer] = useState([]);

    const mySetGameName = (_gameName) => {
      setGameName(_gameName)
    }
    const mySetDescribe = (_describe) =>{
        setDescribe(_describe);
    }
    const mySetStartTime = (_startTime) => {
      setStartTime(_startTime)
    }
    const mySetEndTime = (_endTime) => {
      setEndTime(_endTime)
    }
    const mySetPlayer = (n) => {
        setNumsPlayer(n);
    }
    const getAllRecords = function () {
        getRecords
            .then(res => {
                console.log(res.data)
                setRecords(res.data)
            })
            .catch(err => {
                console.log("==err==")
            });
    }

    const recordStates = {
        records:records,
        gameName:gameName,
        describe:describe,
        startTime:startTime,
        endTime:endTime,
        playerScore:numsPlayer,
        mySetGameName:mySetGameName,
        mySetDescribe:mySetDescribe,
        mySetStartTime:mySetStartTime,
        mySetEndTime:mySetEndTime,
        mySetPlayer:mySetPlayer,
        addRecordToDataBase:addRecordToDataBase,
        refreshRecords:getAllRecords,

    }
    // get all records
    useEffect(() => {
        getAllRecords();
    },[])



    return (
        <div className="App">
            <PermanentDrawerLeft recordStates={recordStates} />
        </div>
    );
}

export default App;
