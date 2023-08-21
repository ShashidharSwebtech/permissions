import { SafeAreaView, Text, View,FlatList } from 'react-native'
import React, { Component } from 'react'
import { addDocume } from '../../redux/actions'
import { connect } from 'react-redux'


interface IProps{
    state:any
}
interface IState{

}
export class Contacts extends Component<IProps,IState> {
    constructor(props:IProps) {
      super(props)
    
      this.state = {
         
      }
    }
// componentDidMount(): void {
//   console.log(this.props.state._j.Contact._j)
// }
  render() {
    return (
      <SafeAreaView>

      <View>
        <FlatList data={this.props.state?._j?.Contact?._j}
        testID='flatList'
        renderItem={({item})=>{
        return <View >
            <Text style={{color:"#000"}}>{item?.phoneNumbers[0]?.label}</Text>
            <Text>{item?.phoneNumbers[0]?.number}</Text>
        </View>
        }}/>
      </View>
      </SafeAreaView>
    )
  }
}

const mapStateToPRops=(state:any)=>{
  // state.Contact=state._j.Contact._j
    return {state:state}
    }
const mapDispatchToProp=(dispatch:any)=>{
    return {} 
}
    export default connect(mapStateToPRops,mapDispatchToProp)(Contacts)