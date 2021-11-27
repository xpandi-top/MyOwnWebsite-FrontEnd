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
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {useState} from "react";
import RecordsContainer from "./records/RecordsContainer";
import LoginContainer from "./userAuth/LoginContainer";
import {login} from "../services/authService";

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
    // const theme = useTheme(); todo: what is this?
    // todo: when app initialize, try to read local storage and see if user logged in
    const [user, setUser] = useState({loggedIn: false});
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [functionality, setFunctionality] = useState("Games");

    const handleDrawerOpen = () => setDrawerOpen(true);

    const handleDrawerClose = () => setDrawerOpen(false);

    const handleLogin = function(loginData) {
        login(loginData).then(response => {
            // todo: redirect after login successful
            localStorage.setItem("user", response.data.token);
            setUser({
                loggedIn: true,
                username: response.data.username,
                message: "Login Successful"
            });
        }).catch(error => {
            // https://axios-http.com/docs/handling_errors
            if (error.response) {
                if (error.response.status === 401) {
                    setUser({
                        message: "Invalid Credentials"
                    });
                } else {
                    setUser({
                        message: "Something wrong at backend"
                    });
                }
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
        })
    }

    const renderMainView = function(functionality){
        switch (functionality){
            case "Games":
                return <Typography>Games</Typography>;
            case "Records":
                return <RecordsContainer/>;
            case "Campaigns":
                return <Typography>Campaigns</Typography>;
            case "Users":
                return (<LoginContainer
                    callBack={handleLogin}
                    msg={user.message}
                />);
            default:
                return <></>;
        }
    }

    return (
        <div>
            <Box sx={{display: 'flex'}}>
                <CssBaseline/>
                <AppBar position="fixed" open={drawerOpen}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{mr: 2, ...(drawerOpen && {display: 'none'})}}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            Persistent drawer
                        </Typography>
                        <Typography variant="h6" noWrap component="div">
                            &nbsp;{user.username}
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
                        <IconButton onClick={handleDrawerClose}>
                            <ChevronLeftIcon/>
                        </IconButton>
                    </DrawerHeader>
                    <Divider/>
                    <List>
                        {['Records', 'Games', 'Campaigns', 'Users'].map((text, index) => (
                            <ListItem button key={text}
                                      onClick={() => setFunctionality(text)}
                                      // onClick={(e) => console.log(e)}
                            >
                                <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
                                </ListItemIcon>
                                <ListItemText primary={text}/>
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
                <Main open={drawerOpen}>
                    <DrawerHeader/>
                    {renderMainView(functionality)}
                </Main>
            </Box>
        </div>
    );
}