<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs @tab-click="handleClick" v-model="activeName">
          <el-tab-pane label="登录账户设置">
            <!-- 放置表单 -->
            <el-form
              label-width="120px"
              style="margin-left: 120px; margin-top: 30px"
            >
              <el-form-item label="姓名:">
                <el-input style="width: 300px" v-model="fromData.username" />
              </el-form-item>
              <el-form-item label="密码:">
                <el-input
                  style="width: 300px"
                  type="password"
                  v-model="fromData.password"
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="getinfobtn">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情"> <userinfo></userinfo> </el-tab-pane>
          <el-tab-pane label="岗位信息">
            <jobinfo />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import userinfo from './user-info.vue'
import jobinfo from './job-info.vue'
import { getuserinfoxq, putinfolist } from '@/api/user'
import Cookie from 'js-cookie'
// import Cookies from 'js-Cookies'
export default {
  data() {
    return {
      fromData: {},
      activeName: Cookie.get('gengxintabs') || 'account'
    }
  },
  components: {
    userinfo,
    jobinfo
  },
  created() {
    this.getuserinfoxq()
  },

  methods: {
    async getuserinfoxq() {
      const res = await getuserinfoxq(this.$route.params.id)
      //   console.log(res)
      //   console.log(this.$route)
      this.fromData = res
    },
    async getinfobtn() {
      await putinfolist(this.fromData)
      this.$message.success('更新成功')
    },
    handleClick() {
      Cookie.set('gengxintabs', this.activeName)
    }
  }
}
</script>

<style scoped></style>
