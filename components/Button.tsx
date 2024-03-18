import {StyleSheet, Text, TouchableOpacity} from 'react-native';

interface ButtonProp {
  title: string;
  handleClick: () => void;
}

const Button = ({title, handleClick}: ButtonProp) => {
  return (
    <TouchableOpacity style={style.button} onPress={handleClick}>
      <Text style={style.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  button: {
    width: '80%',
    backgroundColor: '#3370ff',
    padding: 12,
    borderRadius: 15
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center'
  }
});

export default Button;
