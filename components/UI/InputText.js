import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Colors from '../../constants/Colors';

const InputText = props => {
  const value = props.value ? props.value : '';
  const {onInputChange, initiallyValid} = props;
  const [validity, setValidity] = useState(initiallyValid);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    setValidity(initiallyValid);
    onTextChange(value);
  }, [initiallyValid, setValidity, value, onTextChange]);

  const onTextChange = text => {
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }
    if (props.maxLength != null && text.length > props.maxLength) {
      isValid = false;
    }
    setValidity(isValid);
    onInputChange(text, isValid);
  };

  return (
    <View style={[styles.formControl, props.containerStyle]}>
      {props.label && <Text style={styles.label}>{props.label}</Text>}
      <View
        style={[
          props.inputStyle,
          styles.row,
          {
            borderBottomColor: focused ? Colors.primary : Colors.primaryLight,
            borderLeftColor: focused ? Colors.primary : Colors.primaryLight,
          },
        ]}>
        <TextInput
          style={{
            fontFamily: 'Montserrat-Regular',
            fontSize: 20,
            color: 'black',
            width: props.smallWidth ? '80%' : '90%',
            paddingVertical: 0,
          }}
          {...props}
          value={value}
          onChangeText={onTextChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        <Icon
          name="ios-close"
          size={28}
          color={Colors.lightGrey}
          onPress={() => onTextChange('')}
        />
      </View>
      {!validity && (
        <View style={styles.errorContainer}>
          <Text style={styles.error}>{props.error}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  formControl: {
    width: '100%',
  },
  label: {
    marginVertical: 0,
    color: 'black',
    fontFamily: 'Montserrat-Regular',
  },
  errorContainer: {
    marginVertical: 5,
  },
  error: {
    fontSize: 13,
    color: 'red',
    fontFamily: 'Montserrat-Regular',
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
});

export default InputText;
