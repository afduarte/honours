<template lang="pug">
  .mask(@click="$emit('close')")
    slot
      .modal
        .header
          slot(name="header") Modal Header
        .body
          slot(name="body") Modal Body
        .footer
          slot(name="footer") Modal Footer

</template>

<script>
export default {
  name: 'modal',
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.mask{
 position: absolute;
 width: 100vw;
 height: 100vh;
 background-color: hsla(0, 0%, 20%, 0.5);
 margin: 0;
 padding: 0;
 display: flex;
 justify-content: center;
 .modal{
   margin-top:10vh;
   max-height: 20vh;
   padding: 10px;
   border-radius: 3px;
   display: flex;
   flex-direction: column;
   background-color: #ffffff;
 }
}
</style>

<style>
body{
  margin:0;
}
</style>
