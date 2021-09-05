
<template>
<div id="q-app" style="min-height: 100vh;" class="mystyle">
  <div class="q-pa-md">
    <div class="q-gutter-md" style="max-width: 500px" ref="inputwidth" >
      <div class="Login">Login</div>    
        <q-input v-model="userEmail" filled type="email"  label="Email"  ></q-input>
         <q-input v-model="password" filled :type="isPwd ? 'password' : 'text'" label="your password">
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility' "
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          ></q-icon>
        </template>
      </q-input>
        <q-btn @click="login" color="primary" label="Login"
    :style="{width : btnWidth+'px'}" /><br>
       

  <q-checkbox class="my-checkbox" v-model="right" label="Remember Me"></q-checkbox><br>   
  <q-btn
        class="q-mt-sm"
        color="white"
        text-color="blue"
        unelevated
        to="/SignUp"
        label="Sign Up"
        no-caps
      />
       <q-btn
        class="q-mt-sm"
        color="white"
        text-color="blue"
        unelevated
        to="/ForgetPwd"
        label="Forget your password?"
        no-caps
      />
    </div>
  <!--
  <div class="header">

  <router-link to="/SignUp">
  <center>Join Us!</center>
  </router-link>
  <router-link to="/forgetPwd">
  <center>Forget your password?</center>
  </router-link>
 
  </div>
  -->
     
  </div>  
</div>
  
</template>

<script>
import { auth } from 'src/boot/firebase'
import { defineComponent, ref } from 'vue';
import { useQuasar } from 'quasar'


export default defineComponent({
  mounted(){
    this.btnWidth = this.$refs.inputwidth.clientWidth
    console.log(this.btnWidth);
  },    


  data(){

    
    return {
    
    userEmail:"",
    password:"",
    isPwd:true,
    btnWidth: '', 
    right:true,
    left:false

    }
  },

  methods: {
  
 
   login(){          
     auth.signInWithEmailAndPassword(this.userEmail, this.password)
  .then((userCredential) => {
    

    // Signed in
   var user = userCredential.user  
   
   
   console.log("commit user", user)
  
   console.log("success")
    
    this.$q.notify({
        position: "top",
        message: "Login Success",
        color: "blue",
        type: "positive",
    })
  
    
    this.$router.push({ path: "UserMain" });
    this.$store.commit("setFireUser", user)
    //this.setFireUser(state, user)
   

    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage);
     console.log($q.userEmail)
  });
    
    }

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

