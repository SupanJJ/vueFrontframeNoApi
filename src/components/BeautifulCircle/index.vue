<template>
    <div
        :style="`
            width: ${outWidth}px;
            height: ${outWidth}px;
            border-radius: 50%;
            background-color: ${selectType.OutColor};
            padding:${(outWidth - innerWidth) / 2}px;
            margin:0 auto
        `"
        :title="title"
    >
        <div
            :style="`
                width: ${innerWidth}px;
                height: ${innerWidth}px;
                border-radius: 50%;
                background-color: ${selectType.InnerColor};
            `"
        ></div>
    </div>
</template>

<script>
export default {
    name: "BeautifulCircle",
    props: {
        outWidth: {
            type: Number,
            default: 24,
        },
        innerWidth: {
            type: Number,
            default: 14,
        },
        circleType: {
            type: String,
            default: "pink",
        },
        title:{
            type: String,
            default: "",
        }
    },
    data() {
        return {
            typeList: [
                {
                    Type: "pink",
                    OutColor: "#f46c6e",
                    InnerColor: "#f46c6e",
                },
                {
                    Type: "green",
                    OutColor: "#4fb66c",
                    InnerColor: "#4fb66c",
                },
                {
                    Type: "yellow",
                    OutColor: "#f2c880",
                    InnerColor: "#f2c880",
                },
                {
                    Type: "gray",
                    OutColor: "#c4c4c4",
                    InnerColor: "#c4c4c4",
                },
            ],
            selectType: {
                Type: "pink",
                OutColor: "#f46c6e",
                InnerColor: "#f46c6e",
            },
        };
    },
    mounted() {
        if (this.typeList.filter((r) => r.Type == this.circleType).length) {
            this.selectType = this.typeList.filter(
                (r) => r.Type == this.circleType
            )[0];
        } else {
            this.selectType = this.typeList.filter((r) => r.Type == "pink")[0];
        }
    },
};
</script>

<style></style>
