import React from 'react';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

export const colorMarker = userAmound => {

    let color

    const grey = '#b0bec5'
    const blue = '#2196f3'
    const green = '#8bc34a'
    const red = '#f44336'

    switch (true) {
        case userAmound >= 3 && userAmound <= 6:
            color = blue
            break;
        case (userAmound >= 7 && userAmound <= 10):
            color = green
            break;
        case (userAmound >= 11):
            color = red
            break;
        default:
            color = grey
    }
    return color
};

export const infoScreen = info => {
    return <Grid style={{ height: '100vh' }} container alignItems="center" justify="center">
        <Grid item xs={12}>
            <Typography variant='h2' align='center'>{info}</Typography>
        </Grid>
    </Grid>
};