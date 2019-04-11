<template>
  <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>{{ card.title }}</span>
    <el-button style="float: right; padding: 3px 0" type="text" @click="isShowAddMark = true">添加</el-button>
  </div>
  <el-button @click="redirect(mark)" class="item-button" v-for="(mark, index) in card.marks" :key="index" round>
    <div class="favicon"><img :src="mark.favicon" alt=""></div>
    {{ mark.title }}
  </el-button>
  <el-dialog title="收货地址" :visible.sync="isShowAddMark">
    <el-form :model="form">
      <el-form-item label="标题" :label-width="formLabelWidth">
        <el-input v-model="form.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="图标" :label-width="formLabelWidth">
        <el-input v-model="form.favicon" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="链接地址" :label-width="formLabelWidth">
        <el-input v-model="form.target" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="面板" :label-width="formLabelWidth">
        <el-select class="el-select-card" v-model="form.card" placeholder="请选择活动区域">
          <el-option v-for="(card, index) in cards" :key="index" :label="card.title" :value="card.objectId"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="isShowAddMark = false">取 消</el-button>
      <el-button type="primary" @click="isShowAddMark = false">确 定</el-button>
    </div>
  </el-dialog>
</el-card>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      form: '',
      formLabelWidth: '120px',
      isShowAddMark: false,
    };
  },
  props: {
    card: {
      type: Object,
      default() {
        return {};
      },
    }
  },
  computed: {
    ...mapState({
      cards: (state) => state.cards
    }),
  },
  methods: {
    redirect(mark) {
      // window.location.href = mark.target;
      window.open(mark.target);
    }
  },
};
</script>


<style lang="scss" scoped>
 .text {
    font-size: 14px;
  }

  .favicon {
    width: 17px;
    height: 17px;
    display: inline-block;
    vertical-align: text-bottom;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .mark-link {
    display: inline-block;
    line-height: 1;
    border: 1px solid #DCDFE6;
    padding: 12px 23px;
    border-radius: 20px;
    font-size: 14px;
    text-decoration: none;
  }

  .item-button {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    display: inline-block;
    min-height: 60px;
  }

  .el-select-card {
    float: left;
  }
</style>
