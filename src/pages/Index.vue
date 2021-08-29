<template>
<div id="q-app" style="min-height: 100vh;" class="mystyle">
  <div class="q-pa-md">
    <div class="q-gutter-md" style="max-width: 500px" ref="inputwidth" >
      <div class="Login">Login</div>    
        <q-input v-model="email" filled type="email"  label="Email" ></q-input>
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
import { defineComponent, ref } from 'vue';

export default defineComponent({
  mounted(){
    this.btnWidth = this.$refs.inputwidth.clientWidth
    console.log(this.btnWidth);

  },
  setup(){
    const login = () => {
    
    }
    const btnWidth = ref('')
    
  
   return {
     email:ref(''),
      password: ref(''),     
      isPwd: ref(true),
      login,
      btnWidth,
      left: ref(true),
      right: ref(false)
      
     
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

