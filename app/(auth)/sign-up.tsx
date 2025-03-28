import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { supabase } from '../../supabaseClient';

const SignUpScreen = () => {
  const [studentId, setStudentId] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentPhoto, setStudentPhoto] = useState<string | null>(null);
  const [year, setYear] = useState('FE');
  const [division, setDivision] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [dob, setDob] = useState(''); // Date of Birth (DOB) state
  const router = useRouter();

  const handleChoosePhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
      base64: true,
    });

    if (!result.canceled) {
      setStudentPhoto(result.assets[0].base64);
    }
  };

  const handleTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
      base64: true,
    });

    if (!result.canceled) {
      setStudentPhoto(result.assets[0].base64);
    }
  };

  const handleSignUp = async () => {
    try {
      // Check if studentId already exists
      const { data: existingUser, error: existingUserError } = await supabase
        .from('users')
        .select('*')
        .eq('studentId', studentId);

      if (existingUserError) {
        console.error('Error checking existing user:', existingUserError);
        alert('An error occurred. Please try again.');
        return;
      }

      if (existingUser && existingUser.length > 0) {
        alert('Student ID already exists.');
        return;
      }

      const { error: insertError } = await supabase.from('users').insert([
        {
          studentId: studentId,
          studentName: studentName,
          studentPhoto: studentPhoto,
          year: year,
          division: division,
          rollNo: rollNo,
          dob: dob, // Store DOB as password replacement
        },
      ]);

      if (insertError) {
        console.error('Error inserting user data:', insertError);
        alert('Failed to save user data.');
        return;
      }

      router.push('/(root)/(tabs)/home');
    } catch (error) {
      console.error('Error signing up (catch block):', error);
      alert('Sign up failed: ' + error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.photoContainer} onPress={handleChoosePhoto}>
        {studentPhoto ? (
          <Image
            source={{ uri: `data:image/jpeg;base64,${studentPhoto}` }}
            style={styles.photo}
          />
        ) : (
          <View style={styles.photoPlaceholder}>
            <Text style={styles.photoPlaceholderText}>Upload Photo</Text>
          </View>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.photoContainer} onPress={handleTakePhoto}>
        <Text>Take Photo</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Student ID (Alphanumeric)"
        value={studentId}
        onChangeText={setStudentId}
      />
      <TextInput
        style={styles.input}
        placeholder="Student Name"
        value={studentName}
        onChangeText={setStudentName}
      />

      <Picker
        selectedValue={year}
        style={styles.picker}
        onValueChange={(itemValue) => setYear(itemValue)}
      >
        <Picker.Item label="FE" value="FE" />
        <Picker.Item label="SE" value="SE" />
        <Picker.Item label="TE" value="TE" />
        <Picker.Item label="BE" value="BE" />
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Division"
        value={division}
        onChangeText={setDivision}
      />
      <TextInput
        style={styles.input}
        placeholder="Roll No."
        value={rollNo}
        onChangeText={setRollNo}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Date of Birth (DDMMYYYY)"
        value={dob}
        onChangeText={setDob}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/auth/welcome')}>
        <Text style={styles.linkText}>Back to Welcome</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  photoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  photoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoPlaceholderText: {
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  picker: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
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
});

export default SignUpScreen;