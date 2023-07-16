import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { ServerGetRequest } from '../database/Database';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const TicketListScreen = () => {
    const [tickets, setTickets] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        fetchTicketList();
    }, []);

    const fetchTicketList = async () => {
        try {
            const response = await ServerGetRequest('tickets/user/64b0c1544835bbe03d5afc59');
            setTickets(response);
        } catch (error) {
            console.log('Error: Failed to fetch ticket list', error);
        }
    };

    const handleTicketPress = () => {
        navigation.navigate('ScanningResult', { ticket: item });
    };

    const handleGoBack = () => {
        navigation.goBack();
    };

    
    const renderItem = ({ item }) => {
        const ticketDate = new Date(item.ticket_date);
        const formattedDate = ticketDate.toLocaleDateString('fr-FR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });

        return (
            <TouchableOpacity style={styles.ticketItem} onPress={handleTicketPress}>
                <Text style={styles.ticketText}><Text style={styles.boldText}>Magasin:</Text> {item.magasin.nom}</Text>
                <Text style={styles.ticketText}><Text style={styles.boldText}>Dépense:</Text> ${item.total}</Text>
                <Text style={styles.ticketText}><Text style={styles.boldText}>Date:</Text> {formattedDate}</Text>
                <Text style={styles.ticketText}><Text style={styles.boldText}>Payement par:</Text> {item.client.methodePaiement}</Text>
            </TouchableOpacity>
        );
    };

   

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.goBackButton} onPress={handleGoBack}>
                <Ionicons name="arrow-back" size={'40%'} color="black" />
            </TouchableOpacity>
            <Text style={styles.title}>Liste de vos tickets</Text>
            {tickets.length > 0 ? (
                <FlatList
                    data={tickets}
                    keyExtractor={(item) => item._id}
                    renderItem={renderItem}
                    contentContainerStyle={styles.flatListContent}
                />
            ) : (
                <Text style={styles.noResultsText}>No tickets found</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 16,
        paddingTop: 20,
    },
    goBackButton: {
        position: 'absolute',
        top: '8%',
        left: '5%',
        zIndex: 1,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
        paddingTop: '20%',
    },
    flatListContent: {
        flexGrow: 1,
        paddingBottom: 16,
    },
    ticketItem: {
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
    },
    ticketText: {
        fontSize: 16,
        marginBottom: 4,
    },
    noResultsText: {
        fontSize: 16,
        textAlign: 'center',
    },
    boldText: {
        fontWeight: 'bold',
    },
});

export default TicketListScreen;
