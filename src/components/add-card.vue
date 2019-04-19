<template>
  <section class="add-card">
    <el-button class="add-button" plain @click="isShowAddCard = true"><i class="el-icon-plus"></i></el-button>
    <el-dialog title="添加面板" :visible.sync="isShowAddCard" @close="resetFields">
      <el-form :model="form" :rules="rules" ref="ADD_CARD_FORM" :label-width="formLabelWidth">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" autofocus autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetFields">重 置</el-button>
        <el-button type="primary" @click="addCard">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isShowAddCard: false,
      form: {},
      formLabelWidth: '120px',
      rules: {
        title: [
          { required: true, message: '请输入标签名称', trigger: 'blur' }
        ],
      },
    };
  },
  methods: {
    async addCard() {
      try {
        await this.$refs.ADD_CARD_FORM.validate();
      } catch (error) {
        return this.$notify.error({
          title: '错误',
          message: '字段不能为空',
        });
      }

      let result;
      try {
        result = await this.$store.dispatch('ACTION_ADD_CARD', { ...this.form });
      } catch (error) {
        return this.$notify.error({
          title: '错误',
          message: '新建面板失败',
        });
      }

      console.log(result);
      this.$notify.success({
        title: '成功',
        message: '新建面板成功',
      });

      this.isShowAddCard = false;
    },
    resetFields() {
      console.log('reset fields');
      this.$refs.ADD_CARD_FORM.resetFields();
    },
  }
}
</script>

<style lang="scss" scoped>
.add-card {
  width: 100%;
  justify-self: center;
  align-self: center;
  text-align: center;
}
.add-button {
  font-size: 32px;
  // border: none;
  display: inline-block;
  &:hover {
    transform: rotate(0.5turn);
  }
}
</style>
