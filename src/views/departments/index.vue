<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <!-- //头部 -->
        <treetools :treeNode="treeNode" :isshow="true" @add="showdept" />
        <el-tree :data="departs" default-expand-all :props="defaultProps">
          <template v-slot="scope">
            <treetools :treeNode="scope.data" @add="showdept" @edit="showedit">
            </treetools
          ></template>
        </el-tree>
      </el-card>
    </div>
    <!-- 添加部门组件 -->
    <addDept
      v-loading="loading"
      ref="datalist"
      :visible.sync="dialogVisible"
      :nodelist="nodelist"
      @add-success="getDeptsApi"
    />
  </div>
</template>

<script>
import treetools from './components/tree-tools.vue'
import { getDeptsApi } from '@/api/departments'
import { listdesc } from '@/utils/index'
import addDept from './components/addDept.vue'
export default {
  data() {
    return {
      dialogVisible: false,
      departs: [],
      defaultProps: {
        label: 'name'
      },
      treeNode: { name: '传值教育', manager: '负责人' },
      nodelist: {},
      loading: true
    }
  },
  components: {
    treetools,
    addDept
  },
  created() {
    this.getDeptsApi()
  },

  methods: {
    async getDeptsApi() {
      const { depts } = await getDeptsApi()
      this.departs = listdesc(depts, '')
    },
    showdept(val) {
      this.dialogVisible = true
      this.nodelist = val
    },
    showedit(val) {
      this.loading= true
      this.dialogVisible = true
      this.$refs.datalist.getDepts(val.id)
      this.loading=false
    }
  }
}
</script>

<style scoped lang="less"></style>
