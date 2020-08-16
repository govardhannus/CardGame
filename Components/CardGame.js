import React, { Component } from "react";

import {
    View,
    TouchableOpacity,
    StyleSheet,
    Text,
    FlatList,
    Alert
} from "react-native";
import Card from './Card'

export default class CardGame extends Component {

    constructor(props) {
        super(props)
        this.state = {
            flipCard: [],
            steps:0,
        }
    }

    componentWillMount() {
        this.generateRandom()
    }

    changeActiveCard = (index) => {
        const currentCard = this.state.flipCard[index]
        const newCards =[...this.state.flipCard]
        const previousCard = newCards.find((card) => {
            return !card.matched && card.open
        })
        if(previousCard){
            if(currentCard ==previousCard || newCards[index].matched == true){
                return 
            }
            const previousCardIndex = newCards.indexOf(previousCard)
            if(previousCard.value == currentCard.value){
                newCards[index]={
                    ...currentCard,
                    open:true,
                    matched:true
                }
                newCards[previousCardIndex]={
                    ...previousCard,
                    matched:true
                }
            }else{
                newCards[index]={
                    ...currentCard,
                    open:true,
                } 
                setTimeout(() =>{
                    this.closeCard(index)
                    this.closeCard(previousCardIndex)
                },300)
            }
        }else{
            newCards[index]={
                ...currentCard,
                open:true,
            }
            if(newCards[index].matched == true){
                return
            }
        }
        
        this.setState({
            flipCard:newCards,
           steps:this.state.steps + 1
        } ,() => console.log(this.state.steps));

        const unmatchedCard = newCards.find((card) => {
            return !card.matched 
        })
        
        if(!unmatchedCard){
            let message = 'you won this game'
            Alert.alert(
                'Congratulation!',
                message,
                [
                  { text: 'Try another round', onPress: () => this.restart() }
                ],
              );
        }

    }

    closeCard(index){
        const currentCard = this.state.flipCard[index]
        const newCards =[...this.state.flipCard]

        newCards[index]={
            ...currentCard,
            open:false,
        }

        this.setState({
            flipCard:newCards
         });

    }

    generateRandom() {
        let cards=[];
        while (cards.length < 6) {
         var r = Math.floor(Math.random() * 100) + 1;
         cards.push({
              value:r,
              open:false,
              matched:false,
          });
          
        }
        cards = cards.concat(cards);
        this.shuffle(cards)
        this.setState({
            flipCard:cards,
           });
    }

    restart = () =>{
        this.setState({
            steps:0,
           });
           this.generateRandom()
    }

    shuffle=(cards)=> {
        var currentIndex = cards.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = cards[currentIndex];
            cards[currentIndex] = cards[randomIndex];
            cards[randomIndex] = temporaryValue;
        }
    }

    render() {
        const renderItem = ({ item, index }) => (
            <TouchableOpacity onPress={() => this.changeActiveCard(index, item) }>
                <Card item={item}></Card>
            </TouchableOpacity>
        );

        return (
            <View>
                <View style={styles.navBar}>
                    <View style={styles.leftContainer}>
                        <Text style={[styles.text, { textAlign: 'left', color: '#87cefa', fontSize: 18 }]}
                            onPress={this.restart}>
                            Restart
                        </Text>
                    </View>
                    <View style={styles.rightContainer}>
                        <Text style={[styles.text, { textAlign: 'left', color: '#87cefa', fontSize: 18 }]}>
                            STEPS:{this.state.steps}
                        </Text>
                    </View>
                </View>

                <FlatList
                    data={this.state.flipCard}
                    numColumns={3}
                    renderItem={renderItem}
                    columnWrapperStyle={styles.row}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-around"
    },
    navBar: {
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    leftContainer: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: 20,
        justifyContent: 'flex-start',

    },
    rightContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight: 20,
        alignItems: 'center',
    },
});