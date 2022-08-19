import employees from '@/components/employees'
import UploadExcel from '@/components/upLoadExcel'
import uploadimg from '@/components/uploadimg'
const component = [employees, UploadExcel, uploadimg]
export default {
  install(Vue) {
    component.forEach((component) => {
      Vue.component(component.name, component)
    })
  }
}
