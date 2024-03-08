import { Audio } from 'expo-av';
import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, Dimensions, ScrollView, Pressable, Text, View, Image } from 'react-native';
import { ProgressBar } from 'react-native-paper';

const api = "https://88888.stu.sd-lab.nl/juke";
const screenWidth = Dimensions.get('window').width;
const songWidth = Math.floor(screenWidth * 0.333) - 30;

export function Music() {
    const [progress, setProgress] = useState(0);
    const [songs, setSongs] = useState([]);
    const [currentSong, setCurrentSong] = useState(null);

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
            })
            .catch(error => {
                console.error(error);
            });
    }

    useEffect(() => {
        fetchSongs();
    }, []);

    const clickPlay = async (song) => {
        if (currentSong && currentSong.id === song.id) {
            await currentSong.sound.stopAsync();
            setCurrentSong(null);
        } else {
            if (currentSong) {
                await currentSong.sound.stopAsync();
            }

            const { sound } = await Audio.Sound.createAsync({ uri: `${api}/audio/${song.id}.${song.audioType}` });

            let debounceTimeout;

            sound.setOnPlaybackStatusUpdate(async (status) => {
                if (status.isLoaded && status.didJustFinish) {
                    setCurrentSong(null);
                    setProgress(0);
                } else {
                    // Debounce the setProgress call to prevent rapid flickering
                    clearTimeout(debounceTimeout);
                    debounceTimeout = setTimeout(() => {
                        setProgress(status.positionMillis / status.durationMillis);
                    }, 200); // Adjust the timeout duration as needed
                }
            });

            await sound.playAsync();
            setCurrentSong({ id: song.id, sound });
        }
    };

    return (
        <>
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.flexContainer}>
                        {songs.map((song, index) => (
                            <View key={index} style={styles.songContainer}>
                                <Image source={{ uri: `${api}/images/${song.id}.${song.imageType}` }} style={styles.songImage} />
                                <Text style={styles.text}>{song.name}</Text>
                                <Pressable onPress={() => clickPlay(song).catch(console.error)} style={styles.playButton}>
                                    <Text>{currentSong && currentSong.id === song.id ? '⏸️' : '▶️'}</Text>
                                </Pressable>
                            </View>
                        ))}
                    </View>
                </ScrollView>
                <StatusBar style="auto" />
            </View>
            <View style={styles.controlContainer}>
                <ProgressBar progress={progress} />
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
        height: "15%",
        backgroundColor: "#000000",
        textAlign: "center",
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
    playingimg: {
        width: 50,
        height: 50,
    }
});

export default Music;
