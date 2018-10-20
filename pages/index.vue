<template>
  <div>
    <h2>login</h2>
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
