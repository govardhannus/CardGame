import React,{useState,useEffect} from 'react';

import {
    Animated,
    StyleSheet,
    Text,
} from "react-native";

function Card({ item }) {

    const [value] = useState(new Animated.Value(0))

    useEffect(()=>{
        Animated.spring(value, {
            toValue: 180,
            friction: 8,
            tension: 10
        }).start();

    }, [value])

    const width = value.interpolate({
        inputRange: [0, 180],
            outputRange: ['0deg', '180deg']
    })

    const frontAnimatedStyle = {
        transform: [{ rotateY: width }]
    }

    return (
        <Animated.View>
        <Animated.View style={[styles.cardStyle, styles.flipCardBack]}>
            <Animated.View style={styles.container}>
                <Animated.View style={styles.backCardBorder}>
                    <Animated.View style={styles.cardLength}>
                        <Text style={styles.backCardText}>
                            {item.value}
                        </Text>
                    </Animated.View>
                </Animated.View>
            </Animated.View>
        </Animated.View>
        <Animated.View style={[item.open && frontAnimatedStyle, styles.cardStyle]}>
            <Animated.View style={styles.container}>
                <Animated.View style={styles.frontCardBorder}>
                    <Animated.View style={styles.cardLength}>
                        <Text style={styles.frontCardText}>
                           ?
                        </Text>
                    </Animated.View>
                </Animated.View>
            </Animated.View>
        </Animated.View>
    </Animated.View >
      );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    backCardBorder: {
        backgroundColor: "#eee",
        borderRadius: 10,
        overflow: "hidden"
    },
    frontCardBorder: {
        backgroundColor: "#87cefa",
        borderRadius: 10,
        overflow: "hidden"
    },
    cardLength: {
        width: 100,
        height: 150
    },
    backCardText: {
        alignSelf: 'center',
        height: 100,
        lineHeight: 100,
        color: "#FF0000",
        fontSize: 18
    },
    frontCardText: {
        alignSelf: 'center',
        height: 100,
        lineHeight: 100,
        color: "#FFFFFF",
        fontSize: 18
    },
    cardStyle: {
        height: 150,
        width: 100,
        marginTop:20,
        marginBottom:20,
        backfaceVisibility: 'hidden',
    },
    flipCardBack: {
        position: "absolute",
        top: 0,
    },

});

export default Card;