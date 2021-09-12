
<template>
<div id="q-app" style="min-height: 100vh;" class="mystyle">
  <div class="q-pa-md">
    <div class="q-gutter-md" style="max-width: 500px" ref="inputwidth" >
      <q-card-section class="q-qt-none">
      Hi <p></p>
      {{userName}} <p></p>   
      {{userEmail}} <p></p>
    </q-card-section>
       <q-btn
        class="q-mt-sm"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        label="Go Home"
        no-caps
      />
       <q-btn
        class="q-mt-sm"
        color="white"
        text-color="blue"
        unelevated
        to="/myInfo"
        label="My Info"
        no-caps
      />
    </div>     
  </div>  
</div>
  
</template>
<script>
import { auth, db } from 'src/boot/firebase'
import { defineComponent, ref } from 'vue';
import { useQuasar } from 'quasar'
import { mapActions, mapGetters} from 'vuex'
  
export default defineComponent({

  updated(){       
     console.log("update called")
  },
  
  mounted(){ 
  // user가 없는 경우 초기에 null이 들어온다.
  // authAction 안에 있는 onAuthStateChanged를 통하여 currentUser 호출이 가능
  auth.onAuthStateChanged((user) => {
      if (user) {              
          console.log('User is logined', user);
          this.$store.commit("setFireUser", user)
          this.userEmail = this.getFireUser.email
          // update data or vuex state
      } else {  
          console.log('User is not logged in.');
      }

      if(user){
      db.collection("users").where("email", "==", user.email)
      .get()
      .then((querySnapshot) => {        
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        this.userName = doc.data().name
          });
        })    
      }     
    })
    console.log("mounted called")
   }, 

  data(){    
    
    return {
    userEmail:'',
    userName: '',
    }
  },

  computed: {
    ...mapGetters(["getFireUser","isUserAuth"])
  },
  methods: {
    ...mapActions(["signOutAction","authAction"])
  }
  
})



</script>


<style lang="scss">
.mystyle {
  display: flex;
  justify-content: center;
  align-items:center;
  font-size: 30px;
  width : 80%;
}
.my-checkbox {
  font-size:15px;
}
.header{
  font-size:20px;
  color:red;
  
}
.mystyle2 {
 
  text-align: center;
}


</style>

