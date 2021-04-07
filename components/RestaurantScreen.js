import React, { Component } from 'react';
import { StyleSheet, Text, View, Modal, Pressable, ScrollView, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'
import { restaurantFilter } from "../selectors";
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location'
import { getlocation } from '../actions/actions'
import { stringify as queryString } from 'query-string';

const CLIENT_ID = '55GVQRJ2JAT0ZE4IAMCYVQ0XBXBEKGLR41C0AN134Z1KCBSX';
const CLIENT_SECRET = '4AERNEXNX3V1ADLEANRU5QYBQXQMBOJK4YDVOYN350GBBG05';
const latitudeDelta =  0.00922*1.5;
const longitudeDelta = 0.00421*1.5;

class HomeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      restaurantSelect: null,
      errorPerm: '',
      gpsAccuracy: null,
      lookingFor: 'food',
      mapRegion: null
    };
  }

   setSelectedRestaurant = (restaurant) => {
    this.setState({ restaurantSelect: restaurant });
  }

  venuesQuery({ latitude, longitude }) {
    return queryString({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        v: 20170305,
        ll: `${latitude}, ${longitude}`,
        llAcc: this.state.gpsAccuracy,
        section: this.state.lookingFor,
        limit: 10,
        openNow: 1,
        venuePhotos: 1
    });
}

  componentDidMount() {
      this.permLocation()
  } 

  getlocationData (region){
      const query = this.venuesQuery(region);
      this.props.getlocation(query)
  }

  permLocation = async() => {
    let {status} = await Permissions.askAsync(Permissions.LOCATION)

    if(status !=='granted'){
      this.setState({
        errorPerm: 'Permission access location was denied'
      })
    }

    let location = await Location.getCurrentPositionAsync({})
      let region = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta,
          longitudeDelta
      }
      this.setState({gpsAccuracy: location.coords.accuracy})
      this.getlocationData(region);
  }


  render() {
    const { restArr } = this.props.states
    if(!restArr.length) return ( <Text style={styles.title}>No data</Text>)
    const [resdata] = restArr || []
    const {recommendations} = resdata
    const { restaurantSelect } = this.state || {}

    return (
      <View style={{ flex: 1 }}>
          <ScrollView>
            {Array.isArray(recommendations) && recommendations.map((res, k) => 
               <View key={k} style={styles.container}>
                  <Text>{k+1}</Text>
                  <View style={styles.row}>
                      <Text testID={'listdata'} style={styles.name}>{res.venue.name}</Text>
                  </View>
                  <View style={styles.buttonContainer}>
                      <TouchableOpacity onPress={() => this.props.navigation.navigate('Details',{
                      venue: res.venue,
                    })}>
                          <View style={styles.button}>
                            <Text style={styles.btntext}> Details </Text>
                          </View>
                        </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Location',{
                      venue: res.venue,
                      gpsAccuracy: this.state.gpsAccuracy
                    })}>
                      <View style={styles.button}>
                        <Text style={styles.btntext}> Locations </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
              </View>
            )}
          </ScrollView>

          <Modal
            animationType="slide"
            transparent={true}
            visible={!!restaurantSelect}
            onRequestClose={() => {
              this.setSelectedRestaurant(null);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>{(restaurantSelect||{}).name}</Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => this.setSelectedRestaurant(null)}
                >
                  <Text style={styles.textStyle}>Close</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
      </View>
    )
  }
}


const mapStateToProps = state => {
  const states = {restArr: restaurantFilter(state, 'ALL')};
  return { states };
};

const mapDispatchToProps = dispatch => ({
  getlocation: (query) => dispatch(getlocation(query)),
})


export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)


const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '300',
    paddingLeft: 5
  },
  name: {
    fontSize: 16
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#a9a9a9',
    borderBottomWidth: 0.5,
    padding: 10
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    padding: 3,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  btntext:{
      fontSize:12, 
      backgroundColor:'#1E90FF', 
      color:'#ffffff',
      fontWeight: "bold",
  }
})
