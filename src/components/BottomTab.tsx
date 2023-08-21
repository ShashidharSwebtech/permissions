import {Text, View} from 'react-native';
import React, {Component} from 'react';
// import {SafeAreaView} from 'react-native-safe-area-context';
import AntIcons from "react-native-vector-icons/AntDesign";
import EntypoIcons from "react-native-vector-icons/Entypo"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Main/Home';
import Camera from './Main/Camera';
import IconicIcon from "react-native-vector-icons/Ionicons"
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Document from './Main/Document';
import Contacts from './Main/Contacts';
const Tab = createBottomTabNavigator();
export class BottomTab extends Component {
  render() {
    return (
      <View style={{flex:1}}>

        <Tab.Navigator
        screenOptions={{
          headerShown:false,
          tabBarStyle:{
            position:"absolute",
            // backgroundColor:"transparent",
            borderTopLeftRadius:hp(2),
            borderTopRightRadius:hp(2),
            borderTopWidth:0
          },
          tabBarLabelStyle:{
            display:"none"
          }
        }}
        >
        <Tab.Screen name="Home" component={Home} 
        options={{
            tabBarIcon:()=><AntIcons name="home" size={hp(4)}color={"#000"} />
        }}
        />
        <Tab.Screen name="Camera" component={Camera} 
         options={{
            tabBarIcon:()=><EntypoIcons name="camera" size={hp(4)} color={"#000"} />
        }}
        />

        <Tab.Screen name="contact" component={Contacts} 
        options={{
            tabBarIcon:()=><AntIcons name="contacts" size={hp(4)}color={"#000"} />
        }}
        />
        <Tab.Screen name="Documents" component={Document} 
         options={{
            tabBarIcon:()=><IconicIcon name="document" size={hp(4)} color={"#000"} />
        }}
        />
      </Tab.Navigator>
      </View>
    );
  }
}

export default BottomTab;
