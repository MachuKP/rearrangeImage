import { StyleSheet, View, Platform } from "react-native";
import Button from "./Button";

interface FooterProp {
    onClick: () => void
}

const Footer = ({onClick}: FooterProp) => {
    return (
        <View style={style.container}>
            <Button title="confirm" handleClick={onClick} />
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingVertical: 12,
        paddingBottom: Platform.OS === 'ios' ? 27 : 12
    },
})

export default Footer;