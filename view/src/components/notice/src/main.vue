<template>
   <mu-snackbar :color="type" :open.sync="open" :position="position">
    <mu-icon left :value="icon"></mu-icon>
    {{message}}
  </mu-snackbar>
</template>
<script>
export default {
  data() {
    return {
      colors: ['success', 'info', 'error', 'warning'],
      position:'top',
      type: 'success',
      message: '消息提示',
      open: false,
      timeout: 3000
    }
  },
  computed: {
    icon () {
      return {
        success: 'check_circle',
        info: 'info',
        warning: 'priority_high',
        error: 'warning'
      }[this.type]
    }
  },
  methods: {
    _show () {
      if (this._timer) clearTimeout(this._timer);
      this.open = true;
      this._timer = setTimeout(() => {
        this.open = false;
        this._hide()
      }, this.timeout);
    },
    _hide() {
      this.$destroy(true)
    }
  }
};
</script>