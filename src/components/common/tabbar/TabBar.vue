<template>
    <div id="tab-bar">
      <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "TabBar"
    }
</script>

<style scoped>
  @import "~assets/css/base.css";
  #tab-bar{
    display: flex;
    position:fixed;
    bottom: 0;
    left: 0;
    right: 0;
    box-shadow: 0 -5px 1px rgba(100,100,100,.1);
    background: #f6f6f6;
  }
</style>
