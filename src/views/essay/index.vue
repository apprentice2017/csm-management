<template>
  <div>
    <el-container>
      <el-header style="text-align: center">
        <el-date-picker
          v-model="startTime"
          type="date"
          placeholder="开始日期"
        />
        <el-date-picker
          v-model="endTime"
          type="date"
          placeholder="结束日期"
        />
        <el-input
          v-model="query"
          placeholder="需要查找的信息"
          style="width: 200px;"
          class="filter-item"
          @keyup.enter.native="handleFilter"
        />
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
          查找
        </el-button>
      </el-header>
      <!--中部      -->
      <el-main>
        <el-table
          :data="tableData"
          style="width: 100%;"
          :row-class-name="tableRowClassName"
        >
          <el-table-column
            label="求购编号"
            width="100"
          >
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.essayId }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="创建日期"
            width="180"
          >
            <template slot-scope="scope">
              <i class="el-icon-time"/>
              <span style="margin-left: 10px">{{ scope.row.createDate }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="发布人"
            width="100"
          >
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>账号: {{ scope.row.account }}</p>
                <p>学号: {{ scope.row.studentNo }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.name }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            label="标题"
            width="180"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.title }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="内容"
            width="100"
          >
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">

                <p>{{ scope.row.description }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">预览</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            label="图片预览"
            width="100"
          >
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <el-image
                  style="width: 100px; height: 100px"
                  :src="scope.row.urlCover"
                  fit="fit"
                />
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">图片预览</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            label="留言数"
            width="100"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.commentsCount }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="点赞数"
            width="100"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.thumbCount }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="更新时间"
            width="100"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.updateDate }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="敏感内容"
            width="100"
            prop="sensitiveContent"
          />
          <el-table-column
            label="类型"
            width="100"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.type === 1 ? '求购' : '其他' }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="200"
          >
            <template slot-scope="scope">
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
      </el-main>
      <!--底部-->
      <el-footer>
        <div class="block">
          <el-pagination
            style="text-align:center;"
            layout="total, prev, pager, next"
            :current-page="current_page"
            :page-count="totalPage"
            :total="totalCount"
            @current-change="pageChange"
          />
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import { allEssay, removeEssay } from '@/api/essay'

export default {
  name: 'Essay',
  data() {
    return {
      startTime: null,
      endTime: null,
      query: null,
      tableData: [],
      current_page: 1,
      totalPage: null,
      totalCount: null

    }
  },
  beforeMount() {
    this.loadData()
  },
  methods: {
    loadData() {
      allEssay({
        page: this.current_page, size: 10, startDate: this.startTime,
        endDate: this.endTime, title: this.query
      }).then(res => {
        const { result } = res
        this.tableData = result.essays
        this.totalPage = result.pageCount
        this.totalCount = result.totalCount

        console.log(this.tableData)
      })
    },
    handleDelete(row) {
      removeEssay(row.essay_id).then(res => {
        this.$message(res.msg)
        this.loadData()
      })
    },
    handleFilter() {
      this.current_page = 1
      this.loadData()
    },
    pageChange(val) {
      this.current_page = val
      this.loadData()
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.isSensitive === 1) {
        return 'warning-row'
      }
      return ''
    }
  }
}
</script>

<style scoped>

</style>
