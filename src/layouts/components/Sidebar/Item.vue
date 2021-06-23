<script>
export default {
    name: 'MenuItem',
    functional: true,
    props: {
        icon: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        }
    },
    render(h, context) {
        const { icon, title } = context.props
        const vnodes = []

        if (icon) {
            let styleIcon = icon;
            if (icon.indexOf(',') != -1) {
                styleIcon = icon.split(',');
            }
            vnodes.push(<jq-icon icon={styleIcon} class="svg-icon" />)
        }

        if (title) {
            vnodes.push(<span slot='title'>{(title)}</span>)
        }
        return vnodes
    }
}
</script>
