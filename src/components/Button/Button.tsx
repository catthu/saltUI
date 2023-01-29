import React from 'react';
import { Platform, TouchableOpacity, Text, StyleSheet } from 'react-native';


interface ButtonProps {
  text: string;
  onClick: () => void;
}

const ButtonContainer = (props: any) => {
  const platform = Platform.OS;
  if (platform === 'web') {
    return (
        <button
          style={props.style}
          onClick={props.onClick}
        >
          {props.children}
         </button>
     )
  } else {
    return (
      <TouchableOpacity
        style={props.style}
        onPress={props.onClick}
      >
        {props.children}
      </TouchableOpacity>
     )
  }
}

const Button = ({
  text,
  onClick
}: ButtonProps) => {


  const webStyles = {
    button: {
      backgroundColor: 'red',//theme?.button?.backgroundColor || OnionTheme?.button?.backgroundColor,
    }
  }

  const mobileStyles=StyleSheet.create(webStyles)

  return (
    <ButtonContainer
      onClick={onClick}
      style={Platform.OS === 'web' ? webStyles.button : mobileStyles.button}
    >
      <Text>{text}</Text>
    </ButtonContainer>
  )
}





export default Button;