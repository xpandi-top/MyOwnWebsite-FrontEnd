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
        "numPlayers": players
    }

    axios.post(
        "http://localhost:8080/api/record",
        newGame
    );

    // axios.delete("http://localhost:8080/api/record/0")
}
// eslint-disable-next-line no-extend-native



function App() {
    Date.prototype.format = function (fmt) {
        const o = {
            "M+": this.getMonth() + 1,                   //月份
            "d+": this.getDate(),                        //日
            "h+": this.getHours(),                       //小时
            "m+": this.getMinutes(),                     //分
            "s+": this.getSeconds(),                     //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds()                  //毫秒
        };

        //  获取年份
        if (/(y+)/i.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }

        for (const k in o) {
            // ②
            if (new RegExp("(" + k + ")", "i").test(fmt)) {
                fmt = fmt.replace(
                    RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    }
    Date.prototype.addHours= function(h){
        this.setHours(this.getHours()+h);
        return this;
    }
    const now = new Date();
    const nowStr = now.format("YYYY-MM-DDThh:mm");
    const [records, setRecords] = useState([]);

    const [gameName, setGameName] = useState("Brass");
    const [describe, setDescribe] = useState("this is brass");
    const [startTime, setStartTime] = useState(nowStr);
    const [endTime, setEndTime] = useState(now.addHours(1).format("YYYY-MM-DDThh:mm"));
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

        console.log(now.toISOString())
    },[])



    return (
        <div className="App">
            <PermanentDrawerLeft recordStates={recordStates} />
        </div>
    );
}

export default App;
