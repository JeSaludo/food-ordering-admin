import { View, Text, Alert, TextInput, Button } from 'react-native'
import React, { useState } from 'react'
import { supabase } from '~/utils/supabase';
import { AuthError, AuthResponse, User } from '@supabase/supabase-js';

const AdminRegister = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
    try {
      // De-structure to access `session` directly from `data`
      const {
        data: { session, user },
        error,
      }: AuthResponse = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        Alert.alert('Error', error.message);
        return;
      }

      if (user) {
        // Insert profile information into the database for the registered user
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([{ user_id: user.id, is_admin: true }]);

        if (profileError) {
          Alert.alert('Error', profileError.message);
        } else {
          Alert.alert('Success', 'Admin registered successfully!');
        }
      }
    } catch (error) {
      console.error('Registration error:', (error as Error).message);
    }
  };
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Admin Register</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 20,
          borderRadius: 5,
        }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 20,
          borderRadius: 5,
        }}
      />
      <Button title="Register as Admin" onPress={handleRegister} />
    </View>
  );
};


export default AdminRegister