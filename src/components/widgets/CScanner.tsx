import React, {memo, useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Camera, CameraType} from 'expo-camera';
import {Button, FAB, Title} from 'react-native-paper';
import {BlurView} from 'expo-blur';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Fonts} from '../../styles/CommonStyles';
import {showToast} from './Toaster';
import {SnackBarType} from './SnackBarCustom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Hint({children}: {children: string}) {
  return (
    <BlurView style={styles.hint} intensity={50} tint="dark">
      <Text style={styles.headerText}>{children}</Text>
    </BlurView>
  );
}

export interface CameraProps {
  onPunchIn: (image: string) => void;
  showSnackBar: (visible: boolean, message: string, type: SnackBarType) => void;
  setLoading: (loading: boolean) => void;
}

const CScanner = (props: CameraProps) => {
  const {bottom} = useSafeAreaInsets();
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [facesDetected, setFacesDetected] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const cameraRef = useRef<Camera>();

  const getCameraPicture = async () => {
    if (cameraRef.current) {
      const result = await cameraRef.current.takePictureAsync();
      console.log(result);
      return result;
    } else {
      console.log('CAMERA REF NULL');
    }
  };

  function toggleCameraType() {
    setType(current =>
      current === CameraType.back ? CameraType.front : CameraType.back,
    );
  }

  useEffect(() => {
    (async () => {
      if (!permission || !permission.granted) {
        const response = await requestPermission();
        if (!response.granted) {
          showToast('Please provide Camera Permissions!');
        }
      }
    })();
  }, [permission, requestPermission]);

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
      <Camera
        autoFocus={true}
        // @ts-ignore
        ref={cameraRef}
        onCameraReady={() => {
          setCameraReady(true);
        }}
        type={type}
        style={StyleSheet.absoluteFill}
        onFacesDetected={result => {
          console.log(result);
          if (result.faces.length >= 1) {
            setFacesDetected(true);
          }
        }}
      />
      <FAB
        size={'small'}
        icon="orbit-variant"
        style={styles.fab}
        onPress={() => {
          toggleCameraType();
        }}
      />
      <BlurView
        intensity={50}
        tint="dark"
        style={[styles.header, {bottom: bottom}, {padding: 12}]}>
        <Button
          textColor={'black'}
          buttonColor={'rgb(33,243,206)'}
          style={styles.punchButton}
          mode="contained"
          onPress={async () => {
            if (!cameraReady) {
              props.showSnackBar(
                true,
                'Please wait! Camera not ready',
                SnackBarType.FAILURE,
              );
              return;
            }
            if (!facesDetected) {
              props.showSnackBar(
                true,
                'No Face Detected! Please take proper selfie',
                SnackBarType.FAILURE,
              );
              return;
            }
            props.setLoading(true);
            const res = await getCameraPicture();
            const base64Image = res?.base64 || 'Unknown issue';
            await props.onPunchIn(base64Image);
            props.setLoading(false);
          }}>
          PUNCH IN/OUT
        </Button>
      </BlurView>
    </View>
  );
};

// exporting Scanner as Pure Component
export default memo(CScanner);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 80,
    right: -50,
    bottom: 0,
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
  punchButton: {
    color: 'black',
    borderRadius: 0,
    width: '100%',
    marginStart: 20,
    marginEnd: 20,
  },
});
