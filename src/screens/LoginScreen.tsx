import * as React from 'react';
import {useState} from 'react';
import {Button, TextInput} from 'react-native-paper';
import {Image, StyleSheet, View} from 'react-native';
import {useGlobalSessionState} from '../cache/AppState';
import {CommonStyles} from '../styles/CommonStyles';
import {isNullOrEmpty} from '../utils/utils';
import SnackbarCustom, {
  SnackBarType,
} from '../components/widgets/SnackBarCustom';
import AuthService from '../services/AuthService';
import AppLocalStorage, {CACHE_KEYS} from '../cache/AppLocalStorage';
import LocationManager from '../manager/LocationManager';

const locationManager = LocationManager.getInstance();
const authService = new AuthService();
const LoginScreen = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const sessionState = useGlobalSessionState();
  const [isLoading, setLoading] = useState(false);
  const [uError, setUError] = useState(false);
  const [pError, setPError] = useState(false);
  const [sVisible, setSVisible] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');

  return (
    <View style={{flex: 1}}>
      <View style={[CommonStyles.mainContainer, {padding: 20}]}>
        <Image
          style={styles.tinyLogoHeader}
          source={{uri: 'https://www.sebi.gov.in/images/logo.png'}}
        />
        <TextInput
          maxLength={4}
          error={uError}
          keyboardType={'number-pad'}
          style={styles.textInputStyle}
          multiline={false}
          mode={'outlined'}
          label="SEBI Employee Id"
          value={employeeId}
          onChangeText={text => {
            setUError(false);
            setEmployeeId(text);
            setSnackMessage('');
          }}
        />
        <TextInput
          error={pError}
          style={styles.textInputStyle}
          secureTextEntry={true}
          multiline={false}
          mode={'outlined'}
          label="Password"
          value={password}
          onChangeText={text => {
            setPError(false);
            setSnackMessage('');
            setPassword(text);
          }}
        />
        <Button
          style={styles.loginBtn}
          textColor={'black'}
          buttonColor={'rgb(33,243,206)'}
          loading={isLoading}
          mode="elevated"
          onPress={async () => {
            try {
              if (isNullOrEmpty(employeeId)) {
                setSVisible(true);
                setSnackMessage('Please enter valid employeeId');
                setUError(true);
                return;
              } else if (isNullOrEmpty(password)) {
                setSVisible(true);
                setSnackMessage('Please enter valid password');
                setPError(true);
              } else {
                if (!(await locationManager.isLocationServicesEnabled())) {
                  setSnackMessage('Enable Location first!');
                  setSVisible(true);
                  return;
                }
                if (!(await locationManager.checkForLocationPermissions())) {
                  setSnackMessage('Please provide Location Permissions first!');
                  return;
                }
                setUError(false);
                setPError(false);
                setSVisible(false);
                // Calling Login API
                setLoading(true);
                const data = await authService.login(employeeId, password);
                await AppLocalStorage.getInstance().setObjectInCache(
                  CACHE_KEYS.USER_INFO,
                  data,
                );
                setLoading(false);
                sessionState.setUserSession({
                  isLoggedIn: true,
                  token: data.authToken,
                  user: data,
                });
              }
            } catch (error: any) {
              setSnackMessage(error?.response?.data?.error?.description);
              setSVisible(true);
              setLoading(false);
            }
          }}>
          Login
        </Button>
      </View>
      <SnackbarCustom
        type={SnackBarType.FAILURE}
        visible={sVisible}
        message={snackMessage}
        onDismiss={() => {
          setSVisible(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInputStyle: {
    marginBottom: 10,
  },
  container: {
    backgroundColor: 'black',
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  logoStyle: {
    width: 60,
    height: 50,
    justifyContent: 'center',
    alignContent: 'center',
    marginBottom: 10,
  },
  tinyLogoHeader: {
    marginBottom: 20,
    height: 40,
  },
  loginBtn: {
    borderRadius: 0,
  },
});

export default LoginScreen;
