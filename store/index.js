import createEasyFirestore from 'vuex-easy-firestore'

const firestoreConfig = {
  firestorePath: 'users/KMwcfHTBQB9A0rL3o2ic',
  firestoreRefType: 'doc',
  moduleName: 'wallety',
}
const easyFirestore = createEasyFirestore(firestoreConfig, {logging: true})
export const plugins = [easyFirestore]

