<!--
 * @Description: 
 * @version: 
 * @Author: supan
 * @Date: 2021-02-25 15:54:55
 * @LastEditors: supan
 * @LastEditTime: 2021-02-25 16:18:47
-->

<template>
    <!-- eslint-disable vue/require-component-is -->
    <component v-bind="linkProps(to)">
        <slot />
    </component>
</template>

<script>
import { isExternal } from '@/utils'

export default {
    props: {
        to: {
            type: String,
            required: true
        }
    },
    methods: {
        linkProps(url) {
            if (isExternal(url)) {
                return {
                    is: 'a',
                    href: url,
                    target: '_blank',
                    rel: 'noopener'
                }
            }
            return {
                is: 'router-link',
                to: url
            }
        }
    }
}
</script>
