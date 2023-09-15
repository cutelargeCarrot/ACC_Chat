<template>
    <div class="page">
        <el-pagination
            v-model:current-page="data.page"
            v-model:page-size="comp"
            :page-sizes="[ 5, 10, 20, 50]"
            :small="small" 
            :disabled="disabled"
            :background="background"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalCount"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive, computed } from "vue";
const props = defineProps({
    page:Number,
    pageSize:{
      type:Number,
    },
    totalCount:Number
});

const emits = defineEmits(["controlPageSize", "controlPage"]);

const data = reactive({
    page: props.page,
    pageSize: props.pageSize,
    // 总页数
    totalCount: props.totalCount,
});
// 当前页数
const currentPage = ref(1);
// 配置
const small = ref(false);
const background = ref(false);
const disabled = ref(false);

const handleSizeChange = (val: number) => {
    console.log(`${val} items per page`);
    emits("controlPageSize", val);
};
const handleCurrentChange = (val: number) => {
    console.log(`current page: ${val}`);
    emits("controlPage", val);
};
</script>

<style scoped>
.page {
    margin: 30px;
}
</style>
