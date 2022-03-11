<template>
    <LoginTabulator v-if="loggedIn == false"/>
    <UserData v-else/>
</template>

<script>

import LoginTabulator from "./Login/LoginTabulator.vue"
import UserData from "./UserSettings/UserData.vue"

export default {
  name: 'Login',
  data: ()=> {
   return{ 
     loggedIn : false
   }
  },
  

  components: {
    LoginTabulator,
    UserData
  },
  updated(){
    this.loggedIn = sessionStorage.loggedIn ? true : false
    console.log("update",this.loggedIn)
  },
  mounted() {
    const thisInstance = this
        this.$root.$on('reload', function(){
            thisInstance.reload()
    })
    this.loggedIn = sessionStorage.loggedIn ? true : false
    console.log(this.loggedIn)
  },
  methods:{
  }
}
</script>
<style>


  .login{
    display:flex;
    flex-direction: column;
    gap:1rem;
    width: 20em;
    margin: auto;
    padding:1rem;
    background-color: #e5e5e5;
    }
    .flexContainer-column{
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
</style>