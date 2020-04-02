import React, { Component } from "react";

import { View, Text, StyleSheet } from "react-native";

class MessagesScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <View style={styles.heading}>
          <Text style={styles.title}>Messages</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  heading: {
    marginTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    marginBottom: 20
  },
  title: {
    fontSize: 25,
    fontWeight: "700"
  }
});

export default MessagesScreen;
