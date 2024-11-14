import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import { supabase } from 'utils/supabase'; // Adjust the path as necessary

const MenuItems = () => {
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        const fetchMenuItems = async () => {
            const { data, error }: any = await supabase
                .from('menu_items')
                .select('*');

            if (error) {
                console.error('Error fetching menu items:', error);
              
            } else {
                setMenuItems(data);
            }
        };

        fetchMenuItems();
    }, []);

    return (
        <View>
            <FlatList
                data={menuItems}
                keyExtractor={(item:any) => item.id.toString()}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.name}</Text>
                        <Text>{item.description}</Text>
                        <Text>{item.price}</Text>
                    </View>
                )}
            />
        </View>
    );
};

export default MenuItems;
