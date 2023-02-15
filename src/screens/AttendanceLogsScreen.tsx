import * as React from 'react';
import {useEffect, useState} from 'react';
import {Card, List, Surface, Text} from 'react-native-paper';
import AttendanceService from '../services/AttendanceService';
import AppLocalStorage, {CACHE_KEYS} from '../cache/AppLocalStorage';
import {LoginResponse, PunchInOutRequest} from '../models/ApiModels';
import {FlatList, StyleSheet, View} from 'react-native';
import {CommonStyles} from '../styles/CommonStyles';

const attendanceService = new AttendanceService();
const cache = AppLocalStorage.getInstance();

const ListItem = ({lineItem}: {lineItem: PunchInOutRequest}) => (
  <Card>
    <Card.Title
      title={new Date(lineItem.timestamp).toLocaleTimeString()}
      subtitle={lineItem.type}
    />
  </Card>
);

const renderItem = ({item}: {item: PunchInOutRequest}) => (
  <ListItem lineItem={item} />
);

const AttendanceLogsScreen = () => {
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
      setAttendanceLogs(mapLogs);
    })();
  }, []);
  return (
    <View style={{flex: 1}}>
      {Array.from(attendanceLogs).map(([key, value]) => {
        return (
          <Surface
            key={key}
            elevation={4}>
            <Text style={{color: 'white', textAlign: 'center', padding: 10}}>
              {key}
            </Text>
            <FlatList
              data={attendanceLogs.get(key)}
              renderItem={renderItem}
              keyExtractor={item => item.timestamp.toString()}
            />
          </Surface>
        );
      })}
    </View>
  );
};

export default AttendanceLogsScreen;
const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  surface: {
    padding: 8,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
