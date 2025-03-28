import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { supabase } from '../../../supabaseClient';
import { useRouter, useLocalSearchParams } from 'expo-router';
import QRCodeScannerCamera from './QRCodeScannerCamera' // Import the new component

const QRCodeScanner = () => {
    const [scanned, setScanned] = useState(false);
    const { studentId } = useLocalSearchParams();
    const router = useRouter();


    console.log('QRCodeScanner: Student ID from params:', studentId);

    const handleQRCodeScanned = async (data: string) => {
        if (scanned) return;
        setScanned(true);

        if (!studentId) {
            Alert.alert('Error', 'Student ID not found.');
            return;
        }

        try {
            const { error: qrAttendanceError } = await supabase
                .from('qr_attendance')
                .insert([{ studentId: studentId }]);

            if (qrAttendanceError) {
                console.error('QR attendance insert error:', qrAttendanceError);
                Alert.alert('Error', 'Failed to mark QR attendance.');
                return;
            }

            Alert.alert('Success', 'QR Attendance marked!');
            router.push('/(root)/(tabs)/home');
        } catch (error) {
            console.error('Error marking QR attendance:', error);
            Alert.alert('Error', 'Failed to mark QR attendance.');
        }
    };

    return (
        <View style={styles.container}>
            <QRCodeScannerCamera onQRCodeScanned={handleQRCodeScanned} />
            {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
});

export default QRCodeScanner;