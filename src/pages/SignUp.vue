<template>
  <div id="q-app" style="min-height: 100vh;" class="mystyle">
  <div class="q-pa-md">
    <div class="q-gutter-md" style="max-width: 500px" ref="inputWidth">
        <div class="Login">Register</div>
         <q-input v-model="name" filled type="name"  label="Name" ></q-input>
        <q-select
        filled
        v-model="model"
        :options="options"
        label="Sex"
        emit-value
      ></q-select>  
          <q-input v-model="email" filled type="email"  label="Email" ></q-input>
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
      <q-btn @click="Register" color="primary" label="Register!"
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
  setup(){
   const Register = () => {
    
  }

   const btnWidth = ref('')

    return {
       email:ref(''),
       name:ref(''),
       password:ref(''),
       passwordAgain:ref(''),
       isPwd: ref(true),
       btnWidth,
       Register,
       left: ref(true),
       right: ref(false),
       model: ref(null),options: [
        {
          label: 'Male',
          value: 'Male',       
        },
        {
          label: 'Female',
          value: 'Female'
        }
      ]
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
