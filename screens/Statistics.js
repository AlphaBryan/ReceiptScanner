import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, Image } from 'react-native';
import { ServerGetRequest, ServerPostRequest } from '../database/Database';
import { BarChart, PieChart } from 'react-native-chart-kit';
import DateTimePicker from '@react-native-community/datetimepicker';

const StatisticsScreen = () => {
  const [monthStatistics, setMonthStatistics] = useState(null);
  const [isLoading, setIsLoading] = useState();
  const [topProducts, setTopProducts] = useState(null);
  const [sortBy, setSortBy] = useState('money'); // Default sorting by money
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  useEffect(() => {
    fetchStatistics();
  }, []);
  useEffect(() => {
    fetchTopProducts();
  }, [sortBy, startDate, endDate]);

  const userID = '64b0c1544835bbe03d5afc59';

  const fetchStatistics = async () => {
    setIsLoading(true);
    const response = await ServerGetRequest('statistics/month/users/' + userID);
    if (response) {
      const formattedData = Object.keys(response).map((key) => ({
        month: key,
        expense: response[key].expense,
      }));
      setMonthStatistics(formattedData);
      setIsLoading(false);
    } else {
      console.log('Error: Failed to fetch statistics');
    }
  };

  const fetchTopProducts = async () => {
    const requestData = {
      top: 5,
      sortBy: sortBy, // Use the selected sorting criteria
      startDate: startDate,
      endDate: endDate,
    };

    const response = await ServerPostRequest('statistics/articles/count/users/' + userID, requestData);

    if (response) {
      setTopProducts(response);
    } else {
      console.log('Error: Failed to fetch top products');
    }
  };

  const COLORS = ["#AB7030", "#FFD166", "#FF6F61", "#06D6A0", "#118AB2"];

  const handleSortByMoney = () => {
    setSortBy('money');
  };

  const handleSortByQuantity = () => {
    setSortBy('quantity');
  };

  const handleStartDateChange = (event, selectedDate) => {
    setShowStartDatePicker(false);
    if (selectedDate) {
      const today = new Date();
      if (selectedDate > today) {
        setStartDate(today); // Set the startDate to today if selected date is after today
      } else {
        setStartDate(selectedDate);
      }
    }
  };

  const handleEndDateChange = (event, selectedDate) => {
    setShowEndDatePicker(false);
    if (selectedDate) {
      const today = new Date();
      if (selectedDate > today) {
        setEndDate(today); // Set the endDate to today if selected date is after today
      } else {
        setEndDate(selectedDate);
      }
    }
  };

  const showStartDatePickerModal = () => {
    setShowStartDatePicker(true);
  };

  const showEndDatePickerModal = () => {
    if (startDate) {
      setShowEndDatePicker(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vos statistiques</Text>
      <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-start' , paddingLeft:'10%',paddingTop:"2%"}}>
        <Image source={{ uri: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWNxZDI5bWU4dHlqZGZxN3N2YzE4dmc4dXV1ZndiMHJvYXVhbG0yeiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/cj87CxfRtrUifF3Ryk/giphy.gif" }} style={{ width: '15%', aspectRatio: 1 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {monthStatistics && !isLoading ? (
          <>
            <View style={styles.content}>
              <Text style={styles.heading}>Dépenses des 6 derniers mois</Text>
              <BarChart
                data={{
                  labels: monthStatistics.map((item) => item.month.split('-')[1].substring(0, 3)),
                  datasets: [
                    {
                      data: monthStatistics.map((item) => item.expense),
                    },
                  ],
                }}
                width={350}
                height={180}
                chartConfig={{
                  backgroundColor: '#ffffff',
                  backgroundGradientFrom: '#ffffff',
                  backgroundGradientTo: '#ffffff',
                  decimalPlaces: 2,
                  color: (opacity = 1) => `rgba(0, 71, 171, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                }}
                verticalLabelRotation={0} // Adjust the rotation angle as needed
                yAxisLabelStyle={{ fontSize: 10 }} // Adjust the font size of the labels
              />
            </View>
            <View style={styles.content}>
              <Text style={styles.heading}>Top 5 produits achetés</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.sortButton, sortBy === 'money' && styles.activeSortButton]}
                  onPress={handleSortByMoney}
                >
                  <Text style={[styles.sortButtonText, sortBy === 'money' && styles.activeSortButtonText]}>
                    Tri par argent
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.sortButton, sortBy === 'quantity' && styles.activeSortButton]}
                  onPress={handleSortByQuantity}
                >
                  <Text style={[styles.sortButtonText, sortBy === 'quantity' && styles.activeSortButtonText]}>
                    Tri par quantité
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.datePickerContainer}>
                <TouchableOpacity
                  style={[
                    styles.datePickerButton,
                    startDate && { borderColor: '#306bab', borderWidth: 1.5 },
                  ]}
                  onPress={showStartDatePickerModal}
                >
                  <Text style={styles.datePickerButtonText}>
                    {startDate ? startDate.toDateString() : "Choisir date d'entrée"}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.datePickerButton,
                    endDate && { borderColor: '#306bab', borderWidth: 1.5 },
                  ]}
                  onPress={showEndDatePickerModal}
                >
                  <Text style={styles.datePickerButtonText}>
                    {endDate ? endDate.toDateString() : 'Choisir date de fin'}
                  </Text>
                </TouchableOpacity>
              </View>
              {showStartDatePicker && (
                <DateTimePicker
                  value={startDate || new Date()}
                  mode="date"
                  is24Hour={true}
                  display="default"
                  onChange={handleStartDateChange}
                  maximumDate={new Date()} // Set maximum date to today
                />
              )}
              {showEndDatePicker && (
                <DateTimePicker
                  value={endDate || new Date()}
                  mode="date"
                  is24Hour={true}
                  display="default"
                  onChange={handleEndDateChange}
                  maximumDate={new Date()} // Set maximum date to today
                />
              )}
              <PieChart
                data={topProducts
                  ? Object.keys(topProducts).map((productName, index) => ({
                    name: sortBy == 'money' ? '$ ' + productName : productName,
                    value: topProducts[productName],
                    color: COLORS[index % COLORS.length],
                  }))
                  : []}
                width={350}
                height={200}
                chartConfig={{
                  backgroundColor: "#444",
                  backgroundGradientFrom: '#444',
                  backgroundGradientTo: '#444',
                  decimalPlaces: 2,
                  color: (opacity = 1) => `rgba(0, 110, 199, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                  propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#fff",
                  },
                  labelStyle: {
                    fontSize: 10, // Adjust the font size of the labels
                    fontFamily: 'Arial', // Customize the font family if needed
                  },
                }}
                accessor="value"
                backgroundColor="white"
                paddingLeft="-5"
                absolute
              />
            </View>
          </>
        ) : (
          <ActivityIndicator style={styles.loadingIndicator} size="large" color="#000000" />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: '20%',
    marginBottom: '0%',
    textAlign: 'center',
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: '3%',
    borderRadius: 10,
    borderWidth: 1,
    margin: '3%',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'normal',
    marginBottom: 16,
  },
  loadingIndicator: {
    marginTop: '50%',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  sortButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  activeSortButton: {
    backgroundColor: "#306bab",
  },
  sortButtonText: {
    fontSize: 14,
  },
  activeSortButtonText: {
    color: '#fff',
  },
  datePickerContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  datePickerButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    // opacity: startDate ? 1 : 0.5, // Disable the button if startDate is not selected
  },
  datePickerButtonText: {
    fontSize: 14,
  },
});

export default StatisticsScreen;
