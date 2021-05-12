<template>
  <div>
    <el-container>
      <el-header style="text-align: center" />
      <!--中部      -->
      <div class="block" style="width: 40%; margin: 0 auto 0 auto">
        <span class="demonstration" style="display: block;text-align: center">样式展示模拟</span>
        <el-cascader-panel
          :options="options"
          :props="{label:'text'}"
        />
      </div>
      <div style="width: 70%; margin: 0 auto 0 auto">
        <el-table
          :data="tableData"
          style="width: 100%"
          max-height="450"
        >
          <el-table-column
            label="日期"
            width="180"
          >
            <template slot-scope="scope">
              <i class="el-icon-time" />
              <span style="margin-left: 10px">{{ scope.row.createDate }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="categoryOne"
            label="一级类别"
            width="180"
          />
          <el-table-column
            prop="categoryTwo"
            label="二级类别"
            width="180"
          />
          <el-table-column
            label="状态"
            width="180"
          >
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.isShow === 0 ? '隐藏' : '不隐藏' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot="header" slot-scope="scope">

              <el-popover
                v-model="visible"
                placement="right"
                width="400"
                trigger="manual"
              >
                <el-form ref="form" :model="form" label-width="80px">
                  <el-form-item label="一级类别">
                    <el-select v-model="parentId" placeholder="请选择">
                      <el-option
                        v-for="item in categoryOne"
                        :key="item.categoryId"
                        :label="item.categoryTwo"
                        :value="item.categoryId"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="二级类别">
                    <el-input v-model="form.categoryTwo" />
                  </el-form-item>
                  <el-form-item label="是否展示">
                    <el-switch
                      v-model="isShow"
                      :active-value="1"
                      :inactive-value="0"
                    />
                  </el-form-item>
                  <el-form-item>
                    <el-button v-if="form.categoryId === null" type="primary" @click="handleAdd">立即创建</el-button>
                    <el-button v-else type="primary" @click="handleModify">立即修改</el-button>
                    <el-button @click="handleCancel">取消</el-button>
                  </el-form-item>
                </el-form>
                <el-button slot="reference" @click="visible = !visible">增加</el-button>
              </el-popover>

              <el-popover

                v-model="visible2"
                placement="right"
                width="400"
                trigger="manual"
              >
                <el-form ref="form" :model="form" label-width="80px">
                  <el-form-item label="二级类别">
                    <el-input v-model="form.categoryTwo" />
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="handleAddOne">立即创建</el-button>
                    <el-button @click="handleCancel">取消</el-button>
                  </el-form-item>
                </el-form>
                <el-button slot="reference" @click="visible2 = !visible2">增加一级类别信息</el-button>
              </el-popover>
            </template>
            <template slot-scope="scope">
              <el-button
                size="mini"

                @click="handleShow(scope.row)"
              >{{ scope.row.isShow === 0 ? '显示' : '取消显示' }}
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleUpdate(scope.row)"
              >修改
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-main />
      <!--底部-->
      <el-footer />
    </el-container>
  </div>
</template>

<script>
import { addCategory, allCategory, allCategoryOne, allShow, updateCategory } from '@/api/category'

export default {
  name: 'Category',
  data() {
    return {
      query: '',
      tableData: [],
      imgData: [],
      current_page: 1,
      totalPage: null,
      totalCount: null,
      options: [],
      visible: false,
      visible2: false,
      form: {
        categoryId: null,
        categoryTwo: null,
        parentId: null,
        isShow: null
      },
      categoryOne: [],
      parentId: null,
      isShow: 0
    }
  },
  beforeMount() {
    this.loadData()
  },
  methods: {
    loadData() {
      allCategory().then(res => {
        const { result } = res
        this.tableData = result
      })
      allShow(true).then(res => {
        const { result } = res
        this.options = result
      })
      allCategoryOne().then(res => {
        this.categoryOne = res.result
      })
    },

    handleShow(row) {
      updateCategory({ categoryId: row.categoryId, isShow: row.isShow === 1 ? 0 : 1 }).then(res => {
        this.$message(res.msg)
        this.loadData()
      })
    },

    handleUpdate(row) {
      this.visible = true
      this.form.categoryTwo = row.categoryTwo
      this.form.categoryId = row.categoryId
      this.isShow = row.isShow
      this.parentId = row.parentId
    },
    handleCancel() {
      this.visible = false
      this.form.categoryTwo = null
      this.form.categoryId = null
      this.form.isShow = null
      this.from.parentId = null
    },
    handleModify() {
      const form = this.form
      form.isShow = this.isShow
      form.parentId = this.parentId
      updateCategory(form).then(res => {
        this.$message(res.msg)
        this.visible = false
        this.visible2 = false
        this.form.categoryTwo = null
        this.form.categoryId = null
        this.form.isShow = null
        this.form.parentId = null
      })
      this.loadData()
    },
    handleAdd() {
      this.form.parentId = this.parentId
      this.form.isShow = this.isShow
      addCategory(this.form).then(res => {
        this.$message(res.msg)
        this.visible = false
        this.visible2 = false
        this.form.categoryTwo = null
        this.form.categoryId = null
        this.form.isShow = null
        this.form.parentId = null
        this.loadData()
      })
    },
    handleAddOne() {
      this.form.isShow = 1
      addCategory(this.form).then(res => {
        this.$message(res.msg)
        this.visible = false
        this.visible2 = false
        this.form.categoryTwo = null
        this.form.categoryId = null
        this.form.isShow = null
        this.form.parentId = null
        this.loadData()
      })
    }

  }
}
</script>

<style scoped>

</style>
