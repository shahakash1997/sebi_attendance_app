import * as React from 'react';
import {useCallback, useState} from 'react';
import {Divider, Surface, Text} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import {CommonStyles} from '../styles/CommonStyles';
import CScanner from '../components/widgets/CScanner';
import SnackbarCustom, {
  SnackBarType,
} from '../components/widgets/SnackBarCustom';
import AttendanceService from '../services/AttendanceService';
import AppLocalStorage, {CACHE_KEYS} from '../cache/AppLocalStorage';
import {AttendanceType, LoginResponse} from '../models/ApiModels';
import LocationManager from '../manager/LocationManager';
import {getDeviceInfo} from '../utils/utils';
import ProgressDialog from '../components/widgets/ProgressDialog';
import {
  MOCK_ERROR_MESSAGE,
  NOT_AT_OFFICE_LOCATION,
} from '../constants/constants';
import {checkTime, checkUserDistanceFromOffice} from '../utils/attendanceUtils';
import {useIsFocused} from '@react-navigation/native';
import {useGlobalSessionState} from '../cache/AppState';
import useCurrentDistance from '../manager/LocationCustomHook';

const attendanceService = new AttendanceService();
const cache = AppLocalStorage.getInstance();
const locationManager = LocationManager.getInstance();
const AttendanceScreen = () => {
  const isFocused = useIsFocused();
  const sessionState = useGlobalSessionState();
  const [snackBar, showSnackBar] = useState(false);
  const [lastPunchData, setLastPunchData] = useState(null);
  const [snackMessage, setSnackMessage] = useState('');
  const [snackMessageType, setSnackMessageType] = useState<SnackBarType>(
    SnackBarType.SUCCESS,
  );
  const distance = useCurrentDistance();
  const [mLoading, setLoading] = useState(false);
  const showSnackBarView = useCallback(
    (visible: boolean, message: string, type: SnackBarType) => {
      showSnackBar(visible);
      setSnackMessage(message);
      setSnackMessageType(type);
    },
    [],
  );
  return (
    <View style={CommonStyles.mainContainer}>
      <ProgressDialog visible={mLoading} label={'Please wait'} />
      <Surface style={styles.surface} elevation={4}>
        <Text> {new Date().toDateString()}</Text>
      </Surface>
      <Divider
        bold={true}
        style={{backgroundColor: 'rgb(33,243,206)', padding: 2}}
      />
      <View style={{flex: 1}}>
        <CScanner
          cameraVisible={isFocused}
          setLoading={setLoading}
          showSnackBar={showSnackBarView}
          onPunchIn={async image => {
            console.log(image.length);
            if (!sessionState.getUserSession()) {
              throw new Error('No Employee found! Please wait');
            }
            const cLocation = await locationManager.getCurrentPositionAsync();
            if (cLocation.mocked) {
              throw new Error(MOCK_ERROR_MESSAGE);
            }
            if (
              (await checkUserDistanceFromOffice(
                cLocation,
                sessionState.getUserSession(),
              )) > 200
            ) {
              throw new Error(NOT_AT_OFFICE_LOCATION);
            }
            if (!checkTime()) {
              throw new Error('Cannot Punch in at this time!');
            }
            const employeeData = (await cache.getObjectFromCache(
              CACHE_KEYS.USER_INFO,
            )) as LoginResponse;
            await attendanceService.punchAttendance({
              timestamp: new Date().valueOf(),
              employeeId: employeeData.employeeId,
              employeeName: employeeData.name,
              userToken: 'Test_token', //todo change this
              userLocation: {
                latitude: cLocation.coords.latitude,
                longitude: cLocation.coords.longitude,
                timestamp: cLocation.timestamp,
                accuracy: cLocation.coords.accuracy,
              },
              type: AttendanceType.PUNCH_IN,
              deviceConfig: getDeviceInfo(),
            });
          }}
        />
      </View>
      {distance !== -1 && (
        <Surface
          style={[
            CommonStyles.bottom,
            styles.surface,
            {backgroundColor: 'blue'},
          ]}
          elevation={4}>
          <Text style={{color: 'white', textAlign: 'center', padding: 10}}>
            {`You are ${JSON.stringify(
              distance,
            )}m away from your office.Kindly mark attendance only in the office premises`}
          </Text>
        </Surface>
      )}
      <SnackbarCustom
        visible={snackBar}
        message={snackMessage}
        type={snackMessageType}
        onDismiss={() => {
          showSnackBar(false);
          setSnackMessageType(SnackBarType.SUCCESS);
          setSnackMessage('');
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  surface: {
    padding: 8,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  blurViewButton: {
    padding: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 0,
  },
});

export default AttendanceScreen;
