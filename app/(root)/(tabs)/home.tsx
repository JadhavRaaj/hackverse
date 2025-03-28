import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.syncBanner}>
        <Text style={styles.syncText}>
          Turn on sync over mobile data to keep the stream up to date in the background.
        </Text>
        <View style={styles.syncButtons}>
          <TouchableOpacity style={styles.syncButton}>
            <Text style={styles.syncButtonText}>Dismiss</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.syncButton}>
            <Text style={styles.syncButtonText}>Go to settings</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.classCard}>
        <View style={styles.classHeader}>
          <Text style={styles.classTitle}>[Class Title]</Text>
          <TouchableOpacity style={styles.optionsButton}>
            <Text style={styles.optionsButtonText}>...</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.classSubtitle}>[Subtitle]</Text>
        <Text style={styles.teacherName}>[Teacher Name]</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.classCard}>
        <View style={styles.classHeader}>
          <Text style={styles.classTitle}>[Class Title]</Text>
          <TouchableOpacity style={styles.optionsButton}>
            <Text style={styles.optionsButtonText}>...</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.classSubtitle}>[Subtitle]</Text>
        <Text style={styles.teacherName}>[Teacher Name]</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.classCard}>
        <View style={styles.classHeader}>
          <Text style={styles.classTitle}>[Class Title]</Text>
          <TouchableOpacity style={styles.optionsButton}>
            <Text style={styles.optionsButtonText}>...</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.classSubtitle}>[Subtitle]</Text>
        <Text style={styles.teacherName}>[Teacher Name]</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.classCard}>
        <View style={styles.classHeader}>
          <Text style={styles.classTitle}>[Class Title]</Text>
          <TouchableOpacity style={styles.optionsButton}>
            <Text style={styles.optionsButtonText}>...</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.classSubtitle}>[Subtitle]</Text>
        <Text style={styles.teacherName}>[Teacher Name]</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.classCard}>
        <View style={styles.classHeader}>
          <Text style={styles.classTitle}>[Class Title]</Text>
          <TouchableOpacity style={styles.optionsButton}>
            <Text style={styles.optionsButtonText}>...</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.classSubtitle}>[Subtitle]</Text>
        <Text style={styles.teacherName}>[Teacher Name]</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  syncBanner: {
    backgroundColor: '#e0e0e0',
    padding: 15,
    marginBottom: 10,
  },
  syncText: {
    fontSize: 16,
    marginBottom: 10,
  },
  syncButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  syncButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginLeft: 10,
  },
  syncButtonText: {
    color: '#4a90e2',
  },
  classCard: {
    backgroundColor: 'white',
    padding: 15,
    margin: 10,
    borderRadius: 8,
  },
  classHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  classTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  optionsButton: {
    padding: 5,
  },
  optionsButtonText: {
    fontSize: 20,
  },
  classSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  teacherName: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#ffc107',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 30,
    color: 'white',
  },
});

export default HomeScreen;