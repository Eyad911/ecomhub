import React, { useState } from "react";
import { FlatList, StyleSheet } from "react-native";

import Screen from "../components/Screen";
import ListItem from "../components/ListItem";
import ListItemSeparator from "../components/ListItemSeparator";
import ListItemDeleteAction from "../components/ListItemDeleteAction";
const initMessages = [
  {
    id: 1,
    title: "React Native ",
    description:
      "The biggest mistake we made as a company was betting too much on HTML as opposed to native. Using HTML5 for Facebook's mobile version resulted in an unstable application that retrieved data slowly.[14] He promised Facebook would soon deliver a better mobile experience.Inside Facebook, Jordan Walke found a way to generate UI elements for iOS from a background JavaScript thread, which became the basis for the React web framework. They decided to organize an internal Hackathon to perfect this prototype in order to be able to build native apps with this technology. 15 In 2015, after months of development, Facebook released the first version for the React JavaScript Configuration. During a technical talk,[16] Christopher Chedeau explained that Facebook was already using React Native in production for their Group App and their Ads Manager App",
    image: require("../assets/profile.png"),
  },
  {
    id: 2,
    title: "T2",
    description: "D2",
    image: require("../assets/profile.png"),
  },
];

function MessageSecreen(props) {
  const [messages, setMessages] = useState(initMessages);
  const [refreshing, setRefreshing] = useState(false);

  const handleDelete = (message) => {
    // Delete the message
    setMessages(messages.filter((m) => m.id !== message.id));
  };

  return (
    <Screen>
      <FlatList
        data={messages}
        keyExtractor={(message) => message.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            subTitle={item.description}
            image={item.image}
            onpress={() => console.log("message", item)}
            renderRightActions={() => (
              <ListItemDeleteAction onpress={() => handleDelete(item)} />
            )}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={refreshing}
        onRefresh={() => {
          setMessages([
            {
              id: 1,
              title: "T1",
              description: "D1",
              image: require("../assets/profile.png"),
            },
          ]);
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({});

export default MessageSecreen;
