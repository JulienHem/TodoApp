<template>
  <div id="q-app">
    <Nav></Nav>
    <router-view></router-view>
  </div>
</template>

<script>
import Nav from 'components/nav'

export default {
  name: 'App',
  components: {
    Nav
  }
}
</script>
