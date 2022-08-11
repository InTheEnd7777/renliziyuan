<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-tabs v-model="activeName">
        <el-tab-pane label="用户管理" name="first">
          <el-button type="primary" @click="addbtn">新增</el-button>
          <!-- 表格 -->
          <el-table :data="tableData" style="width: 100%">
            <el-table-column type="index" label="序号" width="180">
            </el-table-column>
            <el-table-column prop="name" label="角色" width="180">
            </el-table-column>
            <el-table-column prop="description" label="描述"> </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="{ row }">
                <el-button size="small" type="success">分配权限</el-button>
                <el-button size="small" type="primary" plain>编辑</el-button>
                <el-button
                  size="small"
                  type="danger"
                  plain
                  @click="removeroles(row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="公司信息" name="second">
          <el-alert
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="info"
            show-icon
            :closable="false"
          >
          </el-alert>
          <!-- //公司信息 -->
          <el-form ref="form" label-width="80px">
            <el-form-item label="公司名称">
              <el-input v-model="this.getcompanyinfo1.name"></el-input>
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input v-model="this.getcompanyinfo1.companyAddress"></el-input>
            </el-form-item>
            <el-form-item label="公司邮箱">
              <el-input v-model="this.getcompanyinfo1.mailbox"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="this.getcompanyinfo1.remarks"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
    
       
      </el-tabs>
      <!-- 分页 -->
      <el-pagination
        small
        layout="prev, pager, next,sizes"
        :page-sizes="[2, 3, 5, 10]"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :total="total"
        :page-size="pageSize"
      >
      </el-pagination>
      <!-- 弹出层 -->
      <el-dialog title="新增角色" :visible.sync="dialogVisible" width="30%">
        <el-form ref="form" label-width="80px" :rules="fromrules" :model="form">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="角色描述">
            <el-input v-model="form.description"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="onClose">取 消</el-button>
          <el-button type="primary" @click="postroles">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getRolesApi, addroles, removeroles } from '@/api/role'
import { getcompanyinfo } from '@/api/enterprise'
export default {
  data() {
    return {
      activeName: 'first',
      tableData: [],
      total: 0,
      pageSize: 3,
      page: 1,
      dialogVisible: false,
      form: {
        name: '',
        description: ''
      },
      fromrules: {
        name: [
          {
            required: true,
            message: '请输入名称',
            trigger: 'blur'
          }
        ]
      },
      getcompanyinfo1:{}
    }
  },
  created() {
    this.getRolesApi()
    this.getcompanyinfo()
  },

  methods: {
    async getRolesApi() {
      const { rows, total } = await getRolesApi({
        page: this.page,
        pagesize: this.pageSize
      })
      this.tableData = rows
      this.total = total
    },
    //切页触发
    handleCurrentChange(val) {
      this.page = val
      this.getRolesApi()
    },
    //选择一页展示多少个触发
    handleSizeChange(val) {
      this.pageSize = val
      this.getRolesApi()
    },
    onClose() {
      this.dialogVisible = false
      this.$refs.form.resetFields()
      this.form.description = ''
    },
    //新增
    addbtn() {
      this.dialogVisible = true
    },
    async postroles() {
      await this.$refs.form.validate()
      console.log('通过')
      await addroles({
        name: this.form.name,
        description: this.form.description
      })
      this.$message.success('添加成功')
      this.onClose()
      this.getRolesApi()
    },
    //公司信息
    async getcompanyinfo() {
      const res = await getcompanyinfo(
        this.$store.state.user.userinfo.companyId
      )
     this.getcompanyinfo1=res
     console.log(this.getcompanyinfo1);
    }
  }
}
</script>

<style scoped lang="less"></style>
