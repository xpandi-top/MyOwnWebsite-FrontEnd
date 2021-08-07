import React from 'react';
import {Card, CardContent, Typography} from "@material-ui/core";

class MenuItem extends React.Component {
    render () {
        return (
            <Card>
                <CardContent>
                    <Typography variant="h3">
                        {this.props.category}
                    </Typography>
                </CardContent>
            </Card>
        );
    }
}

export default MenuItem