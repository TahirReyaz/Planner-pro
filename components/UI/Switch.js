import React from 'react';
import {View, Text, Switch, StyleSheet, Platform} from 'react-native';

import Colors from '../../constants/Colors';

const NotificationSwitch = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{props.label}</Text>
      <Switch
        value={props.state}
        trackColor={{true: Colors.primaryLight, false: Colors.lighterGrey}}
        thumbColor={
          Platform.OS === 'android'
            ? props.state
              ? Colors.primary
              : Colors.primaryLight
            : ''
        }
        onValueChange={props.onChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Montserrat-Regular',
    color: 'black',
    fontSize: 22,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
});

export default NotificationSwitch;
