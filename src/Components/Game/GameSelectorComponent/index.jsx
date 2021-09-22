import React from 'react';
import {Card, CardContent, Grid, List, Typography} from "@material-ui/core";

import games from '../../../data/games.json';
import GameDetailsComponent from "../GameDetailsComponent";

const selectedGame = games[0];

class GameSelectorComponent extends React.Component {
    // todo 多加几个games，多加点不同的信息看看放在一起怎么展示
    // todo 中间游戏列表这一栏需要有按钮，增删游戏啥的；排序；filter
    // todo 游戏的扩怎么表示
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