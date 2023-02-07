import React, {memo, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Camera, CameraType} from 'expo-camera';
import {Title} from 'react-native-paper';
import {BlurView} from 'expo-blur';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Fonts} from '../../styles/CommonStyles';

function Hint({children}: {children: string}) {
  return (
    <BlurView style={styles.hint} intensity={50} tint="dark">
      <Text style={styles.headerText}>{children}</Text>
    </BlurView>
  );
}
const CScanner = (props: CScannerProps) => {
  const [isVisible, setVisible] = useState(true);
  const {bottom} = useSafeAreaInsets();

  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  useEffect(() => {
    (async () => {
      if (!permission || !permission.granted){
        const response = await requestPermission();
        if (response.granted)
      }
      let response = await checkCameraPermissionUtil();
      setHasPermission(response);
    })();
  }, []);

  if (!permission || !permission.granted) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Title>
          {
            'No Permissions for Camera. Please provide camera permissions from app\
            settings.'
          }
        </Title>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {isVisible ? <Camera style={StyleSheet.absoluteFill} /> : null}
      <View style={[styles.header, {bottom: 16 + bottom}]}>
        <Hint>{'Punch In'}</Hint>
      </View>
    </View>
  );
};

// exporting Scanner as Pure Component
export default memo(CScanner);

export interface CScannerProps {
  barCodeTypes: any[];
  onScanned: (value: string) => void;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hint: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerText: {
    color: '#fff',
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  header: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    fontFamily: Fonts.IBMPlexSans_600SemiBold,
  },
});
