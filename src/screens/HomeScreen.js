/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';
import {
  TaskHeader,
  TaskContainer,
  TaskContent,
  TaskDivider,
  HomeSlider,
  HomeManufacturerView,
  HomeCategoryView,
  SearchBar,
  NewProduct,
  TrendingProduct,
  BestDeal,
  DynamicProducts,
  HomeBanners,
} from '@component';

import { HomeSkeleton, ProductSkeleton } from '@skeleton';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Colors, GlobalStyles } from '@helpers';
import { Badge } from 'native-base';
import { heart, avatarImg, avatarImg2 } from '@common';
import Fonts from '@helpers/Fonts';
import { _roundDimensions } from '@helpers/util';
import ProductsData from '../data/products.json';
import HomesData from '../data/homePageData.json';
import HomeStoreData from '../data/homePageStoreData.json';

function HomeScreen(props) {
  const [state, setState] = useState({
    homePageData: [],
    products: [],
    loading: true,
    profileImageURL: null,
  });
  const [homePageStoredData, setHomeData] = useState(null);
  const [imageSimilar, setImageSimilar] = useState(false);

  const addToWish = async id => {};

  useEffect(() => {
    setTimeout(() => {
      setState({ ...state, loading: false, products: ProductsData.products });
    }, 1500);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      async function fetchData() {
        setState({
          ...state,
          homePageData: HomesData.data,
          loading: false,
        });
      }

      setHomeData(HomeStoreData);
      fetchData();
    }, 1500);
  }, []);

  //render cat wise product
  const renderCategoryWiseProduct = (data, i) => {
    if (homePageData.categoryWiseProduct[data].length > 0) {
      return (
        <DynamicProducts
          key={i}
          current={i}
          title={data}
          navigation={props.navigation}
          strings={strings}
          wishlistArr={wishlistData}
          data={homePageData.categoryWiseProduct[data]}
          arr={homePageData.categoryWiseProduct[data]}
          addToWishlist={addToWish}
          userAuth={props.USER_AUTH}
          catID={homePageData.categoryWiseProduct[data][0]?.category_id}
        />
      );
    }
  };

  const { homePageData, loading } = state;
  const { USER_AUTH, wishlistData, customerData, wishlistCount, strings } =
    props;
  return (
    <TaskContainer customStyles={{ backgroundColor: Colors().white }}>
      {/* Header */}
      <TaskHeader customStyles={{ backgroundColor: Colors().white }}>
        <TouchableOpacity
          style={styles.headerLeft}
          onPress={() => props.navigation.navigate('ProfileScreen')}
        >
          {USER_AUTH ? (
            customerData.creation === 'D' ? (
              customerData.image != null ? (
                <Image
                  style={styles.avatarImg}
                  source={{
                    uri: customerData.image,
                  }}
                />
              ) : (
                <Image
                  ml="3"
                  size="sm"
                  style={styles.avatarImg}
                  source={avatarImg}
                />
              )
            ) : (
              <Image
                style={styles.avatarImg}
                source={{
                  uri: customerData.image,
                }}
              />
            )
          ) : (
            <Image
              ml="3"
              size="sm"
              style={styles.avatarImg}
              source={avatarImg2}
            />
          )}
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headingTxt}>Taskweb</Text>
        </View>
        {loading && <View style={{ flex: 0.1 }} />}

        {!loading && (
          <TouchableOpacity
            style={styles.headerRight}
            onPress={() => {
              USER_AUTH
                ? props.navigation.navigate('WishlistScreen')
                : props.navigation.navigate('LoginScreen');
            }}
          >
            <Image source={heart} style={styles.heartIcon} />
            {wishlistCount > 0 && (
              <Badge
                style={[
                  GlobalStyles.badge,
                  {
                    height:
                      wishlistCount > 9
                        ? _roundDimensions()._height * 0.038
                        : _roundDimensions()._height * 0.032,
                    width:
                      wishlistCount > 9
                        ? _roundDimensions()._height * 0.038
                        : _roundDimensions()._height * 0.032,
                    borderRadius: _roundDimensions()._borderRadius,
                    right: wishlistCount > 9 ? -wp('0.6%') : wp('0.2%'),
                    top: wishlistCount > 9 ? -hp('0.5%') : hp('0.1%'),
                  },
                ]}
              >
                <Text
                  style={[
                    GlobalStyles.badgeText,
                    styles.countText,
                    { fontSize: wishlistCount > 9 ? wp('2.2%') : wp('3%') },
                  ]}
                >
                  {wishlistCount}
                </Text>
              </Badge>
            )}
          </TouchableOpacity>
        )}
      </TaskHeader>
      {console.log('118-', homePageStoredData)}
      <TaskContent>
        {homePageStoredData ? (
          <>
            {/* HomeCategoryView Component */}
            <HomeCategoryView
              navigation={props.navigation}
              data={homePageStoredData.categories}
            />

            {/* HomeSlider Component */}
            {/* <HomeSlider
              data={homePageStoredData.homepageSlider}
              navigation={props.navigation}
            /> */}
            <TaskDivider size={'md'} />

            {/* NewProduct Component */}
            {/* <NewProduct
              navigation={props.navigation}
              strings={strings}
              wishlistArr={wishlistData}
              data={
                homePageStoredData.newProducts.length > 0
                  ? homePageStoredData.newProducts.slice(0, 4)
                  : []
              }
              arr={homePageStoredData.newProducts}
              addToWishlist={addToWish}
              userAuth={props.USER_AUTH}
            /> */}

            {/* Homepage banners */}
            {/* {homePageStoredData.banners?.images.length > 0 &&
              homePageStoredData.banners?.images[0] && (
                <HomeBanners
                  navigation={props.navigation}
                  image={homePageStoredData.banners?.images[0].image}
                  link={homePageStoredData.banners?.images[0]}
                />
              )} */}

            {/* BestDeal Component */}
            {/* <BestDeal
              navigation={props.navigation}
              strings={strings}
              data={
                homePageStoredData.dodProducts.length > 0
                  ? homePageStoredData.dodProducts.slice(0, 4)
                  : []
              }
              arr={homePageStoredData.dodProducts}
              wishlistArr={wishlistData}
              addToWishlist={addToWish}
              userAuth={props.USER_AUTH}
            /> */}
            <TaskDivider size={'sm'} />
            {/* Homepage banners */}
            {/* {homePageStoredData.banners?.images.length > 0 &&
              homePageStoredData.banners?.images[1] && (
                <HomeBanners
                  navigation={props.navigation}
                  image={homePageStoredData.banners?.images[1].image}
                  link={homePageStoredData.banners?.images[1]}
                />
              )} */}
          </>
        ) : (
          <View style={{ flex: 1 }}>
            <HomeSkeleton />
          </View>
        )}

        <TaskDivider size={'sm'} />
        {loading ? (
          <ProductSkeleton />
        ) : (
          <>
            {/* TrendingProduct Component */}
            <TrendingProduct
              navigation={props.navigation}
              strings={strings}
              data={
                homePageData.trendingProducts.length > 0
                  ? homePageData.trendingProducts.slice(0, 4)
                  : []
              }
              arr={homePageData.trendingProducts}
              wishlistArr={wishlistData}
              userAuth={props.USER_AUTH}
            />
            {homePageStoredData.banners?.images.length > 0 &&
              homePageStoredData.banners?.images[2] && (
                <HomeBanners
                  navigation={props.navigation}
                  image={homePageStoredData.banners?.images[2].image}
                  link={homePageStoredData.banners?.images[2]}
                />
              )}
            {Object.keys(homePageData.categoryWiseProduct).length > 0 &&
              Object.keys(homePageData.categoryWiseProduct).map(
                (item, index) => {
                  return renderCategoryWiseProduct(item, index);
                },
              )}
            {homePageStoredData.banners?.images.length > 0 &&
              homePageStoredData.banners?.images[3] && (
                <HomeBanners
                  navigation={props.navigation}
                  image={homePageStoredData.banners?.images[3].image}
                  link={homePageStoredData.banners?.images[3]}
                />
              )}
            {/* HomeManufacturerView Component */}
            {/* <HomeManufacturerView
              strings={strings}
              navigation={props.navigation}
              data={homePageStoredData.manufacturers}
            /> */}
          </>
        )}
      </TaskContent>
    </TaskContainer>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  headerRight: {
    flex: 0.15,
    marginRight: wp('2%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartIcon: {
    width: wp('6.5%'),
    height: hp('6.5%'),
    resizeMode: 'contain',
    tintColor: Colors().custom_pink,
  },
  headerCenter: {
    flex: 0.75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingTxt: {
    fontFamily: Fonts.Font_Bold,
    fontSize: wp('6.5%'),
    color: Colors().themeColor,
  },
  headerLeft: {
    flex: 0.15,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  bannerStyle: {
    resizeMode: 'contain',
    width: wp('100%'),
    height: hp('16%'),
    alignSelf: 'center',
  },
  avatarImg: {
    height: _roundDimensions()._height * 0.055,
    width: _roundDimensions()._height * 0.055,
    borderRadius: _roundDimensions()._borderRadius,
    marginLeft: wp('3%'),
  },
});
