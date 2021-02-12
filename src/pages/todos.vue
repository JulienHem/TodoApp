<template>
  <div>
    <div class="container">
      <div class="q-pa-md">
        <div class="cursor-pointer">
          <div @click="showing = !showing">
          <q-btn flat round dense v-if="showing" color="white" icon="add"
                 style="font-size: 20px; bottom: 40px; background: #26a69a"/>
          </div>
          <q-popup-edit v-model="todoContent" class="input__placement" :cover="false" :offset="[0, -95]">
            <template v-slot="{set}">
              <input type="text" style="color: #26a69a" placeholder="Ajouter un élément" v-model="todo.title">
              <q-input color="white"
                       v-model="todo.description"
                       dense
                       autofocus>
                <template v-slot:after>
                  <q-btn flat round dense color="white" icon="add" @click="addTodo" @click.stop="set"
                         style="font-size: 20px; left: 10px; margin-bottom: 20px; background: #26a69a"/>
                </template>
              </q-input>
            </template>
          </q-popup-edit>
        </div>
      </div>

      <!--    Calling todo component to pass data-->
      <div v-if="!todoData.length" class="empty__list">{{ this.emptySpace }}</div>

      <todo v-for="item in todoData" :key="item.id" :item="item" :todoData="todoData"></todo>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import todo from '../components/todo'

const db = firebase.firestore()

export default {
  name: 'todos',
  components: {
    todo
  },
  data () {
    return {
      showing: true,
      todoContent: '',
      emptySpace: 'Aucun élément',
      todoData: [],
      todo: {
        title: '',
        description: ''
      }
    }
  },
  mounted () {
    // Get data from the database and using onSnapshot to make the delete and add dynamic
    db.collection('todos')
      .onSnapshot(snapshot => {
        const docs = snapshot.docChanges()
        docs.forEach(document => {
          const doc = document.doc
          const item = doc.data()
          item.id = doc.id

          if (document.type === 'added') {
            this.todoData.push({
              title: this.todo.title,
              description: this.todo.description,
              ...item
            })
          } else if (document.type === 'removed') {
            this.todoData = this.todoData.filter(todo => todo.id !== doc.id)
          }
        })
      })
  },
  methods: {
    // Adding the data to the database
    addTodo () {
      db.collection('todos')
        .add({
          title: this.todo.title,
          description: this.todo.description
        })
      // Refresh the inputs after adding the data
      this.todo.title = ''
      this.todo.description = ''
      this.showing = true
    }
  }
}
</script>

<style scoped>
input[type=text] {
  border: none;
}

.empty__list {
  font-size: 20px;
  text-align: center;
}

</style>
