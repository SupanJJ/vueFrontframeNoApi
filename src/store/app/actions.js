export function toggleSideBar(state) {
    state.commit('TOGGLE_SIDEBAR')
}

export function closeSideBar(state, withoutAnimation) {
    state.commit('CLOSE_SIDEBAR', withoutAnimation)
}

export function toggleDevice(state, device) {
    state.commit('TOGGLE_DEVICE', device)
}

//#region TagView

export function addView(state, view) {
    state.dispatch('addVisitedView', view)
    state.dispatch('addCachedView', view)
}

export function addVisitedView(state, view) {
    state.commit('ADD_VISITED_VIEW', view)
}

export function addCachedView(state, view) {
    state.commit('ADD_CACHED_VIEW', view)
}

export function delView(state, view) {
    return new Promise(resolve => {
        state.dispatch('delVisitedView', view)
        state.dispatch('delCachedView', view)
        resolve({
            visitedViews: [...state.getters['visitedViews']],
            cachedViews: [...state.getters['cachedViews']]
        })
    })
}

export function delVisitedView(state, view) {
    return new Promise(resolve => {
        state.commit('DEL_VISITED_VIEW', view)
        resolve([...state.getters['visitedViews']])
    })
}

export function delCachedView(state, view) {
    return new Promise(resolve => {
        state.commit('DEL_CACHED_VIEW', view)
        resolve([...state.getters['cachedViews']])
    })
}

export function delOthersViews(state, view) {
    return new Promise(resolve => {
        state.dispatch('delOthersVisitedViews', view)
        state.dispatch('delOthersCachedViews', view)
        resolve({
            visitedViews: [...state.visitedViews],
            cachedViews: [...state.cachedViews]
        })
    })
}

export function delOthersVisitedViews(state, view) {
    return new Promise(resolve => {
        state.commit('DEL_OTHERS_VISITED_VIEWS', view)
        resolve([...state.visitedViews])
    })
}

export function delOthersCachedViews(state, view) {
    return new Promise(resolve => {
        state.commit('DEL_OTHERS_CACHED_VIEWS', view)
        resolve([...state.cachedViews])
    })
}

export function delAllViews(state, view) {
    return new Promise(resolve => {
        state.dispatch('delAllVisitedViews', view)
        state.dispatch('delAllCachedViews', view)
        resolve({
            visitedViews: [...state.visitedViews],
            cachedViews: [...state.cachedViews]
        })
    })
}

export function delAllVisitedViews(state) {
    return new Promise(resolve => {
        state.commit('DEL_ALL_VISITED_VIEWS')
        resolve([...state.visitedViews])
    })
}

export function delAllCachedViews(state) {
    return new Promise(resolve => {
        state.commit('DEL_ALL_CACHED_VIEWS')
        resolve([...state.cachedViews])
    })
}
  
export function updateVisitedView(state, view) {
    state.commit('UPDATE_VISITED_VIEW', view)
}

//#endregion