import { Image, ImageBackground, Platform, StyleSheet, Text, TouchableOpacity, View,SafeAreaView, Alert } from 'react-native'
import React, { Component } from 'react'

import * as ImagePicker from 'react-native-image-crop-picker';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Contacts from 'react-native-contacts';
import DocumentPicker from 'react-native-document-picker'
import { connect } from 'react-redux';
import { Add_Contact, Add_Image, addDocume } from '../../redux/actions';
import { launchImageLibrary } from 'react-native-image-picker';

interface IProps{
    addDocument:(item:any)=>any
    Add_Image:(item:any)=>any
    // Add_Contact:(item:any)=>any
}
interface IState{
  image:string
}
export class Home extends Component<IProps,IState> {
  constructor(props:IProps) {
    super(props)
  
    this.state = {
       image:""
    }
  }
    handleCamera=async()=>{ 
      try{
      const image=await ImagePicker.openCamera({
        width: wp(80),
        height: hp(80),
        cropping: true
    })
    this.setState({image:image?.path})
    this.props.Add_Image(image.path)
  }
      catch(error){
        Alert.alert(String(error))
      }
   
     }
     
     handlingContact=async()=>{
      try{
      const response=await Contacts.getAll();
      
      // this.props.Add_Contact(response)

      }catch(error){
      console.log(error)
      }
     
     }
     handleDocument=async()=>{
        try {
            const value= await DocumentPicker.pick({
               presentationStyle: 'fullScreen',
             });
             this.props.addDocument(value)
            
             console.log(value)
           } catch (e) {
             Alert.alert(String(e))
           }
     }
     hanglingAlubm= () => {
      const options: any = {
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
      launchImageLibrary(options, async (response: any) => {
        if (response.assets !== undefined) {
          console.log(response?.assets[0]?.uri)
          const imgpath=await response?.assets[0]?.uri;
          this.setState({image:imgpath})
          // await this.props.Add_Image(response?.assets[0]?.uri);
        }
     
      });
    };
  render() {
    const {image}=this.state;
    
    return (
        <SafeAreaView>
      <View style={[styles.container]} testID='homecontainer'>
{image!==""&&<Image source={{uri:image}} style={{
  height:hp(20),width:hp(20),borderRadius:hp(20),
  position:"absolute",
  top:hp(2)
  }} />}
      <View>        
        <TouchableOpacity
        onPress={this.handleCamera}
        style={styles.cameraBtn}
        testID='camera_btn'
        >
        <Text style={{color:"#000"}}>Camera</Text>    
        </TouchableOpacity>
        <TouchableOpacity
        onPress={this.handlingContact}
        style={styles.cameraBtn}
        testID='contact_btn'
        >
        <Text style={{color:"#000"}}>Contact</Text>    
        </TouchableOpacity>
    </View>
    <View>
        <TouchableOpacity
        onPress={this.hanglingAlubm}
        style={styles.cameraBtn}
        testID='Alubm_btn'
        >
        <Text style={{color:"#000"}}>Alubm</Text>    
        </TouchableOpacity>
        <TouchableOpacity
        onPress={this.handleDocument}
        style={styles.cameraBtn}
        testID='document'
        >
        <Text style={{color:"#000"}}>Document</Text>    
        </TouchableOpacity>
    </View>
      </View>
      </SafeAreaView>
    )
  }
}
const mapStateToPRops=(state:any)=>{
return {state}
}
const mapDispatchToProp=(dispatch:any)=>{
return{
    addDocumen:(item:any)=>dispatch(addDocume(item)),
    Add_Image:(item:any)=>dispatch(Add_Image(item)),
    // Add_Contact:(item:any)=>dispatch(Add_Contact(item))
}
}
export default connect(mapStateToPRops,mapDispatchToProp)(Home);

const styles=StyleSheet.create({
    container:{
        backgroundColor:"#F2EE9D55",
        height:hp(100),
        alignItems:"center",
        justifyContent:"center",
       
        marginTop:Platform.OS=="android"?hp(1):hp(0)
    },
    containerwithimg:{
height:hp(70)
    },
    cameraBtn:{
        backgroundColor:"#96B6C5",
        width:wp(20),
        height:hp(5),
        alignItems:"center",
        justifyContent:"center",
        borderRadius:hp(0.5),
        marginBottom:hp(1)
    }
})

