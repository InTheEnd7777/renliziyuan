<template>
  <div class="dashboard-container">
    <div class="app-container">
      <employees>
        <span slot="left">共166条记录</span>
        <template slot="right">
          <el-button size="small" type="warning" @click="addinfo"
            >导入</el-button
          >
          <el-button size="small" type="danger" @click="exportExcel"
            >导出</el-button
          >
          <el-button size="small" type="primary" @click="add"
            >新增员工</el-button
          >
        </template>
      </employees>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table border :data="list">
          <el-table-column label="序号" sortable="" type="index" />
          <el-table-column label="姓名" sortable="" prop="username" />
          <el-table-column label="员工" sortable="">
            <template slot-scope="{ row }">
              <img
                v-imgError="require('@/assets/ji.jpg')"
                :src="row.staffPhoto"
                alt=""
                class="tupian"
                @click="showcodedialog(row.staffPhoto)"
              />
            </template>
          </el-table-column>

          <el-table-column
            label="聘用形式"
            sortable=""
            prop="formOfEmployment"
          />

          <el-table-column label="入职时间" sortable="">
            <template slot-scope="{ row }">
              {{ row.timeOfEntry | formDate }}
            </template>
          </el-table-column>
          <el-table-column
            label="工号"
            sortable=""
            :formatter="formatterenableState"
            prop="enableState"
          />
          <el-table-column label="账户状态" sortable="">
            <template slot-scope="{ row }">
              <el-switch
                :value="row.enableState === 1"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch>
            </template>
          </el-table-column>

          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template slot-scope="{ row }">
              <el-button
                type="text"
                size="small"
                @click="$router.push('/employees/detail/' + row.id)"
                >查看</el-button
              >
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" @click="del(row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row
          type="flex"
          justify="center"
          align="middle"
          style="height: 60px"
        >
          <el-pagination
            @current-change="handleCurrentChange"
            :total="total"
            :page-sizes="[2, 3, 5, 10]"
            @size-change="handleSizeChange"
            layout="prev, pager, next,sizes"
          />
        </el-row>
      </el-card>
    </div>
    <!-- 新增员工弹出框 -->
    <addemployees
      :visible.sync="isshow"
      @addemployee1="getinfolist"
    ></addemployees>
    <!-- 二维码 -->
    <el-dialog title="查看二维码" :visible.sync="isshowdialog" width="30%">
      <canvas id="canvas"></canvas>
    </el-dialog>
  </div>
</template>
<script>
import addemployees from '@/components/addemployees'
import employees from '@/constant/employees'
import { getemployeesinfoApi, delemployeesinfoApi } from '@/api/employees'
const { exportExcelMapPath, hireType } = employees
import QRcode from 'qrcode'
export default {
  data() {
    return {
      list: [],
      pages: { page: 1, size: 10 },
      total: 0,
      isshow: false,
      isshowdialog: false
    }
  },

  created() {
    this.getinfolist()
  },
  components: {
    addemployees
  },

  methods: {
    async getinfolist() {
      const { rows, total } = await getemployeesinfoApi(this.pages)
      this.list = rows
      this.total = total
      // console.log(rows, total);
    },
    //切页触发
    handleCurrentChange(val) {
      this.pages.page = val
      this.getinfolist()
    },
    //选择一页展示多少个触发
    handleSizeChange(val) {
      this.pages.size = val
      this.getinfolist()
    },
    formatterenableState(rrow, column, cellValue, indexow) {
      const findItem = employees.hireType.find((item) => item.id === cellValue)
      return findItem ? findItem.value : '未知'
    },
    async del(val) {
      await this.$confirm('是否删除员工')
      await delemployeesinfoApi(val.id)
      this.$success.massage('删除成功')
    },
    //新增员工
    add() {
      this.isshow = true
    },
    addinfo() {
      this.$router.push('import')
    },
    async exportExcel() {
      const res = await import('@/vendor/Export2Excel')
      const { export_json_to_excel } = res
      const { rows } = await getemployeesinfoApi({
        page: 1,
        size: this.total
      })
      //表头数据【手机号，姓名。。。。】
      const header = Object.keys(exportExcelMapPath)
      // console.log(header)
      //data数据
      const data = rows.map((item) => {
        return header.map((h) => {
          if (h === '聘用形式') {
            const findItem = hireType.find((hire) => {
              return hire.id === item[exportExcelMapPath[h]]
            })
            return findItem ? findItem.value : '未知'
          } else {
            return item[exportExcelMapPath[h]]
          }
        })
      })
      export_json_to_excel({
        header,
        data,
        filename: '员工列表',
        autoWidth: true,
        bookType: 'xlsx'
      })
    },
    showcodedialog(val) {
      if (!val) return this.$message.success('该用户还未设置头像')
      this.isshowdialog = true
      this.$nextTick(() => {
        const canvas = document.getElementById('canvas')
        QRcode.toCanvas(canvas, val)
      })
    }
  }
}
</script>
<style scoped lang="scss">
.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  background-color: #fff;
  overflow: unset;
}
.el-select-dropdown__item {
  height: 60px;
}
.tupian {
  width: 100px;

  height: 100px;
  border-radius: 50%;
  padding: 10px;
}
</style>
