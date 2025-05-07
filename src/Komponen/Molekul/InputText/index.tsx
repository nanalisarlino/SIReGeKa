import React from 'react';
import {View, Text, TextInput, StyleSheet, TextInputProps} from 'react-native';

interface InputTextProps extends TextInputProps {
  label: string;
}

const InputText: React.FC<InputTextProps> = ({label, ...props}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, props.multiline && styles.multiline]}
        {...props}
      />
    </View>
  );
};

export default InputText;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  label: {
    marginBottom: 4,
    fontSize: 15,
    color: '#fff',
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  multiline: {
    height: 100,
    textAlignVertical: 'top',
  },
});
