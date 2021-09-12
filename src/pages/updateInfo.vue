<template>
  <div id="q-app" style="min-height: 100vh;" class="mystyle">
  <div class="q-pa-md">
    <div class="q-gutter-md" style="max-width: 500px" ref="inputWidth">
      <div class="Login">Update your Infomation</div>    
      <q-input v-model="name" filled type="name"  label="Name" ></q-input>
      <q-select
        filled
        v-model="sex"
        :options="options"
        label= "Sex"
        select
        emit-value
      ></q-select>  
    
      <q-btn @click="updateInfo" color="primary" label="update!"
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
import { auth, db, g_auth } from 'src/boot/firebase'
import { defineComponent, ref } from 'vue';
import { useQuasar } from 'quasar'

export default defineComponent({
 mounted(){
  auth.onAuthStateChanged((user) => {
      if (user) {              
          console.log('User is logined', user);
          this.$store.commit("setFireUser", user)
          this.name = user.displayName                  
          // update data or vuex state
      } else {  
          console.log('User is not logged in.');
      }
    })
  }
,

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
      btnWidth: '',
      profile:""         
    }
  },

  methods: {  
      updateInfo(){
      const user = auth.currentUser
      this.$q.dialog({
       title : '확인',
       message : '비번 재입력',
       prompt : { // 변수맵핑
         model : '',
         type : 'password'
       },
       cancel : true,
       persistent : true
       })
     .onOk(data => {
       console.log("dd")      
        var credentials = g_auth.EmailAuthProvider.credential(user.email, data)
        user.reauthenticateWithCredential(credentials).then(() => {
            console.log("reauth ok")


            // db정보수정
            db.collection("users").
            where("email","==",user.email)
            .get()
            .then((snapshot) => {
            snapshot.forEach((doc) => {   
              console.log(doc.id)           
            db.collection("users")
            .doc(doc.id)
            .set({  
              email:user.email,          
              name:this.name,            
              sex:this.sex
            })
            .then(()=>{             
              this.$q.notify({
                  position: "center",
                  message: "회원정보 변경이 완료되었습니다.",
                  color: "grey",
                });
               this.$router.push({ path: "/myInfo" });
            }).catch((error)=> {
              console.log("error", error)
              reject(error)
                })
              })
          })
       
          // auth 정보수정
          user.updateProfile({
            displayName: this.name,
            sex:this.sex
          }).then(() => {
            // Update successful
            // ...
          }).catch((error) => {
            // An error occurred
            // ...
          });  
        })
      }) 
    }
  } 
})



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
