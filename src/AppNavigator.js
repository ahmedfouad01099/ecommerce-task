import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useSelector } from 'react-redux';
import {
  SplashScreen,
  HomeScreen,
  SettingScreen,
  CartScreen,
  CategoryScreen,
  ProfileScreen,
} from './screens/index';
import {
  bottomHome,
  bottomHomeFill,
  bottomCategory,
  bottomCategoryFill,
  bottomCart,
  bottomProfile,
  bottomProfileFill,
  bottomSetting,
  bottomSettingFill,
} from '@common';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Colors, GlobalStyles } from '@helpers';
import Fonts from './helpers/Fonts';
import { _roundDimensions } from './helpers/util';
const SettingStack = createStackNavigator();
export const navigationRef = createNavigationContainerRef();

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

function SettingStackNavigation() {
  return (
    <SettingStack.Navigator initialRouteName="SettingScreen">
      <SettingStack.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{ headerShown: false }}
      />
    </SettingStack.Navigator>
  );
}

const BottomTab = createMaterialBottomTabNavigator();

// Extract icon components outside of render
const HomeIcon = ({ focused }) => (
  <Image
    square
    source={focused ? bottomHomeFill : bottomHome}
    style={[styles.bottomTabIcon]}
  />
);

const CategoryIcon = ({ focused }) => (
  <Image
    square
    source={focused ? bottomCategoryFill : bottomCategory}
    style={[styles.bottomTabIcon]}
  />
);

const ProfileIcon = ({ focused }) => (
  <Image
    square
    source={focused ? bottomProfileFill : bottomProfile}
    style={[styles.bottomTabIcon]}
  />
);

const SettingIcon = ({ focused }) => (
  <Image
    square
    source={focused ? bottomSettingFill : bottomSetting}
    style={[styles.bottomTabIcon]}
  />
);

const CartIcon = ({ focused, cartCount }) => (
  <View style={styles.cartIconView}>
    <Image
      square
      source={focused ? bottomCart : bottomCart}
      style={[
        styles.bottomTabIcon,
        {
          top: cartCount > 9 ? hp('0.8%') : hp('0.2%'),
          right: wp('1%'),
          height: wp('7%'),
          width: wp('7%'),
        },
      ]}
    />
    {cartCount > 0 && (
      <View
        style={[
          GlobalStyles.badge,
          styles.count,
          {
            height:
              cartCount > 9
                ? _roundDimensions()._height * 0.039
                : _roundDimensions()._height * 0.032,
            width:
              cartCount > 9
                ? _roundDimensions()._height * 0.039
                : _roundDimensions()._height * 0.032,
            borderRadius: _roundDimensions()._borderRadius,
            right: cartCount > 9 ? wp('0.3') : wp('1.2%'),
            top: cartCount > 9 ? hp('0.1%') : hp('0.6%'),
          },
        ]}
      >
        <Text
          style={[
            GlobalStyles.badgeText,
            styles.countText,
            { fontSize: cartCount > 9 ? wp('2.4%') : wp('3%') },
          ]}
        >
          {cartCount}
        </Text>
      </View>
    )}
  </View>
);

function MyTabs() {
  const cartCount = useSelector(state => state?.cart?.cartCount);
  const authStatus = useSelector(state => state?.auth?.isAuthenticated);

  return (
    <BottomTab.Navigator
      initialRouteName="HomeScreen"
      backBehavior={'order'}
      labeled={false}
      barStyle={styles.tabbarStyle}
      screenOptions={{
        // tabBarStyle: { position: 'absolute' },
        unmountOnBlur: true,
        tabBarShowLabel: false,
        lazy: false,
        // tabBarStyle: styles.tabbarStyle
      }}
    >
      <BottomTab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
          cardStyleInterpolator:
            CardStyleInterpolators.forScaleFromCenterAndroid,
          tabBarIcon: HomeIcon,
        }}
      />
      <BottomTab.Screen
        name="CategoryScreen"
        component={CategoryScreen}
        options={{
          headerShown: false,
          tabBarIcon: CategoryIcon,
        }}
      />
      <BottomTab.Screen
        name="CartScreen"
        // component={authStatus === true ? CartScreen : null}
        component={CartScreen}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({ focused }) => (
            <CartIcon focused={focused} cartCount={cartCount} />
          ),
        }}
      />
      <BottomTab.Screen
        name="ProfileScreen"
        // component={authStatus === true ? ProfileScreen : AuthNavigator}
        component={ProfileScreen}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,

          tabBarIcon: ProfileIcon,
        }}
      />
      <BottomTab.Screen
        name="SettingScreen"
        component={SettingStackNavigation}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          tabBarIcon: SettingIcon,
        }}
      />
    </BottomTab.Navigator>
  );
}

const Stack = createStackNavigator();
function AppNavigator() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="MainScreen">
        <Stack.Screen
          name="MainScreen"
          options={{ headerShown: false }}
          component={MyTabs}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;

const styles = StyleSheet.create({
  bottomTabIcon: {
    height: wp('6%'),
    width: wp('6%'),
  },
  tabbarStyle: {
    backgroundColor: Colors().white,
  },
  cartIconView: {
    backgroundColor: Colors().light_white,
    height: _roundDimensions()._height * 0.068,
    width: _roundDimensions()._height * 0.068,
    borderRadius: _roundDimensions()._borderRadius,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: hp('2%'),
    position: 'relative',
    zIndex: 9999999999,
  },
  count: {
    backgroundColor: Colors().white,
  },
  countText: {
    color: Colors().link_color,
    fontFamily: Fonts.Font_Bold,
  },
});
