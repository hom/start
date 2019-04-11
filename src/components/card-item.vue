<template>
  <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>{{ card.title }}</span>
    <el-button style="float: right; padding: 3px 0" type="text">添加</el-button>
  </div>
  <el-button @click="redirect(mark)" class="item-button" v-for="(mark, index) in card.marks" :key="index" round>
    <div class="favicon"><img :src="mark.favicon" alt=""></div>
    {{ mark.title }}
  </el-button>
  <!-- <a class="mark-link" v-for="(mark, index) in card.marks" :key="index" :href="mark.target">
    <div class="favicon"><img :src="mark.favicon" alt=""></div>
    {{ mark.title }}
  </a> -->
</el-card>
</template>

<script>
export default {
  data() {
    return {
      items: Math.floor(Math.random() * 10),
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
</style>
