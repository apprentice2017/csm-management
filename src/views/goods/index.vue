<template>
  <div>
    <el-container>
      <el-header style="text-align: center">
        <el-date-picker
          v-model="startTime"
          type="date"
          placeholder="开始日期">
        </el-date-picker>
        <el-date-picker
          v-model="endTime"
          type="date"
          placeholder="结束日期">
        </el-date-picker>
        <el-input v-model="query" placeholder="需要查找的信息" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
        <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
          查找
        </el-button>
      </el-header>
      <!--中部      -->
      <el-main>
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            label="用户编号"
            width="50">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.goods_id }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="创建日期"
            width="180">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.create_date }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="发布人"
            width="100">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>账号: {{ scope.row.account }}</p>
                <p>学号: {{ scope.row.student_no }}</p>
                <p>支付宝账号: {{ scope.row.alipay }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.name }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>

          <el-table-column
            label="类别"
            width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.category_one + '/' + scope.row.category_two }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="标题"
            width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.title }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="内容"
            width="100">
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
            width="100">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <el-image
                  style="width: 100px; height: 100px"
                  :src="scope.row.url_cover"
                  fit="fit"></el-image>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">图片预览</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            label="价格"
            width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.current_price }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="原价"
            width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.old_price }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="标签"
            width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.tag }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="收藏数"
            width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.collect_count }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="评论数"
            width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.comments_count}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="修改时间"
            width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.update_date}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="状态"
            width="100">
            <template slot-scope="scope">
              <el-tag :type="scope.row.is_sold_out === 0 && scope.row.is_dealing === 0? 'success' : 'danger'">{{ message(scope.row) }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="150">
            <template slot-scope="scope">
              <el-popconfirm
                title="确定下架吗？"
                @onConfirm="handleBan(scope.row)"
              >
                <el-button
                  slot="reference"
                  size="mini"
                  type="primary"
                >下架</el-button>
              </el-popconfirm>
              <el-popconfirm
                title="确定删除吗？"
                @onConfirm="handleDelete(scope.row)"
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
import { allGoods, removeGoods, updateGoods } from '@/api/goods'

export default {
  name: 'Goods',
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
      allGoods({ page: this.current_page, size: 10, startDate: this.startTime,
        endDate: this.endTime, title: this.query }).then(res => {
        const { result } = res
        this.tableData = result.goods
        this.totalPage = result.totalPage
        this.totalCount = result.totalCount

        console.log(this.tableData)
      })
    },
    handleBan(row) {
      updateGoods({ goodsId: row.goods_id, isSoldOut: 1 }).then(res => {
        console.log(res)
        this.$message(res.msg)
        this.loadData()
      })
    },
    handleDelete(row) {
      removeGoods(row.goods_id).then(res => {
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
    message(item) {
      let string = '正常'
      if (item.is_sold_out === 1) {
        string = '已下架'
      }
      if (item.is_dealing === 1) {
        string = '交易中'
      }
      return string
    }
  }
}
</script>

<style scoped>

</style>
