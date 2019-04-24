<template>
<el-card class="box-card" ref="EL_CARD">
  <div slot="header" class="clearfix">
    <span>{{ card.title }}</span>
    <!-- <el-button style="float: right; padding: 3px 0" type="text" @click="isShowAddDialog = true">添加</el-button> -->
    <el-dropdown style="float: right" trigger="click" @command="handleCommand">
      <span class="el-dropdown-link">
        编辑<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-plus" command="ADD_MARK">添加</el-dropdown-item>
        <el-dropdown-item icon="el-icon-edit-outline" command="EDIT_MARK">编辑</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
  <el-button @click="redirect(mark)" class="item-button" v-for="(mark, index) in card.marks" :key="index" round>
    <div class="favicon"><img :src="mark.favicon" alt=""></div>
    {{ mark.title }}
  </el-button>

  <!-- add mark dialog -->
  <el-dialog title="添加标签" :visible.sync="isShowAddDialog" @close="resetFields">
    <el-form :model="form" :rules="rules" ref="ADD_MARK_FORM" :label-width="formLabelWidth">
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="图标名称" prop="name">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="图标链接" prop="url">
        <el-input v-model="form.url" autocomplete="off"></el-input>
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
      <el-button type="primary" @click="handleAddMark">确 定</el-button>
    </div>
  </el-dialog>

  <el-dialog ref="EDIT_MARK_DIALOG" :visible.sync="isShowEditDialog">
    <template v-slot:title>
      <el-input
        class="edit-card-title-input"
        :placeholder="card.title"
        suffix-icon="el-icon-edit"
        @blur="handleEditCardTitle"
        v-model="title">
      </el-input>
    </template>
    <el-tag
      class="edit-mark-tag"
      v-for="(mark, index) in card.marks"
      :key="index"
      type="danger"
      color="#FFFFFF"
      @close="handleDeleteMark(index, mark)"
      closable>
      <div class="favicon"><img :src="mark.favicon" alt=""></div>
      {{ mark.title }}
    </el-tag>
    <el-dialog
      title="修改"
      :visible.sync="innerVisible"
      append-to-body>
    </el-dialog>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="isShowEditDialog = false">完 成</el-button>
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
      title: '',
      formLabelWidth: '120px',
      isShowAddDialog: false,
      isShowEditDialog: false,
      innerVisible: false,
      rules: {
        title: [
          { required: true, message: '请输入标签名称', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '图标名称不能为空', trigger: 'blur' }
        ],
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

    handleCommand(command) {
      if (command === 'ADD_MARK') {
        this.isShowAddDialog = true;
      }

      if (command === 'EDIT_MARK') {
        this.showEditDialog();
      }
    },

    showEditDialog() {
      const $card = this.$refs.EL_CARD;
      const dialog = this.$refs.EDIT_MARK_DIALOG.$el.getElementsByClassName('el-dialog')[0];
      const position = $card.$el.getBoundingClientRect();
      dialog.style.width = `${position.width}px`;
      dialog.style.marginTop = `${position.top}px`;
      dialog.style.marginLeft = `${position.left}px`;
      this.isShowEditDialog = true;
    },

    async handleDeleteMark(index, mark) {
      try {
        await this.$confirm('此操作将永久删除该标记, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
      } catch (error) {
        this.$message(`取消删除${mark.title}`);
      }

      try {
        await this.$store.dispatch('ACTION_DELETE_MARK', { ...mark });
      } catch (error) {
        return this.$notify.error({
          title: '错误',
          message: `删除${mark.title}失败`,
        });
      }

      this.card.marks.splice(index, 1);
      this.$notify.success({
        title: '成功',
        message: `删除${mark.title}成功`,
      });
    },

    async handleAddMark() {
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

      this.isShowAddDialog = false;
      this.resetFields();
    },

    async handleEditCardTitle() {
      if (!this.title || this.title === this.card.title) {
        this.title = '';
        return;
      }
      console.log(this.title);

      try {
        await this.$store.dispatch('ACTION_EDIT_CARD', { objectId: this.card.objectId, title: this.title });
      } catch (error) {
        return this.$notify.error({
          title: '错误',
          message: '更改标题失败',
        });
      }

      this.card.title = this.title;
      this.$notify.success({
        title: '成功',
        message: '更改标题成功',
      });
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

  .clearfix {
    margin-top: -5px;
    margin-bottom: -5px;
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

  .el-dropdown-link:hover {
    cursor: pointer;
  }

  .edit-card-title-input {
    width: 30%;
  }

  .el-button {
    position: relative;
  }

  .edit-mark-tag {
    margin-bottom: 5px;
    margin-left: 5px;
    .favicon {
      line-height: 14px;
      vertical-align: text-top;
    }
  }
</style>
