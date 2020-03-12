<template lang="pug">
  .wrapper
    form.box
      .input
        h2 Pin
        input(type="text", inputmode="numeric", pattern="[0-9]", name="pin",
          v-model="pin", tabindex="0", @input="input")
        button(type="submit", @click="submit",@keyup.enter="submit") Login
      p(v-if="!errorMessage") Log in with the 6 digit pin code provided to you by an Administrator
      p.error(v-else) {{errorMessage}}
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'Login',
  data() {
    return {
      pin: '',
    };
  },
  computed: {
    ...mapState('app', { errorMessage: 'error' }),
  },
  methods: {
    ...mapActions('app', ['error']),
    ...mapActions('user', ['login']),
    input(evt) {
      if (this.pin.replace(/\s/, '').length === 6) {
        this.submit(evt);
      }
    },
    async submit(evt) {
      evt.preventDefault();
      evt.stopPropagation();
      try {
        await this.login(this.pin.replace(/\s/, ''));
        this.pin = '';
      } catch (e) {
        if (e.response && e.response.Message) {
          this.error({ message: e.response.Message });
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: grid;
  grid-template-columns: 3fr 5fr 3fr;
  grid-template-rows: 2fr 3fr 6fr;
  .box {
    width:100%;
    padding: 10px;
    grid-column: 2;
    grid-row: 2;
    background-color: #ffffff;
    margin: 20px;
    box-shadow: -3px 3px 20px 10px #00000050;
    border-radius: 10px;
    text-align: center;

    $char-w: 1ch;
    $gap: 0.5 * $char-w;
    $n-char: 6;
    $in-w: $n-char * ($char-w + $gap);

    input {
      border: none;
      width: $in-w;
      background: repeating-linear-gradient(
          90deg,
          dimgrey 0,
          dimgrey $char-w,
          transparent 0,
          transparent $char-w + $gap
        )
        0 100%/100% 2px no-repeat;
      font: 4ch consolas, monospace;
      letter-spacing: $gap;

      &:focus {
        outline: none;
        color: #333333;
      }
    }
    p {
      font-size: 1.5em;
      &.error {
        color: #ff5555;
        font-weight: bold;
      }
    }
  }
}
</style>
