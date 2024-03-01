import { Audio } from 'expo-av';
import React, { useEffect, useState } from 'react';
import songs from "../assets/songs/songs.json";
import { StatusBar, StyleSheet, Dimensions, ScrollView, Pressable, Text, View, Image, Button } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const songWidth = Math.floor(screenWidth * 0.25) - 20;

export function Music() {
    const [audio, setAudio] = useState(null);
    const [text, setText] = useState(Array(songs.data.length).fill("▶"));

    const clickPlay = async (song) => {
        // handle previous sounds
        if(audio) {
            // replace all play buttons with play icon
            setText(Array(songs.data.length).fill("▶"));
            await audio.stopAsync();
        }

        // create sound object
        if(!audio || audio.id !== song.id) {  
            // create song and save id
            const { sound } = await Audio.Sound.createAsync(require(`../assets/songs/cwy.mp3`));
            sound.id = song.id;

            // change play button to pause button and play the song
            setText(text.map((v, i) => i === song.id - 1 ? "⏸" : "▶"));
            sound.playAsync();
            setAudio(sound);
        } else {
            setAudio(null);
        }
    };

    const generateSongs = () => {
        return songs.data.map((v, i) => (
            <View key={i} style={styles.songContainer}>
                <Image source={require("../assets/favicon.png")} style={styles.songImage}/>
                <Text style={styles.text}>{v.name}</Text>
                <Pressable onPress={() => clickPlay(v)} style={styles.playButton}>
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
