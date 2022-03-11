<template>
  <div class=" errorText">
      <p v-for="element in content" :key=element>{{errorText[element-1]}}</p>
  </div>
</template>

<script>
export default {
    props:["content"],
    data(){
        return{
            errorText: ["Ein User mit dieser E-Mail existiert bereits!","Ein User mit diesem Benutzernamen exisitert bereits!","Die Passwörter stimmen nicht überein","Benutezrname oder Passwort ungültig"]
        }
    }
}
</script>

<style scoped>
    .errorText{
        text-align: left;
        color:red;
        font-size: 0.8rem;
        padding-left:0.5rem
    }
    div{
        border:red 1px solid;
    }
</style>