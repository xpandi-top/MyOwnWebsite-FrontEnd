import React from 'react';
import {Card, CardContent, Typography} from "@material-ui/core";


class GameDetailsComponent extends React.Component {
    render() {
        return (
            <Card>
                <CardContent>
                    <Typography variant="h2" key={this.props.game.name}>
                        {this.props.game.name}
                    </Typography>
                    <Typography variant="h6" key={this.props.game.description}>
                        {this.props.game.description}
                    </Typography>
                    {
                        this.props.game.numPlayers.map(function (n) {
                                return (
                                    <Typography variant="body1" key={n}>
                                        {n}
                                    </Typography>
                                );
                            }
                        )}
                </CardContent>
            </Card>
        );
    }
}

export default GameDetailsComponent;