<template>
  <div>
    <div class="q-pa-md q-gutter-y-sm">
      <q-layout>
        <q-drawer
          v-model="drawerLeft"
          show-if-above
          :width="300"
          :breakpoint="700"
          elevated
        >
          <q-scroll-area class="fit">
            <div class="q-pa-sm">
              <q-form @submit.prevent="login">
                <!--        Si l'utilisateur n'est pas connecté-->
                <div v-if="!user">
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
                </div>

                <div v-if="user">
                  <div class="text__connect">Bonjour {{ user.email }}</div>
                  <q-btn :ripple="false" color="secondary" class="connect__button" @click="logOut()"
                         label="ME DECONNECTER" no-caps/>
                </div>

              </q-form>
            </div>
          </q-scroll-area>
        </q-drawer>
        <!--        Si l'utilisateur est connecté-->
        <q-page-container>
          <q-page>
            <div class="auth__box">
              <div>Afin d'accéder à votre Todolist</div>
              <div>merci de bien vouloir vous authentifier.</div>
              <q-btn :ripple="false" @click="showHideDrawer" color="secondary" class="auth__button"
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
    // Can track if a user is connected or not
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user
      } else {
        this.user = null
      }
    })
  },
  methods: {
    showHideDrawer () {
      this.drawerLeft = !this.drawerLeft
    },
    // Connect method
    login () {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.userinfos.email, this.userinfos.password)
        .then(() => {
          setTimeout(() => {
            this.$router.push({ name: 'todos' })
          }, 1000)
        })
        .catch(error => {
          console.log(error.message)
        })
    },
    // Sub method
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
              window.location.reload()
            })
        })
        .catch((error) => {
          console.log(error.message)
        })
    },
    // Disconnect method
    logOut () {
      firebase.auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: 'index' })
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
