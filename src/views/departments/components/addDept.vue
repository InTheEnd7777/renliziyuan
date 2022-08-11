<template>
  <!-- @close 内部关闭方法函数 -->
  <el-dialog :title="addor" :visible="visible" width="30%" @close="onclose">
    <el-form
      ref="form"
      :model="formData"
      label-width="100px"
      :rules="formDataRules"
    >
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code"></el-input>
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select
          style="width: 100%"
          placeholder="请选择活动区域"
          v-model="formData.manager"
        >
          <el-option
            v-for="item in employees"
            :key="item.id"
            :label="item.username"
            :value="item.username"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input type="textarea" v-model="formData.introduce"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onclose">取 消</el-button>
      <el-button type="primary" @click="adddesp">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  getDeptsApi,
  addDeptsApi,
  getDeptsByApi,
  xiugaiDeptsBY
} from '@/api/departments'
import { getemployeesApi } from '@/api/employees'
export default {
  data() {
    //检测部门
    const ischonfu = async (rules, value, callback) => {
      //遍历传过来的数据，和输入框得value 做对比，如果有就返回true
      //编辑
      if (this.formData.id) {
        //如果有id获取所有得部门
        const { depts } = await getDeptsApi()
        //把所有部门筛选出来这时候自己也被筛选出来了，然后通过&&item.id!==this.formData.id把自己筛选出去
        const list = depts.filter(
          (item) =>
            item.pid === this.formData.id && item.id !== this.formData.id
        )
        //如果修改后得值跟别的部门得名字一样如果有一样的返回ture
        const isRepeat = list.some((item = item.name === value))
        isRepeat ? callback(new Error('不能和已有部门重复')) : callback()
      } else {
        //添加
        if (!this.nodelist.children) return callback()
        const isRepeat = this.nodelist.children.some(
          (item) => item.name === value
        )
        isRepeat ? callback(new Error('不能和已有部门重复')) : callback()
      }
    }

    //检测部门编码
    const iscoding = async (rules, value, callback) => {
      const { depts } = await getDeptsApi()

      let isRepeat
      //编辑
      if (this.formData.id) {
        isRepeat = depts
          .filter((item) => item.id !== this.formData.id)
          .some((item) => item.code === value)
      } else {
        //添加
        // console.log(depts);
        //遍历传过来的数据，和输入框得value 做对比，如果有就返回true
        isRepeat = depts.some((item) => item.code === value)
        isRepeat ? callback(new Error('编码重复')) : callback()
      }
    }
    return {
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '', // 部门介绍,
        pid: ''
      },
      formDataRules: {
        name: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
          {
            validator: ischonfu,
            trigger: 'blur'
          }
        ],
        code: [
          { required: true, message: '请输入部门编码', trigger: 'blur' },
          {
            validator: iscoding,
            trigger: 'blur'
          }
        ],
        manager: [
          { required: true, message: '请选择部门管理人', trigger: 'change' }
        ],
        introduce: [
          { required: true, message: '请输入部门介绍', trigger: 'blur' }
        ]
      },
      employees: []
    }
  },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    nodelist: {
      type: Object,
      required: true
    }
  },
  created() {
    this.getemployeesApi()
  },
  computed: {
    addor() {
      return this.formData.id ? '编辑部门' : '添加部门'
    }
  },
  methods: {
    async getemployeesApi() {
      const res = await getemployeesApi()
      this.employees = res
    },
    //点击关闭弹窗，触发父组件:visible.sync事件
    onclose() {
      this.$emit('update:visible', false)
      //编辑点击取消取消校验规则
      this.$refs.form.resetFields()
      //把里面的数据清空，标头改变
      this.formData = {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '', // 部门介绍,
        pid: ''
      }
    },
    //添加和修改
    async adddesp() {
      if (this.formData.id) {
        await xiugaiDeptsBY(this.formData)
        this.$message.success('编辑成功')
        //关闭弹窗，重新获取数据
        this.onclose()
        this.$emit('add-success')
      } else {
        try {
          await this.$refs.form.validate()
          // console.log(this.nodelist)
          this.formData.pid = this.nodelist.id
          const res = await addDeptsApi(this.formData)
          console.log(res)
          this.$message.success('添加成功')
          this.onclose()
          this.$emit('add-success')
        } catch (error) {
          this.$message.success('添加失败')
        }
      }
    },
    async getDepts(id) {
      const res = await getDeptsByApi(id)
      this.formData = res
    }
  }
}
</script>

<style scoped></style>
