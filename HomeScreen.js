import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, Image, FlatList, TouchableHighlight, ImageBackground, Modal, ScrollView, Dimensions } from "react-native";
import { useDispatch } from "react-redux";
import { logoutUser } from "../store/authSlice";
import Icon from "react-native-vector-icons/MaterialIcons";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";
import OCIcon from "react-native-vector-icons/Octicons";
import FAIcon from "react-native-vector-icons/FontAwesome";
import FEIcon from "react-native-vector-icons/Feather";
import EIcon from "react-native-vector-icons/Entypo";
import { Menu, MenuOption, MenuProvider, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import PagerView from 'react-native-pager-view';
import PaginationDot from 'react-native-dots-pagination';
import LinearGradient from "react-native-linear-gradient";
import { ToggleButton, TextInput } from "react-native-paper";
import { BlurView } from "@react-native-community/blur";
import { SendPrivatelyScreen } from "./SendPrivatelyScreen";
import { BottomSheet } from "@rneui/themed";
import MaskedView from '@react-native-masked-view/masked-view';

export const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);

  const [sendModal, setSendModal] = useState(false);
  const [commentModal, setCommentModal] = useState(false);

  const windowHeight = Dimensions.get('window').height;
  //  console.log(windowHeight);

  const onLogout = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    setPaymentModalVisible(true);
  }, [])

  const stories = [
    { id: '1', image: "https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg", name: 'ulomplad' },
    { id: '2', image: 'https://www.foodiesfeed.com/wp-content/uploads/2019/04/mae-mu-oranges-ice-600x750.jpg', name: 'Nerson' },
    { id: '3', image: 'https://www.foodiesfeed.com/wp-content/uploads/2020/08/detail-of-pavlova-strawberry-piece-of-cake-600x800.jpg', name: 'Ricky' },
    { id: '4', image: 'https://www.foodiesfeed.com/wp-content/uploads/2019/04/mae-mu-baking-600x750.jpg', name: 'Mutobo' },
    { id: '5', image: 'https://www.foodiesfeed.com/wp-content/uploads/2019/04/mae-mu-pancakes-600x750.jpg', name: 'James' },
    { id: '6', image: "https://www.foodiesfeed.com/wp-content/uploads/2019/02/messy-pizza-on-a-black-table-600x400.jpg", name: 'ulomplad' },
    { id: '7', image: "https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg", name: 'ulomplad' },
  ];

  const posts = [
    {
      id: '1',
      user: {
        username: 'johndoe',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        time: "2 mins ago"
      },
      images: [
        'https://www.foodiesfeed.com/wp-content/uploads/2019/04/mae-mu-baking-600x750.jpg',
        'https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg',
        'https://www.foodiesfeed.com/wp-content/uploads/2019/04/mae-mu-baking-600x750.jpg',
        'https://www.foodiesfeed.com/wp-content/uploads/2019/04/mae-mu-baking-600x750.jpg',
        'https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg',
        'https://www.foodiesfeed.com/wp-content/uploads/2019/04/mae-mu-baking-600x750.jpg',
        'https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg'
      ],
      likes: 120,
      description: 'Delicious homemade burgers!Delicious home made burgers',
      comments: [
        { id: '1', username: 'janedoe', comment: 'Looks amazing!' },
        { id: '2', username: 'foodie123', comment: 'Yummy!' }
      ]
    },
    {
      id: '2',
      user: {
        username: 'janedoe',
        avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
        time: "9 mins ago"
      },
      images: [
        'https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg',
        'https://www.foodiesfeed.com/wp-content/uploads/2020/08/detail-of-pavlova-strawberry-piece-of-cake-600x800.jpg'
      ],
      likes: 89,
      description: 'Burgers for dinner!',
      comments: [
        { id: '1', username: 'johndoe', comment: 'Nice!' },
        { id: '2', username: 'burgerlover', comment: 'Can I have some?' }
      ]
    }
  ];

  const StoryItem = ({ story }) => (
    <TouchableHighlight style={styles.storyItem} underlayColor="#ffffffd8" onPress={() => { console.log("cl", story.id) }}>
      <View style={{ alignItems: 'center' }}>
        <View style={[styles.imageContainer, { borderWidth: 2 }]}>
          <Image source={{ uri: story.image }} style={styles.storyImage} />
        </View>
        <Text style={styles.storyName}>{story.name}</Text>
      </View>
    </TouchableHighlight>
  );

  const YourStory = () => (
    <TouchableHighlight style={styles.storyItem} underlayColor="white" onPress={() => { navigation.navigate("YourStory") }}>
      <View style={{ alignItems: 'center', justifyContent: "center", paddingTop: 4 }}>
        <View style={[styles.imageContainer, { backgroundColor: "#97979794", }]}>
          <View style={[styles.storyImage, { alignItems: "center", justifyContent: "center" }]}>
            <Icon name="add" size={40} color="#696969" />
          </View>
        </View>
        <Text style={styles.storyName}>Your Story</Text>
      </View>
    </TouchableHighlight>
  );

  const comment = [
    { id: '1', image: "https://randomuser.me/api/portraits/men/1.jpg", name: 'ulomplad Khan', desc: "Nice one" },
    { id: '2', image: 'https://randomuser.me/api/portraits/women/18.jpg', name: 'Nerson Azamma', desc: "Great Effort Buddy!" },
    { id: '3', image: 'https://randomuser.me/api/portraits/women/10.jpg', name: 'Ricky Nicolas', desc: "Great Going" },
    { id: '4', image: 'https://randomuser.me/api/portraits/men/26.jpg', name: 'Nicol Res', desc: "Good work" },
    { id: '5', image: "https://randomuser.me/api/portraits/men/1.jpg", name: 'ulomplad Khan', desc: "Nice one" },
    { id: '6', image: 'https://randomuser.me/api/portraits/women/18.jpg', name: 'Nerson Azamma', desc: "Great Effort Buddy!" },
    { id: '7', image: 'https://randomuser.me/api/portraits/women/10.jpg', name: 'Ricky Nicolas', desc: "Great Going" },
    { id: '8', image: 'https://randomuser.me/api/portraits/men/26.jpg', name: 'Nicol Res', desc: "Good work" },

  ]

  const PaymentModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={paymentModalVisible}
        onRequestClose={() => {
          setPaymentModalVisible(!paymentModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{ fontSize: 24, color: "black", fontWeight: "bold", textAlign: "center", marginTop: 5 }}>Add Payment Method</Text>
            <Text style={{ marginTop: 10, alignSelf: "center", marginBottom: 15, width: 300, textAlign: "center" }}>No payment method was found, please add your payment method</Text>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={["#FBB4D1", "#BF9EF2"]} style={{ borderRadius: 10, width: 300, alignItems: "center", height: 40, justifyContent: "center", marginTop: 20, marginBottom: 5, alignSelf: "center" }}>
              <TouchableHighlight underlayColor="#BF9EF2" style={[styles.button, { borderRadius: 10, backgroundColor: "transparent", width: 300, alignItems: "center", height: 40, justifyContent: "center" }]} onPress={() => { setPaymentModalVisible(false); navigation.navigate("PaymentScreen"); }}>
                <View>
                  <Text style={{ color: "white", fontSize: 18 }}>Add Payment Method</Text>
                </View>
              </TouchableHighlight>
            </LinearGradient>
          </View>
        </View>
      </Modal>
    )
  }


  const SendModal = () => {
    return (
      <BottomSheet isVisible={sendModal} onBackdropPress={() => { setSendModal(!sendModal) }}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "transparent" }}>
          <View style={{ backgroundColor: "white", borderRadius: 20, width: "100%", height: windowHeight - 306 }}>
            <View>
              <View style={{ flexDirection: "row", paddingLeft: 20, paddingRight: 20, paddingTop: 20, alignItems: "center", justifyContent: "space-between" }}>
                <View>
                  <Text style={{ fontSize: 20, color: "black" }}>Send</Text>
                </View>
                <View>
                  <TouchableHighlight onPress={() => { setSendModal(!sendModal) }} underlayColor="lightgrey">
                    <EIcon name="cross" size={30} color="black"></EIcon>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
            <SendPrivatelyScreen></SendPrivatelyScreen>
          </View>
        </View>
      </BottomSheet>
    )
  }

  const Users = ({ item }) => (
    <View style={{ marginTop: 12, }}>
      <View style={{ alignItems: 'flex-start', justifyContent: "center", margin: 4, }}>
        <View style={{ flexDirection: "row", alignItems: "center", }}>
          <View style={{ alignItems: "center", justifyContent: "center", width: 50, height: 50, borderRadius: 25 }}>
            <Image source={{ uri: item.image }} style={{ width: 50, height: 50, borderRadius: 25, }} />
          </View>
          <View style={{ marginLeft: 20, }}>
            <Text>{item.desc}</Text>
            <Text style={{ color: "black", }}>{item.name}</Text>
          </View>
        </View>
      </View>
    </View>
  )


  const CommentModal = () => {
    return (
      <BottomSheet isVisible={commentModal} onBackdropPress={() => { setCommentModal(!commentModal) }}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "transparent" }}>
          <View style={{ backgroundColor: "white", borderRadius: 20, width: "100%", height: windowHeight - 306 }}>
            <View>
              <View style={{ flexDirection: "row", paddingLeft: 20, paddingRight: 20, paddingTop: 20, alignItems: "center", justifyContent: "space-between" }}>
                <View>
                  <Text style={{ fontSize: 20, color: "black" }}>Add Comment</Text>
                </View>
                <View>
                  <TouchableHighlight onPress={() => { setCommentModal(!commentModal) }} underlayColor="lightgrey">
                    <EIcon name="cross" size={30} color="black"></EIcon>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
            <View style={{ padding: 20, flex: 1 }}>
              <ScrollView>
                <FlatList
                  data={comment}
                  renderItem={({ item }) => <Users item={item}></Users>}
                  scrollEnabled={false}
                  style={{ marginBottom: 80 }}
                >
                </FlatList>
              </ScrollView>
              <View style={{ padding: 20, marginTop:20,position: 'absolute', bottom: 0, left: 0, right: 0, alignItems: 'center', }}>
                <View style={styles.textInput}>
                  <TextInput
                    placeholder="Send a message"
                    style={styles.textInput}
                    placeholderTextColor="grey"
                    left={
                      <TextInput.Icon
                        icon={() => (<Image source={require("../../assets/rose.png")} style={styles.storyImage}></Image>)}
                      />
                    }
                    right={
                      <TextInput.Icon
                        icon={() => (<MaskedView
                          style={{ width: 20, height: 20 }}
                          maskElement={
                            <View style={{ backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
                              <FEIcon name="send" size={20} color="black" />
                            </View>
                          }
                        >
                          <LinearGradient
                            colors={['#BF9EF2', '#FF9EF2']}
                            style={{ flex: 1 }}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                          />
                        </MaskedView>
                        )}
                      />
                    }
                  />
                </View>

              </View>
            </View>
          </View>
        </View>
      </BottomSheet>
    )
  }



  const TipCreatorModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{ fontSize: 24, color: "black", fontWeight: "bold", textAlign: "center", marginTop: 5 }}>Tip Creator</Text>
            <Text style={{ marginTop: 10, alignSelf: "center", marginBottom: 15, width: 300, textAlign: "center" }}>Support this creator by saying thanks</Text>

            <View style={{
              borderRadius: 3,

              marginHorizontal: 10,
              width: 280,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 1,
              shadowRadius: 2,
              elevation: 5, // This elevation is for Android
              backgroundColor: 'white', // Set background color to see shadow effect
              padding: 10, // Optional: Add padding for better appearance
            }}>
              <TextInput
                placeholder="Add your message"
                multiline={true}
                editable={true}
                numberOfLines={5}
                maxLength={250}
                style={{
                  width: '100%',
                  textAlignVertical: 'top',
                }}
              />
            </View>
            <Text style={{ fontSize: 20, marginTop: 10, color: "black", fontWeight: "bold", textAlign: "center", marginBottom: 10 }}>Tip Amount</Text>

            <View style={{ flexDirection: "row", gap: 15 }}>
              <ToggleButton
                icon={() => <Text style={{ color: selected === '100' ? "white" : "black", fontSize: 16 }}>$100</Text>}
                value="100"
                status={selected === '100' ? 'checked' : 'unchecked'}
                onPress={() => setSelected(selected === '100' ? null : '100')}
                style={{
                  borderRadius: 20,
                  borderColor: "lightgray",
                  borderWidth: 3,
                  backgroundColor: selected === '100' ? '#BF9EF2' : 'white',
                  padding: 3,
                  alignItems: "center",
                  justifyContent: "center",
                  width: "30%"
                }}
              />
              <ToggleButton
                icon={() => <Text style={{ color: selected === '200' ? "white" : "black", fontSize: 16 }}>$200</Text>}
                value="200"
                status={selected === '200' ? 'checked' : 'unchecked'}
                onPress={() => setSelected(selected === '200' ? null : '200')}
                style={{
                  borderRadius: 20,
                  borderColor: "lightgray",
                  borderWidth: 3,
                  backgroundColor: selected === '200' ? '#BF9EF2' : 'white',
                  padding: 3,
                  alignItems: "center",
                  justifyContent: "center",
                  width: "30%"
                }}
              />
            </View>
            <View style={{ flexDirection: "row", gap: 15, marginTop: 10 }}>
              <ToggleButton
                icon={() => <Text style={{ color: selected === '300' ? "white" : "black", fontSize: 16 }}>$300</Text>}
                value="300"
                status={selected === '300' ? 'checked' : 'unchecked'}
                onPress={() => setSelected(selected === '300' ? null : '300')}
                style={{
                  borderRadius: 20,
                  borderColor: "lightgray",
                  borderWidth: 3,
                  backgroundColor: selected === '300' ? '#BF9EF2' : 'white',
                  padding: 3,
                  alignItems: "center",
                  justifyContent: "center",
                  width: "30%"
                }}
              />
              <ToggleButton
                icon={() => <Text style={{ color: selected === '400' ? "white" : "black", fontSize: 16 }}>$400</Text>}
                value="400"
                status={selected === '400' ? 'checked' : 'unchecked'}
                onPress={() => setSelected(selected === '400' ? null : '400')}
                style={{
                  borderRadius: 20,
                  borderColor: "lightgray",
                  borderWidth: 3,
                  backgroundColor: selected === '400' ? '#BF9EF2' : 'white',
                  padding: 3,
                  alignItems: "center",
                  justifyContent: "center",
                  width: "30%"
                }}
              />
            </View>

            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={["#FBB4D1", "#BF9EF2"]} style={{ borderRadius: 10, width: 300, alignItems: "center", height: 40, justifyContent: "center", marginTop: 20, marginBottom: 5, alignSelf: "center" }}>
              <TouchableHighlight underlayColor="#BF9EF2" style={[styles.button, { borderRadius: 10, backgroundColor: "transparent", width: 300, alignItems: "center", height: 40, justifyContent: "center" }]} onPress={() => setModalVisible(!modalVisible)}>
                <View>
                  <Text style={{ color: "white", fontSize: 18 }}>Tip Creator</Text>
                </View>
              </TouchableHighlight>
            </LinearGradient>
          </View>
        </View>


      </Modal>
    )
  }


  const Post = ({ post }) => {
    const [currentPage, setCurrentPage] = useState(0);
    return (
      <View style={styles.postContainer}>
        {/* Post Header */}
        <View style={styles.postHeader}>
          <View style={{ flexDirection: "row" }}>
            <Image source={{ uri: post.user.avatar }} style={styles.avatar} />
            <View>
              <Text style={styles.username}>{post.user.username}</Text>
              <Text style={{ fontSize: 12 }}>{post.user.time}</Text>
            </View>
          </View>
          <View style={{ alignSelf: "flex-end", justifyContent: "flex-end" }}>
            <Menu>
              <MenuTrigger>
                <MCIcon name="dots-horizontal" size={35}></MCIcon>
              </MenuTrigger>
              <MenuOptions customStyles={{
                optionsContainer: {
                  marginTop: 30, // Adjust this value as needed to position the menu correctly
                  borderRadius: 8,
                  padding: 5,
                },

              }}>
                <MenuOption style={{ flexDirection: "row", justifyContent: "center" }} onSelect={onLogout}>
                  <OCIcon name="report" size={25} style={{ marginRight: 20 }}></OCIcon>
                  <Text style={{ fontSize: 15 }}>Report User</Text>
                </MenuOption>
              </MenuOptions>
            </Menu>
          </View>
        </View>
        {/* Post Images */}

        <PagerView style={{ height: 400 }} initialPage={0} onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}>
          {post.images.map((image, index) => (
            <View key={index} style={{ borderRadius: 10, overflow: "hidden", marginBottom: 5 }}>
              <ImageBackground source={{ uri: image }} style={styles.postImage}>
                <TouchableHighlight style={{ top: 10, borderRadius: 10, backgroundColor: "rgba(255, 255, 255, 0.384)", borderWidth: 1, borderColor: "white", alignSelf: "flex-end", padding: 3, marginRight: 15 }} onPress={() => { setModalVisible(true) }}>
                  <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    <FAIcon name="dollar" size={14} style={{ color: "white", marginRight: 5 }}></FAIcon>
                    <Text style={{ fontWeight: "bold", color: "white" }}>Tip Creator</Text>
                  </View>
                </TouchableHighlight>
                <PaginationDot
                  active={currentPage}
                  length={post.images.length}
                  activeColor="#ffffff"
                  passiveDotWidth={7}
                  passiveDotHeight={7}
                  activeDotWidth={10}
                  activeDotHeight={10}
                  passiveColor="#ffffffc0"
                ></PaginationDot>

              </ImageBackground>
            </View>
          ))}
        </PagerView>

        <Text style={{ color: "black", fontWeight: "500", marginTop: 5 }}>{post.description}</Text>

        {/* Post Footer */}
        <View style={styles.postFooter}>
          <View style={styles.actionIcons}>
            <Icon name="favorite-border" size={25} style={styles.icon} />
            <Text style={{ fontSize: 12, marginRight: 10, color: "black", fontWeight: "500" }}>{post.likes}</Text>
            <TouchableHighlight onPress={() => { setCommentModal(true) }} underlayColor="lightgrey">
              <Icon name="chat-bubble-outline" size={25} style={styles.icon} />
            </TouchableHighlight>
            <Text style={{ fontSize: 12, marginRight: 10, color: "black", fontWeight: "500" }}>{post.likes}</Text>
            <TouchableHighlight onPress={() => { setSendModal(true) }} underlayColor="lightgrey">
              <FEIcon name="send" size={25} style={styles.icon} />
            </TouchableHighlight>
          </View>
          {/* <Text style={styles.description}><Text style={styles.username}>{post.user.username} </Text>{post.description}</Text>
        {post.comments.map(comment => (
          <Text key={comment.id} style={styles.comment}><Text style={styles.username}>{comment.username} </Text>{comment.comment}</Text>
        ))} */}
        </View>
      </View>
    );
  }



  const renderHeader = () => (
    <View style={styles.header}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Image source={require('../../assets/Frame.png')} style={styles.microImage} />
        <TouchableHighlight style={{ borderRadius: 20 }} underlayColor="lightgrey" onPress={() => { navigation.navigate("Notification") }}>
          <Icon name="notifications-none" size={30} style={styles.microImage} />
        </TouchableHighlight>
      </View>

      <FlatList
        horizontal
        data={[{ id: 'your_story' }, ...stories]}
        renderItem={({ item }) => item.id === 'your_story' ? <YourStory /> : <StoryItem story={item} />}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.storiesContainer}
      />
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <MenuProvider>
        <View>
          {(modalVisible || paymentModalVisible) && <BlurView
            style={{ position: "absolute", height: "100%", width: "100%" }}
            blurType="light"
            blurAmount={1}
            reducedTransparencyFallbackColor="red"
          />}

          <FlatList
            data={posts}
            renderItem={({ item }) => <Post post={item} />}
            keyExtractor={item => item.id}
            ListHeaderComponent={renderHeader}
            showsVerticalScrollIndicator={false}
          />
          <PaymentModal></PaymentModal>
          <TipCreatorModal></TipCreatorModal>
          <SendModal></SendModal>
          <CommentModal></CommentModal>
        </View>
      </MenuProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    justifyContent: "center",
  },
  microImage: {
    width: 50,
    height: 28,
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10
  },
  storiesContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  storyItem: {
    alignItems: 'center',
    margin: 10,
  },
  imageContainer: {
    padding: 3, // Padding between image and border
    borderRadius: 60,
    borderColor: '#97979794', // Instagram-like border color
  },
  yourStoryContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#cacaca',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3
  },
  storyImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  storyName: {
    marginTop: 5,
    fontSize: 12,
    color: "black"
  },
  postContainer: {
    //marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    //    alignItems: "center",
    marginBottom: 10
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontWeight: "bold",
    color: "black",
    fontSize: 15
  },
  postImage: {
    width: '100%',
    height: 400,
    borderRadius: 10,
    justifyContent: "flex-end",
  },
  postFooter: {
    //    padding: 10,
    marginTop: 10
  },
  actionIcons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 5,
  },
  icon: {
    marginRight: 5,
  },
  likes: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    marginBottom: 5,
  },
  comment: {
    marginBottom: 2,
  },
  header: {
    paddingBottom: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 20,
  },
  toggleButton: {
    borderRadius: 20,
    borderColor: "lightgray",
    borderWidth: 3,
    backgroundColor: "transparent",
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    width: "40%",
  },
  textInput: {
    backgroundColor: 'white',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 10,
    width: "100%",
    borderRadius: 20,
    overflow: "hidden",
  },

});
