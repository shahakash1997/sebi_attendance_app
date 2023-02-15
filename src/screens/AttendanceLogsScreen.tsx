import * as React from 'react';
import {useEffect, useState} from 'react';
import {List, Text} from 'react-native-paper';
import AttendanceService from '../services/AttendanceService';
import AppLocalStorage, {CACHE_KEYS} from '../cache/AppLocalStorage';
import {LoginResponse, PunchInOutRequest} from '../models/ApiModels';
import {View} from 'react-native';

const attendanceService = new AttendanceService();
const cache = AppLocalStorage.getInstance();
const AttendanceLogsScreen = () => {
  const [expanded, setExpanded] = React.useState(true);
  const handlePress = () => setExpanded(!expanded);
  const [attendanceLogs, setAttendanceLogs] = useState<
    Map<string, PunchInOutRequest[]>
  >([]);

  useEffect(() => {
    (async () => {
      const employeeData = (await cache.getObjectFromCache(
        CACHE_KEYS.USER_INFO,
      )) as LoginResponse;
      const logs = await attendanceService.getAttendanceLogs(
        employeeData.employeeId,
      );
      const mapLogs = new Map<string, PunchInOutRequest[]>();
      for (const att of logs) {
        const date = new Date(att.timestamp);
        const key = date.toLocaleDateString();
        if (mapLogs.has(key)) {
          const list = mapLogs.get(key);
          list?.push(att);
        } else {
          mapLogs.set(key, [att]);
        }
      }
      console.log(mapLogs.size);
      setAttendanceLogs(mapLogs);
    })();
  }, []);
  return (
    <View style={{flex: 1}}>
      {Array.from(attendanceLogs).map(([key, value]) => {
        return (
          <List.Accordion
            key={key}
            title={key}
            left={props => <List.Icon {...props} icon="calendar-range" />}>
            {attendanceLogs.get(key)?.map((tt, index) => {
              return (<List.Item key={index.toString()} title="First item" />
              );
            })}
          </List.Accordion>
        );
      })}
    </View>
  );
};

export default AttendanceLogsScreen;
