<template>
    <snackbar :color="color" :open.sync="open">
    <icon left :value="icon"></icon>
       {{message}}
   </snackbar>
</template>
<script>
import "muse-ui/lib/styles/base.less";
import { Snackbar, Icon } from "muse-ui";
import "muse-ui/lib/styles/theme.less";
export default {
  data() {
    return {
        _open: false,
        timeout: 3000,
        message: '消息通知',
        icon: 'success'
    };
  },
  components: {
    Snackbar,
    Icon
  },
  methods: {
    _show() {
      if (this._timer) clearTimeout(this._timer);
      this._open = true;
      this._timer = setTimeout(() => {
        this._open = false;
        this._hide()
      }, this.timeout);
    },
    _hide () {
        this.$destroy(true)
    }
  }
};
</script>