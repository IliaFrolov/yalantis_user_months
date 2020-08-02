/* eslint-disable import/prefer-default-export */
import React from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {
  Button, List, ListItem,
} from '@material-ui/core';
import BadgeColored from '../badge-colored';
import { useUsersFetch, useUsersSelect, useMonths } from './hooks';
import { colorMarker, infoScreen } from './helpers';
import { UsersTable } from '../UserTable';

import './style.sass';

export const UsersMonths = () => {
  const [users, error, isLoaded] = useUsersFetch();
  const { handleMouseOver, selectedUsers } = useUsersSelect();
  const usersMonths = useMonths(users);
  let markUp = null;

  if (error) {
    markUp = infoScreen(error.message);
  } else if (!isLoaded) {
    markUp = infoScreen('Загрузка...');
  } else {
    markUp = (
      <Grid component={Paper} className="users-months" container spacing={2}>
        <Grid className="month-list users-months_month-list" item xs={3}>
          <List spacing={2}>
            {usersMonths.map((month) => (
              <ListItem className="month" xm={12} xs={12} key={month.number}>
                <BadgeColored
                  color={colorMarker(month.users.length)}
                  badgeContent={month.users.length}
                >
                  <Button
                    style={{ width: '100%' }}
                    className={`${colorMarker(month.users.length)} month_box`}
                    onMouseOver={handleMouseOver(month.users)}
                    onClick={handleMouseOver(month.users)}
                  >
                    <p align="center" className="month_name">{month.name}</p>
                  </Button>
                </BadgeColored>
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid className="users-months_users-table" item xs={9} container justify="center">
          <UsersTable selectedUsers={selectedUsers} />
        </Grid>

      </Grid>
    );
  }

  return markUp;
};
