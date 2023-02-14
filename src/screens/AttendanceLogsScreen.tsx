import * as React from 'react';
import { useEffect, useState } from "react";
import {List} from 'react-native-paper';
import {View} from 'react-native';
import AttendanceService from '../services/AttendanceService';
import AppLocalStorage, {CACHE_KEYS} from '../cache/AppLocalStorage';
import {LoginResponse} from '../models/ApiModels';

const attendanceService = new AttendanceService();
const cache = AppLocalStorage.getInstance();
const AttendanceLogsScreen = () => {
  const [expanded, setExpanded] = React.useState(true);
  const handlePress = () => setExpanded(!expanded);
  const [attendanceLogs,setAttendanceLogs] = useState([]);

  useEffect(() => {
    (async () => {
      const employeeData = (await cache.getObjectFromCache(
        CACHE_KEYS.USER_INFO,
      )) as LoginResponse;
      const logs = await attendanceService.getAttendanceLogs(
        employeeData.employeeId,
      );
      console.log(logs);
    })();
  }, []);
  return (
    <View style={{flex: 1}}>
      <List.Accordion
        title="Uncontrolled Accordion"
        left={props => <List.Icon {...props} icon="calendar-range" />}>
        <List.Item title="First item" />
        <List.Item title="Second item" />
      </List.Accordion>
    </View>
  );
};

export default AttendanceLogsScreen;
