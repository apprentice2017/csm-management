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
        <el-input v-model="query" placeholder="需要查找的信息" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
        <el-button  class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
          查找
        </el-button>
      </el-header>
      <!--中部      -->
      <el-main>
        <el-table
          :data="tableData"
          style="width: 100%"
        >
          <el-table-column
            label="用户编号"
            width="50">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.userId }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="创建日期"
            width="180"
          >
            <template slot-scope="scope">
              <i class="el-icon-time" />
              <span style="margin-left: 10px">{{ scope.row.createDate }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="姓名"
            width="100"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="账号"
            width="180"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.account }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="头像"
            width="180"
          >
            <template slot-scope="scope">
              <span><el-avatar shape="square" :size="50" fit="fit" :src="scope.row.url"></el-avatar></span>
            </template>
          </el-table-column>
          <el-table-column
            label="支付宝账号"
            width="200"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.alipay }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="支付宝姓名"
            width="100"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.alipayName }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="学号"
            width="100"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.studentNo }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="信誉分"
            width="50"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.creditPoints }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="状态"
            width="100"
            :filters="[{ text: '已冻结', value: '已冻结' }, { text: '未激活', value: '未激活' }, { text: '正常', value: '正常' }]"
            :filter-method="filterTag"
            filter-placement="bottom-end"
          >
            <template slot-scope="scope">
              <el-tag :type="scope.row.isActive === 1 && scope.row.isFreeze === 0? 'success' : 'danger' ">{{ message(scope.row)}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="200"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleFreeze(scope.row.userId)"
              >冻结</el-button>
              <el-button
                size="mini"
                type="success"
                @click="handleActive(scope.row.userId)"
              >激活</el-button>
              <el-popconfirm
                title="确定删除吗？"
                @onConfirm="handleDelete(scope.row.userId)"
              >
                <el-button
                  slot="reference"
                  size="mini"
                  type="danger"
                >删除</el-button>
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
import { allUser, removeUser, update } from '@/api/user'

export default {
  name: 'User',
  data() {
    return {
      startTime: '',
      endTime: '',
      query: null,
      current_page: 1,
      page_count: 5,
      tableData: [],
      totalPage: null,
      totalCount: null
    }
  },
  computed: {
  },
  beforeMount() {
    this.loadData()
  },
  methods: {
    loadData() {
      allUser({ page: this.current_page, size: 10, startDate: this.startTime,
        endDate: this.endTime, name: this.query }).then(res => {
        const { result } = res
        this.tableData = result.user
        this.totalPage = result.totalPage
        this.totalCount = result.totalCount

        console.log(this.tableData)
      })
    },
    handleFreeze(userId) {
      update({ isFreeze: 1, userId: userId }).then(res => {
        this.$message(res.msg)

        this.loadData()
      })
    },
    handleActive(userId) {
      update({ isFreeze: 0, isActive: 1, userId: userId }).then(res => {
        this.$message(res.msg)

        this.loadData()
      })
    },
    handleDelete(userId) {
      //
      // console.log(index, row)
      removeUser(userId).then(res => {
        this.$message(res.msg)
        this.loadData()
      })
    },
    handleFilter() {
      this.current_page = 1
      this.loadData()
    },
    Init() {
      // todo
    },
    pageChange(val) {
      this.current_page = val
      this.loadData()
    },
    message(item) {
      let string = '正常'
      if (item.isActive === 0) {
        string = '未激活'
      }
      if (item.isFreeze === 1) {
        string = '已冻结'
      }
      return string
    },
    filterTag(value, row) {
      return this.message(row) === value;
    },
  }
}
</script>

<style scoped lang="scss">
.block{
  position: center;
  margin: auto;
}
</style>
