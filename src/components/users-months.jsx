import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';

import { GetUsers } from '../services/user-service'
import '../styles/user-months-style.sass'

import { Container } from '@material-ui/core';

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
        let colorClass = ''
        switch (true) {
            case userAmound >= 3 && userAmound <= 6:
                colorClass = 'blue'
                break;
            case (userAmound >= 7 && userAmound <= 10):
                colorClass = 'green'
                break;
            case (userAmound >= 11):
                colorClass = 'red'
                break;
            default:
                colorClass = 'grey';
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
        this.setState({ selectedUsers: users })
    }

    handleMouseOut(e) {
        this.setState({ selectedUsers: [] })
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
                    <Grid item xs={12}>
                        <Grid container justify="center" spacing={2}>
                            {usersMonths.map(month => (
                                <Grid className='month' xm={12} xs={1} key={month.number} item>
                                    <Paper className={this.colorMarker(month.users.length)} onMouseOver={this.handleMouseOver.bind(this, month.users)} onMouseOut={this.handleMouseOut.bind(this)}>
                                        <Typography align='center' className='month_name'>{month.name}</Typography>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                        <Grid container justify="center" className='users-table'>
                            <Paper>
                                <List >
                                    {selectedUsers.map(user => (
                                        <ListItem button key={user.id}>
                                            <ListItemText >
                                                {user.firstName} {user.lastName} {(user.dob)}
                                            </ListItemText>
                                            <Divider component="li" />
                                        </ListItem>
                                    ))}
                                </List>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            );
        }
    }
}

export default UsersMonths;