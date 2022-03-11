<template>
    <div>
        
        <div class="dataBaseInformation">
            <h1>Database Information</h1>
            <div class="information">
                <div>
                    <Field v-for="field in fields" :key=field[0] :content="field[0]"></Field>
                </div>
                <div>
                    <Field v-for="field in fields" :key=field[1] :content="field[1]"></Field>
                </div>
            </div>
        </div>
        <LoginButton @click.native = "logout()" isdisabled="false" classes="btnLogin" content="Logout"/>
    </div>
</template> 

<script>
import axios from 'axios';
import LoginButton from '../Login/LoginButton.vue';
import Field from './Fields';

export default {
    components: { 
        LoginButton,
        Field },
    data(){
        return{
           fields:""
        }
    },
    mounted: function () {
        this.getUserData(this);
    },
    methods:{
        
        logout(){
            sessionStorage.removeItem("userId")
            sessionStorage.removeItem("userRev")
            sessionStorage.removeItem("loggedIn") 
           
           //TODO search for a render method
            window.location.reload()
        },
        createDataForServer(){
            //Daten aufbereiten
            const id = sessionStorage.userId
            const rev = sessionStorage.userRev
            let loggedInUser = new Object();
            loggedInUser["id"] = id
            loggedInUser["rev"] = rev

            return loggedInUser;
        },
        getUserData(thies){
            const loggedInUser = this.createDataForServer();
            axios.post(`${process.env.VUE_APP_APIURL}/getUserData`, {
                loggedInUser
            }).then(function(res){
                thies.fields = Object.entries(res.data)
            })
        },
    },
}
</script>

<style>
    .information{
        display: flex;
        padding: 0.5rem;
        margin: 1rem;
        background: #c2c2c2;
    }
    .information div{
        text-align: left;
        flex-grow: 1;
    }
    .information div:first-child{
        text-align: left;
        flex-grow: 1;
    }
    .information p{
        border-bottom: 1px solid black;
    }
</style>