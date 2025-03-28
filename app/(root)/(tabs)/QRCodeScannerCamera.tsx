import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';

interface QRCodeScannerCameraProps {
    onQRCodeScanned: (data: string) => void;
}

const QRCodeScannerCamera: React.FC<QRCodeScannerCameraProps> = ({ onQRCodeScanned }) => {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const cameraRef = useRef<Camera>(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ data }) => {
        onQRCodeScanned(data);
    };

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <Camera
            ref={cameraRef}
            style={StyleSheet.absoluteFillObject}
            onBarCodeScanned={handleBarCodeScanned}
            barCodeScannerSettings={{
                barCodeTypes: ['qr'],
            }}
        />
    );
};

const styles = StyleSheet.create({
    camera: {
        flex: 1,
    },
});

export default QRCodeScannerCamera;