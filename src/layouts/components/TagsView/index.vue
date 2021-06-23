<template>
    <div
        id="tags-view-container"
        class="tags-view-container"
    >
        <scroll-pane
            ref="scrollPane"
            class="tags-view-wrapper"
            style="top: -10px;"
        >
            <transition-group name="tags-animation" tag="span">
                <router-link
                    v-for="tag in visitedViews"
                    ref="tag"
                    :key="tag.path"
                    :class="isActive(tag)?'active':''"
                    :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
                    tag="span"
                    class="tags-view-item tags-animation-item"
                    @click.middle.native="closeSelectedTag(tag)"
                >
                    <div align="center">
                        {{ tag.title }}
                        <span
                            v-if="!tag.meta.tagfix"
                            class="el-icon-close"
                            @click.prevent.stop="closeSelectedTag(tag)"
                        />
                    </div>
                </router-link>
            </transition-group>
        </scroll-pane>
    </div>
</template>

<script>
import ScrollPane from './ScrollPane'
import path from 'path'

export default {
    components: { ScrollPane },
    data() {
        return {
            top: 0,
            left: 0,
            selectedTag: {},
            fixTags: []
        }
    },
    computed: {
        visitedViews() {
            return this.$store.getters['app/visitedViews'];
        },
        routes() {
            return this.$store.getters['auth/myRouters'];
        }
    },
    watch: {
        $route() {
            this.addTags();
            this.moveToCurrentTag();
        }
    },
    mounted() {
        this.initTags();
        this.addTags();
    },
    methods: {
        isActive(route) {
            return route.path === this.$route.path
        },

        filterFixTags(routes, basePath = '/') {
            let tags = []
            routes.forEach(route => {
                if (route.meta && route.meta.tagfix) {
                    const tagPath = path.resolve(basePath, route.path);
                    tags.push({
                        fullPath: tagPath,
                        path: tagPath,
                        name: route.name,
                        meta: { ...route.meta }
                    })
                }
                if (route.children) {
                    const tempTags = this.filterFixTags(route.children, route.path)
                    if (tempTags.length >= 1) {
                        tags = [...tags, ...tempTags]
                    }
                }
            })
            return tags
        },

        initTags() {
            const fixTags = this.fixTags = this.filterFixTags(this.routes)
            for (const tag of fixTags) {
                // Must have tag name
                if (tag.name) {
                    this.$store.dispatch('app/addVisitedView', tag)
                }
            }
        },

        addTags() {
            const { name } = this.$route;
            if (name) {
                let route = {
                    fullPath: this.$route.fullPath,
                    path: this.$route.path,
                    name: this.$route.name,
                    meta: { ...this.$route.meta },
                    query: { ...this.$route.query },
                };
                this.$store.dispatch('app/addView', route)
            }
            return false
        },

        moveToCurrentTag() {
            const tags = this.$refs.tag
            this.$nextTick(() => {
                for (const tag of tags) {
                    if (tag.to.path === this.$route.path) {
                        this.$refs.scrollPane.moveToTarget(tag)
                        // when query is different then update
                        if (tag.to.fullPath !== this.$route.fullPath) {
                            let route = {
                                fullPath: this.$route.fullPath,
                                path: this.$route.path,
                                name: this.$route.name,
                                meta: { ...this.$route.meta },
                                query: { ...this.$route.query },
                            };
                            this.$store.dispatch('app/updateVisitedView', route)
                        }
                        break
                    }
                }
            })
        },

        closeSelectedTag(view) {
            this.$confirm('确认要关闭该标签吗？未保存的内容可能丢失！', '警告', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                center: true,
                callback: action => {
                    if (action === 'confirm') {
                        this.$store.dispatch('app/delView', view).then(({ visitedViews }) => {
                            if (this.isActive(view)) {
                                this.toLastView(visitedViews, view)
                            }
                        })
                    }
                }
            });
        },

        toLastView(visitedViews, view) {
            const latestView = visitedViews.slice(-1)[0]
            if (latestView) {
                this.$router.push(latestView)
            } else {
                // now the default is to redirect to the home page if there is no tags-view,
                // you can adjust it according to your needs.
                if (view.name === 'home') {
                    // to reload home page
                    this.$router.replace({ path: '/redirect' + view.fullPath })
                } else {
                    this.$router.push('/')
                }
            }
        },
    }
}
</script>

<style lang="scss" scoped>
.tags-view-container {
    padding-top: 70px;
    padding-bottom: 29px;
    height: 50px;
    width: 100%;
    background: #ecf0f3;
    border-bottom: 1px solid #d8dce5;
    .tags-view-wrapper {
        .tags-view-item {
            display: inline-block;
            cursor: pointer;
            height: 40px;
            min-width: 80px;
            line-height: 40px;
            border: 1px solid #ecf0f3;
            border-bottom: 1px solid #d8dce5;
            color: #495060;
            background: #ecf0f3;
            padding: 0 8px;
            font-size: 12px;
            &:first-of-type {
                border-left: 1px solid #d8dce5;
                margin-left: 10px;
            }
            &:last-of-type {
                border-right: 1px solid #d8dce5;
                margin-right: 10px;
            }
            &.active {
                border-radius: 5px 5px 0 0;
                border-color: #d8dce5;
                border-bottom: none;
                border-right: 1px solid #d8dce5;
                color: #1f75da;
                font-weight: bold;
                background: #fff;
            }

            & + .tags-view-item {
                border-left: 1px solid #d8dce5;
            }

            &.active + .tags-view-item {
                border-left: none;
            }

            &:hover {
                color: #1f75da;
                font-weight: bold;
            }
        }
    }
}
</style>

<style lang="scss">
.tags-view-wrapper {
    .tags-view-item {
        .el-icon-close {
            font-size: 12px;
            width: 0;
            height: 14px;
            line-height: 20px;
            overflow: hidden;
            transform-origin: 100% 50%;
            border-radius: 50%;
            text-align: center;
            transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
            &:hover {
                transform: scale(1.3);
                font-weight: bold;
                color: #1f75da;
            }
        }

        .el-icon-close:before {
            display: inline-block;
        }

        &:hover .el-icon-close {
            width: 14px;
        }

        &.active .el-icon-close {
            width: 14px;
        }
    }
}

.tags-animation-item {
    transition: all 1s;
    display: inline-block;
}

.tags-animation-enter, .tags-animation-leave-to {
    opacity: 0;
    transform: translateX(-30px);
}

.tags-animation-leave-active {
    position: absolute;
}
</style>
