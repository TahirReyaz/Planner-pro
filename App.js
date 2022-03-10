/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {enableScreens} from 'react-native-screens';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type {Node} from 'react';

import MainNavigator from './navigation/Navigator';
import dayReducer from './store/reducers/dayReducer';
import monthReducer from './store/reducers/monthReducer';
import yearReducer from './store/reducers/yearReducer';
import lifeReducer from './store/reducers/lifeReducer';
import goalsReducer from './store/reducers/goalsReducer';
import plannedGoalsReducer from './store/reducers/plannedGoalsReducer';
import notificationsReducer from './store/reducers/notificationsReducer';
import {PersistGate} from 'redux-persist/integration/react';

enableScreens();

const rootReducer = combineReducers({
  schedule: dayReducer,
  monthPlan: monthReducer,
  yearPlan: yearReducer,
  lifePlan: lifeReducer,
  goals: goalsReducer,
  plannedGoals: plannedGoalsReducer,
  notifications: notificationsReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);
let persistor = persistStore(store);

const App: () => Node = () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainNavigator />
      </PersistGate>
    </Provider>
  );
};

export default App;
