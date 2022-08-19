<template>
  <div>
    <el-upload
      v-loading="loading"
      element-loading-text="上传中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :file-list="filelist"
      action="#"
      :before-upload="beforeupload"
      list-type="picture-card"
      :http-request="onresquest"
      :on-change="onchange"
      :on-remove="onremove"
      :on-preview="onpreview"
      class="custom-upload"
      :limit="1"
      :class="filelist.length ? 'hide' : ''"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="showimg">
      <img :src="imgulr" alt="" style="width:100%" />
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
var cos = new COS({
  SecretId: 'AKIDe9QTHrCH9l7ICq5HDwObZJmyyitwjGXX',
  SecretKey: 'oOiokV0HJ7h16vWt3zg7IEuKUvFI5g3C'
})
// console.log(cos)
export default {
  name: 'uploadimg',
  // id: AKIDe9QTHrCH9l7ICq5HDwObZJmyyitwjGXX
  //   key:oOiokV0HJ7h16vWt3zg7IEuKUvFI5g3C
  data() {
    return {
      filelist: [
        // {
        //   name: 'test',
        //   url:''
        // }
      ],
      imgulr: '',
      showimg: false,
      loading: false
      //   fileList:[]
    }
  },

  created() {},

  methods: {
    onresquest({ file }) {
      //   console.log(file)
      this.loading = true
      cos.putObject(
        {
          Bucket: 'hmhr-31-1313341600' /* 填入您自己的存储桶，必须字段 */,
          Region: 'ap-shanghai' /* 存储桶所在地域，例如ap-beijing，必须字段 */,
          Key: file.name /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */,
          StorageClass: 'STANDARD',
          Body: file, // 上传文件对象
          onProgress: function (progressData) {
            console.log(JSON.stringify(progressData))
          }
        },
        (err, data) => {
          this.loading = false
          if (err || data.statusCode != 200)
            return this.$message, error('上传失败，请重试')
          this.$emit('onSuccess', {
            url: 'http://' + data.Location
          })
        }
      )
    },
    onchange(file, filelist) {
      this.filelist = filelist
    },
    onremove(file, filelist) {
      this.filelist = filelist
    },
    //放大
    onpreview(file) {
      console.log(file)
      this.imgulr = file.url
      this.showimg = true
    },
    //上传前判断
    beforeupload(file) {
      const types = ['image/jpeg', 'image/gif']
      console.log(file)
      if (!types.includes(file.type)) {
        this.$message.error('请选择' + types.join('&') + '图片')
        return false
      }
      console.log('检测', file)
      //限制大小
      const maxsize = 2 * 1024 * 1024
      if (file.size > maxsize) {
        this.$message.error('超出限制')
        return false
      }
    }
  }
}
</script>

<style>
.hide .el-upload--picture-card {
  display: none;
}
.custom-upload {
  width: 158px;
  height: 158px;
  overflow: hidden;
}
</style>
