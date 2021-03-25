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
          border
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
            label="发布人"
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
            label="标题"
            width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.title }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="内容"
            width="180">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>{{ scope.row.content }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">预览</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            label="图片预览"
            width="180">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <el-image
                  style="width: 100px; height: 100px"
                  :src="scope.row.url"
                  :fit="fit"></el-image>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">图片预览</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            label="价格"
            width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.price }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="原价"
            width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.oldPrice }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="收藏数"
            width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.collect }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="评论数"
            width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.comments}}</span>
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
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="handleBan(scope.row)" type="text" size="small">下架</el-button>
              <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
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
  name: 'Goods',
  data() {
    return {
      startTime: '',
      endTime: '',
      query: "",
      tableData: [{
        price: '1249',
        oldPrice: '2499',
        category: '数码/手机',
        collect: '55',
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        comments: '5',
        title: '二手手机',
        content: '本人急需转出一台二手手机，有意者联系***********',
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      }, {
        price: '1249',
        oldPrice: '2499',
        category: '数码/手机',
        collect: '55',
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',


        title: '二手手机',
        content: '本人急需转出一台二手手机，有意者联系***********',
        comments: '5',
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      }, {
        price: '1249',
        oldPrice: '2499',
        category: '数码/手机',
        collect: '55',
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        comments: '5',
        title: '二手手机',
        content: '本人急需转出一台二手手机，有意者联系***********',
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      }, {
        price: '1249',
        oldPrice: '2499',
        category: '数码/手机',
        collect: '55',
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        comments: '5',
        title: '二手手机',
        content: '本人急需转出一台二手手机，有意者联系***********',
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      }],

    }
  },
  methods: {
    handleBan(index, row) {
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

<style scoped>

</style>
