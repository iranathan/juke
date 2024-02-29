import { Audio } from 'expo-av';
import AudioPlayer from '../player';
import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, Dimensions, ScrollView, Pressable, Text, View, Image, Button } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const songWidth = Math.floor(screenWidth * 0.25) - 20;
const songs = [
    {name: "Cool with you", src: "cwy.mp3"},
    {name: "Cool with you", src: "cwy.mp3"},
]

export function Music() {
    const [player, setPlayer] = useState(null);
    const [text, setText] = useState(Array(songs.length).fill("▶"));

    const clickPlay = async (song) => {
        if (player) {
            if(player.isPlaying) {
                setText(Array(songs.length).fill("▶"))
                return player.pauseAsync();
            }
            player.unloadAsync();
        }
        const sound = new Audio.Sound();
        try {
            await sound.loadAsync(require(`../assets/songs/${songs[song].src}`));
            await sound.playAsync();
            setText(Array(songs.length).fill("▶"))
            setText(text => text.map((v, i) => i === song ? "⏸︎" : v));
            setPlayer(sound);
        } catch (error) {
            console.log(error);
        }
    };

    const generateSongs = () => {
        return songs.map((v, i) => (
            <View key={i} style={styles.songContainer}>
                <Image source={require("../assets/favicon.png")} style={styles.songImage}/>
                <Text style={styles.text}>{v.name}</Text>
                <Pressable onPress={() => clickPlay(i)} style={styles.playButton}>
                    <Text>{text[i]}</Text>
                </Pressable>
            </View>
        ));
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.flexContainer}>
                    {generateSongs()}
                </View>
            </ScrollView>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    playButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: "#1ed760",
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#121212"
    },
    text: {
        fontSize: 24,
        marginBottom: 20,
        color: "white"
    },
    flexContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'start',
    },
    songContainer: {
        backgroundColor: "#181818",
        alignItems: 'center',
        margin: 10,
        paddingTop: 10,
        width: songWidth
    },
    songImage: {
        width: 100,
        height: 100,
    },
});
