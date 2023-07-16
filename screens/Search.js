import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';
import { ServerPostRequest } from '../database/Database';

const SearchScreen = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const userID = '64b0c1544835bbe03d5afc59';

    const handleSearch = async () => {
        const requestData = {
            searchWord: searchTerm,
        };

        const response = await ServerPostRequest(`statistics/articles/search/${userID}`, requestData);

        if (response) {
            setSearchResults(response);
        } else {
            console.log('Error: Failed to fetch search results');
        }
    };

    const renderSearchButtonStyle = () => {
        if (searchTerm.length > 0) {
            return [styles.searchButton, styles.searchButtonActive];
        } else {
            return styles.searchButton;
        }
    };

    const renderItem = ({ item }) => {
        const ticketDate = new Date(item.ticketDate);
        const formattedDate = ticketDate.toLocaleDateString('fr-FR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });

        return (
            <TouchableOpacity style={styles.card} key={item.productId}>
                <Text style={styles.cardTitle}>{item.nom}</Text>
                <Text style={styles.cardLabel}>
                    <Text style={styles.cardLabelBold}>Magasin: </Text>
                    <Text style={styles.cardValue}>IGA</Text>
                </Text>
                <Text style={styles.cardLabel}>
                    <Text style={styles.cardLabelBold}>Prix: </Text>
                    <Text style={styles.cardValue}>${item.prix}</Text>
                </Text>
                <Text style={styles.cardLabel}>
                    <Text style={styles.cardLabelBold}>Date: </Text>
                    <Text style={styles.cardValue}>{formattedDate}</Text>
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Recherche de produit</Text>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Enter search term"
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                />
                <TouchableOpacity style={renderSearchButtonStyle()} onPress={handleSearch}>
                    <Text style={styles.searchButtonText}>Search</Text>
                </TouchableOpacity>
            </View>
            {searchResults.length > 0 ? (
                <FlatList
                    data={searchResults}
                    keyExtractor={(i, index) => index.toString()}
                    renderItem={renderItem}
                    contentContainerStyle={styles.flatListContent}
                    showsVerticalScrollIndicator={false} 
                />
            ) : (
                // <Text style={styles.noResultsText}>No results found</Text>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={{ uri: "https://media2.giphy.com/media/0GsNMsRwDKKMjiwIe5/giphy.gif?cid=ecf05e47wc5jb4q8yt7gma4nbu2450180lrckaffs9iathgo&ep=v1_gifs_search&rid=giphy.gif&ct=g" }} style={{ width: '50%', aspectRatio: 1 }} />
                </View>
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
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
        paddingTop: '20%',
    },
    searchContainer: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    searchInput: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        marginRight: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    searchButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ccc',
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    searchButtonActive: {
        backgroundColor: '#306bab',
    },
    searchButtonText: {
        fontSize: 14,
    },
    flatListContent: {
        flexGrow: 1,
        paddingBottom: 16,
    },
    card: {
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    cardLabel: {
        fontSize: 14,
        marginBottom: 4,
    },
    cardLabelBold: {
        fontWeight: 'bold',
    },
    cardValue: {
        fontWeight: 'normal',
    },
    noResultsText: {
        fontSize: 16,
        textAlign: 'center',
    },
});

export default SearchScreen;
