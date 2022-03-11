<template>
  <form class="flexContainer-column" @submit.prevent="openRecaptcha()">
    <ErrorText v-if="error!=''" :content=error />
    <LoginInput  :id="item.model" @input.native="checkAllFields()" v-for="item in inputs" :key=item.content :content=item.content :type=item.type />
    <Recaptcha ref="ownRecaptcha" afterVerif="loginAccount" />
    <LoginButton isdisabled="true" classes="btnLogin" content="Login"/>
  </form>
</template>

<script>
import axios from 'axios';
import LoginInput from "./LoginInput.vue";
import LoginButton from "./LoginButton.vue"
import Recaptcha from "./Recaptcha.vue"
import ErrorText from "./LoginErrorText.vue"

export default {
    data(){
        return{
            inputs:[
                {content : "Benutzername" , type: "text", model:"username"},
                {content : "Passwort", type: "password" , model:"password"},
            ],
            error : "",
        }
    },
    components: {
        LoginInput,
        LoginButton,
        Recaptcha,
        ErrorText
    },
    mounted(){
        //send functions to other components
        const thisInstance = this
        this.$root.$on('loginAccount', function(){
            thisInstance.loginAccount()
        })
    },
    methods: {
        openRecaptcha:function(){
            //start functions from other components
            this.$refs.ownRecaptcha.submit()
            
        },
        checkAllFields(){
            let button = document.querySelector(".btnLogin")
            let allFields = Array.from(document.querySelectorAll("input"))
            let isFilled = allFields.filter(el => {
                return el.value =="";
            }).length == 0;

            if(isFilled == true){
                button.disabled = false;
            }else{
                button.disabled = true;
            }
        },
        createDataForServer(){
            //create DataObject for the database
            const allFields = Array.from(document.querySelectorAll("input"))
            let account = new Object();
            for(let i=0;i<this.inputs.length;i++){
                let name = this.inputs[i].content.toString()
                if(this.inputs[i].notForDB == true){
                    ""
                }else{
                    account[name] = allFields[i].value
                }
            }
            return account;
        },
        loginAccount(){
            const account = this.createDataForServer();
            console.log("Account : ",account)
            axios.post(`${process.env.VUE_APP_APIURL}/userLogin`, {
                account
            })
            .then((response) => {
                //set errors for the user
                if(response.data.errors){
                    this.error = response.data.errors[0]
                }else if(response.data.login){

                    //create the sessionStorage for the user
                    sessionStorage.userId = response.data.userId;
                    sessionStorage.userRev = response.data.userRev;
                    sessionStorage.loggedIn = true;
                    
                    //submit the page so it reloads
                    document.querySelector("form").submit();
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }
}
</script>

<style>
  
</style>