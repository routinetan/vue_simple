<template>
    <div>
      <router-view></router-view>
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
import axios from 'axios'
export default {
  data() {
    return {
      active: 2,
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

<style >
body {
  background-color: #f7f8fa;
}
.text {
  color: red;
}
.cards {
}
.box {
  margin-top:10px;
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
  width:50px;
  height:20px;
}
</style>
