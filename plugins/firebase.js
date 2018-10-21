import config from '~/firebase.credentials.json'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

firebase.initializeApp(config)
