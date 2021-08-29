<template>
 <div id="q-app" style="min-height: 100vh;" class="mystyle">
  <div class="q-pa-md">
    <div class="q-gutter-md" style="max-width: 500px" ref="inputWidth">
      <div class="Login">Find your password</div>
       <q-input v-model="email" filled type="email"  label="Email" ></q-input>     
      <q-btn @click="SendMail" color="primary" label="Send mail to verify your account!"
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
import { defineComponent, ref } from 'vue';

export default defineComponent({
  mounted(){
    this.btnWidth = this.$refs.inputWidth.clientWidth
    console.log(this.btnWidth);

  },
  setup() {    
     const SendMail = () => {
    
  }

    const btnWidth = ref('')
   
  

  return{
    email:ref(''),
    btnWidth,
    SendMail
  }
  }
})
</script>


<style>
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
