import React, { Component } from "react";
import { View, FlatList, StyleSheet, Button } from "react-native";
import { Title, Subheading } from "react-native-paper";
import InterestsCard from "./InterestsCard";
import { interestsData } from "../interestData";

import { connect } from "react-redux";

class ResearchInterests extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    subText: "Select up to three research areas you are interested in"
  };

  changeSubText() {
    switch (this.props.interests.length) {
      case 3:
        return this.setState({
          subText: "You may review your selections in the next screen"
        });
      case 2:
        return this.setState({
          subText: "Select one more research area you are interested in"
        });
      case 1:
        return this.setState({
          subText: "Select two more reseach areas you are interested in"
        });
      default:
        return this.setState({
          subText: "Select up to three research areas you are interested in "
        });
    }
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      headerRight: () => (
        <Button
          title="Confirm"
          onPress={() => {
            this.props.navigation.navigate("Areas");
          }}
        ></Button>
      )
    });

    this.changeSubText();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.interests.length != this.props.interests.length) {
      this.changeSubText();
    }
  }

  render() {
    return (
      <View>
        <View style={styles.headerContainer}>
          <Title style={styles.title}>Research Interests</Title>
          <Subheading style={styles.subHeading}>
            {this.state.subText}
          </Subheading>
        </View>
        <FlatList
          style={{ width: "100%" }}
          data={interestsData}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <InterestsCard
                interest={item.interest}
                id={item.id}
                image={item.image}
              />
            </View>
          )}
          keyExtractor={item => item.id}
          numColumns={2}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    interests: state.interests.selectedInterests
  };
};

const styles = StyleSheet.create({
  title: {
    paddingLeft: 100
  },
  headerContainer: {
    marginBottom: 25
  },
  subHeading: {
    paddingLeft: 25
  }
});

export default connect(mapStateToProps, null)(ResearchInterests);
