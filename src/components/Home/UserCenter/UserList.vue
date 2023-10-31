<template>
    <div class="box flex">
        <el-table :data="resData.users" style="width: 100%">
            <el-table-column fixed prop="id" label="id" width="50" />
            <el-table-column prop="username" label="用户名" width="200" />
            <el-table-column prop="nickname" label="昵称" width="200" />
            <el-table-column prop="email" label="邮箱" width="250" />
            <el-table-column prop="phoneNumber" label="手机号" width="150" />
            <el-table-column prop="isFrozen" label="是否冻结" width="120" />
            <el-table-column prop="createTime" label="创建时间" width="300" />
            <el-table-column prop="updateTime" label="更新时间" width="300" />
            <el-table-column fixed="right" label="操作" width="70">
                <template #default>
                    <el-button
                        link
                        type="primary"
                        size="small"
                        @click="handleClick"
                        >冻结</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts" setup>
import {reactive} from 'vue'

const props = defineProps(['resData'])

const handleClick = () => {
    console.log("click");
};


</script>

<style lang='scss' scoped>
.box {
    position: relative;
    max-width: 1600px;
    z-index: 0;
    justify-content: center;
    align-items: center;
    width: 90%;
}
</style>