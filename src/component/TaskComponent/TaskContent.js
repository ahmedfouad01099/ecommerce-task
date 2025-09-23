import React from 'react';
import { ScrollView } from 'react-native';
import { GlobalStyles } from '@helpers';

function TaskContent(props) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={10}
      bounces={false}
      scrollEnabled={true}
      nestedScrollEnabled={true}
      keyboardShouldPersistTaps={'handled'}
      style={[GlobalStyles.contentView, props.customStyles]}
    >
      {props.children}
    </ScrollView>
  );
}

export default TaskContent;
