import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { Grid } from '@material-ui/core';


import './style.sass'

export const UsersTable = ({ selectedUsers }) => {
    if (selectedUsers.length > 0) {
        return <TableContainer component={Paper}>
            <Table className='users-table' size="small" aria-label="simple table">
                <TableHead className='users-table_head'>
                    <TableRow>
                        <TableCell>First name</TableCell>
                        <TableCell align="right">Last name</TableCell>
                        <TableCell align="right">DOB</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {selectedUsers.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell component="th" scope="row">
                                {user.firstName}
                            </TableCell>
                            <TableCell align="right">{user.lastName}</TableCell>
                            <TableCell align="right">{user.dob}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    } else {
        return <Grid container component={Paper} alignContent='center'>
                <Grid item container className='users-table-placeholder'>
                    <Typography style={{ padding: '50px' }} align='center' variant='h3' >Pleace select month to show users</Typography>
                </Grid>
            </Grid>
    }
}
