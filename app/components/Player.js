import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Card from './Card';
import { showMessage } from "react-native-flash-message";
import YoutubePlayer from "react-native-youtube-iframe";

const Player = ({ navigation }) => {

    const [playing, setPlaying] = useState(false);
    const videoId = "IKPDRDy8elg";

    const pressed = () => {
        setPlaying(!playing);
    }

    const onStateChange = useCallback((state) => {
        if (state === "ended") {
            setPlaying(false);
            Alert.alert("video has finished playing!");
        }
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>SERIEFLIX</Text>


            <YoutubePlayer
                height={250}
                play={playing}
                videoId={videoId}
                onChangeState={onStateChange}
                onFullScreenChange={fullScreen => console.log(fullScreen)}
            />


            <View style={styles.subContainer}>
                <Text style={styles.subtitle}>Sıradaki Bölümler</Text>
                <ScrollView>
                    <Card title={'Aile 3. Bölüm'} description={'Aile Dizisi'} image={'https://i.ytimg.com/vi/K0xP5cLqf-A/hqdefault.jpg?sqp=-oaymwEiCKgBEF5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLC6VR_tS8EgkJgT79x_ymmywg3jbA'} />
                    <Card title={'Aile 4. Bölüm'} description={'Aile Dizisi'} image={'https://i.ytimg.com/vi/K0xP5cLqf-A/hqdefault.jpg?sqp=-oaymwEiCKgBEF5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLC6VR_tS8EgkJgT79x_ymmywg3jbA'} />
                    <Card title={'Aile 5. Bölüm'} description={'Aile Dizisi'} image={'https://i.ytimg.com/vi/K0xP5cLqf-A/hqdefault.jpg?sqp=-oaymwEiCKgBEF5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLC6VR_tS8EgkJgT79x_ymmywg3jbA'} />
                    <Card title={'Aile 6. Bölüm'} description={'Aile Dizisi'} image={'https://i.ytimg.com/vi/K0xP5cLqf-A/hqdefault.jpg?sqp=-oaymwEiCKgBEF5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLC6VR_tS8EgkJgT79x_ymmywg3jbA'} />
                    <Card title={'Aile 7. Bölüm'} description={'Aile Dizisi'} image={'https://i.ytimg.com/vi/K0xP5cLqf-A/hqdefault.jpg?sqp=-oaymwEiCKgBEF5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLC6VR_tS8EgkJgT79x_ymmywg3jbA'} />
                    <Card title={'Aile 8. Bölüm'} description={'Aile Dizisi'} image={'https://i.ytimg.com/vi/K0xP5cLqf-A/hqdefault.jpg?sqp=-oaymwEiCKgBEF5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLC6VR_tS8EgkJgT79x_ymmywg3jbA'} />
                    <Card title={'Aile 9. Bölüm'} description={'Aile Dizisi'} image={'https://i.ytimg.com/vi/K0xP5cLqf-A/hqdefault.jpg?sqp=-oaymwEiCKgBEF5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLC6VR_tS8EgkJgT79x_ymmywg3jbA'} />
                    <Card title={'Aile 10. Bölüm'} description={'Aile Dizisi'} image={'https://i.ytimg.com/vi/K0xP5cLqf-A/hqdefault.jpg?sqp=-oaymwEiCKgBEF5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLC6VR_tS8EgkJgT79x_ymmywg3jbA'} />
                </ScrollView>
            </View>


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        alignSelf: 'center',
        color: '#fff',
    },
    subtitle: {
        fontSize: 18,
        color: '#fff',
        marginBottom: 10,
    },
    subContainer: {
        marginHorizontal: 20,
    },
    button: {
        padding: 10,
        borderRadius: 5,
        borderColor: '#000',
        borderWidth: 1,
        margin: 10,
        width: 100,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    }
});

export default Player;
