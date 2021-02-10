<template>
  <div>
    <div class="q-pa-md q-gutter-y-sm">
      <q-layout>
        <!--        Si l'utilisateur n'est pas connecté-->
        <q-drawer
          v-model="drawerLeft"
          show-if-above
          :width="300"
          :breakpoint="700"
          elevated
        >
            <q-scroll-area class="fit" v-if="user">
              <div class="q-pa-sm">
                <q-form @submit.prevent="login">
                  <div class="text__connect">Me connecter</div>
                  <p class="text__id">Entrez vos identifiants pour vous connecter</p>
                  <q-input v-model="userinfos.email" class="input__padding" filled type="email" placeholder="Email"/>
                  <q-input v-model="userinfos.password" filled :type="isPwd ? 'password' : 'text'"
                           placeholder="Mot de passe">
                    <template v-slot:append>
                      <q-icon
                        :name="isPwd ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="isPwd = !isPwd"
                      />
                    </template>
                  </q-input>
                  <q-btn :ripple="false" color="secondary" class="connect__button" type="submit"
                         label="ME CONNECTER" no-caps/>

                  <p class="create__account" @click="sub()">créer un compte</p>
                </q-form>

              </div>
            </q-scroll-area>
        </q-drawer>
        <!--        Si l'utilisateur est connecté-->
          <q-scroll-area class="fit" v-if="user">
            <div class="q-pa-sm">
              <div class="text__connect">Bonjour {{ user.email }}</div>
              <q-btn :ripple="false" color="secondary" class="connect__button" @click="logOut()"
                     label="ME DECONNECTER" no-caps/>
            </div>
          </q-scroll-area>
        <q-page-container>
          <q-page>
            <div class="auth__box">
              <div>Afin d'accéder à votre Todolist</div>
              <div>merci de bien vouloir vous authentifier.</div>
              <q-btn :ripple="false" @click="drawerLeft = !drawerLeft" color="secondary" class="auth__button"
                     label="M'AUTHENTIFIER" no-caps/>
            </div>
          </q-page>
        </q-page-container>
      </q-layout>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'PageIndex',
  data () {
    return {
      drawerLeft: false,
      user: null,
      isPwd: true,
      userinfos: {
        email: '',
        password: ''
      }
    }
  },
  created () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user
      } else {
        this.user = null
      }
    })
  },
  methods: {
    login () {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.userinfos.email, this.userinfos.password)
        .then(() => {
          this.$router.push({ name: 'todos' })
        })
        .catch(error => {
          console.log(error.message)
        })
    },
    sub () {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.userinfos.email, this.userinfos.password)
        .then((res) => {
          res.user
            .updateProfile({
              displayName: this.userinfos.email
            })
            .then(() => {
              this.$router.push('/todos')
            })
        })
        .catch((error) => {
          console.log(error.message)
        })
    },
    logOut () {
      firebase.auth()
        .signOut()
        .then(() => {
          this.$router.push('')
        })
    }
  }
}
</script>

<style>
.auth__box {
  margin-top: 20px;
  text-align: center;
}

.auth__button {
  margin-top: 20px;
}

.input__padding {
  padding-bottom: 20px;
}

.connect__button {
  margin-top: 15px;
  margin-bottom: 15px;
}

.create__account {
  text-transform: uppercase;
  margin-left: 5px;
}

.text__connect {
  margin-top: 25px;
  font-size: 20px;
}

.text__id {
  color: grey;
}
</style>
