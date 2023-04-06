import {Button, View} from "native-base";
import React from "react";
import {Text} from "react-native";
import {pickMultiple} from "react-native-document-picker";

function ReadDocs(props) {
  return (
    <View style={[props.style]}>
      <Button
        style={{borderRadius: 10}}
        onPress={() => {
          pickMultiple().then(props.onPickDocument);
        }}>
        <Text style={{color: "black", fontWeight: "bold", margin: 5}}>
          Pick Dokumen
        </Text>
      </Button>
    </View>
  );
}

export default ReadDocs;
