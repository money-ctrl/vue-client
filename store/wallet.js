import Vuex from 'vuex'

export const state = () => ({
  money: 0,
  expenses: [],
})

export const mutations = {
  updateValue (state, value) {
    state.money += value
  },
  addExpense(state, {title, limit}) {
    state.expenses.push({
      title,
      limit,
      current: 0,
    })
  },
  incrementExpense(state, {index, value}) {
    state.expenses[index].current += value
  },
  updateExpensesValues(state) {
    state.expenses = state.expenses.map(expense => {
      const { current, limit } = expense;
      expense.current = (current > limit) ? current - limit : 0
      return expense
    })
  },
}

export const actions = {
  incrementMoney({commit}, value) {
    commit('updateValue', value)
    commit('updateExpensesValues')
  },
  addExpense({commit}, value) {
    commit('addExpense', value)
  },
  incrementExpense({commit}, {index, value}){
    commit('updateValue', -value)
    commit('incrementExpense', {index, value})
  },
}
