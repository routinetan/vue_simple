<template>
    <div>
      <van-nav-bar safe-area-inset-top />
      <van-search v-model="value" placeholder="请输入搜索关键词" input-align="center"/>
      <van-tabs v-model="active">
          <van-tab to="/" title="推荐"/>
          <van-tab to="/see" title="发现"/>
      </van-tabs>
      <van-row class="boxs"  type="flex" justify="center">
         <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            oading-text= "加载中...."
            @load="onLoad"
          >
        <van-row class="news-box van-clearfix" type="flex" justify="space-around" >
        
            <ul class="left" ref="leftWaterfall" >
              <li class="newsletter" v-for="(item,i) in leftItems" >
                      <van-col class="newsletter-item" >
                          <van-row type="flex" justify="center" >
                              <van-col class="thumb">
                              <van-image
                                    width="175"
                                    :height="item.height"
                                    :src="item.thumb_url"
                                    @click="preview($event,item)"
                               />
                              </van-col>
                              <van-col class="label" > {{item.title}}</van-col>
                          </van-row>
                      </van-col>
              </li>
            </ul>
            <ul class="right" ref="rightWaterfall" >
              <li class="newsletter" v-for="(item,i) in rightItems" >
                      <van-col class="newsletter-item" >
                          <van-row type="flex" justify="center"  >
                              <van-col class="thumb">
                              <van-image
                                    width="175"
                                    :height="item.height"
                                    :src="item.thumb_url"
                                    @click="preview($event,item)"
                               />
                              </van-col>
                              <van-col class="label"  >{{item.title}}</van-col>
                          </van-row>
                      </van-col>
              </li>
            </ul>
        </van-row>
        </van-list>
      </van-row>
      <router-view></router-view>  
      <van-number-keyboard safe-area-inset-bottom />
    </div>
</template>

<script>
import Vue from 'vue';
import {Tab,Tabs,Search,CellGroup,Cell,Row,Col} from 'vant';
import { List } from 'vant';
import { Button } from 'vant';
import { Image as VanImage } from 'vant';
import { ImagePreview } from 'vant';
import lodashCloneDeep from 'lodash.clonedeep'

import 'vant/es/tab/style';
import 'vant/es/tabs/style';
import 'vant/es/search/style';
import 'vant/es/col/style';
import 'vant/es/row/style';
import 'vant/es/cell-group/style';
import 'vant/es/cell/style';
import 'vant/es/image/style';
import 'vant/es/button/style';
import 'vant/es/list/style';
import 'vant/es/image-preview/style';
export default {
  data() {
    return {
      loading: false,
      list: [],
      leftItems: [],
      rightItems: [],
      imgCardListS: [],
      waterfallFlage: false,
      waterfalNum: 0,
      imgCardList:[],
      num:8
    };
  },
  mounted() {
    this.Request({
      url:'/tube/pull',
      method:"GET",

    }).then(response => {
        var tube = response.data.data
        for(var i in tube) {
              this.imgCardList.push(tube[i])
        }
        this.updateWaterfall()
        this.loading = false;
        // 数据全部加载完成
        if (response.data.rows = 0) {
          this.finished = true;
        }
    })
  },
  methods:{
    onLoad() {
        this.Request({
        url:'/tube/pull',
        method:"GET",
        params:{"num":this.num},
      }).then(response => {
          var tube = response.data.data
          for(var i in tube) {
              this.imgCardList.push(tube[i])
          }
          this.updateWaterfall()
          this.num = this.num+8
          this.loading = false;
          // 数据全部加载完成
          if (response.data.row = 0) {
            this.finished = true;
          }
      })
    },
    updateWaterfall () {
      const leftHeight = this.$refs.leftWaterfall.clientHeight
      const rightHeight = this.$refs.rightWaterfall.clientHeight
      if (this.waterfalNum !== this.imgCardList.length) {
        this.waterfallFlage = false
      }
      if (!this.waterfallFlage) {
        this.waterfallFlage = true
        if (this.imgCardList.length !== 0) {
          this.imgCardListS =lodashCloneDeep(this.imgCardList)
          this.imgCardListS.splice(0, this.waterfalNum)
          this.waterfalNum = this.imgCardList.length
        } else {
          this.imgCardListS = lodashCloneDeep(this.imgCardList)
          this.waterfalNum = this.imgCardList.length
        }
      }
      let len = this.imgCardListS.length
      const item = this.imgCardListS.shift()
      if (item == null) {
        return
      }
      if (leftHeight == rightHeight) {
         if((len%2)==0) {
            this.leftItems.push(item)
         } else {
           this.rightItems.push(item)
         }
      } else {
        if (leftHeight < rightHeight) {
          this.leftItems.push(item)
        } else {
          this.rightItems.push(item)
        }
      }
      this.$nextTick(() => {
        this.updateWaterfall()
      })
    },
    preview (event,item) {
      ImagePreview({images:[item.thumb_url],minZoom:1});
    }
    
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

<style scoped >
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
.box{
  width:375px;
}
.news-box{
  margin-top:6px;
  width:365px;
}
.news-box .left,.right{
 width:175px;
} 
.newsletter {
  width:175px;
  margin-top:10px;
  background-color:#fff;
  overflow:hidden;
  border-radius:10px;
  border-style:solid;
  border-color:#fff;
}
.newsletter-item{
  background-color:#fff;
}
.newsletter-item .label {
  align:center;
  margin:8px 10px;
  font-size:14px;
  color:
}
.newsletter-item .thumb {
  background-color:#fff;
}
</style>
