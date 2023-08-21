import { reducer } from "../src/redux/reducer";

import { Add_Contact,Add_Image,addDocume } from "../src/redux/actions"; 
import { act } from "@testing-library/react-native";
jest.mock("react-native-contacts",()=>({
getAll:jest.fn()
  }))
  const initState: {photos: any, Contact: any, document: any}={
    Contact: [],

    photos:[],
    document:[]
}


describe("redux",()=>{
    test("Add Contact ",()=>{
        const action=Add_Contact({name:"shashi",number:9701941724})
        let newState;
        act(()=>{

            newState=reducer(initState,action)
        })
       console.log("reducer-->",newState)

    })
    test("Add contact",()=>{
        const action=Add_Image("imag path")
        const newState=reducer(initState,action)
        console.log(newState)
        // expect(newState.photos).toBe([action])

    })
    test("Add Document",()=>{
        const action=addDocume("document")
        reducer(initState,action)
    })
})