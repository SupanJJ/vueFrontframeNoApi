<template>
    <div
        style="padding: 0 15px;"
        @click="toggleClick"
    >
        <font-awesome-icon
            icon="indent"
            class="toggle-btn"
            :class="{'is-active':isActive}"
        />
    </div>
</template>

<script>
export default {
    name: 'ToggleBtn',
    props: {
        isActive: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        toggleClick() {
            this.$emit('toggleClick')
        }
    }
}
</script>

<style scoped>
.toggle-btn {
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
    color: #ffffff;
}

.toggle-btn.is-active {
    transform: rotate(180deg);
}
</style>
