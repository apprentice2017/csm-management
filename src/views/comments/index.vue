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
        <el-input v-model="query" placeholder="需要查找的信息" style="width: 200px;" class="filter-item"
                  @keyup.enter.native="handleFilter"
        />
        <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
          查找
        </el-button>
      </el-header>
      <!--中部      -->
      <el-main>
        <el-table
          :data="tableData"
          style="width: 100%;"
        >
          <el-table-column
            label="留言id"
            width="110"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.comment_id }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="发布时间"
            width="180"
          >
            <template slot-scope="scope">
              <i class="el-icon-time"/>
              <span style="margin-left: 10px">{{ scope.row.create_date }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="发布人"
            width="100"
          >
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>姓名: {{ scope.row['user'].name }}</p>
                <p>账号: {{ scope.row['user'].account }}</p>
                <p>支付宝账号: {{ scope.row['user'].alipay }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row['user'].name }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            label="评论类型"
            width="100"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.type === 1 ? '求购' : '物品' }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="content"
            label="内容"
            width="180"
          >
          </el-table-column>
          <el-table-column
            label="对象标题"
            width="180"
          >
            <template slot-scope="scope">
              <span>{{ scope.row['object'].title }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="对象描述"
            width="180"
          >
            <template slot-scope="scope">
              <span>{{ scope.row['object'].description }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="300"
          >
            <template slot-scope="scope">
              <el-button
                slot="reference"
                size="mini"
                type="primary"
                @click="handleUser(scope.row['user'])"
              >该用户留言
              </el-button>
              <el-button
                slot="reference"
                size="mini"
                type="primary"
                @click="handleObject(scope.row)"
              >该对象留言
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
import { allComments, removeComment } from '@/api/comments'

export default {
  name: 'Comments',
  data() {
    return {
      startTime: '',
      endTime: '',
      query: '',
      tableData: [],
      current_page: 1,
      totalPage: null,
      totalCount: null,
      userId: null,
      type: null,
      item: null,
      flag: false
    }
  },
  beforeMount() {
    this.loadData()
  },
  methods: {
    loadData() {
      allComments({
        page: this.current_page, size: 10, startDate: this.startTime, user: this.flag,
        endDate: this.endTime, search: this.query, userId: this.userId, objectId: this.item,
        type: this.type
      }).then(res => {
        const { result } = res
        console.log(res)
        this.tableData = result.comments
        this.totalPage = result.totalPage
        this.totalCount = result.totalCount

      })
    },
    handleDelete(row) {
      removeComment(row.comment_id).then(res => {
        this.$message(res.msg)
        this.loadData()
      })
    },
    handleFilter() {
      this.current_page = 1
      this.loadData()
      this.type = null
      this.userId = null
      this.objectId = null
    },
    pageChange(val) {
      this.current_page = val
      this.loadData()
    },
    handleUser(row) {
      this.userId = row.userId
      this.handleFilter()
    },
    handleObject(row) {
      this.type = row.type
      const object = this.type === 1 ? 'goodsId' : 'essayId'
      console.log(row.object['goodsId'])
      this.item = row.object[object]
      console.log(this.type + '/' + this.item + '/')
      this.handleFilter()
    }
  }
}
</script>

<style scoped>

</style>
