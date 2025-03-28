import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const AttendanceMenu = () => {
    const router = useRouter();

    const navigateToQRCodeGenerator = () => {
        router.push('/(root)/(tabs)/QRCodeGenerator')
    };

    const navigateToQRCodeScanner = () => {
        router.push('/(root)/(tabs)/QRCodeScanner');
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