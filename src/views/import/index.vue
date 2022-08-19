<template>
  <div>
    <UploadExcel
      :beforeUpload="excelSuccess"
      :onSuccess="onsuccess"
    ></UploadExcel>
  </div>
</template>

<script>
import employees from '@/constant/employees.js'
const { mapKeyPath } = employees
import { importemployees } from '@/api/employees.js'
import { formDate } from '@/filters'
export default {
  data() {
    return {}
  },

  created() {},

  methods: {
    excelSuccess({ name }) {
      if (!name.endsWith('.xlsx')) {
        this.$message.error('请选择xlsx文件')
        return false
      }
      return true
    },
    async onsuccess({ header, results }) {
      const newarr = results.map((item) => {
        const obj = {}
        for (let key in mapKeyPath) {
          if (key === '入职日期' || key === '转正日期') {
            //获取时间戳
            const timestamp = item[key]
            //转换时间戳
            const date = new Date((timestamp - 1) * 24 * 3600000)
            //设置时间  ，，   获取时间  表格差70年
            date.setFullYear(date.getFullYear() - 70)
            //毫秒数转化为时间
            obj[mapKeyPath[key]] = formDate(date)
          } else {
            obj[mapKeyPath[key]] = item[key]
          }
        }
        return obj
      })
      await importemployees(newarr)
      this.$message.success('导入成功')
      this.$router.go(-1)
      console.log(111)
    }
  }
}
</script>

<style scoped></style>
