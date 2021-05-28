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
        >
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-row type="flex">
                <el-col :span="3" v-for="o in props.row['goods']">
                  <el-card :body-style="{ padding: '0px' }">
                    <img :src="o.urlCover" class="image">
                    <div style="padding: 14px;">
                      <span>{{ o.title }}</span>
                      <div class="bottom clearfix">
                        <time class="time">{{ o.createDate }}</time>
                        <el-popover
                          placement="right"
                          width="400"
                          trigger="click"
                        >
                          <el-form ref="form" :model="o" label-width="100px">
                            <template>
                              <el-carousel :interval="4000" height="200px">
                                <el-carousel-item
                                  v-for="item in JSON.parse(o.url).map(res=>{return res.url})"
                                  :key="item"
                                  style="text-align: center"
                                >
                                  <img :src="item" style="height: 100%"/>
                                </el-carousel-item>
                              </el-carousel>
                            </template>
                            <el-form-item label="物品名称">
                              <el-input v-model="o.title" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="描述">
                              <el-input v-model="o.description" type="textarea" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="现价">
                              <el-input v-model="o.currentPrice" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="原价">
                              <el-input v-model="o.oldPrice" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="类别">
                              <el-input  :value="o.categoryOne+'/'+o.categoryTwo" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="标签">
                              <el-input v-model="o.tag" :disabled="true"></el-input>
                            </el-form-item>
                          </el-form>

                          <el-button type="text" class="button" slot="reference">查看详情</el-button>
                        </el-popover>
                      </div>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column
            width="200"
            label="父订单编号"
            prop="outTradeNo"
          />
          <el-table-column
            width="200"
            label="子订单编号"
            prop="subTradeNo"
          />
          <el-table-column
            width="260"
            label="支付宝编号"
            prop="alipayId"
          />
          <el-table-column
            label="创建时间"
            width="170"
          >
            <template slot-scope="props">
              <i class="el-icon-time"/>
              <span>{{ props.row.createDate }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="卖家"
            width="100"
          >
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>账号: {{ scope.row['seller'].account }}</p>
                <p>学号: {{ scope.row['seller'].studentNo }}</p>
                <p>支付宝账号: {{ scope.row['seller'].alipay }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.seller.name }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            label="买家"
            width="100"
          >
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>账号: {{ scope.row['buyer'].account }}</p>
                <p>学号: {{ scope.row['buyer'].studentNo }}</p>
                <p>支付宝账号: {{ scope.row['buyer'].alipay }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.buyer.name }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            label="总金额"
            width="100"
          >
            <template slot-scope="props">
              <span>{{ props.row.totalAmount }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="子订单总金额"
            width="150"
          >
            <template slot-scope="props">
              <span>{{ props.row.subAmount }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="订单状态"
            width="100"
          >
            <template slot-scope="scope">
              <el-tag :type="scope.row.status !== 3 ? 'success' : 'danger'">
                {{ message(scope.row.status) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="取消时间"
            width="170"
          >
            <template slot-scope="scope">
              <i class="el-icon-time"/>
              <span>{{ scope.row.cancelDate }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="完成时间"
            width="170"
          >
            <template slot-scope="scope">
              <i class="el-icon-time"/>
              <span>{{ scope.row.finishedDate }}</span>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="200"
          >
            <template slot="header" slot-scope="scope">
              <el-input
                v-model="search"
                size="mini"
                placeholder="输入关键字搜索"
              />
            </template>
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleCancel(scope.row.subTradeNo)">取消订单</el-button>
              <el-popconfirm
                title="确定删除吗？"
                @onConfirm="handleDelete(scope.row.orderId)"
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
        <el-pagination
          style="text-align:center;"
          :page-size="pageSize"
          :current-page="currentPage"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import { allOrders, cancelOrder, removeOrder } from '@/api/orders'

export default {
  name: 'Order',
  data() {
    return {
      startTime: '',
      endTime: '',
      query: '',
      tableData: [],
      currentPage: 1,
      totalCount: null,
      pageSize: 10,
      pageNo: null,
      status: ['待支付', '已支付', '已完成', '已取消'],
      search: ''
    }
  },
  computed: {
    AfterChangeData() {
      const start = (this.currentPage - 1) * this.pageSize
      const end = this.currentPage * this.pageSize
      const result = this.tableData.filter(data => !this.search ||
        data.outTradeNo.toLowerCase().includes(this.search.toLowerCase())
      )
      this.totalCount = result.length
      return result.slice(start, end)
    }
  },
  beforeMount() {
    this.loadData()
  },
  methods: {
    loadData() {
      allOrders({
        startDate: this.startTime,
        endDate: this.endTime, search: this.query
      }).then(res => {
        const { result } = res
        this.tableData = result.orders
        this.totalCount = result.totalCount

        console.log(this.tableData)
      })
    },
    // 分页大小改变
    handleSizeChange(val) {
      this.pageSize = val
    },
    // 当前页数改变
    handleCurrentChange(val) {
      this.currentPage = val
    },
    handleFilter() {
      this.loadData()
    },
    handleCancel(row) {
      cancelOrder({ OrderId: row, type: 'sub_trade_no' }).then(res => {
        this.$message(res.msg)
      })
    },
    handleDelete(orderId) {
      removeOrder(orderId).then(res => {

        this.$message(res.msg)
      })
    },
    message(item) {
      return this.status[item]
    }
  }
}
</script>

<style scoped>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}
</style>
