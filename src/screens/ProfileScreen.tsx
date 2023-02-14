import * as React from 'react';
import { useEffect, useRef, useState } from "react";
import {Button, Surface} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import {LoginResponse} from '../models/ApiModels';
import {useGlobalSessionState} from '../cache/AppState';
import AppLocalStorage, {CACHE_KEYS} from '../cache/AppLocalStorage';
import { timeDelay } from "../utils/utils";

const cache = AppLocalStorage.getInstance();
const ProfileScreen = () => {
  const sessionState = useGlobalSessionState();
  const [loading, setLoading] = useState(false);
  const employeeRef = useRef<LoginResponse>();
  useEffect(() => {
    const data = sessionState.getUserSession().user;
    if (data) {
      const empData = data as LoginResponse;
      employeeRef.current = empData;
      console.log(employeeRef.current);
    }
  }, [sessionState]);

  return (
    <View style={{flex: 1}}>
      <Surface style={styles.surface} elevation={4}>
        <View>
          <Button
            loading={loading}
            icon="logout"
            mode="contained"
            onPress={async () => {
              setLoading(true);
              await cache.clearKeys([CACHE_KEYS.USER_INFO]);
              await timeDelay(3);
              sessionState.setUserSession({
                isLoggedIn: false,
                token: null,
                user: null,
              });
              setLoading(false);

            }}>
            Logout
          </Button>
        </View>
      </Surface>
    </View>
  );
};

const styles = StyleSheet.create({
  surface: {
    padding: 8,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ProfileScreen;
