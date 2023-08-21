import { render } from "@testing-library/react-native";
import { Provider } from "react-redux";
import { store } from "../src/redux/store";
import Contacts from "../src/components/Main/Contacts";
import { getAll } from "react-native-contacts";
import { act } from "react-test-renderer";


jest.mock("react-native-contacts",()=>({
    getAll:jest.fn()
}))
const initStat={
    Contact:{
        _j:{

            phoneNumbers:[{label:"",number:""}]
        }
    },
    photos:[],
    document:[]
}

const Props={
    state:{
        _j:{
            Contact:{
                _j:{

                    phoneNumbers:[{label:"",number:""}]
                }
            }
        }
        
    }
}
// this.props.state._j.Contact._j
describe("Contact Components ",()=>{
    test("rendering",()=>{
        const {getByTestId}=render(<Provider store={store}>
            <Contacts />
        </Provider>)
        const flatList=getByTestId("flatList")
        act(()=>{
            flatList.props.renderItem((item:any)=><></>)
        })

    })
})