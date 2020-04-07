<template>
  <div class="ratings">
      <div class="ratings-content">
          <div class="overview">
              <div class="overview-left">
                  <h1 class="score">{{seller.score}}</h1>
                  <div class="title">综合评分</div>
                  <div class="rank">高于周边商家{{seller.rankRate}}%</div>
              </div>
              <div class="overview-right">
                  <div class="score-wrapper">
                      <span class="title">服务态度</span>
                      <star :size="36" :score="seller.serviceFood"></star>
                      <span class="score">{{seller.serviceFood}}</span>
                  </div>
                  <div class="score-wrapper">
                      <span class="title">商品评价</span>
                      <star :size="36" :score="seller.foodScore"></star>
                      <span class="score">{{seller.foodScore}}</span>
                  </div>
                  <div class="delivery-wrapper">
                    <span class="title">送达时间</span>
                    <span class="delivery">{{seller.deliveryTime}}</span>
                  </div>
              </div>
          </div>
          <split></split>
          <!--:selectType="selectType" :onlyContent="onlyContent"-->
          <ratingselect :ratings="ratings"  :selectType="selectType" :onlyContent="onlyContent" @select="onSelect" @toggle="onToggle"></ratingselect>
          <div class="rating-wrapper" v-show="computedRatings.length">
              <ul>
                  <li class="rating-item border-bottom-1px" v-for="(item, index) in computedRatings">
                      <div class="avatar">
                        <img :src="item.avatar" width="28" height="28">
                      </div>
                  </li>
              </ul>
          </div>
      </div>
  </div>
</template>

<script>
  import Star from "../star";
  import split from "../split/split";
  import ratingselect from "../ratingselect/ratingselect";
  import ratingMixin from '../../common/mixins/ratings'
  import {getGoods} from "../../model/api";
    export default {
        name: "ratings",
        mixins: [ratingMixin],
        data() {
            return {
              ratings: []
            }
        },
        props: {
            seller: {
                type: Object,
                default() {
                  return {}
                }
            }
        },
        computed: {},
        methods: {
          async getGoods() {
            try {
              // 防止在点击tab切换的时候返回重新请求数据(只请求一次就行)
              if (!this.fetched) {
                this.fetched = true
                let res = await getGoods({
                  id: this.seller.id
                })
                if (res.errno === 0) {
                  this.goods = res.data
                }
              }
            } catch (error) {

            }
          }
        },
        components: {
          Star,
          split,
          ratingselect
        }
    }
</script>

<style scoped type="text/stylus" lang="stylus">
  @import '../../common/styl/mlxin.styl';
  @import '../../common/styl/variable.styl';

  .ratings
      position: relative;
      text-align: left;
      white-space: normal;
      height: 100%;

      .ratings-content

          .overview
              display flex;
              padding: 18px 0;
              .overview-left {
                flex: 0 0 137px;
                padding: 6px 0;
                width: 137px;
                border-right: 1px solid $color-col-line;
                text-align: center;

                //@media only screen and (max-width: 320px) {
                //  flex: 0 0 120px;
                //  width: 120px;
                //}

                  .score {
                    margin-bottom: 6px;
                    line-height: 28px;
                    font-size: $fontsize-large-xxx;
                    color: $color-orange;
                  }

                  .title {
                    margin-bottom: 8px;
                    line-height: 12px;
                    font-size: $fontsize-small;
                    color: $color-dark-grey;
                  }

                  .rank {
                    line-height: 10px;
                    font-size: $fontsize-small-s;
                    color: $color-light-grey;
                  }
              }


            .overview-right {
              flex: 1;
              padding: 6px 0 6px 24px;

              //<!--@media only screen and (max-width: 320px) {-->
              //<!--  padding-left: 6px;-->
              //<!--}-->

              .score-wrapper {
                display: flex;
                align-items: center;
                margin-bottom: 8px;

                .title {
                  line-height: 18px;
                  font-size: $fontsize-small;
                  color: $color-dark-grey;
                }

                .star {
                  margin: 0 12px;
                }

                .score {
                  line-height: 18px;
                  font-size: $fontsize-small;
                  color: $color-orange;
                }
              }

              .delivery-wrapper {
                display: flex;
                align-items: center;

                .title {
                  line-height: 18px;
                  font-size: $fontsize-small;
                  color: $color-dark-grey;
                }

                .delivery {
                  margin-left: 12px;
                  font-size: $fontsize-small;
                  color: $color-light-grey;
                }
              }
            }

</style>
