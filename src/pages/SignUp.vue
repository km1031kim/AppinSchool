<template>
  <div id="q-app" style="min-height: 100vh;" class="mystyle">
  <div class="q-pa-md">
    <div class="q-gutter-md" style="max-width: 500px" ref="inputWidth">
         <div class="Login">Register</div>    
         <q-input v-model="name" filled type="name"  label="Name" ></q-input>
        <q-select
        filled
        v-model="sex"
        :options="options"
        label="Sex"
        emit-value
      ></q-select>  
          <q-input v-model="email" filled type="email"  label="Email"  ></q-input>
           <q-input v-model="password" filled :type="isPwd ? 'password' : 'text'" label="type your password">
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility' "
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          ></q-icon>
        </template>
      </q-input>
       <q-input v-model="passwordAgain" filled :type="isPwd ? 'password' : 'text'" label="password again">
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility' "
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          ></q-icon>
        </template>
      </q-input>
      <q-checkbox class="my-checkbox" v-model="right" label="I agree with your Personal Credit Information Usage Agreement "></q-checkbox><br>
      <q-btn @click="register" color="primary" label="Register!"
      :style="{width : btnWidth+'px'}" /><br>

      <div class="GoHome">
      <q-btn
        class="q-mt-sm"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        label="Go Home"

       
       />
       </div>      
    </div>         
  </div>    
</div>
</template>


<script>
import { auth, db } from 'src/boot/firebase'
import { defineComponent, ref } from 'vue';
import { useQuasar } from 'quasar'

export default defineComponent({
   mounted(){
    this.btnWidth = this.$refs.inputWidth.clientWidth
    console.log(this.btnWidth);

  },


  data(){
    return{
      name:"",
      sex: null,options: [
        {
          label: 'Male',
          value: 'Male',       
        },
        {
          label: 'Female',
          value: 'Female'
        }
      ],
      email:"",
      password:"",
      passwordAgain:"",
      left: true,
      right: false,
      isPwd:true,
      btnWidth: '',
      reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/

    }
  },

  methods: {
    // 이메일 형식 검사
    isEmailValid() {
      if (this.reg.test(this.email) == true){
        return true
      } else return false
    }, 
    // 비밀번호 규칙 검사
    isPwdValid() {
      if(this.password.length < 6) {
        this.$q.notify({
        position: "top",
        message: "비밀번호는 6자 이상이어야 합니다. .",
        color: "red",
        type: "negative",
    }) 
    return false      
      } else { 
        if (this.password != this.passwordAgain ){
        this.$q.notify({
        position: "top",
        message: "두 비밀번호가 같지 않습니다.",
        color: "red",
        type: "negative",
    })           
       return false 
      } else return true
      }
    },
    
    // 회원가입
    signUp(){
       auth // 성공 시 then 안으로 들어옴.
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((userCredential) => {
          var user = userCredential.user;
          console.log("success", user.email);
          user.updateProfile({
            displayName : this.name
          })
          this.$q.notify({
            position: "top",
            message: "SignUp Success",
            color: "blue",
            type: "positive",
          })
          
          // db에 신규유저정보 입력
         db.collection("users").add({
           email: this.email,
           name: this.name,
           sex: this.sex           
         })
        
         .then((docRef) => {
           console.log("Document written with ID: ",docRef.id);
           $q.notify({
             message: "Register Success",
             color: 'blue'
           })
          
         })
         .catch((error) => {
           console.error("Error adding document: ", error);
           this.$q.notify({
             message: error,
             color: 'red'
           })
         })
          this.$router.push({ path: "/" });
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          this.$q.notify({
            position: "top",
            message: errorMessage,
            color: "red",
            type: "negative",
          });
        });
    },

    // 신규 회원정보 입력
    register(){     
      if (!this.name) {
        this.$q.notify({
        position: "top",
        message: "이름을 입력해주세요",
        color: "red",
        type: "negative",
    })        
    } else if (!this.sex) {
     this.$q.notify({
        position: "top",
        message: "성별을 선택해주세요",
        color: "red",
        type: "negative",
    }) 
    } else if (!this.email) {     
     this.$q.notify({
        position: "top",
        message: "이메일을 입력해주세요",
        color: "red",
        type: "negative",
      }) 
    } else if (!this.isEmailValid()){
       this.$q.notify({
        position: "top",
        message: "이메일 형식으로 입력해주세요",
        color: "red",
        type: "negative",
      }) 
    }
    else if (!this.isPwdValid()) {
    }
    else if (!this.right){
        this.$q.notify({
        position: "top",
        message: "약관에 동의해주세요",
        color: "red",
        type: "negative",
      })       
    } else this.signUp()    

     }
   }
 
  }
)



</script>


<style lang="scss">
.mystyle {
 
  text-align: center;
}

.my-checkbox {
  font-size:15px;
}



.header{
  font-size:20px;
  color:red;
  
 
}

.GoHome{
  text-align: center;
  
 
}


</style>
