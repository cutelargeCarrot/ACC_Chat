<template>
    <div id="container"></div>
</template>

<script setup lang="ts">
import { inject, onMounted } from "vue";

let List = [
    {
        name: "一食堂",
        id: "100",
        symbolSize: 30,
    },
    {
        name: "一楼",
        id: "110",
        symbolSize: 30,
    },
    {
        name: "二楼",
        id: "120",
        symbolSize: 30,
    },
    {
        name: "三楼",
        id: "130",
        symbolSize: 30,
    },
    {
        name: "驴肉火烧",
        id: "111",
        symbolSize: 30,
    },
    {
        name: "煎饼果子",
        id: "112",
        symbolSize: 30,
    },
    {
        name: "早点",
        id: "1111",
        symbolSize: 30,
    },
];

let num = [
    {
        source: "100",
        target: "110",
        relation: {
            name: "楼层",
        },
    },
    {
        source: "100",
        target: "120",
        relation: {
            name: "楼层",
        },
    }, {
        source: "100",
        target: "130",
        relation: {
            name: "楼层",
        },
    },
    {
        source: "110",
        target: "111",
        relation: {
            name: "窗口",
        },
    },
    {
        source: "110",
        target: "112",
        relation: {
            name: "窗口",
        },
    },
    {
        source: "111",
        target: "1111",
        relation: {
            name: "早点",
        },
    },
    {
        source: "112",
        target: "1111",
        relation: {
            name: "早点",
        },
    },
];

let option = {
  	title:{
		text:'食堂'
	},
    series: [
        {
            type: "graph",
            layout: "force",
            data: List,
            label: {
                show: true,
                position: "center",
            },
            force: {
                repulstion: 100,
                qravity: 0.01,
                edgeLength: 200,
            },
            links: num,
            edgeLabel: {
                show: true,
                position: "middle",
                formatter: (params) => params.data.relation.name,
            },
        },
    ],
};

onMounted(() => {
    let $echarts: any = inject("echarts");

    let myChart: any = $echarts.init(document.getElementById("container"));
    myChart.setOption(option);
    window.addEventListener("resize", () => {
        myChart.resize();
    });
});
</script>

<style lang='scss' scoped>
#container {
    width: 60%;
    height: 80vh;
    border: 1px solid red;
    font-size: 1em;
}
</style>