import React from 'react';
import {makeStyles} from '@mui/styles';
import {campediaTheme} from '@/utils/campediaTheme';

const useStyles = makeStyles(theme => ({
  homeContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    alignItems: 'flex-start',
    width: '100%',
    height: '100%',
    overflowX: 'hidden',
  },
}));

const Film: React.FC = () => {
  const classes = useStyles(campediaTheme);

  return <div className={classes.homeContainer}>Film</div>;
};

export default Film;
