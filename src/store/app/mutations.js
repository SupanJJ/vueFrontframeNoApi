import Cookies from 'js-cookie';

export function TOGGLE_SIDEBAR(state) {
    state.sidebar.opened = !state.sidebar.opened;
    state.sidebar.withoutAnimation = false;
    if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1);
    } else {
        Cookies.set('sidebarStatus', 0);
    }
}

export function CLOSE_SIDEBAR(state, withoutAnimation) {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
}

export function TOGGLE_DEVICE(state, device) {
    state.device = device
}


//#region TagView

export function ADD_VISITED_VIEW(state, view) {
    if (state.visitedViews.some(v => v.path === view.path)) return
    state.visitedViews.push(
        Object.assign({}, view, {
            title: view.meta.title || 'no-name'
        })
    )
}

export function ADD_CACHED_VIEW(state, view) {
    if (state.cachedViews.includes(view.name)) return
    if (!view.meta.noCache) {
        state.cachedViews.push(view.name)
    }
}

export function DEL_VISITED_VIEW(state, view) {
    for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
            state.visitedViews.splice(i, 1)
            break
        }
    }
}

export function DEL_CACHED_VIEW(state, view) {
    for (const i of state.cachedViews) {
        if (i === view.name) {
            const index = state.cachedViews.indexOf(i)
            state.cachedViews.splice(index, 1)
            break
        }
    }
}

export function DEL_OTHERS_VISITED_VIEWS(state, view) {
    state.visitedViews = state.visitedViews.filter(v => {
        return v.meta.tagfix || v.path === view.path
    })
}

export function DEL_OTHERS_CACHED_VIEWS(state, view) {
    for (const i of state.cachedViews) {
        if (i === view.name) {
            const index = state.cachedViews.indexOf(i)
            state.cachedViews = state.cachedViews.slice(index, index + 1)
            break
        }
    }
}

export function DEL_ALL_VISITED_VIEWS(state) {
    // keep tagfix tags
    const fixTags = state.visitedViews.filter(tag => tag.meta.tagfix)
    state.visitedViews = fixTags
}

export function DEL_ALL_CACHED_VIEWS(state) {
    state.cachedViews = []
}

export function UPDATE_VISITED_VIEW(state, view) {
    for (let v of state.visitedViews) {
        if (v.path === view.path) {
            v = Object.assign(v, view)
            break
        }
    }
}
//#endregion