<template>
  <div>
    <label type="text">{{content}}</label>
    <input class="input" :placeholder=content :type=type >
  </div>
</template>

<script>
export default {
    props: ["content","type"],
}
</script>

<style scoped>
    div{
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
    }
    label{
      text-align: left;
          font-size: 0.8rem;
    font-weight: 700;
    }
    .input{
        height: 1.5rem;
    }
</style>