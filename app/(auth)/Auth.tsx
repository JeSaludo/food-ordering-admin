import React, { useState } from 'react'
import { Alert, Button, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { supabase } from 'utils/supabase'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false) // Track whether user is in sign-up mode or sign-in mode

  // Sign in function
  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) {
      Alert.alert(error.message)
    } else {
      Alert.alert('Successfully signed in!')
    }
    setLoading(false)
  }

  // Sign up function
  async function signUpWithEmail() {
    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) {
      Alert.alert(error.message)
    }
    if (!session) {
       Alert.alert('Please check your inbox for email verification!')
    } else {
      Alert.alert('Successfully signed up! Please verify your email.')
    }
    setLoading(false)
  }

  // Toggle between sign-in and sign-up views
  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp)
  }

  return (
    <View className=''>
      
      <TextInput className='border p-4 mx-4 rounded-md mb-2 '
      
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
       <TextInput className='border p-4 mx-4 rounded-md mb-2 '
      
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity onPress={signUpWithEmail} className='bg-blue-700 mx-4 p-4'>
        <Text className="text-center mx-auto text-white font-medium">
            Sign in
        </Text>
        </TouchableOpacity>

  
    </View>
  )
}

