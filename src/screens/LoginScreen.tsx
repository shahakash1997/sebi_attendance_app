import * as React from 'react';
import {useState} from 'react';
import {Button, TextInput} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import {useGlobalSessionState} from '../cache/AppState';

const LoginScreen = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const sessionState = useGlobalSessionState();
  const [isLoading, setLoading] = useState(false);
  return (
    <View style={styles.container}>
      <TextInput
        multiline={false}
        mode={'outlined'}
        label="SEBI Employee Id"
        value={employeeId}
        onChangeText={text => setEmployeeId(text)}
      />
      <TextInput
        secureTextEntry={true}
        multiline={false}
        mode={'outlined'}
        label="Password"
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <Button
        loading={isLoading}
        mode="elevated"
        onPress={() => {
          console.log('Log In API will be called here');
          setLoading(true);
          sessionState.setUserSession({
            isLoggedIn: true,
            token: 'null',
            user: {name: 'akash shah'},
          });
        }}>
        Login
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default LoginScreen;
