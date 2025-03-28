import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

const AttendanceMenu = () => {
    const router = useRouter();
    const { studentId } = useLocalSearchParams(); // Access studentId from params

    console.log('AttendanceMenu: Student ID from params:', studentId); // Added log

    const navigateToQRCodeGenerator = () => {
        router.push('/(root)/(tabs)/QRCodeGenerator');
    };

    const navigateToQRCodeScanner = () => {
        if (!studentId) {
            console.error('AttendanceMenu: Student ID is not available.');
            return;
        }

        router.push({
            pathname: '/(root)/(tabs)/QRCodeScanner',
            params: { studentId: studentId },
        });
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={navigateToQRCodeGenerator}>
                <Text style={styles.buttonText}>Create QR</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={navigateToQRCodeScanner}>
                <Text style={styles.buttonText}>Scan QR</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 10,
        width: '80%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default AttendanceMenu;