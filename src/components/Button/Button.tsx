import React from "react";
import { Platform, TouchableOpacity, Text, StyleSheet, View } from 'react-native';

export interface ButtonProps {
  label: string;
}

const Button = (props: ButtonProps) => {
  return <View><button>{props.label}</button></View>;
};

export default Button;