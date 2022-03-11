import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import defaultStyles from '../../constants/default-styles';
import Colors from '../../constants/Colors';

const Activity = props => {
  const [showDetails, setShowDetails] = useState(false);
  const styles = StyleSheet.create({
    container: {
      margin: 5,
      borderLeftColor: props.color,
      borderBottomColor: props.color,
    },
    summaryContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    timeNtitle: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
    time: {
      fontSize: 16,
      fontFamily: 'Montserrat-Bold',
      marginRight: 5,
      marginTop: 5,
      color: 'black',
    },
    text: {
      fontSize: 20,
      fontFamily: 'Montserrat-Regular',
      color: 'black',
    },
    buttonContainer: {
      flexDirection: 'row',
    },
    fullTitle: {
      margin: 5,
      color: 'black',
    },
  });

  return (
    <View style={{...defaultStyles.styledContainer, ...styles.container}}>
      <View style={styles.summaryContainer}>
        <View style={styles.timeNtitle}>
          <View>
            <Text style={styles.time}>{props.time}</Text>
          </View>
          {!showDetails && (
            <View>
              <Text style={styles.text}>
                {props.title.includes('\n') === false
                  ? props.title.length < 15
                    ? props.title
                    : props.title.substring(0, 15) + '...'
                  : props.title.substring(0, props.title.indexOf('\n')) + '...'}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.buttonContainer}>
          {props.title.length > 14 && (
            <Icon
              name={showDetails ? 'md-chevron-up' : 'md-chevron-down'}
              size={25}
              color="grey"
              style={{marginHorizontal: 10}}
              onPress={() => {
                setShowDetails(prevState => !prevState);
              }}
            />
          )}
          <Icon
            name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
            size={23}
            color={Colors.red}
            onPress={props.onDel}
          />
        </View>
      </View>
      {showDetails && (
        <View style={styles.fullTitle}>
          <Text style={styles.text}>{props.title}</Text>
        </View>
      )}
    </View>
  );
};

export default Activity;
