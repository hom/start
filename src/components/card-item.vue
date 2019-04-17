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

  <!-- add mark dialog -->
  <el-dialog title="添加标签" :visible.sync="isShowAddMark" @close="resetFields">
    <el-form :model="form" :rules="rules" ref="ADD_MARK_FORM" :label-width="formLabelWidth">
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="图标名称" prop="name">
        <el-input v-model="form.favicon" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="图标链接" prop="url">
        <el-input v-model="form.favicon" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="链接地址" prop="target">
        <el-input v-model="form.target" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="面板" prop="card">
        <el-select class="el-select-card" v-model="form.card" placeholder="请选择所属面板">
          <el-option v-for="(card, index) in cards" :key="index" :label="card.title" :value="card.objectId"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="resetFields">重 置</el-button>
      <el-button type="primary" @click="addMark">确 定</el-button>
    </div>
  </el-dialog>
</el-card>
</template>

<script>
import { mapState } from 'vuex';

function checkURL(rule, value, callback) {
  if (!value) {
    return callback(new Error('链接地址不能为空'));
  }

  const URLPattern = /^https?:\/\//;
  if (!URLPattern.test(value)) {
    return callback(new Error('链接地址格式为http://或者https://'));
  }
  return callback();
}

export default {
  data() {
    return {
      form: '',
      formLabelWidth: '120px',
      isShowAddMark: false,
      rules: {
        title: [
          { required: true, message: '请输入标签名称', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '图标名称不能为空', trigger: 'blur' }
        ],
        // url: [
        //   { required: true, message: '请输入图标地址', trigger: 'blur' },
        //   { validator: checkURL, trigger: 'blur' },
        // ],
        target: [
          { required: true, message: '请输入链接地址', trigger: 'blur' },
          { validator: checkURL, trigger: 'blur' },
        ],
        card: [
          { required: true, message: '请选择面板名称', trigger: 'blur' }
        ],
      },
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
      window.open(mark.target);
    },
    async addMark() {
      try {
        await this.$refs.ADD_MARK_FORM.validate();
      } catch (error) {
        return this.$notify.error({
          title: '错误',
          message: '字段不能为空',
        });
      }

      let result;
      try {
        result = await this.$store.dispatch('ACTION_ADD_MARK', { ...this.form });
      } catch (error) {
        return this.$notify.error({
          title: '错误',
          message: '新建标签失败',
        });
      }

      console.log(result);
      this.card.marks.push(result);
      this.$notify.success({
        title: '成功',
        message: '新建标签成功',
      });

      this.isShowAddMark = false;
      this.resetFields();
    },
    resetFields() {
      this.$refs.ADD_MARK_FORM.resetFields();
    },
  },
  mounted() {
    this.form = {
      card: this.card.objectId,
    };
  }
};
</script>


<style lang="scss" scoped>
 .text {
    font-size: 14px;
  }

  .favicon {
    width: 14px;
    height: 14px;
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
