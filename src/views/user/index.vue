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
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
          查找
        </el-button>
      </el-header>
      <!--中部      -->
      <el-main>
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            label="创建日期"
            width="180">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.date }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="姓名"
            width="180">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>姓名: {{ scope.row.name }}</p>
                <p>住址: {{ scope.row.address }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.name }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            label="学号"
            width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.stuNo }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="购买数"
            width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.buy }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="发布数"
            width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.publish }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="信誉分"
            width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.score }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="状态"
            width="180">
            <template slot-scope="scope">
              <el-tag type="success">正常</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="200">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleFreeze(scope.$index, scope.row)">冻结</el-button>
              <el-button
                size="mini"
                type="success"
                @click="handleActive(scope.$index, scope.row)">激活</el-button>
              <el-popconfirm
                title="确定删除吗？"
              >
                <el-button
                  size="mini"
                  type="danger"
                  slot="reference"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
            :total="5">
          </el-pagination>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'User',
  data() {
    return {
      startTime: '',
      endTime: '',
      query: "",
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        stuNo: '2017081249',
        score: '100',
        buy: '10',
        publish: '5'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
        stuNo: '2017081249',
        score: '100',
        buy: '10',
        publish: '5'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        stuNo: '2017081249',
        score: '100',
        buy: '10',
        publish: '5'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        stuNo: '2017081249',
        score: '100',
        buy: '10',
        publish: '5'
      }]
    }
  },
  methods: {
    handleFreeze(index, row) {
      console.log(index, row);
    },
    handleActive(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleFilter() {
      // todo
    },
    Init() {
      // todo
    }
  },
  beforeMount() {
    this.Init()
  }
}
</script>

<style scoped lang="scss">
.block{
  position: center;
  margin: auto;
}
</style>
