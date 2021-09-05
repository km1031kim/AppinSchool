
<template>
<div id="q-app" style="min-height: 100vh;" class="mystyle">
  <div class="q-pa-md">
    <div class="q-gutter-md" style="max-width: 500px" ref="inputwidth" >
     새로고침 해보세요! {{userEmail}}
    </div>     
  </div>  
</div>
  
</template>

<script>
import { auth } from 'src/boot/firebase'
import { defineComponent, ref } from 'vue';
import { useQuasar } from 'quasar'
import { mapActions, mapGetters} from 'vuex'
  
export default defineComponent({
    created() {
        auth.onAuthStateChanged((user) => {
            if (user) {              
                console.log('User is logined', user);
                console.log("auth.currentUser",auth.currentUser)
                this.userEmail = auth.currentUser.email
                this.getFireUser
                // update data or vuex state
            } else {
                console.log('User is not logged in.');
            }
        });
    },
  mounted(){ 
  // user가 없는 경우 초기에 null이 들어온다.
  // authAction 안에 있는 onAuthStateChanged를 통하여 currentUser 호출이 가능

  
  
 

  //console.log("user email", this.user.email)



  
  
  

   }, 



  data(){ 
    
    
    return {
    userEmail:''
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


</style>

