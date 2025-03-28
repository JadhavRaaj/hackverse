// selfie-verification.tsx (React Native)
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, ScrollView, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { supabase } from '../../../supabaseClient';
import axios, { AxiosError } from 'axios';

const SelfieVerification = () => {
    const { studentId } = useLocalSearchParams();
    const [selfie, setSelfie] = useState<string | null>(null);
    const [storedPhoto, setStoredPhoto] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!studentId) {
            Alert.alert('Error', 'Student ID not found. Please log in again.');
            router.push('/login');
            return;
        }

        const fetchStoredPhoto = async () => {
            setLoading(true);
            try {
                const { data, error } = await supabase
                    .from('users')
                    .select('studentPhoto')
                    .eq('studentId', studentId)
                    .single();

                if (error) {
                    throw error;
                }

                const base64String = data.studentPhoto;
                const base64Uri = `data:image/jpeg;base64,${base64String}`;

                setStoredPhoto(base64Uri);
            } catch (err) {
                console.error('Error fetching stored photo:', err);
                Alert.alert('Error', 'Failed to fetch stored photo.');
            } finally {
                setLoading(false);
            }
        };

        fetchStoredPhoto();
    }, [studentId]);

    const pickImage = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true,
        });

        if (!result.canceled) {
            setSelfie(result.assets[0].base64 || null);
        }
    };

    const handleVerify = async () => {
        if (!selfie || !storedPhoto) {
            Alert.alert('Error', 'Please capture a selfie.');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post('http://192.168.1.76:3000/verify-faces', {
                selfie: selfie,
                storedPhoto: storedPhoto,
            });

            const result = response.data;

            if (result.verified) {
                const { error: attendanceError } = await supabase
                    .from('attendance')
                    .insert([{ studentId: studentId }]); // simplified insert

                if (attendanceError) {
                    console.error('Supabase attendance insert error:', attendanceError);
                    Alert.alert('Error', 'Failed to save attendance data.'); // changed error message
                    setLoading(false); // Make sure to set loading to false in error case.
                    return; // Stop execution if attendance fails.
                }

                Alert.alert('Success', 'Attendance marked!');
                router.push('/(root)/(tabs)/home');
            } else {
                Alert.alert('Failed', 'Faces do not match.');
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Axios error:', error.message, error.response);
            } else {
                console.error('Network error:', error);
            }
            Alert.alert('Error', 'Verification failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView style={styles.container}>
            {loading && <ActivityIndicator size="large" color="#0000ff" />}

            {storedPhoto && <Image source={{ uri: storedPhoto }} style={styles.image} />}

            <TouchableOpacity style={styles.button} onPress={pickImage}>
                <Text style={styles.buttonText}>Capture Selfie</Text>
            </TouchableOpacity>

            {selfie && <Image source={{ uri: `data:image/jpeg;base64,${selfie}` }} style={styles.image} />}

            <TouchableOpacity style={styles.button} onPress={handleVerify}>
                <Text style={styles.buttonText}>Verify</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    image: {
        width: 200,
        height: 200,
        alignSelf: 'center',
        marginVertical: 10,
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

export default SelfieVerification;