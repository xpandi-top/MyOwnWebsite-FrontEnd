import {useEffect, useState} from "react";
import {getALLGames} from "../services";
import {Avatar, Card, CardContent, CardHeader, CardMedia, Chip, Grid, Typography} from "@mui/material";
import Box from "@mui/material/Box";

function GameCard(props) {
    const game = props.game;
    return (<Card sx={{maxWidth: 400}}
    >
        <CardHeader
            avatar={
                <Avatar aria-label="recipe">
                    {game.weight.toFixed(1)}
                </Avatar>
            }
            title={game.displayName}
            subheader={game.gameProperties["STRING_short_description"]}
        />
        {game.gameProperties["IMAGE_COVER"] ? (<CardMedia
            component="img"
            image={game.gameProperties["IMAGE_COVER"]}
        />) : null}

        <CardContent>
            <Typography variant="body2" color="text.secondary">Players:</Typography>
            {game.supportedPlayers.map((p, idx) => <Chip key={idx} label={p} size="small" variant="outlined" />)}
        </CardContent>
        <CardContent>
            {game.status && <Chip label={game.status} />}
        </CardContent>
        {/*<CardActions disableSpacing>*/}
        {/*    <Button>Details</Button>*/}
        {/*</CardActions>*/}
        {/*<Collapse in={expanded} timeout="auto" unmountOnExit>*/}
        {/*</Collapse>*/}
    </Card>);
}

export default function GamesContainer() {
    const [gamesList, setGamesList] = useState([]);

    useEffect(() => {
        getALLGames()
            .then((response) => setGamesList(response.data))
            .catch((error) => console.log(error));
    }, []);

    return (
        <Box sx={{flexGrow: 1}}>
            <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 3, md: 4}}>
                {gamesList.map((g, idx) => (
                    <Grid item xs={6} sm={6} md={4} lg={4} xl={3} key={idx}>
                        <GameCard game={g}/>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}