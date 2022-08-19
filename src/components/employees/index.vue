<template>
  <el-card class="box-card">
    <el-row type="flex">
      <el-col v-if="isshow">
        <el-tag>
          <i :class="lefticon"></i>
          <slot name="left" />
        </el-tag>
      </el-col>
      <el-col>
        <el-row type="flex" justify="end">
          <slot name="right" />
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: 'employees',
  data() {
    return {}
  },
  props: {
    lefticon: {
      type: String,
      default: 'el-icon-info'
    },
    isshow: {
      type: Boolean,
      default: true
    }
  },

  created() {},

  methods: {}
}
</script>

<style scoped></style>
