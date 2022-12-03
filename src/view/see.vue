<template>
    <div>
      <van-nav-bar safe-area-inset-top />
      <van-search v-model="value" placeholder="请输入搜索关键词" input-align="center"/>
      <van-tabs v-model="active">
          <van-tab to="/" title="推荐"/>
          <van-tab to="/see" title="发现"/>
      </van-tabs>
      <van-row class="cards" >
          <van-cell-group  class="box" v-for="(user,i) in list" >
            <van-cell >
              <template #title>
                <van-row type="flex" align="center" class="creator" span="14">
                 <van-col span="3" class="left">
                  <van-image
                      round
                      width="30px"
                      height="30px"
                      src="https://img01.yzcdn.cn/vant/cat.jpeg"
                    />
                  </van-col>  
                  <van-col class="center">
                    <van-row>
                      <span class="author">闲人一枚</span>
                    </van-row>
                  </van-col>
                  <van-col class="right" offset="14">
                      <van-icon name="like-o"  color="#ee0a24" />
                      <span>99+</span>
                  </van-col>
                </van-row>
              </template>
            </van-cell>
            <van-cell >
              <template #extra>
                <span class="custom-title">单元格</span>

              </template>
            </van-cell>
          </van-cell-group>
      </van-row>
      <van-number-keyboard safe-area-inset-bottom />
    </div>
</template>

<script>
import Vue from 'vue';
import {Tab,Tabs,Search,CellGroup,Cell,Row,Col} from 'vant'
import { Button } from 'vant';
import { Image as VanImage } from 'vant';
import 'vant/es/tab/style';
import 'vant/es/tabs/style';
import 'vant/es/search/style';
import 'vant/es/col/style';
import 'vant/es/row/style';
import 'vant/es/cell-group/style';
import 'vant/es/cell/style';
import 'vant/es/image/style';
import 'vant/es/button/style';
export default {
  data() {
    return {
      active: 1,
      value: '',
      list:[
        {id:1,name:"zs1"},
      ]
    };
  },
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Search.name]: Search,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [Row.name]: Row,
    [Col.name]: Col,
    [VanImage.name]: VanImage,
    [Button.name]: Button,
  }
};
</script>

<style scoped>
body {
  background-color: #f7f8fa;
}
.text {
  color: red;
}
.cards {
  margin-top:16px;
}
.box {
  min-height:148px;
}
.creator .center,.left,.right{
  line-height:15px;
}
.author{
  font-size:14px;
  line-height:15px;
  color:#CECECE;
}
.place,.times{
  font-size:8px;
  line-height:8px;
  color:#CECECE;
}
.follow {
  width:10px;
  height:20px;
}
</style>
