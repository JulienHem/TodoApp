<template>
  <div>
    <div class="bg-cyan-10">

      <div class="text-white">
        <q-toolbar>
          <q-btn flat round dense  icon="menu" class="q-mr-sm"/>
          <q-space/>
          <q-btn flat round dense padding="10px 15px" icon="share"/>
          <q-btn flat round dense padding="10px 15px" icon="notifications"/>
          <q-btn flat round dense padding="10px 15px" icon="search" class="q-mr-xs"/>
        </q-toolbar>
        <q-toolbar inset class="bg__padding">
          <q-toolbar-title class="text__padding"><strong>Owlie Todolist</strong></q-toolbar-title>
        </q-toolbar>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'nav'
}
</script>

<style scoped>
.bg__padding {
  margin-top: 50px;
}

.text__padding {
  padding-bottom: 15px;
  padding-left: 20px;
}
</style>
