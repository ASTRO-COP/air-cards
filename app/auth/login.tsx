import { StatusBar, Text, View } from "react-native";
import React from "react";

const LoginPage = () => {
    return (
        <>        
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
            <View>
                <Text style={{ marginTop: 200, textAlign: 'center',}}>Login Page</Text>
            </View>
        </>
    )
}

export default LoginPage;