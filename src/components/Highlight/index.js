import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import React from 'react';

function Highlight ({report}) {
    const data = report && report[report.length - 1] ? report[report.length - 1] : [];

    const summary = [
        {
            title: 'Số ca nhiễm',
            count: data.Confirmed,
            type: 'confirmed',
            color: '#50C75B'
          },
          {
            title: 'Số ca khỏi',
            count: data.Recovered,
            type: 'recovered',
            color: '#c9302c'
          },
          {
            title: 'Số ca tử vong',
            count: data.Deaths,
            type: 'death',
            color: '#ccc'
          },
    ]


    return (
        <Grid container spacing={3}>
            {
               summary.map(item => {
                   return (
                        <Grid key={item.title} item sm={4} xs={12}>
                            <Card style={{borderLeft: `5px solid ${item.color}` }}>
                                <CardContent>
                                    <Typography component="p" variant="body2">{item.title}</Typography>
                                    <Typography component="span" variant="body2">{new Intl.NumberFormat().format(item.count) || '0'}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                   );
               })
            }
        </Grid>
    );
}

export default Highlight;
