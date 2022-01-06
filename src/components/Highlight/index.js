import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import React from 'react';
import CountUp from 'react-countup';


function Highlight ({report}) {
    const data = report && report[report.length - 1] ? report[report.length - 1] : [];

    const summary = [
        {
            title: 'Số ca nhiễm',
            count: data.Confirmed || 0,
            type: 'confirmed',
            color: '#50C75B'
          },
          {
            title: 'Số ca khỏi',
            count: data.Recovered || 0,
            type: 'recovered',
            color: '#c9302c'
          },
          {
            title: 'Số ca tử vong',
            count: data.Deaths || 0,
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
                                    <Typography variant='body2' component='span' style={{fontSize:"16px",fontWeight:"bold"}}>
                                        <CountUp end={item.count} separator=' ' duration={2} />
                                    </Typography>
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
