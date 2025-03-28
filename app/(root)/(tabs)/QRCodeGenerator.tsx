import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TextInput, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const QRCodeGenerator = () => {
    const [classId, setClassId] = useState('');
    const [qrValue, setQrValue] = useState<string | null>(null);

    const generateQRCode = () => {
        if (!classId) {
            Alert.alert('Error', 'Please enter Class ID.');
            return;
        }
        setQrValue(classId);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter Class ID"
                value={classId}
                onChangeText={setClassId}
            />
            <TouchableOpacity style={styles.button} onPress={generateQRCode}>
                <Text style={styles.buttonText}>Generate QR Code</Text>
            </TouchableOpacity>
            {qrValue && <QRCode value={qrValue} size={200} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: '80%',
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default QRCodeGenerator;