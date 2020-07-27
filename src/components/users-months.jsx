import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import BadgeColored from './badge-colored'

import { GetUsers } from '../services/user-service'
import '../styles/user-months-style.sass'

import { Container, Button } from '@material-ui/core';

class UsersMonths extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            users: [],
            usersMonths: [],
            selectedUsers: []
        };
    }

    usersMonths() {
        const { users } = this.state;
        const usersMonths = []

        for (let month = 0; month <= 11; month++) {
            let mounthName = new Date(2020, month, 1).toLocaleString('default', { month: 'long' })
            usersMonths.push({ name: mounthName, number: month, users: [] })
        }
        users.forEach(user => {
            const mob = new Date(user.dob).getMonth()
            user.dob = user.dob.toLocaleString('default', { year: 'numeric', month: 'long' })

            usersMonths[mob].users.push(user)
        })
        this.setState({ usersMonths: usersMonths })
    }

    componentDidMount() {
        GetUsers().then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    users: result
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        ).then(() => this.usersMonths())
    }

    colorMarker(userAmound) {

        const grey = '#b0bec5'
        const blue = '#2196f3'
        const green = '#8bc34a'
        const red = '#f44336'
        let colorClass
        switch (true) {
            case userAmound >= 3 && userAmound <= 6:
                colorClass = blue
                break;
            case (userAmound >= 7 && userAmound <= 10):
                colorClass = green
                break;
            case (userAmound >= 11):
                colorClass = red
                break;
            default:
                colorClass = grey
        }
        return colorClass
    }

    infoScreen(info) {
        return <Grid style={{ height: '100vh' }} container alignItems="center" justify="center">
            <Grid item xs={12}>
                <Typography align='center'>{info}</Typography>
            </Grid>
        </Grid>
    }

    handleMouseOver(users, e) {
        const previous = document.getElementsByClassName('selected');
        if (previous.length > 0) previous.item(0).classList.remove('selected')
        this.setState({ selectedUsers: users })
        e.currentTarget.classList.add('selected')
    }

    render() {
        const { error, isLoaded, usersMonths, selectedUsers } = this.state;

        if (error) {
            return this.infoScreen(error.message);
        } else if (!isLoaded) {
            return this.infoScreen('Загрузка...')
        } else {
            return (
                <Grid className='users-months' container spacing={2}>
                    <Grid item xs={3}>
                        <Grid container style={{ height: '90vh' }} alignItems="center" justify="center" spacing={2}>
                            {usersMonths.map(month => (
                                <Grid className='month' xm={6} xs={6} key={month.number} item>
                                    <BadgeColored color={this.colorMarker(month.users.length)} badgeContent={month.users.length}>
                                        <Button style={{ width: '100%' }} className={`${this.colorMarker(month.users.length)} month_box`} 
                                        onMouseOver={this.handleMouseOver.bind(this, month.users)} 
                                        onClick={this.handleMouseOver.bind(this, month.users)} >
                                            <Typography align='center' className='month_name'>{month.name}</Typography>
                                        </Button>
                                    </BadgeColored>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                    <Grid item xs={9} style={{ height: '90vh' }} container justify="center">
                        <UsersTable />
                    </Grid>

                </Grid>
            );
        }

        function UsersTable() {

            if (selectedUsers.length > 0) {
                return <TableContainer component={Paper}>
                    <Table className='users-table' size="small" aria-label="simple table">
                        <TableHead>
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
                return <TableContainer component={Paper}>
                    <Table className='users-table' size="small" aria-label="simple table">
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <Typography style={{ padding: '50px' }} align='center' variant='h3' className='users-table-placeholder'>Pleace select month to show users</Typography>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            }
        }
    }
}

export default UsersMonths;