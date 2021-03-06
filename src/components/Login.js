import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
// import {geoClient, checkStatus, parseJSON} from '../utils';
import { checkStatus, parseJSON} from '../utils';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'log': '',
      'pas': ''
    }
  }
  render() {
    return(
      <View>
        <TextInput
          style={{
            backgroundColor: '#fff',
            marginTop: 15,
            marginBottom: 15,
            opacity: 0.6,
            width: 300
          }}
          placeholder="Your name"
          onChangeText={(e)=>{
            this.setState({
              'log': e
            })
          }
        }></TextInput>
        <TextInput
          style={{
            backgroundColor: '#fff',
            width: 300,
            marginTop: 15,
            marginBottom: 15,
            opacity: 0.6
          }}
          placeholder="Your password"
          secureTextEntry={true}
          onChangeText={(e)=>{
            this.setState({
              'pas': e
            })
          }
        }></TextInput>
        <Button onPress={()=>{
          // geoClient.client.then(api => {
            // const signin_request = api.client.signup(this.state.log.toLowerCase().toString(), this.state.pas.toString());
            // console.log(signin_request)
            fetch('http://146.185.128.182:4000/users/signin', {
              method: 'POST',
              body: '{"proof":"+wAd/P/RyJnzKXhxQGJC8JeuzxpTQszz680RYUYYjks=","username":"admin"}',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              }
            })
            .then(checkStatus)
            .then(function(response) {
                console.log("Content-Type" + response.headers.get('Content-Type'))
                console.log("Date" + response.headers.get('Date'))
                console.log("Status" + response.status)
                console.log("Status text" + response.statusText)
                return response
            })
            .then(parseJSON)
            .then((data) => {
              console.log('request succeeded with JSON response', data);
              this.props.dispatch(ActionCreators.actions.auth(data));
            }).catch(function(error) {
              console.log('request failed', error)
            });
          // })
        }} title='Sign In'></Button>
      </View>
    )
  }
}


const mapStateToProps = (state) => ({
  auth: state.logIn.isAuthenticated,
  name: state.logIn.name
})

export default connect(mapStateToProps)(Login);
