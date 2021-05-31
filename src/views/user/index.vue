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
        <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
          查找
        </el-button>
      </el-header>
      <!--中部      -->
      <el-main>
        <el-table
          :data="AfterChangeData"
          style="width: 100%"
          @sort-change="sort"
        >
          <el-table-column
            label="用户编号"
            width="50"
          >
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.userId }}</span>
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
              <span><el-avatar shape="square" :size="50" fit="fit" :src="scope.row.url"/></span>
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
            prop="credit_points"
            label="信誉分"
            width="100"
            sortable="custom"
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
              <el-tag :type="scope.row.isActive === 1 && scope.row.isFreeze === 0? 'success' : 'danger' ">
                {{ message(scope.row) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="200"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                slot="reference"
                @click="handleFreeze(scope.row.userId)"
              >冻结
              </el-button>
              <el-button
                size="mini"
                slot="reference"
                type="success"
                @click="handleActive(scope.row)"
              >激活
              </el-button>
              <el-popconfirm
                title="确定删除吗？"
                @onConfirm="handleDelete(scope.row.userId)"
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
            layout="total, sizes, prev, pager, next, jumper"
            :current-page="current_page"
            :page-size="pageSize"
            :total="totalCount"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
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
      startTime: null,
      endTime: null,
      query: null,
      tableData: [],
      current_page: 1,
      totalPage: null,
      totalCount: null,
      pageSize: 10,
      order: null,
      sensitive: null
    }
  },
  computed: {
    AfterChangeData() {
      const start = (this.current_page - 1) * this.pageSize
      const end = this.current_page * this.pageSize
      const result = this.tableData
      this.totalCount = result.length
      return result.slice(start, end)
    }
  },
  beforeMount() {
    this.loadData()
  },
  methods: {
    loadData() {
      allUser({
        startDate: this.startTime,
        endDate: this.endTime,
        name: this.query,
        order: this.order
      }).then(res => {
        const { result } = res
        this.tableData = result.user
      })
    },
    handleFreeze(userId) {
      update({ isFreeze: 1, userId: userId }).then(res => {
        this.$message(res.msg)
        this.loadData()
      })
    },
    handleActive(row) {
      update({
        isFreeze: 0,
        isActive: 1,
        userId: row.userId,
        creditPoints: row.creditPoints < 60 ? row.creditPoints : row.creditPoints + 10
      }).then(res => {
        this.$message(res.msg)
        this.loadData()
      })
    },
    handleDelete(userId) {
      removeUser(userId).then(res => {
        this.$message(res.msg)
        this.loadData()
      })
    },
    handleFilter() {
      this.current_page = 1
      this.loadData()
    },
    // 分页大小改变
    handleSizeChange(val) {
      this.pageSize = val
    },
    // 当前页数改变
    handleCurrentChange(val) {
      this.current_page = val
    },
    sort(column) {
      if (column['order'] === 'ascending') {
        this.order = null
      } else {
        this.order = column['prop']
      }
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
      return this.message(row) === value
    }
  }
}
</script>
<style scoped lang="scss">
.block {
  position: center;
  margin: auto;
}
</style>
