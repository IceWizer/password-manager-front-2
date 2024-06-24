export default ({
    state: {
        window: {
            width: 0,
            height: 0,
            smallWidth: 1200,
        },
        theme: {
            dark: true,
        }
    },
    mutations: {
        setWidth(state, width) { state.window.width = width },
        setHeight(state, height) { state.window.height = height },
        setSmallWidth(state, smallWidth) { state.window.smallWidth = smallWidth },
        setDarkTheme(state, dark) { state.theme.dark = dark }
    },
    actions: {
        setWidth({ commit }, width) { commit('setWidth', width) },
        setHeight({ commit }, height) { commit('setHeight', height) },
        setSmallWidth({ commit }, smallWidth) { commit('setSmallWidth', smallWidth) },
        setDarkTheme({ commit }, dark) { commit('setDarkTheme', dark) }
    },
    getters: {
        getWidth: state => state.window.width,
        getHeight: state => state.window.height,
        getSmallWidth: state => state.window.smallWidth,
        isSmall: state => state.window.width < state.window.smallWidth,
        isDark: state => state.theme.dark
    },
    namespaced: true,
})
