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
          border
          style="width: 100%"
        >
          <el-table-column
            label="用户编号"
            width="50"
          >
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.goods_id }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="创建日期"
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
            width="100"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.category_one + '/' + scope.row.category_two }}</span>
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
                  :src="scope.row.url_cover"
                  fit="fit"
                />
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">图片预览</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            label="价格"
            width="100"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.current_price }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="原价"
            width="100"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.old_price }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="标签"
            width="100"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.tag }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="收藏数"
            width="100"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.collect_count }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="评论数"
            width="100"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.comments_count }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="修改时间"
            width="100"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.update_date }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="状态"
            width="100"
          >
            <template slot-scope="scope">
              <el-tag :type="scope.row.is_sold_out === 0 && scope.row.is_dealing === 0? 'success' : 'danger'">
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
              <el-popover
                placement="right"
                width="400"
                trigger="click"
              >
                <el-form ref="form" :model="scope.row" label-width="100px">
                  <template>
                    <el-carousel :interval="4000" height="200px">
                      <el-carousel-item
                        v-for="item in JSON.parse(scope.row.url).map(res=>{return res.url})"
                        :key="item"
                        style="text-align: center"
                      >
                        <img :src="item" style="height: 100%">
                      </el-carousel-item>
                    </el-carousel>
                  </template>
                  <el-form-item label="物品名称">
                    <el-input v-model="scope.row.title" :disabled="true"/>
                  </el-form-item>
                  <el-form-item label="描述">
                    <el-input v-model="scope.row.description" type="textarea" :disabled="true"/>
                  </el-form-item>
                  <el-form-item label="现价">
                    <el-input v-model="scope.row.current_price" :disabled="true"/>
                  </el-form-item>
                  <el-form-item label="原价">
                    <el-input v-model="scope.row.old_price" :disabled="true"/>
                  </el-form-item>
                  <el-form-item label="类别">
                    <el-input :value="scope.row.category_one+'/'+scope.row.category_two" :disabled="true"/>
                  </el-form-item>
                  <el-form-item label="标签">
                    <el-input v-model="scope.row.tag" :disabled="true"/>
                  </el-form-item>
                </el-form>

                <el-button
                  slot="reference"
                  size="mini"
                  type="success"
                  class="button"
                >详情
                </el-button>
              </el-popover>
              <el-popconfirm
                title="确定下架吗？"
                @onConfirm="handleBan(scope.row)"
              >
                <el-button
                  slot="reference"
                  size="mini"
                  type="primary"
                >下架
                </el-button>
              </el-popconfirm>
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
import { allGoods, removeGoods, updateGoods } from '@/api/goods'
import { reduceUser } from '@/api/user'

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
      totalCount: null,
      pageSize: 10
    }
  },
  computed: {
    AfterChangeData() {
      const start = (this.current_page - 1) * this.pageSize
      const end = this.current_page * this.pageSize
      const result = this.tableData
      this.totalCount = result.length
      console.log(result.slice(start, end))
      return result.slice(start, end)
    }
  },
  beforeMount() {
    this.loadData()
  },
  methods: {
    loadData() {
      allGoods({
        startDate: this.startTime,
        endDate: this.endTime, title: this.query
      }).then(res => {
        const { result } = res
        if (result.goods != null) {
          this.tableData = result.goods
        }
      })
    },
    handleBan(row) {
      updateGoods({ goodsId: row.goods_id, isSoldOut: 1 }).then(res => {
        this.$message(res.msg)
        this.loadData()
      })
    },
    handleDelete(row) {
      removeGoods(row.goods_id).then(res => {
        this.$message(res.msg)

        reduceUser({ userId: row.user_id, num: 5 })
        this.loadData()
      })
    },
    handleFilter() {
      this.current_page = 1
      this.loadData()
    },
    pageChange(val) {
      this.current_page = val
    },
    // 分页大小改变
    handleSizeChange(val) {
      this.pageSize = val
    },
    // 当前页数改变
    handleCurrentChange(val) {
      this.current_page = val
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
