import React from 'react';
import {Card, CardContent, Typography} from "@material-ui/core";

class MenuItem extends React.Component {
    render () {
        // todo: 时间有限，暂时先用card来做的。可以试试看有什么侧边栏式的组件好用的
        // todo: 需要让点击不同的menu的时候，state变化能传到外面去，给右边的菜单
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