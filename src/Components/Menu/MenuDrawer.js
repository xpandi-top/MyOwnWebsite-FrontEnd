import React from 'react';

import RecordFrame from "../Record/RecordFrame";
import RecordList from "../Record/RecordList";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import DvrOutlinedIcon from '@mui/icons-material/DvrOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import {
    AppBar,
    CssBaseline,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemIcon, ListItemText,
    makeStyles,
    Toolbar,
    Typography
} from "@mui/material";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
}));

function PresentContent(props){
    if (props.content==="Records"){
        // return(RecordList(props.content));
        return <div>
            <RecordFrame
                numPlayer={props.numPlayer}
                setNumsPlayer={props.mySetPlayer}
                boardGameName={props.boardGameName}
                startTime={props.startTime}
                endTime = {props.endTime}
                setBoardGameName={props.setBoardGameName}
                setStartTime={props.setStartTime}
                setEndTime={props.setEndTime}
                addToDataBase={props.addToDataBase}
                refreshRecords={props.refreshRecords}
                recordId = {props.recordId}
            />
            <Divider/>
            <RecordList
                content={props.content}
                records={props.records}
                mytestfunction={(a) => {console.log("function is called!!", a)}}
            />;
        </div>
    }
    if (props.content==="Games"){
        return <div>this is Games</div>;
    }
    if (props.content==="Players"){
        return <div>this is player </div>
    }
    if (props.content==="Campaigns"){
        return <div>this is Campaigns </div>
    }
    return <div>this is setting</div>;
}

function PermanentDrawerLeft(props) {
    const records = props.recordStates.records;
    const recordId = records[records.length-1]?records[records.length-1].recordId+1:0;
    const classes = useStyles();
    const [content, setContent] = React.useState("Records");
    const handleClick = (str) => {
        setContent(str);
    };
    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        {content}
                    </Typography>
                </Toolbar>
            </AppBar>

            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <div className={classes.toolbar}/>
                <Divider/>
                <List>
                    <ListItem button onClick={() => handleClick("Records")} key={"Records"}>
                        <ListItemIcon> <DvrOutlinedIcon/> </ListItemIcon>
                        <ListItemText primary={"Records"}/>
                    </ListItem>
                    <ListItem button onClick={() => handleClick("Games")} key={"Games"}>
                        <ListItemIcon> <DashboardOutlinedIcon/> </ListItemIcon>
                        <ListItemText primary={"Games"}/>
                    </ListItem>
                    <ListItem button onClick={() => handleClick("Players")} key={"Players"}>
                        <ListItemIcon> <PeopleAltOutlinedIcon/> </ListItemIcon>
                        <ListItemText primary={"Players"}/>
                    </ListItem>
                    <ListItem button onClick={() => handleClick("Campaigns")} key={"Campaigns"}>
                        <ListItemIcon> <TimelineOutlinedIcon/> </ListItemIcon>
                        <ListItemText primary={"Campaigns"}/>
                    </ListItem>

                </List>
                <Divider/>
                <List>
                    <ListItem button onClick={() => handleClick("Setting")} key={"Setting"}>
                        <ListItemIcon> <SettingsOutlinedIcon/> </ListItemIcon>
                        <ListItemText primary={"Setting"}/>
                    </ListItem>
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar}/>
                {/*{PresentContent(content, records, props.numPlayer)}*/}
                <PresentContent
                    content={content}
                    records={records}
                    numPlayer={props.recordStates.playerScore}
                    mySetPlayer={props.recordStates.mySetPlayer}
                    boardGameName={props.recordStates.gameName}
                    startTime={props.recordStates.startTime}
                    endTime={props.recordStates.endTime}
                    setBoardGameName={props.recordStates.mySetGameName}
                    setStartTime={props.recordStates.mySetStartTime}
                    setEndTime={props.recordStates.mySetEndTime}
                    addToDataBase={props.recordStates.addRecordToDataBase}
                    refreshRecords={props.recordStates.refreshRecords}
                    recordId = {recordId}
                />
            </main>
        </div>
    );
}

export default PermanentDrawerLeft;