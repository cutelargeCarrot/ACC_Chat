<template>
    <div id="container"></div>
</template>

<script setup lang="ts">
import { log } from "console";
import { relative } from "path";
import { json } from "stream/consumers";
import { inject, onMounted, ref } from "vue";
// import { GtaphList } from "../../apis/graphApis";

let option = {
    animationDurationUpdate: 1500,
    animationEasingUpdate: "quinticInOut",
    tooltip: {
        show: true,
    },
    series: [
        {
            type: "graph",
            layout: "force",
            legendHoverLink: true, // 悬停高亮
            hoverAnimation: true, // 显示动画

            roam: true,
            draggable: true, // 节点拖拽
            links: [],
            data: [],
            cursor: "pointer",
            edgeLable: {
                show: true,
            },
            label: {
                show: true,
                position: "bottom",
                distance: 6,
            },
            force: {
                repulsion: 100,
                edgeLength: 80,
            },
            lineStyle: {
                color: "source",
                curveness: 0,
            },
        },
    ],
};

async function GetList() {
    // let res = await GtaphList();
    
   let link =    [
    {
        "id": 0,
        "name": "麻婆豆腐",
        "price": "6.5",
        "site": "一餐厅一楼",
        "rels_suistu":["川菜爱好者","素食爱好者"],
        "foodinfo":"一道经典川菜，由豆腐和麻辣豆瓣酱炒制而成，口感麻辣，豆腐鲜嫩入味。"
    },
    {
        "id": 2,
        "name": "牛筋干肉丝",
        "price": "3.5",
        "site": "一餐厅三楼",
        "rels_suistu":["川菜爱好者","肉食爱好者"],
        "foodinfo":"一道美味的川菜，使用嫩牛筋和干烧的瘦肉丝炒制而成，口感韧劲十足，味道香辣可口。"
    },
    {
        "id": 4,
        "name": "年糕排骨",
        "price": "6.5",
        "site": "一餐厅二楼",
        "rels_suistu":["公认特色","肉食爱好者"],
        "foodinfo":"即炖煮过后的排骨和年糕搭配，口感酥烂，味道鲜美。"
    },
    {
        "id": 6,
        "name": "大白干炒肉丝",
        "price": "3.5",
        "site": "一餐厅一楼",
        "rels_suistu":["川菜爱好者","肉食爱好者"],
        "foodinfo":"一道传统川菜，使用大白菜和炒熟的猪肉丝炒制而成，口感清脆爽口，味道鲜美。"
    },
    {
        "id": 8,
        "name": "香辣蟹",
        "price": "6.5",
        "site": "一餐厅二楼",
        "rels_suistu":["湘菜爱好者","海鲜爱好者"],
        "foodinfo":"一道著名的湖南菜，由新鲜蟹和香辣的调料炒制而成，口感鲜嫩多汁，味道辣而香。"
    },
    {
        "id": 10,
        "name": "水果沙拉",
        "price": "3.5",
        "site": "二餐厅三楼",
        "rels_suistu":["素食爱好者","公认特色"],
        "foodinfo":"由各种新鲜水果切块拌合而成，口感清爽，味道香甜可口。"
    },
    {
        "id": 12,
        "name": "扣肉",
        "price": "6.5",
        "site": "一餐厅一楼",
        "rels_suistu":["粤菜爱好者","肉食爱好者"],
        "foodinfo":"一道传统的粤菜，使用猪肉和糖色炖制而成，口感酥烂，味道鲜美。"
    },
    {
        "id": 14,
        "name": "里脊肉",
        "price": "3.5",
        "site": "二餐厅三楼",
        "rels_suistu":["公认特色","肉食爱好者"],
        "foodinfo":"猪肉里脊肉切片后烹饪而成，肉质鲜嫩，口感细腻。"
    },
    {
        "id": 16,
        "name": "红烧小排",
        "price": "6.5",
        "site": "一餐厅二楼",
        "rels_suistu":["公认特色","肉食爱好者"],
        "foodinfo":"使用猪排骨烹饪而成，入口酥烂，味道鲜美，色泽红亮。"
    },
    {
        "id": 18,
        "name": "海鲜菇炒肉丝",
        "price": "3.5",
        "site": "二餐厅一楼",
        "rels_suistu":["公认特色","肉食爱好者"],
        "foodinfo":"使用新鲜海鲜菇和炒熟的猪肉丝一起炒制而成，口感鲜嫩，味道鲜美。"
    },
    {
        "id": 20,
        "name": "糖醋大排",
        "price": "6",
        "site": "二餐厅二楼",
        "rels_suistu":["公认特色","肉食爱好者"],
        "foodinfo":"将猪排骨先油炸再用糖醋调味，口感外酥里嫩，味道酸甜可口。"
    },
    {
        "id": 22,
        "name": "蒜黄炒蛋",
        "price": "3.5",
        "site": "二餐厅三楼",
        "rels_suistu":["公认特色"],
        "foodinfo":"利用蒜黄和炒熟的鸡蛋一起炒制而成，口感爽脆，味道香浓。"
    },
    {
        "id": 24,
        "name": "夫妻肺片",
        "price": "6",
        "site": "一餐厅一楼",
        "rels_suistu":["川菜爱好者","肉食爱好者"],
        "foodinfo":"川菜经典菜品，由煮熟的牛肺和牛舌切片混搭而成，口感酥嫩，味道鲜美，麻辣爽口。"
    },
    {
        "id": 26,
        "name": "鱼香肉丝",
        "price": "3.5",
        "site": "一餐厅三楼",
        "rels_suistu":["川菜爱好者","肉食爱好者"],
        "foodinfo":"川菜经典菜品，由肉丝和酸甜的鱼香调料炒制而成，口感软嫩，味道鲜美、香辣。"
    },
    {
        "id": 28,
        "name": "红烧带鱼",
        "price": "6",
        "site": "二餐厅二楼",
        "rels_suistu":["海鲜爱好者"],
        "foodinfo":"将鲜带鱼用红烧调料炖煮而成，肉质鲜嫩，味道鲜美。"
    },
    {
        "id": 30,
        "name": "千叶豆腐丝",
        "price": "3.5",
        "site": "二餐厅一楼",
        "rels_suistu":["素食爱好者"],
        "foodinfo":"将豆腐切成薄片，和其他配料一起炒制而成，口感丝滑，味道鲜美。"
    },
    {
        "id": 32,
        "name": "京葱爆大虾",
        "price": "6",
        "site": "一餐厅二楼",
        "rels_suistu":["海鲜爱好者"],
        "foodinfo":"使用大虾和京葱快炒而成，虾肉鲜嫩，口感爽脆，味道鲜美。"
    },
    {
        "id": 34,
        "name": "馒头",
        "price": "1.5",
        "site": "一餐厅三楼",
        "rels_suistu":["主食爱好者"],
        "foodinfo":"口感松软，可以作为主食或搭配其他菜品食用。"
    },
    {
        "id": 36,
        "name": "番茄手擀面",
        "price": "2.5",
        "site": "二餐厅一楼",
        "rels_suistu":["面食爱好者","素食爱好者"],
        "foodinfo":"番茄手擀面条经过烹饪后与番茄酱混合在一起，呈现出美味的口感和独特的番茄香味。"
    },
    {
        "id": 38,
        "name": "蛋炒饭",
        "price": "3.5",
        "site": "一餐厅三楼",
        "rels_suistu":["主食爱好者"],
        "foodinfo":"将煮熟的米饭和炒熟的鸡蛋一起炒制而成，口感松软，味道香浓。"
    },
    {
        "id": 40,
        "name": "山东煎饼",
        "price": "3.5",
        "site": "一餐厅二楼",
        "rels_suistu":["主食爱好者"],
        "foodinfo":"一种薄饼，由鸡蛋和面粉煎制而成，口感蓬松，非常适合做早餐或夹着菜品食用。"
    }

]

    for (let i = 0; i < link.length; i++) {
        option.series[0].links.push({
            source: link[i].name,
            target: link[i].site,
            relation: {
                name: "拥有",
                id: link[i].name,
            },
        });
    }
    let data = [];
    link.forEach((element) => {
        const obj1 = {
            name: element.name,
            symbolSize: 14
            ,
            itemStyle: {
                color: "#7f6dcf",
            },
        };
        const obj2 = {
            name: element.site,
            symbolSize: 30,
            itemStyle: {
                color: "#ac3fca",
            },
        };
        data.push(obj1);
        data.push(obj2);
    });
    data = data.reduce((acc, curr) => {
        if (!acc.find((i) => i.name === curr.name)) {
            acc.push(curr);
        }
        return acc;
    }, []);
    return data;

    //数组去重计数

    // data link
    // name site

    // 一食堂 二食堂
    // 饭 菜 面 汤
    // 辣 不辣
    // 便宜 有点便宜 贵死了

    // 学校 食堂 楼层 菜品 属性 
    //      图书馆 楼层 类目 书目 属性
    //      教室 教师 位置 人数 课程
    //      {
    //         source : 教师 ,
    //         target : 课程 ,
    //         relative {
    //             name: 教授
    //         }
    //      }

    // 节点：
    // 关系：
}

onMounted(async () => {
    let $echarts: any = inject("echarts");

    let myChart: any = $echarts.init(document.getElementById("container"));
    option.series[0].data = await GetList();
    // 上次调用的返回值，当前元素，当前元素在数组中的索引， reduce数组名

    // myChart.setOption(option);
});
</script>

<style lang='scss' scoped>
#container {
    width: 60%;
    height: 80vh;
    border: 1px solid var(--borderColor);
    overflow: hidden;
    font-size: 1em;
}
</style>