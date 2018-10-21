import createEasyFirestore from 'vuex-easy-firestore'

const firestoreConfig = {
  firestorePath: 'users/{userId}',
  firestoreRefType: 'doc',
  moduleName: 'user',
}
const easyFirestore = createEasyFirestore([firestoreConfig], {logging: true})
export const plugins = [easyFirestore]
export const strict = false

