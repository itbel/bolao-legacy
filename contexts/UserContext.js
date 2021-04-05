import React, { useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const UserContext = React.createContext();

export const useUserContext = () => {
    return useContext(UserContext);
}

export const UserProvider = (props) => {
    const [userState, setUserState] = useState({
        isLoggedIn: false,
        user: "",
        name: ""
    })
    const loginUser = (user) => {
        setUserState({ user: user.token, isLoggedIn: true, name: user.name })
    }

    const logoutUser = async () => {
        setUserState({ user: "", isLoggedIn: false, name: "" })
        try{
            await AsyncStorage.removeItem("userToken");
            await AsyncStorage.removeItem("userName");
        }
        catch(err){
            console.log(err)
            Alert("An error occurred when logging out. Please restart the app")
        }
    }

    return (
        <UserContext.Provider value={{ userState, loginUser, logoutUser }}>
            {props.children}
        </UserContext.Provider >
    )
}