import React, {useEffect, useState} from 'react';
import {Footer} from '@/components';
import fetcher from '@/utils/fetcher';
import useSWR from 'swr';
import {FeaturedCard} from '@/components/featuredCard/featuredCard';
import {BrandCard} from '@/components/brandCard';
import {makeStyles} from '@mui/styles';
import cpTheme from 'src/theme/cpTheme';
import CameraBanner from '@/components/cameraBanner/cameraBanner';
import PhotoList from '@/components/photoList';

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

const Brands: React.FC = () => {
  const classes = useStyles(cpTheme);
  // const [brands, setBrands] = useState<string[]>([]);
  // const {data} = useSWR(`/api/brands/`, fetcher);

  // useEffect(() => {
  //   console.log(data);
  //   setBrands(data?.brands ?? []);
  // });

  return (
    <div className={classes.homeContainer}>
      <PhotoList />
      <Footer />
    </div>
  );
};

export default Brands;
