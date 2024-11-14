import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Switch, StyleSheet } from 'react-native';
import { supabase } from 'utils/supabase';

const AddMenuItem = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [availability, setAvailability] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleAddMenuItem = async () => {
    // Basic validation
    if (!name || !price) {
      Alert.alert('Error', 'Please enter all required fields');
      return;
    }

    setLoading(true);

    // Convert price to a number before submitting
    const parsedPrice = parseFloat(price);

    // Insert the new menu item into the `menu_items` table
    const { data, error } = await supabase.from('menu_items').insert([
      {
        name,
        description,
        price: parsedPrice,
        availability,
      }
    ]);

    if (error) {
      Alert.alert('Error', error.message);
      setLoading(false);
    } else {
      Alert.alert('Success', 'Menu item added successfully');
      // Reset form fields after successful submission
      setName('');
      setDescription('');
      setPrice('');
      setAvailability(true);
      setLoading(false);
    }
  };

  return (
    <View >
      <Text className='text-center p-4' >Add New Menu Item</Text>

      <TextInput className='p-4 mx-4 border rounded-md mt-4  '
        placeholder="Name"
        value={name}
        onChangeText={text => setName(text)}
       
      />

      <TextInput
        placeholder="Description" className='p-4 mx-4 border rounded-md mt-4 '
        value={description}
        onChangeText={text => setDescription(text)}
        
      />

      <TextInput
        placeholder="Price" className='p-4 mx-4 border rounded-md mt-4  '
        value={price}
        onChangeText={text => setPrice(text)}
       
        keyboardType="numeric"
      />

    <View className="flex-row items-center space-x-2 p-4">
        <Text>Available</Text>
        <Switch
            value={availability}
            onValueChange={() => setAvailability(!availability)}
        />
    </View>


      <TouchableOpacity
       className="bg-blue-700 p-4 mx-4 rounded-lg"
        onPress={handleAddMenuItem}
        disabled={loading}
      >
        <Text className='text-white text-center font-medium'>
          {loading ? 'Adding...' : 'Add Item'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddMenuItem;
