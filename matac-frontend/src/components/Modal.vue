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
<style lang="scss">
.mask{
 position: absolute;
 top: 0;
 left: 0;
 width: 100vw;
 height: 100vh;
 background-color: hsla(0, 0%, 20%, 0.5);
 margin: 0;
 padding: 0;
 display: flex;
 justify-content: center;
 z-index: 100;
 .modal{
   margin-top:10vh;
   max-height: 20vh;
   padding: 10px;
   border-radius: 3px;
   display: flex;
   flex-direction: column;
   background-color: #ffffff;
   z-index: 101;
 }
}
</style>

<style>
body{
  margin:0;
}
</style>
