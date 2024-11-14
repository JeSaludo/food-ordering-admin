import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import  Auth  from 'app/(auth)/Auth';
import { createClient, Session } from '@supabase/supabase-js'
import { supabase } from '~/utils/supabase';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function Details() {
     const [session, setSession] = useState<Session | null>(null)

    useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
      })

      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      })
  }, [])

  return (
    <SafeAreaView>
      <Auth/>
      {session && session.user && <Text>{session.user.id}</Text>}
    </SafeAreaView>
  )
}
