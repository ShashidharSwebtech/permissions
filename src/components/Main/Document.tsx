import { SafeAreaView, Text, View } from 'react-native'
import React, { Component } from 'react'
import { connect } from 'react-redux'
interface IProps{
  state:any
}
interface IState{

}
export class Document extends Component<IProps,IState> {

  componentDidMount(): void {
    console.log(this.props.state)
  }
  render() {
    return (
      <SafeAreaView>

      <View>
        <Text>Document</Text>
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
  export default connect(mapStateToPRops,mapDispatchToProp)(Document)