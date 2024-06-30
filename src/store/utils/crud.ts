import { apiRequest } from '../axios'
import type { CrudBaseStore } from '@store/utils/types'

export default (modelName: string) : CrudBaseStore => {
  return {
    name: modelName + '_store',
    namespaced: true,
    state: {
      items: [],
      item: {},
      pagination: {
        page: 1,
        perPage: 10,
        total: 0,
        totalPages: 0
      }
    },
    mutations: {
      SET_ITEMS(state, payload) {
        // Find items in state.items that are in payload
        // and update them
        // Set updated items to state.items
        state.items = state.items.map((item: any) => {
          const updatedItem = payload['hydra:member'].find((p: any) => p.id === item.id)
          if (updatedItem) {
            return updatedItem
          }
          return item
        })

        // Add items to state.items that are not in state.items
        payload['hydra:member'].forEach((item: any) => {
          if (!state.items.find((i: any) => i.id === item.id)) {
            state.items.push(item)
          }
        })

        // Set pagination
        if (payload['hydra:view'] && payload['hydra:view']['hydra:last']) {
          state.pagination.totalPages = Number(
            payload['hydra:view']['hydra:last'].split('page=')[1]
          )
        }
        state.pagination.total = payload['hydra:totalItems']
      },
      SET_ITEM(state, payload) {
        // Find item in state.items that is in payload
        // and update it
        // Set updated item to state.item
        state.item = payload

        let updatedItem = state.items.find((item: any) => item.id === payload.id)
        if (updatedItem) {
          updatedItem = payload
        }

        // Update items in state.items
        state.items = state.items.map((item: any) => {
          if (item.id === payload.id) {
            return payload
          }
          return item
        })
      }
    },
    actions: {
      fetchItems({ commit }, payload) {
        return apiRequest(
          modelName,
          'GET',
          (response: any) => {
            commit('SET_ITEMS', response.data)
          },
          payload
        )
      },
      fetchItem({ commit }, payload) {
        // Delete id from payload
        const params = { ...payload }
        delete params.id

        return apiRequest(
          modelName + '/' + payload.id,
          'GET',
          (response: any) => {
            commit('SET_ITEM', response.data)
          },
          params
        )
      },
      createItem({ commit }, payload) {
        return apiRequest(
          modelName,
          'POST',
          (response: any) => {
            commit('SET_ITEM', response.data)
          },
          payload
        )
      },
      updateItem({ commit }, payload) {
        return apiRequest(
          modelName + '/' + payload.id,
          'PUT',
          (response: any) => {
            commit('SET_ITEM', response.data)
          },
          payload
        )
      },
      deleteItem({ commit }, payload) {
        return apiRequest(
          modelName + '/' + payload.id,
          'DELETE',
          (response: any) => {
            commit('SET_ITEM', response.data)
          },
          payload
        )
      }
    },
    getters: {
      getItems(state) {
        return state.items
      },
      getItem(state) {
        return state.item
      },
      getPagination(state) {
        return state.pagination
      }
    }
  }
}
