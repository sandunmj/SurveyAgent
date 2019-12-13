import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {firebase} from '@react-native-firebase/auth';
import React, {Component} from 'react';

export default class FirebaseComponents extends Component {
  constructor(props) {
    super(props);
  }

  writeSurvey = () => {
    var ref = firebase.database().ref('surveys');
    console.log('writing data');
    const survey1 = {
      questions: {
        1: 'Do you feel valued at work?',
        2: 'Do you like the company of co-workers?',
        3: 'Does management respect personal family time?',
        4: 'I would not mind getting in to details & getting my hands dirty at work.',
        5: 'I can cope up with frequent change of team members',
        6: 'I am a perfectionist',
        7: 'I  usually prefer detailed guidance on a new initiative',
        8: 'Is your work meaningful?',
        9: 'Do you foresee working in the organization 1 year from now?',
        10: 'Are you proud to be part of the team?',
      },
    };

    const survey2 = {
      questions: {
        1: 'Curiosity is a good quality',
        2: 'Learning is a life long journey',
        3: 'Innovation is a waste of money & effort',
        4: 'I  usually prefer detailed guidance on a new initiative',
        5: 'I do not like to be part of cross functional projects',
        6: 'Do you have fun at work?',
        7: 'Is the management is transparent?',
        8: 'Do you like the company culture?',
        9: 'Will you reply to the current job?',
      },
    };
    var PostRef = ref.push(survey2);
    var postId = PostRef.key;
    firebase
      .database()
      .ref('currentSurveyIDs/' + postId)
      .set({valid: true});
    return postId;
  };
}
