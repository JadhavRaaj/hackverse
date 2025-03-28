import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { CameraView, useCameraPermissions, BarcodeScanningResult } from 'expo-camera';

interface QRCodeScannerCameraProps {
    onQRCodeScanned: (data: string) => void;
}

const QRCodeScannerCamera: React.FC<QRCodeScannerCameraProps> = ({ onQRCodeScanned }) => {
    const [hasPermission, requestPermission] = useCameraPermissions();
    const [facing, setFacing] = useState<'back' | 'front'>('back'); // Use string literal

    useEffect(() => {
        if (!hasPermission) {
            requestPermission();
        }
    }, [hasPermission, requestPermission]);

    if (!hasPermission) {
        return <View />;
    }

    if (!hasPermission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need your permission to show the camera</Text>
            </View>
        );
    }

    const handleBarCodeScanned = (scanningResult: BarcodeScanningResult) => {
        if (scanningResult.type === 'qr') {
            onQRCodeScanned(scanningResult.data);
        }
    };

    return (
        <CameraView
            style={styles.camera}
            facing={facing}
            barcodeScannerSettings={{
                barcodeTypes: ['qr'],
            }}
            onBarcodeScanned={handleBarCodeScanned}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    camera: {
        flex: 1,
    },
});

export default QRCodeScannerCamera;