import React, { memo } from 'react';
import { View } from 'react-native';
import { GlobalStyles } from '@helpers';

const TaskHeader = ({ children, customStyles }) => (
  <View style={[GlobalStyles.tabBarView, customStyles]}>
    {children}
  </View>
);

export default memo(TaskHeader);
