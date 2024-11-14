import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Button, TextInput, View, Text } from 'react-native';
import { supabase } from '~/utils/supabase';
import AdminRegister from './(admin)/register';
import AddMenuItem from './component/add-menu';
import MenuItemsScreen from './component/get-menu';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      console.log('User created:', data);
      // Handle successful signup (e.g., navigate to login or home screen)
    }
  };

  return (
    <>
      <AdminRegister></AdminRegister>
      <View>
        {/* <AdminRegister/> */}
        <AddMenuItem/>
        <MenuItemsScreen></MenuItemsScreen>
    </View>
    </>
  );
}


