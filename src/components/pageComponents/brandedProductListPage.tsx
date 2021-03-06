import React, {useEffect, useState} from 'react';
import {makeStyles} from '@mui/styles';
import useSWR from 'swr';
import {campediaTheme} from '@/utils/campediaTheme';
import {
  BrandDetailsObject,
  BrandDetailsResponse,
} from 'pages/api/brands/[brandAlt]';
import {useRouter} from 'next/router';
import {ImagePreviewResponse} from 'src/types/imageTypes';
import fetcher from '@/utils/fetcher';
import HeaderCard from '../headerCard/headerCard';
import {ProductListResponse} from 'pages/api/brands/[brandAlt]/products';
import ProductListDescriptiveCard from '../brandCards/productListDescriptiveCard';
import {Divider} from '@mui/material';

const useStyles = makeStyles(theme => ({
  pageContainer: {
    padding: '2%',
    height: '100%',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  divider: {
    margin: '3%',
  },
}));

export type toggleList = 'image' | 'desc' | 'text';

export default function BrandedProductListPage() {
  const classes = useStyles(campediaTheme);
  const router = useRouter();
  const params = router.query;
  const brandAlt = params.brandAlt as string;
  const [productList, setProductList] = useState<ProductListResponse>();
  const {data} = useSWR<ProductListResponse>(
    brandAlt ? `/api/brands/${brandAlt}/products` : null,
    brandAlt ? fetcher : null,
  );

  const [brandDetails, setBrandDetails] = useState<BrandDetailsObject>();
  const [image, setImage] = React.useState<ImagePreviewResponse>();

  const {data: brandData} = useSWR<BrandDetailsResponse>(
    brandAlt ? `/api/brands/${brandAlt}` : null,
    brandAlt ? fetcher : null,
  );
  const {data: brandImage} = useSWR<ImagePreviewResponse>(
    brandAlt ? `/api/image/brands/${brandAlt}` : null,
    brandAlt ? fetcher : null,
  );

  useEffect(() => {
    setProductList(data);
    console.log(data);
    if (brandData) {
      setBrandDetails(brandData.data);
    }
    setImage(brandImage);
  }, [data, brandData, brandImage]);

  return (
    <div className={classes.pageContainer}>
      {brandDetails && <HeaderCard brandDetails={brandDetails} image={image} />}
      {/* <PageListHeader /> -- Change to a dropdown picker for mobile and tabs for desktop */}
      <Divider className={classes.divider} />
      {productList && (
        <ProductListDescriptiveCard productList={productList.data} />
      )}
    </div>
  );
}
