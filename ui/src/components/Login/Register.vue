<template>
  <form class="flexContainer-column" @submit.prevent="openRecaptcha()">
    <ErrorText v-if="error!=''" :content=error />
    <LoginInput :id="item.model" @input.native="checkAllFields()" v-for="item in inputs" :key=item.content :content=item.content :type=item.type />
    <Recaptcha ref="ownRecaptcha" afterVerif="registerAccount" />
    <LoginButton  isdisabled="true" classes="btnLogin" content="Registrieren"/>
  </form>
</template>

<script>
import axios from 'axios';
import LoginInput from "./LoginInput.vue";
import LoginButton from "./LoginButton.vue"
import ErrorText from "./LoginErrorText.vue"
import Recaptcha from "./Recaptcha.vue"

export default {
    data(){
        return{
            inputs:[
                {content : "Benutzername" , type: "text", model:"username"},
                {content : "Passwort", type: "password" , model:"password"},
                {content : "Passwort bestätigen" , type: "password", notForDB : true , model:""},
                {content : "E-Mail", type: "email", model:"email"}
            ],
            error : "",
        }
        
    },
    components: {
        LoginInput,
        LoginButton,
        ErrorText,
        Recaptcha
    },
    mounted(){
        const thisInstance = this
        this.$root.$on('registerAccount', function(){
            thisInstance.registerAccount()
        })
    },
    methods: {
        compareInputs(){
            const allPwFields = document.querySelectorAll("input[type = 'password']")
            const isEqual = (allPwFields[0].value == allPwFields[1].value)
            isEqual ? this.error = "" : this.error = [3]

            return isEqual
        },
        openRecaptcha:function(){
            //start functions from other components
            if(this.compareInputs()){
                this.$refs.ownRecaptcha.submit()
            }
            
        },
        checkAllFields(){
            const button = document.querySelector(".btnLogin")
            const allFields = Array.from(document.querySelectorAll("input"))
            const isFilled = allFields.filter(el => {
                return el.value =="";
            }).length == 0;

            if(isFilled == true){
                button.disabled = false;
                return false
            }else{
                button.disabled = true;
                return true
            }
        },
        createDataForServer(){
            //Daten aufbereiten
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
        registerAccount(){
            
            const account = this.createDataForServer();
            axios.post(`${process.env.VUE_APP_APIURL}/userRegister`, {
                account
            })
            .then((response) => {
                //set errors for the user
                if(response.data.errors){
                    this.error = response.data.errors
                }else if(response.data.inserted){
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