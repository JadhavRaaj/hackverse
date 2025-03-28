import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../../supabaseClient';

const SignInScreen = () => {
    const [studentId, setStudentId] = useState('');
    const [dob, setDob] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSignIn = async () => {
        try {
            const { data, error: selectError } = await supabase
                .from('users')
                .select('*')
                .eq('studentId', studentId)
                .eq('dob', dob);

            if (selectError) {
                setError('An error occurred. Please try again.');
                return;
            }

            if (data && data.length > 0) {
                console.log('SignInScreen: Student ID before navigation:', studentId); // Added log
                router.push({
                    pathname: '/(root)/(tabs)/selfie-verification',
                    params: { studentId: studentId },
                });
            } else {
                setError('Invalid Student ID or Date of Birth.');
            }
        } catch (err) {
            console.error('Sign-in error:', err);
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <ScrollView style={styles.container}>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <TextInput
                style={styles.input}
                placeholder="Student ID (Alphanumeric)"
                value={studentId}
                onChangeText={setStudentId}
            />
            <TextInput
                style={styles.input}
                placeholder="Date of Birth (DDMMYYYY)"
                value={dob}
                onChangeText={setDob}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleSignIn}>
                <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/auth/signup')}>
                <Text style={styles.linkText}>Sign Up</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    button: {
        backgroundColor: '#4a90e2',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    linkText: {
        marginTop: 15,
        textAlign: 'center',
        color: 'blue',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
        textAlign: 'center',
    },
});

export default SignInScreen;