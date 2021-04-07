// import React from 'react';
// import { View, Text } from 'react-native';
// import { Button } from 'native-base';

// const TOPICS = ['food', 'drinks', 'coffee', 'shops', 'sights', 'arts'];

// const OverlayTopics = ({ onTopicSelect }) => (
//     <Overlay isVisible={true} styleName="fill-parent">
//         <Text style={{marginBottom: 15}}>What do you feel like?</Text>
//         {TOPICS.map(topic => (
//             <Button onPress={() => onTopicSelect(topic)} key={topic} style={{marginBottom: 10}}>
//                 <Text>{topic}</Text>
//             </Button>
//         ))}
//     </Overlay>
// );

// const BottomTopics = ({ onTopicSelect }) => (
//     <View styleName="horizontal">
//         {TOPICS.map(topic => (
//             <Button onPress={() => onTopicSelect(topic)} key={topic} styleName="muted">
//                 <Text>{topic}</Text>
//             </Button>
//          ))}
//     </View>
// );

// export { OverlayTopics, BottomTopics };