import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import RecordFrame from "../Record/RecordFrame";
import DvrOutlinedIcon from "@material-ui/icons/DvrOutlined";
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';

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

function PermanentDrawerLeft() {
    const classes = useStyles();
    const [content, setContent] = React.useState("Records");
    const handleClick = (props) => {
        setContent(props? props: "set");
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
                        <ListItemIcon> <DashboardRoundedIcon/> </ListItemIcon>
                        <ListItemText primary={"Games"}/>
                    </ListItem>
                    <ListItem button onClick={() => handleClick("Players")} key={"Players"}>
                        <ListItemIcon> <PeopleAltOutlinedIcon/> </ListItemIcon>
                        <ListItemText primary={"Players"}/>
                    </ListItem>

                </List>
                <Divider/>
                <List>
                    <ListItem button key={"Setting"}>
                        <ListItemIcon> <SettingsOutlinedIcon/> </ListItemIcon>
                        <ListItemText primary={"Setting"}/>
                    </ListItem>
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar}/>
                <RecordFrame/>
            </main>
        </div>
    );
}

export default PermanentDrawerLeft;