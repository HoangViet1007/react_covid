import { Grid } from '@material-ui/core';
import { useEffect, useState} from 'react';
import { getMapDataByCountryId } from '../../apis';
import LineChart from '../Charts/LineChart';
import HighMap from '../Charts/HighMap';


function Summary ({report, selectedCountryId}) {
    const [mapData, setMapData] = useState('');

    useEffect(() => {
        if (selectedCountryId) {
            console.log(selectedCountryId);
          }
    },[selectedCountryId])

    return (
        <Grid container spacing={3}>
            <Grid item sm={8} xs={12}>
                <LineChart data={report} />
            </Grid>
            <Grid item sm={4} xs={12}>
                <HighMap mapData={mapData} />
            </Grid>
        </Grid>
    );
}

export default Summary;
