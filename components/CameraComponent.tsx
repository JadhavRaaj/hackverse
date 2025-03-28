import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';
import * as FaceDetector from 'expo-face-detector';

interface CameraComponentProps {
  onCapture: (base64: string) => void;
}

const CameraComponent: React.FC<CameraComponentProps> = ({ onCapture }) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [type, setType] = useState(CameraType.front);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const cameraRef = useRef<Camera>(null);
  const [faces, setFaces] = useState<FaceDetector.Face[]>([]);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handleCapture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ base64: true });
      if (photo.base64) {
        const manipResult = await ImageManipulator.manipulateAsync(
          photo.uri,
          [{ resize: { width: 600 } }],
          { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG, base64: true }
        );
        setCapturedImage(manipResult.base64);
        onCapture(manipResult.base64);
      }
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
  };

  const handleFacesDetected = ({ faces }: { faces: FaceDetector.Face[] }) => {
    setFaces(faces);
  };

  return (
    <View style={styles.container}>
      {capturedImage ? (
        <View>
          <Image source={{ uri: `data:image/jpeg;base64,${capturedImage}` }} style={styles.preview} />
          <TouchableOpacity style={styles.button} onPress={handleRetake}>
            <Text style={styles.buttonText}>Retake</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Camera
          style={styles.camera}
          type={type}
          ref={cameraRef}
          onFacesDetected={handleFacesDetected}
          faceDetectorSettings={{
            mode: FaceDetector.FaceDetectorMode.fast,
            detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
            runClassifications: FaceDetector.FaceDetectorClassifications.none,
            minDetectionInterval: 100,
            tracking: false,
          }}
        >
          {faces.map((face) => (
            <View
              key={face.faceID}
              style={[
                styles.faceRect,
                {
                  left: face.bounds.origin.x,
                  top: face.bounds.origin.y,
                  width: face.bounds.size.width,
                  height: face.bounds.size.height,
                },
              ]}
            />
          ))}
          <TouchableOpacity style={styles.button} onPress={handleCapture}>
            <Text style={styles.buttonText}>Capture</Text>
          </TouchableOpacity>
        </Camera>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  button: {
    alignSelf: 'center',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#2196F3',
    margin: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  preview: {
    alignSelf: 'stretch',
    flex: 1,
  },
  faceRect: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: 'red',
  },
});

export default CameraComponent;