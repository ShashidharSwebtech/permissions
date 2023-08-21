import Contacts from "react-native-contacts"

const contact = async()=>{
   return await Contacts.getAll()
}
export const initState: any={
    Contact: contact(),
    photos:[],
    document:[]
}

export const reducer=async(state=initState,action:any)=>{
switch(action.type){
    case "Add_img":
        state.photos=[...state.photos,action.payload.item]
        return {...state}
        case "Add_documnet":
            state.document=[...state.document,action.payload.item]
            return {...state}
        case "contact":
            try{
                const contact=await Contacts.getAll();
                state.contact=contact
            }catch(error){

            }
            return {...state}
        default:
            return state
}
}