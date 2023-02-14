import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import * as TaskManager from 'expo-task-manager';
import {GEOFENCE_TASK_NAME} from './src/constants/constants';
import {GeofencingEventType} from 'expo-location';

AppRegistry.registerComponent(appName, () => App);

TaskManager.defineTask(
  GEOFENCE_TASK_NAME,
  ({data: {eventType, region}, error}) => {
    if (error) {
      // check `error.message` for more details.
      console.log(error);
      return;
    }
    if (eventType === GeofencingEventType.Enter) {
      console.log("You've entered region:", region);
      //todo add call to sync manager to add entry to db queue
    } else if (eventType === GeofencingEventType.Exit) {
      console.log("You've left region:", region);
    }
  },
);
