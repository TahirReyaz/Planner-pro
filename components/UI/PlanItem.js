import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Colors from '../../constants/Colors';

const uncheckedIcon = {
  android: 'md-checkmark-circle-outline',
  ios: 'ios-checkmark-circle-outline',
};

const checkedIcon = {
  android: 'md-checkmark-circle',
  ios: 'ios-checkmark-circle',
};

const PlanItem = props => {
  const doneIcon = props.checked ? checkedIcon : uncheckedIcon;
  const crossedText = props.checked
    ? {textDecorationLine: 'line-through', textDecorationStyle: 'solid'}
    : {};

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: props.checked ? Colors.lighterGrey : 'white'},
      ]}>
      <View style={styles.row}>
        <View>
          <Icon
            name={Platform.OS === 'android' ? doneIcon.android : doneIcon.ios}
            size={20}
            color="black"
            onPress={props.onCheck}
          />
        </View>
        {props.title.length < props.max && (
          <View>
            <Text style={{...styles.text, ...crossedText}}>{props.title}</Text>
          </View>
        )}
        <View>
          <Icon
            name={
              Platform.OS === 'android'
                ? 'md-remove-circle'
                : 'ios-remove-circle'
            }
            size={20}
            color="black"
            onPress={props.onDel}
          />
        </View>
      </View>
      {props.title.length >= props.max && (
        <View>
          <Text style={{...styles.text, ...crossedText}}>{props.title}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 5,
    marginVertical: 5,
    padding: 2,
    backgroundColor: 'white',
    borderColor: 'black',
    borderRadius: 5,
    borderWidth: 2,
    alignSelf: 'flex-start',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 15,
    color: 'black',
    marginHorizontal: 5,
    fontFamily: 'Montserrat-Regular',
  },
});

export default PlanItem;
