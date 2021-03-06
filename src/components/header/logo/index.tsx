import React from 'react';
import {useRouter} from 'next/router';
import CampediaSVG from './CampediaSVG';
import {campediaTheme} from '@/utils/campediaTheme';
import {makeStyles} from '@mui/styles';

const useStyles = makeStyles(theme => ({
  logoSVG: {
    cursor: 'pointer',
    display: 'flex',
    margin: '0 1%',
  },
  hideLogo: {
    display: 'none',
  },
}));

interface LogoProps {
  checked: boolean;
  height: number;
}

export const Logo: React.FC<LogoProps> = ({checked, height}) => {
  const router = useRouter();
  const classes = useStyles(campediaTheme);

  const handleClick = (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    router.push('/');
  };

  return (
    <div className={classes.logoSVG}>
      <a onClick={handleClick}>
        <CampediaSVG
          data-test="icon"
          className={`text-white ${checked ? classes.hideLogo : ''}`}
          width={height}
          height={height}
        />
      </a>
    </div>
  );
};
