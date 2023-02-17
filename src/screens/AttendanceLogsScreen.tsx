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
import {Fonts} from '../styles/CommonStyles';
import {useGlobalSessionState} from '../cache/AppState';
import {getCurrentDate, getWeekDayName} from '../utils/utils';
import {showToast} from '../components/widgets/Toaster';

const attendanceService = new AttendanceService();
const getAttendanceLogs = async (
  employee: any,
): Promise<AttendanceLogItem[]> => {
  try {
    console.log('Attendance Logs called');
    if (!employee) {
      throw new Error('No Employee exists');
    }
    const employeeData = employee as LoginResponse;
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
    const arr: AttendanceLogItem[] = [];
    mapLogs.forEach((value, key) => {
      arr.push({title: key, data: value});
    });
    return arr;
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
};

interface AttendanceLogItem {
  title: string;
  data: PunchInOutRequest[];
}

// @ts-ignore
const sectionItem = ({section: {title}}) => (
  <Surface style={[styles.surface, {backgroundColor: 'blue'}]} elevation={3}>
    <Text
      style={{
        fontFamily: Fonts.IBMPlexSans_700Bold,
        color: 'white',
        padding: 8,
      }}>
      {`Date: ${getCurrentDate(title)}`}
    </Text>
  </Surface>
);

const listItem = ({item}: any) => (
  <View style={styles.item}>
    <Text style={styles.title}>
      {getWeekDayName(new Date(item.timestamp).getDay())}
    </Text>
    <Text style={styles.title}>
      {new Date(item.timestamp).toLocaleTimeString()}
    </Text>
    <Text style={styles.title}>{item.type}</Text>
  </View>
);
const AttendanceLogsScreen = () => {
  const [attendanceLogs, setAttendanceLogs] = useState<AttendanceLogItem[]>([]);
  const sessionState = useGlobalSessionState();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    try {
      setRefreshing(true);
      const employeeDetails = sessionState.getUserSession()?.user;
      const result = await getAttendanceLogs(employeeDetails);
      setAttendanceLogs(result);
      setRefreshing(false);
    } catch (error: any) {
      setRefreshing(false);
      showToast(`Error ${error.message}`);
    }
  }, [sessionState]);

  useEffect(() => {
    console.log('Mounted!');
    onRefresh().then().catch();
    return () => {
      console.log('Un-Mounted!');
    };
  }, []);

  return (
    <View style={{flex: 1, padding: 10}}>
      <SectionList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        sections={attendanceLogs}
        keyExtractor={(item, index) => (item.timestamp + index).toString()}
        renderItem={listItem}
        renderSectionHeader={sectionItem}
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
    padding: 3,
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
