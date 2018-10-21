<template>
  <div>
    <section>
      <h2>{{ money }}</h2>
      <label for="add">Add money</label>
      <input
        id="add"
        type="number"
        @keyup.enter="incrementMoney($event)"
      >
    </section>
    <section v-if="categories.length">
      <hr>
      <h2>Expenses</h2>

      <div
        v-for="(category, index) in categories"
        :key="index"
      >
        <h3 style="margin-top: 2em">{{ category.title }}</h3>
        <progress
          :max="category.limit"
          :value="category.current"
        />
        {{ category.current.toFixed(2) }} / {{ category.limit.toFixed(2) }} [ {{ (category.current / category.limit * 100).toFixed(2) }}% ]
        <label>
          spend money on {{ category.title }}
          <input
            type="number"
            @keyup.enter="incrementCategory(index, $event)"
          >
        </label>
      </div>
    </section>
    <section>
      <hr>
      <h2>Add category</h2>
      <label>
        Title
        <input
          v-model="newCategory.title"
          type="text"
        >
      </label>
      <br>
      <label>
        Limit
        <input
          v-model="newCategory.limit"
          type="number"
        >
      </label>
      <br>
      <button @click="addCategory">create</button>
    </section>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import firebase from 'firebase/app'

export default {
  data() {
    return {
      newCategory: {},
    }
  },
  computed: {
    ...mapState('user', {
      money: ({money}) => money? money.toFixed(2) : 0.00,
      categories: ({expenses}) => expenses? expenses : [],
    }),
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user){
        this.$store.dispatch('user/openDBChannel').then(() => {
          this.$router.push('/app')
        }).catch(console.error)
      } else {
        this.$router.push('/')
      }
    })
  },
  methods: {
    ...mapActions('user', {
      set: 'set',
    }),
    incrementMoney(ev){
      this.set({
        money: ev.target.valueAsNumber + parseFloat(this.money),
      })
      ev.target.value = ''
    },
    addCategory() {
      this.newCategory.limit = parseFloat(this.newCategory.limit)
      this.newCategory.current = 0
      this.set({
        expenses: [
          ...this.categories,
          this.newCategory
        ],
      })
      this.newCategory = {}
    },
    incrementCategory(index, ev) {
      const newExpenses = this.categories
      newExpenses[index].current += ev.target.valueAsNumber
      this.set({
        money: parseFloat(this.money) - ev.target.valueAsNumber,
        expenses: newExpenses,
      })
      ev.target.value = ''
    },
  },
}
</script>

<style>
</style>
