<template>
  <div>
    <section>
      <h2>{{ money }}</h2>
      <label for="add">Add more</label>
      <input
        id="add"
        type="number"
        @keyup.enter="incrementMoney($event.target.valueAsNumber)"
      >
    </section>
    <section v-if="categories.length">
      <hr>
      <h2>Expenses</h2>

      <div
        v-for="(category, index) in categories"
        :key="index"
      >
        <h3>{{ category.title }}</h3>
        <progress
          :max="category.limit"
          :value="category.current"
        />
        {{ (category.current / category.limit * 100).toFixed(2) }}%
        <input
          type="number"
          @keyup.enter="incrementCategory(index, $event)"
        >
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

export default {
  data() {
    return {
      newCategory: {},
    }
  },
  computed: {
    ...mapState('wallet', {
      categories: 'expenses',
      money: state => state.money.toFixed(2),
    }),
  },
  methods: {
    ...mapActions('wallet',[
      'incrementMoney',
      'addExpense',
      'incrementExpense',
    ]),
    addCategory() {
      this.addExpense(this.newCategory)
      this.newCategory = {}
    },
    incrementCategory(index, ev) {
      this.incrementExpense({
        index,
        value: ev.target.valueAsNumber
      })
      ev.target.value = ''
    },
  },
}
</script>

<style>
</style>
