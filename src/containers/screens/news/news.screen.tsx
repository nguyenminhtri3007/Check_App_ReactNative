import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, } from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign"
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { styles } from "./new-screen.style";
import Entypo from "react-native-vector-icons/Entypo"

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.option}>
          <AntDesign name="videocamera" size={30} color="red" />
          <Text style={[styles.optionText, { color: "red" }]}> Live</Text>
        </TouchableOpacity>

        {/* Separator */}
        <View style={styles.separator} />

        <TouchableOpacity style={styles.option}>
          <MaterialIcon name="photo-size-select-actual" size={30} />
          <Text style={styles.optionText}> Photo</Text>
        </TouchableOpacity>

        {/* Separator */}
        <View style={styles.separator} />

        <TouchableOpacity style={styles.option}>
          <MaterialCommunityIcon name="video-plus" size={32} color="purple" />
          <Text style={[styles.optionText, { color: "purple" }]}> Room</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Users = () => {
  return (
    <View style={styles.usersHeader}>
      <View style={styles.usersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity style={styles.createRoom}>
            <MaterialCommunityIcon name="video-plus" size={26} color="#E141FC" />
            <Text style={[styles.optionText, { color: "#1777f2" }]}>Create Room</Text>
          </TouchableOpacity>
          <View style={styles.userAvatar}>
            <Image source={require('../../../../assets/images/avata.jpg')} style={styles.avatar} />
          </View>
          <View style={styles.userAvatar}>
            <Image source={require('../../../../assets/images/avata1.jpg')} style={styles.avatar} />
          </View>
          <View style={styles.userAvatar}>
            <Image source={require('../../../../assets/images/avata2.jpg')} style={styles.avatar} />
          </View>
          <View style={styles.userAvatar}>
            <Image source={require('../../../../assets/images/avata3.jpg')} style={styles.avatar} />
          </View>
          <View style={styles.userAvatar}>
            <Image source={require('../../../../assets/images/avata4.jpg')} style={styles.avatar} />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const stories = [
  {
    id: '0',
    name: 'Add To Story',
    image: require('../../../../assets/images/story1.jpg'),
    avatar: null, // Không có avatar, sẽ hiển thị icon `+`
  },
  {
    id: '1',
    name: 'Trí Thái Bình',
    image: require('../../../../assets/images/story2.jpg'),
    avatar: require('../../../../assets/images/avata1.jpg'),
  },
  {
    id: '2',
    name: 'Messi',
    image: require('../../../../assets/images/story3.jpg'),
    avatar: require('../../../../assets/images/avata2.jpg'),
  },
  {
    id: '3',
    name: 'Rô ',
    image: require('../../../../assets/images/story4.jpg'),
    avatar: require('../../../../assets/images/avata3.jpg'),
  },
];

const Storis = () => {
  return (
    <View>
      <View style={styles.stotyContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingLeft: 11 }}>
          {stories.map((story) => (
            <View key={story.id} style={styles.card}>
              <Image source={story.image} style={styles.cardStory} />
              <View style={styles.cardUser}>
                {story.avatar ? (
                  <Image source={story.avatar} style={styles.avatar} />
                ) : (
                  <AntDesign name="plus" size={24} color="#1777f2" />
                )}
              </View>
              <View style={styles.cardFooter}>
                <Text style={styles.text}>{story.name}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={styles.bottomDivider} />
    </View>
  );
}

const posts = [
  {
    id: '1',
    userName: 'Trí Thái Bình',
    userAvatar: require('../../../../assets/images/avata3.jpg'),
    time: '9m',
    postText: 'Ngày mai anh em đi chơi nhé',
    postImage: require('../../../../assets/images/story3.jpg'),
    likes: '88 likes',
    comments: '2k comments',
  },
  {
    id: '2',
    userName: 'Messi',
    userAvatar: require('../../../../assets/images/avata4.jpg'),
    time: '9m',
    postText: 'Post user',
    postImage: require('../../../../assets/images/story4.jpg'),
    likes: '88 likes',
    comments: '2k comments',
  },
];

const Feed = () => {
  return (
    <View>
      {posts.map((post) => (
        <View key={post.id} style={styles.feedContainer}>
          {/* Header của bài viết */}
          <View style={styles.postHeader}>
            <Image source={post.userAvatar} style={styles.avatar} />
            <View style={styles.postInfo}>
              <Text style={styles.userName}>{post.userName}</Text>
              <View style={styles.row}>
                <Text style={styles.postTime}>{post.time}</Text>
                <Entypo name="dot-single" size={12} color="#747476" />
                <Entypo name="globe" size={10} color="#747476" />
              </View>
            </View>
            <Entypo name="dots-three-horizontal" size={15} color="#222121" />
          </View>

          {/* Nội dung bài viết */}
          <Text style={styles.postText}>{post.postText}</Text>

          {/* Ảnh bài viết */}
          <Image source={post.postImage} style={styles.postImage} />

          {/* Footer */}
          <View style={styles.footer}>
            <View style={styles.footerCount}>
              <View style={styles.row}>
                <View style={styles.iconCount}>
                  <AntDesign name="like1" size={12} color="#FFFFFF" />
                </View>
                <Text style={styles.textCount}>{post.likes}</Text>
              </View>
              <Text style={styles.textCount}>{post.comments}</Text>
            </View>

            <View style={styles.separator} />

            <View style={styles.footerMenu}>
              <TouchableOpacity style={styles.button}>
                <AntDesign name="like2" size={20} color="#424040" />
                <Text style={styles.buttonText}>Like</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button}>

                <Text style={styles.buttonText}>Comment</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button}>

                <Text style={styles.buttonText}>Share</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.bottomDivider} />
        </View>
      ))}
    </View>
  );
}

const NewScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bảng tin</Text>
      <View style={styles.inputContainer}>
        <View style={styles.avatarContainer}>
          <Image
            source={require('../../../../assets/images/avata.jpg')}
            style={styles.avatar}
          />
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
            placeholder="Bạn đang nghĩ gì?"
            placeholderTextColor="#A0A0A0"
            style={styles.input}
          />
        </View>
      </View>
      <Header />
      <Users />
      <Storis />
      <Feed />
    </View>
  );
};


export default NewScreen;