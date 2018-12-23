<template>
  <div>
    <section>
      <h2>{{ money.toLocaleString('pt-BR', { currency: 'BRL', style: 'currency' }) }}</h2>
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
      <div>
        <h3>Sum/Total/donno</h3>
        <progress
          :max="totalMax"
          :value="totalCurrent"
          class="progress-bar"
        />
        {{ totalCurrent.toLocaleString('pt-BR', { currency: 'BRL', style: 'currency' }) }}
        /
        {{ totalMax.toLocaleString('pt-BR', { currency: 'BRL', style: 'currency' }) }}

        [ {{ (totalCurrent / totalMax * 100).toFixed(2) }}% ]

        <br>

        <button @click="resetExpenses">
          Reset expenses
        </button>
      </div>

      <div
        v-for="(category, index) in categories"
        :key="index"
      >
        <h3>{{ category.title }}</h3>
        <progress
          :max="category.limit"
          :value="category.current"
          class="progress-bar"
        />
        {{ category.current.toLocaleString('pt-BR', { currency: 'BRL', style: 'currency' }) }}
        /
        {{ category.limit.toLocaleString('pt-BR', { currency: 'BRL', style: 'currency' }) }}

        [ {{ (category.current / category.limit * 100).toFixed(2) }}% ]
        <label>
          spend money on {{ category.title }}<br>
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
      <label>
        Limit
        <input
          v-model="newCategory.limit"
          type="number"
        >
      </label>
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
      money: ({money}) => (money? money : 0.00),
      categories: ({expenses}) => expenses? expenses : [],
    }),
    totalMax() {
      return this.categories.reduce((acc,item) => acc+item.limit, 0)
    },
    totalCurrent() {
      return this.categories.reduce((acc,item) => acc+item.current,0)
    },
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
    window.vm = this;
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
    resetExpenses() {
      this.set({
        expenses: this.categories.map(expense => {
          const { current, limit } = expense;
          expense.current = (current > limit) ? current - limit : 0
          return expense
        }),
      })
    }
  },
}
</script>

<style>
.progress-bar {
  width: 100%;
  height: 2em;
}
</style>
