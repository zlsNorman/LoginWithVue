<template>

  <button v-if="isdisabled == 'true'" disabled :class=classes type="submit"> {{content}}</button>
  <button v-else :class=classes type="submit"> {{content}}</button>
</template>

<script>
export default {
    props : ["content","classes","isdisabled"],
    
}
</script>

<style>
  .btnLogin{
        height: 2rem;
        font-weight: 600;
        cursor: pointer;
    }
    
</style>