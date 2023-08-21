import { render } from "@testing-library/react-native";
import { Provider } from "react-redux";
import { store } from "../src/redux/store";
import Camera from "../src/components/Main/Camera";
import { act } from "react-test-renderer";



export const heightPercentageToDP = jest.fn(percentage => percentage);
export const widthPercentageToDP = jest.fn(percentage => percentage);
jest.mock("react-native-responsive-screen", () => ({
    heightPercentageToDP: jest.fn(),
    widthPercentageToDP: jest.fn()
  }))
  const CameraPhoto={
    state:{
        photos:["path"]
    }
  }
  jest.mock("react-native-contacts",()=>({
    getAll:jest.fn()
  }))
  describe("Camera Component",()=>{
    test("rendering",()=>{
    const {getByTestId}=render(
        <Provider store={store}>
            <Camera  />
        </Provider>
    )
    const flatList=getByTestId("photoflatList")
    act(()=>{
      flatList.props.renderItem((item:any)=><></>)
    })
    })
  })