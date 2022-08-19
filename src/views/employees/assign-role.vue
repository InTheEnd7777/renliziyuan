<template>
  <div>
    <el-dialog
      title="分配角色"
      :visible="visible"
      @close="close"
      @open="onOpen"
    >
      <el-checkbox-group v-model="checkList">
        <el-checkbox v-for="item in roles" :key="item.id" :label="item.id">
          {{ item.name }}
        </el-checkbox>
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="btnqueding">确 定</el-button>
      </span></el-dialog
    >
  </div>
</template>

<script>
import { getRolesApi, assignRoles } from '@/api/role.js'
import { getuserinfoxq } from '@/api/user.js'
export default {
  data() {
    return {
      checkList: '',
      roles: []
    }
  },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    showAssignRoleid: {
      type: String,
      required: true
    }
  },
  created() {},

  methods: {
    close() {
      this.$emit('update:visible', false)
    },
    async getRolesApi() {
      const { rows } = await getRolesApi() // console.log(roles)
      this.roles = rows
      console.log(this.roles)
    },
    async getuserinfoxq() {
      const { roleIds } = await getuserinfoxq(this.showAssignRoleid)
      // console.log(res)
      this.checkList = roleIds
    },
    async btnqueding() {
      if (!this.checkList.length) {
        return this.$message.error('请选择角色')
      }
      await assignRoles({
        id: this.showAssignRoleid,
        roleIds: this.checkList
      })
      this.$message.success('分配成功')
      this.close()
    },
    onOpen() {
      this.getRolesApi()
      this.getuserinfoxq()
    }
  }
}
</script>

<style scoped></style>
