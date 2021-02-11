<template>
  <div>
    <div class="list__wrap">
      <div class="title__wrap" @click="showHide()">
        <div class="title__content">
          <span class="title">{{ item.title }}</span>
          <q-checkbox v-model="completed" :click="deleteTodo(item.id)"/>
        </div>
      </div>
      <div v-if="showing">
        <q-input
          filled
          autogrow
          type="textarea"
          :value="item.description"
          bg-color="white"
          id="editableInput"
          v-model="item.description"
          @blur="editTodo(item.id)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'

const db = firebase.firestore()

export default {
  name: 'todo',
  props: ['item',
    'todoData'],
  data () {
    return {
      todos: this.todoData,
      showing: false,
      completed: false
    }
  },
  methods: {
    showHide () {
      this.showing ? this.showing = false : this.showing = true
    },

    editTodo (id) {
      db.collection('todos').doc(id).update({
        description: this.item.description
      }).then((e) => {
        console.error(e)
      })
    },

    deleteTodo (doc) {
      if (this.completed === true) {
        setTimeout(() => {
          db.collection('todos').doc(doc).delete()
        }, 300)
      }
    }
  }
}
</script>

<style scoped>

.list__wrap {
  margin-bottom: 25px;
  margin-left: 60px;
}
.title__content {
  overflow-wrap: break-word;;
  display: inline-block;
  padding-left: 10px;
  max-width: 315px;
  font-size: 20px;
}
.title__wrap {
  display: flex;
  flex-direction: row;
  background: grey;
  opacity: 50%;
}
</style>
