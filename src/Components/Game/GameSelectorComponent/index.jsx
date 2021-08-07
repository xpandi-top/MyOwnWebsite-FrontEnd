import React from 'react';
import {Card, CardContent, Grid, List, Typography} from "@material-ui/core";

import games from '../../../data/games.json';
import GameDetailsComponent from "../GameDetailsComponent";

var selectedGame = games[0];

class GameSelectorComponent extends React.Component {

    render() {
        return (
            <Grid container spacing={3}>
                <Grid item>
                    <List>
                        {games.map((g) => (<Card key={g.name}>
                            <CardContent>
                                <Typography variant="h3">
                                    {g.name}
                                </Typography>
                            </CardContent>
                        </Card>))}

                    </List>
                </Grid>
                <Grid item>
                    <GameDetailsComponent game={selectedGame} />
                </Grid>
            </Grid>
        );
    }
}

export default GameSelectorComponent;