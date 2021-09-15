
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
    <q-checkbox class="my-checkbox" v-model="remember" label="Remember your ID"></q-checkbox><br>   
  
  
  <div class="q-gutter-md">
    <!-- none으로 해야 이미지 넣기 좋다 -->
    <q-btn padding="none" flat>
      <img src="../assets/google.png" style="width: 200px;" @click="googleLogin">
    </q-btn>
    <q-btn padding="none" flat>
      <img src="../assets/github.png" style="width: 200px;" @click="githubLogin">
    </q-btn>
  </div>
  
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
  </div>  
</div>
  
</template>

<script>
import { auth, g_auth, db } from 'src/boot/firebase'
import { defineComponent, ref } from 'vue';
import { useQuasar } from 'quasar'


export default defineComponent({
  mounted(){
    // created mounted updated
    this.btnWidth = this.$refs.inputwidth.clientWidth
    console.log(this.btnWidth);

    console.log(this.remember)
    console.log(localStorage.checkbox)

     if(localStorage.checkbox && localStorage.checkbox !== ""){
      this.remember = true
      this.userEmail = localStorage.username
    } else {
      this.remember = false
    }
  },

  data(){    
    return {
    remember:'false',
    userEmail:"",
    password:"",
    isPwd:true,
    btnWidth: ''
    }
  },

  methods: {
    githubLogin(){
     var provider = new g_auth.GithubAuthProvider();
     auth.languageCode = 'kr_KR'
     auth
      .signInWithPopup(provider)
      .then((result) => {
        var user = result.user;
        console.log("git user >>>", user.email)
        this.$store.commit("setFireUser", user)
        db.collection("users").where("email","==",user.email).get()
        .then((snapshot) => {
           
          if(snapshot.empty == true ){
          // 처음 들어온 값인 경우
          db.collection("users").add({
            email: user.email,
            name : user.displayName
            })
          } else {
            // 있는 값인 경우 snapshot.forEach를 통해 docID(문서 id)를 가져온다
            console.log("git snapshot >>", snapshot)
            snapshot.forEach((doc) => {
              db.collection("users").doc(doc.id).set({
              email: user.email,
              name : user.displayName
             })
            })      
          }
        })
      this.$router.push({ path: "UserMain" })  
      }).catch((error) => {
        console.log(error)
      }); 

    },
    googleLogin(){
     var provider = new g_auth.GoogleAuthProvider();
     auth.languageCode = 'kr_KR'
     auth
      .signInWithPopup(provider)
      .then((result) => {
        var user = result.user;
        console.log("user >>>", user.email)
        this.$store.commit("setFireUser", user)
        db.collection("users").where("email","==",user.email).get()
        .then((snapshot) => {
           
          if(snapshot.empty == true ){
          // 처음 들어온 값인 경우
          db.collection("users").add({
            email: user.email,
            name : user.displayName
            })
          } else {
            // 있는 값인 경우 snapshot.forEach를 통해 docID(문서 id)를 가져온다
            console.log("else snapshot >>", snapshot)
            snapshot.forEach((doc) => {
              db.collection("users").doc(doc.id).set({
              email: user.email,
              name : user.displayName
             })
            })      
          }
        })
      this.$router.push({ path: "UserMain" })  
      }).catch((error) => {
        console.log(error)
      });
    },
  
 
   login(){     
     console.log(this.remember)     
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
    
    if (this.remember.value == true) {
      localStorage.username = this.userEmail.value
      localStorage.checkbox = this.remember.value
    } else {
      localStorage.username = ""
      localStorage.checkbox = ""
    }
    this.$router.push({ path: "UserMain" })
    this.$store.commit("setFireUser", user)
    
      if (this.remember == true) {
      localStorage.username = this.userEmail
      localStorage.checkbox = this.remember
    } else {
      localStorage.username = ""
      localStorage.checkbox = ""
    }
   
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

