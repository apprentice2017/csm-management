<template>
  <div>
    <el-container>
      <el-header style="text-align: center" />
      <!--中部      -->
      <div class="block" style="width: 30%;margin: 0 auto 0 auto">
        <span style="text-align: center; display: block;color: #99a9bf">客户端轮播图预览</span>
        <el-carousel height="200px">
          <el-carousel-item v-for="item in imgData" :key="item.swiper_id">
            <el-image :src="item.img" fit="fit" />
          </el-carousel-item>
        </el-carousel>
      </div>
      <el-table
        :data="tableData"
        stripe
        style="width: 100%"
      >
        <el-table-column
          prop="swiper_id"
          label="轮播图编号"
          width="180"
        />
        <el-table-column
          prop="description"
          label="描述信息"
          width="180"
        />
        <el-table-column
          prop="url"
          label="链接地址"
        />
        <el-table-column
          label="操作"
          width="300"
        >

          <template slot="header" slot-scope="scope">
            <el-popover
              v-model="visible"
              placement="right"
              width="400"
              trigger="manual"
            >
              <el-form ref="form" :model="form" label-width="80px">
                <el-upload
                  class="upload-demo"
                  action=""
                  :before-upload="beforeAvatarUpload"
                  :on-progress="afterRead"
                  :file-list="fileList"
                  :limit="1"
                  list-type="picture"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
                <el-form-item label="描述">
                  <el-input v-model="form.description" />
                </el-form-item>

                <el-form-item label="链接地址">
                  <el-input v-model="form.url" />
                </el-form-item>
                <el-form-item label="是否展示">
                  <el-switch
                    v-model="form.isSelect"
                    active-value="1"
                    inactive-value="0"
                  />
                </el-form-item>
                <el-form-item>
                  <el-button v-if="form.swiperId === null" type="primary" @click="handleAdd">立即创建</el-button>
                  <el-button v-else type="primary" @click="handleUpdate">立即修改</el-button>
                  <el-button @click="handleCancel">取消</el-button>
                </el-form-item>
              </el-form>
              <el-button slot="reference" @click="visible = !visible">增加</el-button>
            </el-popover>

          </template>
          <template slot-scope="scope">
            <el-button
              ref="popover"
              slot="reference"
              size="mini"
              type="primary"
              @click="handleModify(scope.row)"
            >修改
            </el-button>
            <el-button
              slot="reference"
              size="mini"
              type="primary"
              @click="handleShow(scope.row)"
            >{{ scope.row.is_select === 1 ? '取消展示' : '选择展示' }}
            </el-button>
            <el-popconfirm
              title="确定删除吗？"
              @onConfirm="handleDelete(scope.row)"
            >
              <el-button
                slot="reference"
                size="mini"
                type="danger"
              >删除
              </el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-main />
      <!--底部-->
      <el-pagination
        style="text-align:center;"
        layout="total, prev, pager, next"
        :current-page="current_page"
        :page-count="totalPage"
        :total="totalCount"
        @current-change="pageChange"
      />
      <el-footer />
    </el-container>
  </div>

</template>

<script>
import { addSwiper, allSwiper, removeSwiper, updateSwiper } from '@/api/swiper'
import cos from '@/utils/cos'

const uuid = require('uuid')
export default {
  name: 'Swiper',
  data() {
    return {
      query: '',
      tableData: [],
      imgData: [],
      current_page: 1,
      totalPage: null,
      totalCount: null,
      form: {
        swiperId: null,
        img: '',
        url: '',
        description: '',
        isSelect: 0
      },
      uploadFile: {},
      fileList: [],
      img: '',
      visible: false
    }
  },
  beforeMount() {
    this.loadData()
  },
  methods: {
    loadData() {
      allSwiper().then(res => {
        const { result } = res
        this.imgData = result.swiper
      })
      allSwiper({ all: true, page: this.current_page, size: 10 }).then(res => {
        const { result } = res

        console.log(res)
        this.tableData = result.swiper
        this.totalPage = result.totalPage
        this.totalCount = result.totalCount
      })
    },
    handleDelete(row) {
      removeSwiper(row.swiper_id).then(res => {
        this.$message(res.msg)
        this.loadData()
      })
    },
    handleShow(row) {
      updateSwiper({ swiperId: row.swiper_id, isSelect: row.is_select === 1 ? 0 : 1 }).then(res => {
        this.$message(res.msg)
        this.loadData()
      })
    },
    pageChange(val) {
      this.current_page = val
      this.loadData()
    },
    handleModify(row) {
      this.fileList.push({ name: '轮播图', url: row.img })
      this.form.swiperId = row.swiper_id
      this.form.url = row.url
      this.form.img = row.img
      this.form.description = row.description
      this.form.isSelect = row.is_select
      this.visible = true
    },
    handleCancel() {
      this.visible = false
      this.form.swiperId = null
      this.form.url = ''
      this.form.description = ''
      this.form.img = ''
      this.form.isSelect = ''
      this.fileList = []
    },
    handleAdd() {
      addSwiper(this.form).then(res => {
        this.$message(res.msg)
        this.loadData()
        this.visible = false
        this.form.swiperId = null
        this.form.url = ''
        this.form.description = ''
        this.form.img = ''
        this.form.isSelect = ''
        this.fileList = []
      })
    },
    handleUpdate() {
      updateSwiper(this.form).then(res => {
        this.$message(res.msg)
        this.loadData()
        this.visible = false
        this.form.swiperId = null
        this.form.url = ''
        this.form.description = ''
        this.form.img = ''
        this.form.isSelect = ''
        this.fileList = []
      })
    },
    beforeAvatarUpload(file) {
      this.uploadFile = file
    },
    // 上传图片
    afterRead() {
      const key = uuid.v1() + '.jpg'
      cos.putObject({
        Bucket: 'csm-1257665437', /* 必须 */
        Region: 'ap-nanjing', /* 存储桶所在地域，必须字段 */
        Key: key, /* 必须 */
        Body: this.uploadFile // 上传文件对象
      }, (err, data) => {
        this.fileList.push({ name: this.uploadFile.name, url: 'https://' + data.Location })
        this.form.img = 'https://' + data.Location
        console.log(err || data)
      })
    }
  }
}
</script>

<style scoped>

</style>
