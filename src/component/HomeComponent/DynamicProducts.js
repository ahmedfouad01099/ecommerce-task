import React, { memo } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { GlobalStyles, Colors } from '@helpers';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import TaskDivider from '../TaskComponent/TaskDivider';
import ProductView from '../ProductCompnent/ProductView';

function Product(props) {
  const navigateToDetailPage = data => {
    props.navigation.navigate('ProductDetailScreen', { id: data.id });
  };

  const { wishlistArr } = props;
  const navigateToLoginPage = data => {
    props.navigation.navigate('LoginScreen', {});
  };

  const addToWishlist = id => {
    props.addToWishlist(id);
  };

  return (
    <>
      <View style={styles.catHeading}>
        <Text style={GlobalStyles.boxHeading}>{props.title}</Text>
        <TouchableOpacity
          style={{ flex: 0.5 }}
          onPress={() =>
            props.navigation.navigate('ProductListScreen', {
              type: 'category',
              id: props.catID,
              childerns: [],
              title: props.title,
            })
          }
        >
          <Text style={GlobalStyles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>
      <TaskDivider size={'sm'} />
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {props.data.length > 0 && (
          <FlatList
            style={{ padding: wp('1%') }}
            data={props.data}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            contentContainerStyle={{
              paddingTop: wp('2.5%'),
            }}
            onEndReachedThreshold={0.7}
            keyExtractor={(contact, index) => String(index)}
            renderItem={({ item, index }) => (
              <View style={styles.productBox} key={item.id.toString()}>
                <ProductView
                  fromDynamic={true}
                  data={item}
                  navToDetail={navigateToDetailPage}
                  fromSimilar={true}
                  navToLogin={navigateToLoginPage}
                  userAuth={props.userAuth}
                  addToWishlist={addToWishlist}
                  wishlistArray={wishlistArr}
                />
              </View>
            )}
          />
        )}
      </View>
    </>
  );
}

export default memo(Product);

const styles = StyleSheet.create({
  catHeading: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: hp('1%'),
  },
  catBox: {
    height: hp('12.5%'),
    width: wp('15%'),
    marginHorizontal: wp('1%'),
    borderRadius: 5,
  },
  productBox: {
    backgroundColor: Colors().white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    // width: '46%',
    // height: 'auto',
    marginBottom: wp('3%'),
    borderRadius: wp('2%'),
    marginHorizontal: wp('1.5%'),
    paddingBottom: hp('1%'),
  },
});
