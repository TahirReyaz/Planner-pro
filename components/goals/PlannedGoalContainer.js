import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import PlanItem from '../UI/PlanItem';
import NewPlanItemForm from '../UI/NewPlanItemForm';
import defaultStyles from '../../constants/default-styles';
import Colors from '../../constants/Colors';
import PercentageBar from './PercentageBar';

const PlannedGoalContainer = props => {
  const [showDetails, setShowDetails] = useState(false);
  const showDetailsIcon =
    props.tasks && props.tasks.length > 0 ? 'md-chevron-down' : 'md-add-circle';

  let completedTasksLength = 0;
  props.tasks.forEach(task => task.checked && completedTasksLength++);

  return (
    <View style={{...defaultStyles.styledContainer, margin: 5}}>
      <View style={styles.summaryContainer}>
        <View>
          <Text style={styles.title}>
            {props.title.length < 21
              ? props.title
              : props.title.substring(0, 18) + '...'}
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <Text style={{...styles.text, color: 'grey'}}>
            {completedTasksLength}/ {props.tasks.length}
          </Text>

          <Icon
            name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
            size={23}
            color={Colors.red}
            onPress={props.onDel}
          />

          <Icon
            name={showDetails ? 'md-chevron-up' : showDetailsIcon}
            size={25}
            color="grey"
            style={{marginLeft: 10}}
            onPress={() => {
              setShowDetails(prevState => !prevState);
            }}
          />
        </View>
      </View>
      {showDetails && (
        <View style={styles.itemContainer}>
          {props.tasks &&
            props.tasks.map(task => (
              <PlanItem
                title={task.task}
                id={task.id}
                key={task.id}
                checked={task.checked}
                max={35}
                onCheck={() => props.onCheckTask(task.id)}
                onDel={() => props.onDelTask(task.id)}
              />
            ))}
          <NewPlanItemForm onAdd={task => props.onAddTask(task)} />
        </View>
      )}
      {props.tasks.length !== 0 && (
        <PercentageBar
          color={props.color}
          percentage={(
            (completedTasksLength * 100) /
            props.tasks.length
          ).toFixed(1)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Montserrat-Regular',
    marginRight: 5,
    color: 'black',
  },
  text: {
    fontSize: 20,
    fontFamily: 'Montserrat-Regular',
    marginRight: 5,
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  itemContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default PlannedGoalContainer;
