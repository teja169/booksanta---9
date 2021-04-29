import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity, TextInput, Alert } from 'react-native';
import MyHeader from 'react-navigation';
import db from '../config'
import firebase from 'firebase'

export default class SettingScreen extends Component {

    constructor(){
        super();
        this.state={
            emailId : '',
            firstName : '',
            lastName : '',
            address : '',
            contact : '',
            docId: '',
        }
    }

    getUserDetails=()=>{
        var email = firebase.auth().currentUser.email;
        db.collection('users').where('email_id','==',email).get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                var data =doc.data()
                this.setState({
                    emailId : data.email_id,
                    firstName : data.first_name,
                    lastName : data.last_name,
                    address : data.address,
                    contact : data.contact,
                    docId : doc.id
                })
            });
        })
    }

    updateuserDetails=()=>{
        db.collection('users').doc(this.state.docId)
        .update({
            "first_name": this.state.firstName,
            "last_name" : this.state.lastName,
            "address" : this.state.address,
            "contact" : this.state.contact,
        })
        Alert.alert("Profile Updated Successfully")
    }
    componentDidMount(){
        this.getUserDetails()
    }
    render(){
        return(
            <View style={styles.container}>
                <MyHeader title="Settings" navigation={this.props.navigation}/>
                <View style={styles.formContainer}>
                    <TextInput
                    style={styles.formTextInput}
                    placeholder={"First Name"}
                    maxLenght ={8}
                    onChangeText={(text)=>{
                        this.setState({
                            firstName:text
                        })
                    }}
                    value={this.state.firstNamee}
                    />
                    <TextInput style={styles.formTextInput}>
                        placeholder={"Last Name"}
                        maxLenght ={8}
                        onChangeText={(text)=>{
                            this.setState({
                                lastName: text
                            })
                        }}
                        value={this.state.lastName}
                    </TextInput>
                    <TextInput style={styles.formTextInput}
                    placeholder={"contact"}
                    maxLenght={10}
                    keyboardType={'numeric'}
                    onChangeText={(text)=>{
                        contact:text
                    }}
                    value={this.state.contact}/>

                    <TextInput
                    style={styles.formTextInput}
                    placeholder={"Address"}
                    multiline = {true}
                    onChangeText={(text)=>{
                        this.setState({
                            address:text
                        })
                    }}
                    value={this.state.address}/>
                    <TouchableOpacity style={styles.button}
                    onPress={()=>{
                        this.updateuserDetails()
                    }}>
                        <Text style={styles.buttonText}>SAVE </Text>
                    </TouchableOpacity>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
      flex:1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    formContainer:{
      flex:1,
      width:'100%',
      alignItems: 'center'
    },
    formTextInput:{
      width:"75%",
      height:35,
      alignSelf:'center',
      borderColor:'#ffab91',
      borderRadius:10,
      borderWidth:1,
      marginTop:20,
      padding:10,
    },
    button:{
      width:"75%",
      height:50,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:10,
      backgroundColor:"#ff5722",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8,
      },
      shadowOpacity: 0.44,
      shadowRadius: 10.32,
      elevation: 16,
      marginTop:20
    },
    buttonText:{
      fontSize:25,
      fontWeight:"bold",
      color:"#fff"
    }
  })