import * as React from 'react';
import {useEffect, useState} from 'react';
import {Surface} from 'react-native-paper';
import AttendanceService from '../services/AttendanceService';
import {LoginResponse, PunchInOutRequest} from '../models/ApiModels';
import {
  RefreshControl,
  SectionList,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {CommonStyles, Fonts} from '../styles/CommonStyles';
import {useGlobalSessionState} from '../cache/AppState';

const attendanceService = new AttendanceService();
const getAttendanceLogs = async (
  employeeId: string,
): Promise<AttendanceLogItem[]> => {
  const logs = await attendanceService.getAttendanceLogs(employeeId);
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
  const arr: AttendanceLogItem[] = [];
  mapLogs.forEach((value, key) => {
    arr.push({title: key, data: value});
  });
  return arr;
};

interface AttendanceLogItem {
  title: string;
  data: PunchInOutRequest[];
}

const AttendanceLogsScreen = () => {
  const [attendanceLogs, setAttendanceLogs] = useState<AttendanceLogItem[]>([]);
  const sessionState = useGlobalSessionState();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    // @ts-ignore
    const employeeData = sessionState.getUserSession().user as LoginResponse;
    const result = await getAttendanceLogs(employeeData.employeeId);
    setAttendanceLogs(result);
    setRefreshing(false);
  }, [sessionState]);

  useEffect(() => {
    (async () => {
      // @ts-ignore
      const employeeData = sessionState.getUserSession().user as LoginResponse;
      const result = await getAttendanceLogs(employeeData.employeeId);
      setAttendanceLogs(result);
    })();
  }, [sessionState]);
  return (
    <View style={{flex: 1, padding: 10}}>
      <SectionList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        sections={attendanceLogs}
        keyExtractor={(item, index) => (item.timestamp + index).toString()}
        renderItem={({item}) => (
          <View style={styles.item}>
            <Text style={styles.title}>
              {new Date(item.timestamp).toLocaleTimeString()}
            </Text>
            <Text style={styles.title}>{item.type}</Text>
          </View>
        )}
        renderSectionHeader={({section: {title}}) => (
          <Surface
            style={[
              CommonStyles.bottom,
              styles.surface,
              {backgroundColor: 'blue'},
            ]}
            elevation={4}>
            <Text
              style={{
                fontFamily: Fonts.IBMPlexSans_700Bold,
                color: 'white',
                textAlign: 'center',
                padding: 10,
              }}>
              {title}
            </Text>
          </Surface>
        )}
      />
    </View>
  );
};

export default AttendanceLogsScreen;
const styles = StyleSheet.create({
  item: {
    backgroundColor: 'black',
    padding: 5,
    marginVertical: 4,
  },
  title: {
    fontSize: 15,
    fontFamily: Fonts.IBMPlexSans_400Regular,
  },
  surface: {
    padding: 8,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
});
