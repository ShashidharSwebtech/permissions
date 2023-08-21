import { Text, View,TouchableOpacity, SafeAreaView, Image ,FlatList} from 'react-native'
import React, { Component } from 'react'
// import ImagePicker,{launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { connect } from 'react-redux';

interface IProps{
  state:any
}
interface IState{

}
export class Camera extends Component<IProps> {
componentDidMount(): void {
  console.log(this.props.state.photos)
}
  render() {
    return (
        <SafeAreaView>
        <View>
        
        <FlatList
        testID='photoflatList'
        data={this.props.state.photos}
        renderItem={({item})=>{
          return <View>
            <Image source={{uri:item}} style={{width:wp(50),height:hp(30)}}/>
            </View>
        }}
        />
      </View>     
        </SafeAreaView>
     
    )
  }
}


const mapStateToPRops=(state:any)=>{
  return {state:state}
  }
const mapDispatchToProp=(dispatch:any)=>{
  return {} 
}
  export default connect(mapStateToPRops,mapDispatchToProp)(Camera)