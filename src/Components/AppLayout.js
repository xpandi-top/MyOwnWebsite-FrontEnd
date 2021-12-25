import * as React from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import {useEffect, useState} from "react";
import RecordsContainer from "./records/RecordsContainer";
import LoginContainer from "./userAuth/LoginContainer";
import {BrowserRouter, Routes, Route, Link, Navigate} from "react-router-dom";
import RecordFrame from "./Record/RecordFrame";
import NewRecordContainer from "./records/NewRecordContainer";

const drawerWidth = 240;

// styled usage: https://mui.com/system/styled/#main-content
// styled(Component, [options])(styles) => Component

const Main = styled('main', {
    shouldForwardProp: (prop) => prop !== 'open'
})(
    ({theme, open}) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function AppLayout() {
    const pages = [
        {name:'Records', url:"records"},
        {name:'New Record', url:"newrecord"},
        {name:'Games', url:"games"},
        {name:'Campaigns', url:"Campaigns"},
        {name:'Users', url:"users"}
    ];
    // const theme = useTheme(); todo: what is this?
    const [user, setUser] = useState();
    const [drawerOpen, setDrawerOpen] = useState(true);

    const renderMainRouter = function () {
        return (
            <Routes>
                <Route path="/home" element={<Typography>Welcome to Boardgame DB</Typography>}/>
                <Route path="/games" element={<Typography>Games</Typography>}/>
                <Route path="/records" element={<RecordsContainer/>}/>
                <Route path="/newrecord" element={<NewRecordContainer/>}/>
                <Route path="/campaigns" element={<Typography>Campaigns</Typography>}/>
                <Route path="/users" element={
                    <LoginContainer
                        user={user}
                        signOut={() => {
                            setUser(undefined)
                        }}
                        signIn={(username) => {
                            setUser(username)
                        }}
                    />}/>
                <Route path="*" element={<Navigate replace to="/home" />}/>
            </Routes>
        )
    }

    // when app init, load user from local storage
    useEffect(() => {
        const username = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        if (username && token) {
            setUser(username);
        } else {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        }
    }, [])

    return (
        <BrowserRouter>
            <Box sx={{display: 'flex'}}>
                <CssBaseline/>
                <AppBar position="fixed" open={drawerOpen}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={() => setDrawerOpen(true)}
                            edge="start"
                            sx={{mr: 2, ...(drawerOpen && {display: 'none'})}}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            Boardgame DB
                        </Typography>
                        <Typography variant="h6" noWrap component="div">
                            &nbsp;{user}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                    }}
                    variant="persistent"
                    anchor="left"
                    open={drawerOpen}
                >
                    <DrawerHeader>
                        <IconButton onClick={() => setDrawerOpen(false)}>
                            <ChevronLeftIcon/>
                        </IconButton>
                    </DrawerHeader>
                    <Divider/>
                    <List>
                        {pages.map((p, index) => (
                            <ListItem key={p.url}>
                                <Link to={p.url}>{p.name}</Link>
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
                <Main open={drawerOpen}>
                    <DrawerHeader/>
                    {renderMainRouter()}
                </Main>
            </Box>
        </BrowserRouter>
    );
}