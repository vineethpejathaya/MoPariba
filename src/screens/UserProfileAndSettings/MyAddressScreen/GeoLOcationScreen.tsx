import Geolocation from '@react-native-community/geolocation';
import {Button, HStack, VStack, View} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import 'react-native-get-random-values';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import MapView, {Marker} from 'react-native-maps';
import {AddressIcon, SearchIcon} from '../../../assets/icons/Icons';
import ScreenHeader from '../../../components/ScreenHeader';

const GOOGLE_MAPS_API_KEY = 'AIzaSyDk_I-Pa2fyDziuZqGI5iYQ8Uu1goV_mDY';

export default function DeliveryLocationScreen() {
  // Separate state for initial region and current marker position
  const [mapRegion, setMapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });

  const [markerPosition, setMarkerPosition] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });

  const [address, setAddress] = useState('');
  const [hasPermission, setHasPermission] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Permission',
            message:
              'This app needs access to your location to provide accurate delivery details.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Location permission granted');
          setHasPermission(true);
        } else {
          Alert.alert(
            'Permission Denied',
            'You need to enable location permission to use this feature.',
          );
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const getCurrentLocation = () => {
    if (hasPermission) {
      setIsLoading(true);
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          console.log('Current location:', latitude, longitude);

          // Update both map region and marker position
          const newRegion = {
            latitude,
            longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          };

          setMapRegion(newRegion);
          setMarkerPosition({latitude, longitude});
          fetchAddressFromCoordinates(latitude, longitude);
          setIsLoading(false);
        },
        error => {
          setIsLoading(false);
          Alert.alert('Error', 'Unable to fetch location. Please try again.');
          console.error(error);
        },
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
      );
    } else {
      Alert.alert(
        'Permission Required',
        'Please enable location services to use this feature.',
      );
    }
  };

  useEffect(() => {
    const checkAndRequestPermission = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted) {
          setHasPermission(true);
        } else {
          await requestLocationPermission();
        }
      }
    };

    checkAndRequestPermission();
  }, []);

  useEffect(() => {
    if (hasPermission) {
      getCurrentLocation();
    }
  }, [hasPermission]);

  const onRegionChange = (region: any) => {
    setMapRegion(region);
    setMarkerPosition({
      latitude: region.latitude,
      longitude: region.longitude,
    });
  };

  const onRegionChangeComplete = (region: any) => {
    fetchAddressFromCoordinates(region.latitude, region.longitude);
  };

  const fetchAddressFromCoordinates = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`,
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        setAddress(data.results[0].formatted_address);
      }
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };

  const handlePlaceSelect = (data: any, details: any) => {
    const {lat, lng} = details.geometry.location;
    const newRegion = {
      latitude: lat,
      longitude: lng,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    };

    setMapRegion(newRegion);
    setMarkerPosition({latitude: lat, longitude: lng});
    setAddress(details.formatted_address);
  };

  const onMarkerDragEnd = (e: any) => {
    const {latitude, longitude} = e.nativeEvent.coordinate;
    setMarkerPosition({latitude, longitude});
    fetchAddressFromCoordinates(latitude, longitude);
  };

  return (
    <>
      <ScreenHeader title={'Delivery location'} />
      <VStack height={Dimensions.get('window').height * 0.65}>
        <GooglePlacesAutocomplete
          placeholder="Search for area, street name..."
          minLength={2}
          fetchDetails={true}
          onPress={handlePlaceSelect}
          query={{
            key: GOOGLE_MAPS_API_KEY,
            language: 'en',
          }}
          styles={{
            container: {
              flex: 0,
              position: 'absolute',
              width: '90%',
              textAlign: 'center',
              zIndex: 1,
              top: 10,
              alignSelf: 'center',
              margin: 'auto',
            },
            textInputContainer: styles.textInputContainer,
            textInput: styles.textInput,
            listView: {backgroundColor: 'white'},
          }}
          renderLeftButton={() => (
            <View marginLeft={3}>
              <SearchIcon width={20} height={20} />
            </View>
          )}
        />
        <MapView
          style={styles.map}
          region={mapRegion}
          showsUserLocation={true}
          onRegionChange={onRegionChange}
          onRegionChangeComplete={onRegionChangeComplete}
          mapType="terrain">
          <Marker
            coordinate={markerPosition}
            draggable
            onDragEnd={onMarkerDragEnd}
          />
        </MapView>

        <TouchableOpacity
          style={[
            styles.currentLocationButton,
            isLoading && styles.currentLocationButtonDisabled,
          ]}
          onPress={getCurrentLocation}
          disabled={isLoading}>
          <Text style={styles.currentLocationText}>
            {isLoading ? 'Getting location...' : 'Use current location'}
          </Text>
        </TouchableOpacity>
      </VStack>

      <VStack style={styles.addressContainer}>
        <HStack alignItems={'center'} space={2}>
          <AddressIcon />
          <Text style={styles.addressText}>
            {address ? address : 'Fetching address...'}
          </Text>
        </HStack>

        <Button style={styles.btn}>CONFIRM LOCATION</Button>
      </VStack>
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  currentLocationButton: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#019543',
    elevation: 2,
    zIndex: 1,
    display: 'flex',
    gap: 10,
  },
  currentLocationButtonDisabled: {
    opacity: 0.7,
    borderColor: '#ccc',
  },
  currentLocationText: {
    fontSize: 14,
    color: '#007AFF',
  },
  addressContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 40,
    paddingTop: 25,
    paddingHorizontal: 15,
  },
  addressText: {
    fontSize: 16,
    fontWeight: '500',
  },
  btn: {
    height: 60,
    borderRadius: 20,
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 1,
  },
  textInput: {
    flex: 1,
    paddingLeft: 40,
    height: 40,
    fontSize: 16,
  },
  searchIcon: {
    position: 'absolute',
    left: 40,
    top: 10,
  },
});
