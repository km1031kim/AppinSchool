import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'


// import example from './module-example'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */
import { auth } from 'src/boot/firebase'


export default store(function (/* { ssrContext } */) {
  const Store = createStore({

//  plugins: [createPersistedState({
//       storage: window.sessionStorage,
//   })],
    modules: {
      // example
    },
    state: {      
      fireUser:null
    },
    actions: {
      signOutAction({commit}) {
        auth.signOut().then(() =>{
          commit("setFireUser", null)
        })
      },
      authAction({commit}){
        auth.onAuthStateChanged(user => {          
          if (user) {
            commit("setFireUser", user)
          }
        })
      }
    },
    // state를 컨트롤 하는 mutation
    // commit(setFireUser)을 호출하는건 action
    // commit 동기화 펑션. 바로 적용
    // action안에는 비동기 액션 넣을수 잇음
    mutations: {
      
      setFireUser(state, firebaseUser){
        state.fireUser = firebaseUser
      }
    },
    getters: {
      getFireUser(state){
        return state.fireUser
      },
      isUserAuth(state){
        return !!state.fireUser
      }
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  return Store
})
