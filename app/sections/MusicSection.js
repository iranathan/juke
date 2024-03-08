import { Audio } from 'expo-av';
import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, Dimensions, ScrollView, Pressable, Text, View, Image } from 'react-native';
import * as Progress from 'expo-progress';

const api = "https://88888.stu.sd-lab.nl/juke";
const screenWidth = Dimensions.get('window').width;
const songWidth = Math.floor(screenWidth * 0.333) - 20;

export function Music() {
    const [progress, setProgress] = useState(0);
    const [audio, setAudio] = useState(null);
    const [songs, setSongs] = useState([]);
    const [text, setText] = useState([]);

    // fetch songs from api
    function fetchSongs() {
        fetch(`${api}/songs.php`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                return response.json(); // Parse JSON data
            })
            .then(data => {
                setSongs(data); // Update state with fetched data
                setText(Array(data.length).fill("▶️"));
            })
            .catch(error => {
                console.error(error);
            });
    }

    useEffect(() => {
        fetchSongs();

        const intervalId = setInterval(async () => {
            if(audio) {
                const status = await audio.getStatusAsync();
                if(status.isLoaded && status.didJustFinish) {
                    setAudio(null);
                    setText(Array(songs.length).fill("▶️"));
                }
                setProgress(status.positionMillis / status.durationMillis);
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [audio]);

    const clickPlay = async (song) => {

        // handle previous sounds
        if(audio) {
            // replace all play buttons with play icon
            setText(Array(songs.length).fill("▶️"));
            await audio.stopAsync();
        }
    
        // create sound object
        if(!audio || audio.id !== song.id) {  
            // create song and save id
            const { sound } = await Audio.Sound.createAsync({uri: `${api}/audio/${song.id}.${song.audioType}`});
            sound.id = song.id;
    
            // change play button to pause button and play the song
            const newText = text.map((v, i) => i === song.id - songs[0].id ? "⏸️" : "▶️");
            setText(newText);
            sound.playAsync()
            setAudio(sound);
        } else {
            setAudio(null);
        }
    };
    

    const generateSongs = () => {
        return songs.map((v, i) => (
            <View key={i} style={styles.songContainer}>
                <Image source={{uri: `${api}/images/${v.id}.${v.imageType}`}} style={styles.songImage}/>
                <Text style={styles.text}>{v.name}</Text>
                <Pressable onPress={ () => clickPlay(v).catch(console.error) } style={styles.playButton}>
                    <Text>{text[i]}</Text>
                </Pressable>
            </View>
        ));
    };

    return (
        <>
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.flexContainer}>
                        {generateSongs()}
                    </View>
                </ScrollView>
                <StatusBar style="auto" />
            </View>
            <View style={styles.controlContainer}>
                <Progress.Bar progress={progress} width={screenWidth} color="#FFFFFF" />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    playButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: "#FFFFFF",
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
    controlContainer: {
        height: 30,
        backgroundColor: "#000000",
        color: "white"
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

export default Music;