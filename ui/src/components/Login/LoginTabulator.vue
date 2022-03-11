<template>
    <div class="login">
        <LoginHeadline content="Bei Vello anmelden"/>
        <div class="tabulator">
            <label class="tabButtons" @click="toggleAktiv($event)" :class=button.class  v-for="button in buttons" :key=button.name>{{button.name}}</label>
        </div>
        <Login v-if="tabActive==='Anmelden'" />
        <Register ref="register" v-else-if="tabActive==='Registrieren'" />
        
    </div>
    
</template>

<script>
import LoginHeadline from "./LoginHeadline.vue";
import Login from "./Login.vue";
import Register from "./Register.vue";

export default {
    props : ["content","content2"],
    data(){
        return{
            buttons:[
                {name : "Anmelden",class:"tabulatorBtn btnAktiv"},
                {name : "Registrieren",class:"tabulatorBtn"}
            ],
            tabActive : "Anmelden",
        }
    },
    methods:{
        toggleAktiv(button){
            let allButtons = document.querySelectorAll(".tabulator .tabButtons");
            allButtons.forEach(button => button.classList.remove("btnAktiv"))
            button.currentTarget.classList.add("btnAktiv")
            this.tabActive = document.querySelector(".tabulator .tabButtons.btnAktiv").innerText
        }
    },
    updated: function () {

        //Underline effect
        this.$nextTick(function () {
            this.tabActive = document.querySelector(".tabulator .tabButtons.btnAktiv").innerText
        })
    },
    components: {
        LoginHeadline,
        Login,
        Register
    }
}


</script>

<style scoped>
    .tabButtons{
        font-size: 0.8rem;
    }
    .btnAktiv{
        border-bottom: black 1px solid !important;
    }
    .tabulator{
        display: flex;
        border-bottom: 0.5px solid darkgrey;
        gap:0.5rem;
    }
    .tabulator .tabulatorBtn{
        width: auto;
        background-color: transparent;
        text-align: left;
        cursor: pointer;
        border: transparent 1px solid;
        padding-bottom: 5px;
    }
    
</style>