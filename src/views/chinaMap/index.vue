<!--
 * @version:
 * @Author: LHF
 * @Date: 2021-05-22 10:03:58
 * @LastEditors: LHF
 * @LastEditTime: 2021-05-31 15:19:34
-->
<template>
  <div>
    <div style="display: flex">
      <div v-for="(item, index) in mapList" :key="index" class="nihaox" style="color:#fff;z-index: 1;position: relative;" @click="cityMapXs(item)">
        <div class="tdsx">{{ item.name }}></div>
      </div>
    </div>
    <div class="map-wrap">
      <div class="logo"></div>
      <div class="time">
        <div class="tt">{{ hms }}</div>
        <div class="day">
          <div class="rz">{{ MM.indexOf('0') === -1 ? MM : MM.slice(1, 2) }}月{{ DD }}日</div>
          <div class="year">{{ year || '2021' }}</div>
        </div>
        <div class="city">{{ cityName || '浙江' }}</div>
      </div>
      <!-- <div style="width: 1000px;height:1000px"> -->
      <div id="city" :style="{ transform: `scale(${Style().scale})`, top: Style().top + 'rem' }" :class="[mapShow ? 'showMap' : 'showMapNot']"></div>
      <!-- </div> -->
      <div class="citywraper">
        <div class="cityName">{{ cityName || '浙江' }}</div>
        <div class="quyu">
          <img :src="imagesURL" alt="" class="imgPosition" @click="showProvince" />
          <div class="Dot"></div>
          <div class="xian1 xian1Animation"></div>
          <div class="xian2 xian2Animation"></div>
          <div class="xian3 xian3Animation"></div>
          <div class="xian4 xian4Animation"></div>
        </div>
      </div>
      <div class="tableWrap">
        <!-- 表1 -->
        <div class="pie-box">
          <div class="header-tab">
            <!-- <div :class="{ topstyle: isShow }" class="top " @click="changeHeightL">会员数</div>
          <div class="top" :class="{ topstyle: isShow }">订单数</div>
          <div class="top">订单额</div>
          <div class="top">收益</div> -->
            <div
              v-for="(item, index) in piedata1"
              :key="index"
              :class="{ topstyle: isHighlight1 === index }"
              class="top"
              @click="changeHighlight1(index)"
            >
              {{ item.name }}
            </div>
          </div>
          <!-- 饼状图 -->
          <div class="circle-bg">
            <div ref="pie1" class="circle"></div>
          </div>
          <div class="pie-bg2">总数</div>
          <div class="pie-bg3">6,827,100,815</div>
        </div>
        <!-- 表2 -->
        <div class="pie-box2">
          <div class="header-tab">
            <div
              v-for="(item, index) in piedata2"
              :key="index"
              :class="{ topstyle: isHighlight2 === index }"
              class="top"
              @click="changeHighlight2(index)"
            >
              {{ item.name }}
            </div>
          </div>
          <div class="circle-bg">
            <div ref="pie2" class="circle2"></div>
          </div>
        </div>
        <!-- 表3 -->
        <div class="histogram-week">
          <div class="header-tab">
            <div
              v-for="(item, index) in bardata"
              :key="index"
              :class="{ topstyle: isHighlight3 === index }"
              class="top"
              @click="changeHighlight3(index)"
            >
              {{ item.name }}
            </div>
          </div>
          <div class="histogram-bg">
            <div ref="bar" class="histogram"></div>
          </div>
        </div>
        <!-- VIP -->
        <div class="vip-box">
          <div class="o-yuan"></div>
          <div class="c-yuan"></div>
          <div class="n-yuan"></div>
          <!--图标-->
          <div class="tb-logo">
            <img src="../../assets/images/people.png" alt="" />
          </div>
          <!--线条-->
          <img src="../../assets/images/position-tiao.png" alt="" class="cz-png " />

          <img src="../../assets/images/xian.png" alt="" class="p-xian " />

          <!--会员数-->
          <div id="vip" class="vip-number">6,827,100,815</div>

          <div class="vip-tit">
            <p class="p1">会员数</p>
            <p>Members</p>
          </div>
        </div>
        <!--消费订单-->
        <div class="consume-box">
          <!--三圆动画-->
          <div class="o-yuan"></div>
          <div class="c-yuan"></div>
          <div class="n-yuan"></div>
          <!--图标-->
          <div class="tb-logo">
            <img src="../../assets/images/shop.png" alt="" />
          </div>
          <!--线条-->
          <img src="../../assets/images/position-tiao.png" alt="" class="cz-png" />

          <img src="../../assets/images/xian.png" alt="" class="p-xian" />

          <!--会员数-->
          <div id="consume-box" class="vip-number"></div>

          <div class="vip-tit">
            <p class="p1">消费订单</p>
            <p>Consumer orders</p>
          </div>
        </div>
        <!--订单交易额-->
        <div class="Order-volume">
          <!--三圆动画-->
          <div class="bo-yuan"></div>
          <div class="bc-yuan"></div>
          <div class="bn-yuan">
            <div class="quchu"></div>
          </div>
          <!--图标-->
          <div class="tb-logo">
            <img src="../../assets/images/money.png" alt="" />
          </div>
          <!--线条-->
          <img src="../../assets/images/position-tiao-b.png" alt="" class="cz-png" />

          <img src="../../assets/images/xian-b.png" alt="" class="p-xian" />

          <!--会员数-->
          <div id="Order-volume" class="vip-number">4,387,662</div>

          <div class="vip-tit">
            <p class="p1">订单交易额</p>
            <p>Order volume</p>
          </div>
        </div>
        <!--地区收益-->
        <div class="region-box">
          <!--三圆动画-->
          <div class="bo-yuan"></div>
          <div class="bc-yuan"></div>
          <div class="bn-yuan"></div>
          <!--图标-->
          <div class="tb-logo">
            <img src="../../assets/images/purse.png" alt="" />
          </div>
          <!--线条-->
          <img src="../../assets/images/position-tiao-b.png" alt="" class="cz-png" />

          <img src="../../assets/images/xian-b.png" alt="" class="p-xian" />

          <!--会员数-->
          <div id="region" class="vip-number">14,587,348</div>

          <div class="vip-tit">
            <p class="p1">地区收益</p>
            <p>Our income</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import MapCofig from '../../utils/Maputils';
import '../../assets/js/jquery.min.js';
import '../../assets/js/circle-progress';
import '../../assets/js/wy_rem';
// import axios from 'axios';
import imagesURL from '../../assets/images/province1.png';
import guangdong from '../../assets/images/guangdong.png';
let that;
// var extendOptions;
let activeInstance = null; //记录你点击上层是啥 东西 方便操作
let prevActiveInstance = null;
export default {
  name: 'Nihao',
  data() {
    return {
      mapShow: false,
      FlyLine: false,
      Drilldown: false,
      imagesURL,
      piedata1: [
        {
          name: '会员',
        },
        {
          name: '订单',
        },
        {
          name: '订单额',
        },
        {
          name: '收益',
        },
      ],
      piedata2: [
        {
          name: '消费金额来源',
        },
        {
          name: '消费次数来源',
        },
      ],
      bardata: [
        {
          name: '会员数',
        },
        {
          name: '订单数',
        },
        {
          name: '订单额',
        },
        {
          name: '收益',
        },
      ],
      dom: null,
      timer: null,
      chake: false,
      NamexS: '',
      isxianshow: false,
      cityName: '',
      year: '',
      MM: '',
      DD: '',
      pack: '',
      hms: this.$moment().format('HH:mm:ss'),
      isHighlight1: 0,
      isHighlight2: 0,
      isHighlight3: 0,

      mapList: [
        {
          name: '全国',
          key: 'china',
        },
      ], //返回栏的默认
      cityCodeArr: [], //默认是那个参数进来
      geoJson: {
        //处理json返回的格式
        features: [],
      },
      cacheCode: 0, //缓存的key
      cachedCtors: {}, //存放的对象
      topSclaeConfig: {
        //对地图层级的 top 和 scale的 参数配置
        '1': {
          top: '-0.72',
          scale: '0.9',
        },
        '2': {
          top: '0.15',
          scale: '0.7',
        },
        '3': {
          top: '0.15',
          scale: '0.7',
        },
      },
      restoreActiveInstance: null,
    };
  },
  computed: {
    Style() {
      return () => {
        return this.topSclaeConfig[this.mapList.length];
      };
    },
  },
  created() {
    that = this;
    this.getTimer();
  },
  mounted() {
    that.restoreActiveInstance = that.setActiveInstance({
      name: '全国',
      key: 'china',
    });
    window.addEventListener('resize', this.res);
    // ////console.log
    //console.log(activeInstance, '初始化');
    //console.log(prevActiveInstance, '初始化');
    // restoreActiveInstance()
    // extendOptions = extendOptions || {};
    // that.cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    ////console.log(document.documentElement);
    this.timer = setInterval(() => {
      this.year = this.$moment().format('YYYY');
      this.MM = this.$moment().format('MM');
      this.DD = this.$moment().format('DD');
      this.hms = this.$moment().format('HH:mm:ss');
    }, 1000);
    this.demo();
    this.createMychart1();
    this.createMychart2();
    this.createMychart3();
    //////console.log(MapCofig,'配置')
    that.$nextTick(async () => {
      that.dom = document.getElementById('city');
      that.myChart = that.$echarts.init(that.dom);
      that.runMapOption('浙江省', 'china');
      that.myChart.on('click', async params => {
        this.params = params;
        this.cityName = params.name;
        if (that.mapList.length > 3) {
          this.FlyLine = false;
          return;
        }
        this.FlyLine = true;
        if (params.name === '广东省') {
          this.imagesURL = guangdong;
        }
        event.stopPropagation();
        //
        that.runMapOption(params.data.name, []);
        this.option1.series[0].data[0].name = this.cityName;

        //
        this.myChart1.setOption(this.option1);
        this.createMychart2();
        this.createMychart3();
      });
    });
  },
  methods: {
    // 召哥 弄的 time 5月27日 开始
    getTimer() {
      this.year = this.$moment().format('YYYY');
      this.MM = this.$moment().format('MM');
      this.DD = this.$moment().format('DD');
      this.hms = this.$moment().format('HH:mm:ss');
      // 表1配置
      this.option1 = {
        title: {
          text: '所占比例',
          top: '5%',
          left: 'left',
          textStyle: {
            fontSize: 15,
            fontWeight: 'bolder',
            color: '#f3c800',
          },
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          x: 'right',
          y: 'bottom',
          orient: 'vertical',
          textStyle: {
            fontWeight: 'bolder',
            color: '#fff',
          },
        },
        series: [
          {
            name: '会员数',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: true,
              position: 'outside',
              fontSize: 16,
              formatter: val => {
                // if (val.data.name === '该省') {
                //   return val.data.value / 100 + '%';
                // } else {
                //   return `${val.data.name}
                //           ${val.data.value / 100}%`;
                // }
                // ////console.log(val.data.value);
                return `${val.data.name}\r\n${val.data.value / 100}%`;
              },
            },
            itemStyle: {
              color: function(params) {
                //自定义颜色
                var colorList = ['#f3c800', '#00c6f7'];
                return colorList[params.dataIndex];
              },
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 2500, name: that.cityName || '浙江' },
              { value: 7500, name: '全国' },
            ],
            height: '100%',
          },
        ],
      };
      //表2配置
      this.option2 = {
        // 标题
        title: {
          text: '所占比例',
          top: '5%',
          left: 'left',
          textStyle: {
            fontSize: 15,
            fontWeight: 'bolder',
            color: '#f3c800',
          },
        },
        legend: {
          x: 'right',
          y: 'bottom',
          orient: 'vertical',
          textStyle: {
            fontWeight: 'bolder',
            color: '#fff',
          },
        },
        series: [
          {
            name: '消费金额来源',
            type: 'pie',
            avoidLabelOverlap: true,
            itemStyle: {
              color: function(params) {
                //自定义颜色
                var colorList = ['#f3c800', '#00c6f7', '#00ffde'];
                return colorList[params.dataIndex];
              },
            },
            label: {
              position: 'inside',
              formatter: val => {
                return `${val.data.value / 100}%`;
              },
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
            labelLine: {
              show: false,
            },
            //表格数据
            data: [
              { value: 2600, name: '本省去他省消费金额' },
              { value: 3800, name: '他省去本省消费金额' },
              { value: 3600, name: '本省消费金额' },
            ],
            height: '75%',
          },
        ],
      };
      //表3配置
      this.option3 = {
        //标题
        title: {
          text: '近期收益金额',
          top: '5%',
          left: 'left',
          textStyle: {
            fontSize: 15,
            fontWeight: 'bolder',
            color: '#f3c800',
          },
        },
        //自定义item项颜色
        itemStyle: {
          color: function(params) {
            //自定义颜色
            var colorList = ['#00c6f7', '#00c6f7', '#00c6f7', '#00c6f7', '#00c6f7', '#00c6f7', '#00c6f7'];
            return colorList[params.dataIndex];
          },
        },
        textStyle: {
          fontSize: 15,
          color: '#fff',
        },
        axisTick: {
          show: false,
        },
        grid: {
          color: '#fff',
        },
        xAxis: {
          type: 'category',
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],

          axisTick: {
            show: false,
          },
        },
        yAxis: {
          show: false,
          type: 'value',
          axisTick: {
            show: false,
          },
        },
        series: [
          {
            data: [80, 110, 90, 150, 290, 222, 430],
            type: 'bar',
          },
        ],
      };
    },
    showProvince() {
      this.Drilldown = true;
      if (this.FlyLine && this.Drilldown) {
        this.Drilldown = false;
        this.mapShow = true;
        setTimeout(() => {
          that.myChart.clear();
          that.mapList.push({ name: this.params.data.name, key: this.params.data.cityCode });
          that.setActiveInstance({ name: this.params.data.name, key: this.params.data.cityCode });
          that.mapShow = false;
          that.runMapOption(this.params.data.name, [this.params.data.cityCode]);
        }, 1800);
      }
    },
    demo() {
      //
      $('.o-yuan').circleProgress({
        value: 0.75,
        size: 90,
        startAngle: -15,
        fill: {
          gradient: ['#00ddf7'],
        },
      });
      $('.c-yuan').circleProgress({
        value: 1,
        size: 65,
        startAngle: -15,
        thickness: 3,
        fill: {
          gradient: ['#00ddf7'],
        },
      });
      $('.n-yuan').circleProgress({
        value: 1,
        size: 50,
        startAngle: -15,
        thickness: 5,
        fill: {
          gradient: ['#00ddf7'],
        },
      });
      $('.bo-yuan').circleProgress({
        //底部上来弧度95
        value: 0.75,
        size: 90,
        startAngle: -0.8,
        reverse: true,
        fill: {
          gradient: ['#00ddf7'],
        },
      });

      $('.bc-yuan').circleProgress({
        value: 1,
        size: 65,
        startAngle: -0.8,
        thickness: 3,
        reverse: true,
        fill: {
          gradient: ['#00ddf7'],
        },
      });

      $('.bn-yuan').circleProgress({
        value: 1,
        size: 50,
        startAngle: -0.8,
        thickness: 5,
        reverse: true,
        fill: {
          gradient: ['#00ddf7'],
        },
      });
    },
    changeHighlight1(index) {
      this.isHighlight1 = index;
      switch (index) {
        case 0:
          ////console.log('会员');

          this.createMychart1('会员');
          break;
        case 1:
          ////console.log('订单');

          this.createMychart1('订单');
          break;
        case 2:
          ////console.log('订单额');

          this.createMychart1('订单额');
          break;
        case 3:
          ////console.log('收益');

          this.createMychart1('收益');
          break;
      }
    },
    changeHighlight2(index) {
      this.isHighlight2 = index;
      switch (index) {
        case 0:
          ////console.log('消费金额来源');
          this.createMychart2('消费金额来源');
          break;
        case 1:
          ////console.log('消费次数来源');
          this.createMychart2('消费次数来源');
          break;
      }
    },
    changeHighlight3(index) {
      this.isHighlight3 = index;
      switch (index) {
        case 0:
          ////console.log('会员数');
          this.createMychart3('会员数');
          break;
        case 1:
          ////console.log('订单数');
          this.createMychart3('订单数');
          break;
        case 2:
          ////console.log('订单额');
          this.createMychart3('订单额');
          break;
        case 3:
          ////console.log('收益');
          this.createMychart3('收益');
          break;
      }
    },
    createMychart1(name) {
      //
      // let chartDom = this.$refs.pie1;
      this.$refs.pie1.setAttribute('_echarts_instance_', '');
      this.option1.series[0].name = name;
      this.myChart1 = this.$echarts.init(this.$refs.pie1);
      // ////console.log(chartDom, this.$refs.pie1);
      this.option1 && this.myChart1.setOption(this.option1, true);
    },
    createMychart2(name) {
      //
      // let chartDom = this.$refs.pie1;
      this.$refs.pie2.setAttribute('_echarts_instance_', '');
      // this.option1.series[0].name = name;
      this.option2.series[0].name = name;
      this.myChart2 = this.$echarts.init(this.$refs.pie2);
      // ////console.log(chartDom, this.$refs.pie1);
      this.option2 && this.myChart2.setOption(this.option2, true);
    },
    createMychart3(name) {
      //
      // let chartDom = this.$refs.pie1;
      this.$refs.bar.setAttribute('_echarts_instance_', '');
      this.myChart3 = this.$echarts.init(this.$refs.bar);
      // ////console.log(chartDom, this.$refs.pie1);
      this.option3 && this.myChart3.setOption(this.option3, true);
    },
    //结束 召哥 TIME 5/27

    //BY JY TIME 2021-5/27
    randomConfiguration(proviceName, nextArray, mapData, cityCode, geoCoordsMap) {
      let series = [];
      // ////console.log
      return new Promise((resolve, reject) => {
        [[proviceName, nextArray]].forEach(function(item, i) {
          series.push(
            {
              type: 'map',
              roam: false,
              label: {
                normal: {
                  show: false,
                  textStyle: {
                    color: '#1DE9B6',
                  },
                },
                emphasis: {
                  textStyle: {
                    color: 'rgb(183,185,14)',
                  },
                },
              },

              itemStyle: {
                normal: {
                  borderColor: '#0b4a67', //线的颜色
                  borderWidth: 2,
                  // 地图颜色
                  areaColor: '#051931',
                },
                emphasis: {
                  areaColor: 'rgb(46,229,206)',
                  shadowColor: 'rgb(12,25,50)',
                  borderWidth: 1.4,
                },
              },
              zoom: 1.1,
              map: cityCode,
              data: mapData,
            },
            {
              type: 'lines',
              // animation: false,
              animationEasing: 'cubicOut',
              zlevel: 1,
              effect: {
                show: true,
                period: 4, //箭头指向速度，值越小速度越快
                trailLength: 0.4, //特效尾迹长度[0,1]值越大，尾迹越长重
                symbol: 'arrow', //箭头图标
                symbolSize: 7, //图标大小
              },
              lineStyle: {
                normal: {
                  color: '#1DE9B6',
                  width: 1.5, //线条宽度
                  opacity: 0.5, //尾迹线条透明度
                  curveness: 0.3, //尾迹线条曲直度
                },
              },
              data: that.convertData(item[1], geoCoordsMap),
            },
            // {
            //   type: 'lines',
            //   zlevel: 2,
            //   effect: {
            //     show: true,
            //     period: 4, //箭头指向速度，值越小速度越快
            //     trailLength: 0.4, //特效尾迹长度[0,1]值越大，尾迹越长重
            //     symbol: 'arrow', //箭头图标
            //     symbolSize: 7, //图标大小
            //   },
            //   animation: false,
            //   lineStyle: {
            //     normal: {
            //       color: '#1DE9B6',
            //       width: 2, //线条宽度
            //       opacity: 0.1, //尾迹线条透明度
            //       curveness: 0.3, //尾迹线条曲直度
            //     },
            //   },
            //   data: that.convertData(item[1], geoCoordsMap),
            // },
            {
              type: 'effectScatter',
              coordinateSystem: 'geo',
              showEffectOn: 'render',
              zlevel: 1,
              rippleEffect: {
                period: 15,
                scale: 2,
                brushType: 'fill',
              },
              hoverAnimation: true,
              label: {
                normal: {
                  formatter: '{b}',
                  position: 'center',
                  offset: [10, 10],
                  color: '#47ccd4',
                  show: true,
                },
              },
              itemStyle: {
                normal: {
                  color: '#1DE9B6',
                  shadowBlur: 5,
                  shadowColor: '#333',
                },
              },
              symbolSize: 12,
              data: item[1].map(function(dataItem) {
                //
                return {
                  name: dataItem[1].name,
                  itemStyle: { color: dataItem[1].lineStyle },
                  value: geoCoordsMap[dataItem[1].name].concat([dataItem[1].value]),
                };
              }),
            }
          );
        });
        resolve(series);
      });
    },
    async startIonMap(proviceName, cityCodeArr) {
      let cityCode;
      let MapData = {};
      MapData.data = [];
      let arr;
      if (cityCodeArr && cityCodeArr.length !== 0 && Array.isArray(cityCodeArr)) {
        if (cityCodeArr.length === 1) {
          cityCode = cityCodeArr[0].toString();
          arr = require(`../../../static/public/map/download/${cityCode}.json`);
        }
      } else if (activeInstance.key === 'china') {
        cityCode = 'china';
        arr = require('../../../static/public/map/china.json');
      } else {
        cityCode = activeInstance.key.toString();
        arr = require(`../../../static/public/map/download/${cityCode}.json`);
      }
      MapData.data = arr;
      if (activeInstance.name === proviceName) {
        let radnow = Math.round(Math.random() * arr.length - 1);
        const rowName = arr.filter((item, index) => index === radnow);
        proviceName = rowName[0].properties.name;
      }
      const { cityPick: shuzuN = [], geoCoordsMap: geoCoordsMaps = {} } = that.cityListCofig(proviceName, arr);

      if (MapData.data.length > 0) {
        that.geoJson.features = MapData.data;
      } else if (MapData.data.length === 0) {
        that.geoJson.features = that.geoJson.features.filter(item => item.properties.adcode == adcode);
        if (that.geoJson.features.length === 0) return;
      }

      const mapData = that.getMapData();
      //EBD
      that.$echarts.registerMap(cityCode, that.geoJson);
      const newSeres = await that.randomConfiguration(proviceName, shuzuN, mapData, cityCode, geoCoordsMaps);
      let option = {
        roam: false,
        geo: {
          map: cityCode,
          aspectScale: 0.75, //长宽比
          zoom: 1.1,
          roam: false,
          zlevel: 0,
          itemStyle: {
            normal: {
              opacity: '0.8',
              borderColor: 'borderColor',
              borderWidth: 3,
              shadowColor: 'borderColor',
              shadowOffsetX: 4,
              shadowOffsetY: 8,
            },
            emphasis: {
              areaColor: '#2AB8FF',
              borderWidth: 0,
              color: 'green',
              label: {
                show: false,
              },
            },
          },
          regions: [
            {
              name: '南海诸岛',
              itemStyle: {
                areaColor: 'rgba(0, 10, 52, 1)',

                borderColor: 'rgba(0, 10, 52, 1)',
                normal: {
                  opacity: 0,
                  label: {
                    show: false,
                    color: '#009cc9',
                  },
                },
              },
            },
          ],
        },
        series: newSeres,
      };
      return option;
    },
    convertData(data, geoCoordsMap) {
      var res = [];
      for (var i = 0; i < data.length; i++) {
        var dataItem = data[i];
        var fromCoord = geoCoordsMap[dataItem[0].name];
        var toCoord = geoCoordsMap[dataItem[1].name];
        var lineStyle = dataItem[1].lineStyle;
        if (fromCoord && toCoord) {
          res.push([
            { coord: fromCoord, lineStyle: { color: lineStyle } },
            { coord: toCoord, lineStyle: { color: lineStyle } },
          ]);
        }
      }
      return res;
    },
    getMapData() {
      //对应处理的返回的地图的号
      let mapData = this.geoJson.features.map(item => {
        return {
          name: item.properties.name,
          value: Math.random() * 1000,
          cityCode: item.properties.adcode,
        };
      });
      mapData = mapData.sort(function(a, b) {
        return b.value - a.value;
      });
      return mapData;
    },
    async cityMapXs(items) {
      //////console.log
      let NewArray = [];
      let MapArray = [];
      let zhixiao = '';
      that.mapList.find((item, index) => {
        NewArray.push(item);
        if (item.key === items.key) {
          zhixiao = items.key;
          return true;
        }
      });
      if (that.mapList.length === NewArray.length) {
        return false;
      }
      that.cityCodeArr.find((item, index) => {
        MapArray.push(item);
        if (items.key === 'china') {
          MapArray = [];
          return true;
        }
        if (item === items.key) {
          return true;
        }
      });
      that.cityCodeArr = MapArray;
      that.mapList = NewArray;
      // that.myChart.clear();
      let cityName;
      that.mapShow = true;
      setTimeout(() => {
        cityName = that.mapList[that.mapList.length - 1].name;
        that.pack = cityName === '全国' ? '' : cityName;
        let pick = { name: cityName, key: that.mapList[that.mapList.length - 1].key };
        that.setActiveInstance(pick)(pick);
        that.mapShow = false;
        that.runMapOption(cityName === '全国' ? '浙江省' : cityName, zhixiao === 'china' ? 'china' : [zhixiao]);
      }, 1800);
    },
    setActiveInstance(now, update = false) {
      if (update) {
        prevActiveInstance = now;
      } else {
        prevActiveInstance = activeInstance;
        activeInstance = now;
      }
      return key => {
        if (key) {
          prevActiveInstance = key;
        }
        activeInstance = prevActiveInstance;
      };
    },
    async runMapOption(cityName, cityCodeArr) {
      //跑配置
      // setTimeout(async () => {
      //
      if (that.myChart.getOption()) {
        //
        that.myChart.clear();
        //
      }
      // //console.log(that.myChart)
      //
      const MapOptions = await that.startIonMap(cityName, cityCodeArr);
      if (MapOptions && typeof MapOptions === 'object') {
        //
        // //console.log(that.myChart.getOption())
        //
        that.myChart.setOption(MapOptions, true);
        //console.log(that.myChart)
      }
      // }, 200);
    },
    cityListCofig(proviceName, nowCityArray) {
      let CityProvincesArray = []; //获取provincesText 116.4551,39.8539
      nowCityArray.map(item => {
        CityProvincesArray.push({ name: item.properties.name, center: item.properties.center });
      });
      let TextCtiy = CityProvincesArray.filter(item => item.name !== proviceName);
      let NowCtiy = CityProvincesArray.filter(item => item.name === proviceName);
      const cityPick = that.flyLineRandom(proviceName, TextCtiy, NowCtiy);
      const geoCoordsMap = that.geoCoordsMapRandom(cityPick);
      return { cityPick, geoCoordsMap };
    },
    flyLineRandom(proviceName, nowCityArray, NowCtiy) {
      let shuzu = []; //飞线到要的位置
      let shuzuN = [];
      let color = ['#52b9c7', '#5abead', '#f34e2b', '#f56f1c', '#f56321'];
      let TextCtiy = nowCityArray;
      let provincesTextPush;
      let newMap = new Map();
      let indexList = -1;
      while (++indexList < TextCtiy.length) {
        let random = Math.floor(Math.random() * TextCtiy.length).toString();
        if (newMap.get(random)) {
          --indexList;
        } else {
          newMap.set(random, random);
        }
      }
      provincesTextPush = Array.from([...newMap.values()]);
      //console.log(provincesTextPush, 'xxx');
      for (let index = 0; index < 4; index++) {
        shuzu.push(
          { name: proviceName },
          {
            name: TextCtiy[provincesTextPush[index]].name,
            value: 8,
            lineStyle: color[index],
            center: TextCtiy[provincesTextPush[index]].center,
          }
        );
        if (shuzu.length == 2) {
          let pick = [];
          while (shuzu.length) {
            let max = shuzu.shift();
            pick.push(max);
          }
          shuzuN.push(pick);
        }
      }
      //
      shuzu.push(
        { name: NowCtiy[0].name },
        {
          name: NowCtiy[0].name,
          value: 8,
          lineStyle: '#5abead',
          center: NowCtiy[0].center,
        }
      );
      shuzuN.push(shuzu);

      return shuzuN;
    },
    geoCoordsMapRandom(cityPick) {
      let map = {};
      for (const key in cityPick) {
        map[cityPick[key][1].name] = cityPick[key][1].center;
      }
      return map;
    },
    //END JY TIME 2021-5/27
  },
};
</script>
<style lang="less" scoped>
.nihaox {
  .tdsx {
    margin: 140px 0 0 10px;
    font-size: 25px;
    color: #26cfff;
  }
}
@keyframes xian1 {
  from {
    width: 0;
    left: 1.6rem;
    top: 1.13rem;
    transform: rotate(-50deg);
    opacity: 0;
  }
}
@keyframes xian2 {
  from {
    width: 0;
    left: 1.62rem;
    top: 1.07rem;
    transform: rotate(-75deg);
    opacity: 0;
  }
}
@keyframes xian3 {
  from {
    width: 0;
    left: 151px;
    top: 121px;
    transform: rotate(-35deg);
    opacity: 0;
  }
}
@keyframes xian4 {
  from {
    width: 0;
    left: 155px;
    top: 125px;
    transform: rotate(-62deg);
    opacity: 0;
  }
}
.xian1Animation {
  animation: xian1 1s linear 0s 1;
}
.xian2Animation {
  animation: xian2 1s linear 0s 1;
}
.xian3Animation {
  animation: xian3 1s linear 0s 1;
}
.xian4Animation {
  animation: xian4 1s linear 0s 1;
}
.tob {
  margin-top: 3.62rem;
}
.map-wrap {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background-image: url('../../assets/images/map-bg.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .tableWrap {
    position: relative;
    top: -0.9rem;
    right: 0.55rem;
    display: flex;
    flex-direction: column;
    .pie-box {
      z-index: 16;
      width: 2.8rem;
      height: 3.42rem;
      position: absolute;
      top: 0;
      right: 0;
      border: 0.01rem solid #002c46;
      .header-tab {
        width: 100%;
        display: flex;

        .top {
          font-size: 0.16rem;
          text-align: center;
          flex: 1;
          color: #004758;
          height: 0.3rem;
          line-height: 0.3rem;
          border-right: 0.01rem solid #002c46;
          box-sizing: border-box;
          font-weight: bold;
          cursor: pointer;
          z-index: 666;
        }
        .topstyle {
          border: 0.01rem solid #00b5e3;
          color: #00b5e3;
          border-bottom: none;
          background-size: 100% 100%;
          background-image: url('../../assets/images/map-pie-top.png');
        }
      }
      .circle-bg {
        width: 2.78rem;
        height: 2.35rem;
        // background-color: pink;
        border: 0.01rem solid #00b5e3;
        background-size: 100% 100%;
        background-image: url('../../assets/images/map-piebg.png');
        box-sizing: border-box;
        .circle {
          z-index: 999;
          width: 278px;
          height: 235px;
        }
      }
      .pie-bg2 {
        height: 0.25rem;
        line-height: 0.25rem;
        width: 100%;
        background-size: 100% 100%;
        background-image: url('../../assets/images/map-piebg2.png');
        box-sizing: border-box;
        font-size: 0.14rem;
        color: #f3c800;
        padding-left: 0.1rem;
        border: 0.01rem solid #00b5e3;
      }
      .pie-bg3 {
        height: 0.5rem;
        line-height: 0.5rem;
        width: 100%;
        background-size: 100% 100%;
        background-image: url('../../assets/images/map-piebg3.png');
        box-sizing: border-box;
        font-size: 0.18rem;
        color: #f3c800;
        border: 0.01rem solid #00b5e3;
        text-align: center;
      }
    }
    .pie-box2 {
      z-index: 16;
      margin-top: 3.55rem;
      width: 2.8rem;
      height: 2.82rem;
      position: absolute;
      top: 0;
      right: 0;
      border: 0.01rem solid #002c46;
      .header-tab {
        width: 100%;
        display: flex;
        .top {
          font-size: 0.18rem;
          text-align: center;
          flex: 1;
          color: #004758;
          height: 0.3rem;
          line-height: 0.3rem;
          border-right: 0.01rem solid #002c46;
          box-sizing: border-box;
          font-weight: bold;
          z-index: 666;
          cursor: pointer;
        }
        .topstyle {
          border: 0.01rem solid #00b5e3;
          color: #00b5e3;
          border-bottom: none;
          background-size: 100% 100%;
          background-image: url('../../assets/images/map-pie-top.png');
        }
      }
      .circle-bg {
        z-index: 998;
        width: 100%;
        height: 2.5rem;
        border: 0.01rem solid #00b5e3;
        background-size: 100% 100%;
        background-image: url('../../assets/images/map-piebg.png');
        box-sizing: border-box;
        .circle2 {
          z-index: 999;
          width: 278px;
          height: 250px;
        }
      }
    }
    .histogram-week {
      z-index: 16;
      margin-top: 6.55rem;
      width: 2.8rem;
      height: 2.3rem;
      position: absolute;
      top: 0;
      right: 0;
      border: 0.01rem solid #002c46;
      .header-tab {
        width: 100%;
        display: flex;
        cursor: pointer;
        z-index: 666;
        .top {
          font-size: 0.16rem;
          text-align: center;
          flex: 1;
          color: #004758;
          height: 0.4rem;
          line-height: 0.4rem;
          border-right: 0.01rem solid #002c46;
          box-sizing: border-box;
          font-weight: bold;
        }
        .topstyle {
          border: 0.01rem solid #00b5e3;
          color: #00b5e3;
          border-bottom: none;
          background-size: 100% 100%;
          background-image: url('../../assets/images/map-pie-top.png');
        }
      }
      .histogram-bg {
        width: 100%;
        height: 1.97rem;
        border: 0.01rem solid #00b5e3;
        background-size: 100% 100%;
        background-image: url('../../assets/images/map-piebg.png');
        box-sizing: border-box;
        .histogram {
          width: 278px;
          height: 197px;
        }
      }
    }
    // 会员数
    .vip-box {
      z-index: 16;
      width: 3.5rem;
      height: 0.65rem;
      /*background: red;*/
      top: 2.15rem;
      left: 12rem;
      position: absolute;
      // background-color: pink;
      .o-yuan {
        // position: absolute;
        // background-color: transparent;
        // border: 5px solid #00ddf7;
        // width: 50px;
        // height: 50px;
        // border-radius: 50%;
        // right: -32px;
        // top: 8px;
        position: absolute;
        right: -0.48rem;
        top: -0.3rem;
      }
      .c-yuan {
        // position: absolute;
        // background-color: transparent;
        // border: 3px solid #00ddf7;
        // width: 65px;
        // height: 65px;
        // border-radius: 50%;
        // right: -39px;
        // top: 0px;
        position: absolute;
        right: -0.36rem;
        top: -0.42rem;
      }
      .n-yuan {
        // z-index: -2;
        // position: absolute;
        // background-color: transparent;
        // border: 6px solid #00ddf7;
        // width: 95px;
        // height: 95px;
        // border-radius: 50%;
        // right: -54px;
        // top: -16px;
        position: absolute;
        right: -0.29rem;
        top: -0.49rem;
        // .quchu {
        //   z-index: -1;
        //   position: absolute;
        //   top: 15px;
        //   left: -27px;
        //   width: 56px;
        //   height: 59px;
        //   background-color: #000b20;
        //   transform: rotate(-45deg);
        // }
      }
      .tb-logo {
        width: 0.26rem;
        height: 0.26rem;
        position: absolute;
        right: -0.18rem;
        top: 0.2rem;
        img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        /*background: red;*/
      }
      .cz-png {
        width: 1.2rem;
        height: 0.06rem;
        /*display: block;*/
        position: absolute;
        top: 0.04rem;
        right: 0.3rem;
        /*animation: vip-cz 1s linear 0s 1;*/
      }
      .p-xian {
        width: 2.8rem;
        height: 0.24rem;
        /*display: block;*/
        position: absolute;
        bottom: 0rem;
        right: 0.25rem;
        /*animation: vip-xian 1s linear 0s 1;*/
      }
      .vip-number {
        font-size: 0.19rem;
        color: #f3c800;
        position: absolute;
        font-weight: bold;
        top: -0.08rem;
        right: 1.55rem;
      }
      .vip-tit {
        position: absolute;
        top: 0.13rem;
        right: 1.33rem;
        p {
          font-size: 0.15rem;
          color: #007387;
          text-align: center;
        }
        .p1 {
          font-size: 0.15rem;
          color: #00ddf7;
          font-weight: bold;
        }
      }
    }
    // 消费订单
    .consume-box {
      z-index: 16;
      width: 3.5rem;
      height: 0.65rem;
      /*background: red;*/
      top: 1rem;
      left: 11rem;
      position: absolute;
      // background-color: pink;
      .o-yuan {
        // position: absolute;
        // background-color: transparent;
        // border: 5px solid #00ddf7;
        // width: 50px;
        // height: 50px;
        // border-radius: 50%;
        // right: -32px;
        // top: 8px;
        position: absolute;
        right: -0.48rem;
        top: -0.3rem;
      }
      .c-yuan {
        // position: absolute;
        // background-color: transparent;
        // border: 3px solid #00ddf7;
        // width: 65px;
        // height: 65px;
        // border-radius: 50%;
        // right: -39px;
        // top: 0px;
        position: absolute;
        right: -0.36rem;
        top: -0.42rem;
      }
      .n-yuan {
        // z-index: -2;
        // position: absolute;
        // background-color: transparent;
        // border: 6px solid #00ddf7;
        // width: 95px;
        // height: 95px;
        // border-radius: 50%;
        // right: -54px;
        // top: -16px;
        position: absolute;
        right: -0.29rem;
        top: -0.49rem;
        // .quchu {
        //   z-index: -1;
        //   position: absolute;
        //   top: 15px;
        //   left: -27px;
        //   width: 56px;
        //   height: 59px;
        //   background-color: #000b20;
        //   transform: rotate(-45deg);
        // }
      }
      .tb-logo {
        width: 0.26rem;
        height: 0.26rem;
        position: absolute;
        right: -0.17rem;
        top: 0.2rem;
        img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        /*background: red;*/
      }
      .cz-png {
        width: 1.2rem;
        height: 0.06rem;
        /*display: block;*/
        position: absolute;
        top: 0.04rem;
        right: 0.3rem;
        /*animation: vip-cz 1s linear 0s 1;*/
      }
      .p-xian {
        width: 2.8rem;
        height: 0.24rem;
        /*display: block;*/
        position: absolute;
        bottom: 0rem;
        right: 0.25rem;
        /*animation: vip-xian 1s linear 0s 1;*/
      }
      .vip-number {
        font-size: 0.19rem;
        color: #f3c800;
        position: absolute;
        font-weight: bold;
        top: -0.08rem;
        right: 1.55rem;
      }
      .vip-tit {
        position: absolute;
        top: 0.13rem;
        right: 1.33rem;
        p {
          font-size: 0.15rem;
          color: #007387;
          text-align: center;
        }
        .p1 {
          font-size: 0.15rem;
          color: #00ddf7;
          font-weight: bold;
        }
      }
    }
    //订单交易额
    .Order-volume {
      z-index: 16;
      width: 3.5rem;
      height: 0.65rem;
      /*background: red;*/
      top: 7.2rem;
      left: 4rem;
      position: absolute;
      .bo-yuan {
        position: absolute;
        left: -0.31rem;
        top: -0.28rem;
      }
      .bc-yuan {
        position: absolute;
        left: -0.18rem;
        top: -0.39rem;
      }
      .bn-yuan {
        position: absolute;
        left: -0.1rem;
        top: -0.46rem;
      }
      .tb-logo {
        width: 0.26rem;
        height: 0.26rem;
        position: absolute;
        left: 0.02rem;
        top: 0.22rem;
        img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        /*background: red;*/
      }
      .cz-png {
        width: 1.2rem;
        height: 0.06rem;
        /*display: block;*/
        position: absolute;
        top: 0.04rem;
        right: 1.85rem;
        /*animation: vip-cz 1s linear 0s 1;*/
      }
      .p-xian {
        width: 2.8rem;
        height: 0.24rem;
        /*display: block;*/
        position: absolute;
        bottom: 0;
        right: 0.28rem;
        /*animation: vip-xian 1s linear 0s 1;*/
      }
      .vip-number {
        font-size: 0.19rem;
        color: #f3c800;
        position: absolute;
        font-weight: bold;
        top: -0.08rem;
        right: 0.8rem;
      }
      .vip-tit {
        position: absolute;
        top: 0.13rem;
        right: 1.03rem;
        p {
          font-size: 0.15rem;
          color: #007387;
          text-align: center;
        }
        .p1 {
          font-size: 0.15rem;
          color: #00ddf7;
          font-weight: bold;
        }
      }
    }
    // 地区收益
    .region-box {
      z-index: 16;
      width: 3.5rem;
      height: 0.65rem;
      /*background: red;*/
      top: 8.3rem;
      left: 6.1rem;
      position: absolute;
      .bo-yuan {
        position: absolute;
        left: -0.31rem;
        top: -0.28rem;
      }
      .bc-yuan {
        position: absolute;
        left: -0.18rem;
        top: -0.39rem;
      }
      .bn-yuan {
        position: absolute;
        left: -0.1rem;
        top: -0.46rem;
      }
      .tb-logo {
        width: 0.26rem;
        height: 0.26rem;
        position: absolute;
        left: 0.02rem;
        top: 0.22rem;
        img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        /*background: red;*/
      }
      .cz-png {
        width: 1.2rem;
        height: 0.06rem;
        /*display: block;*/
        position: absolute;
        top: 0.04rem;
        right: 1.85rem;
        /*animation: vip-cz 1s linear 0s 1;*/
      }
      .p-xian {
        width: 2.8rem;
        height: 0.24rem;
        /*display: block;*/
        position: absolute;
        bottom: 0;
        right: 0.28rem;
        /*animation: vip-xian 1s linear 0s 1;*/
      }
      .vip-number {
        font-size: 0.19rem;
        color: #f3c800;
        position: absolute;
        font-weight: bold;
        top: -0.08rem;
        right: 0.8rem;
      }
      .vip-tit {
        position: absolute;
        top: 0.13rem;
        right: 1.03rem;
        p {
          font-size: 0.15rem;
          color: #007387;
          text-align: center;
        }
        .p1 {
          font-size: 0.15rem;
          color: #00ddf7;
          font-weight: bold;
        }
      }
    }
  }
  .logo {
    left: 0.15rem;
    top: 0.15rem;
    width: 4rem;
    height: 0.8rem;
    background-image: url('../../assets/images/map-logo.png');
    background-repeat: no-repeat;
    background-size: auto 100%;
    position: absolute;
  }
  .time {
    width: 5rem;
    height: 0.8rem;
    background-image: url('../../assets/images/map-time.png');
    background-repeat: no-repeat;
    background-size: auto 100%;
    position: absolute;
    right: 0.15rem;
    top: 0.15rem;
    .tt {
      font-size: 0.23rem;
      position: absolute;
      height: 0.8rem;
      line-height: 0.8rem;
      left: 0.25rem;
      color: #68efff;
    }
    .day {
      font-size: 0.15rem;
      position: absolute;
      height: 0.8rem;
      line-height: 0.8rem;
      left: 0.3rem;
      color: #007285;
      .rz {
        width: 1rem;
        font-size: 0.23rem;
        position: absolute;
        height: 0.8rem;
        line-height: 0.8rem;
        left: 1.15rem;
        color: #007285;
      }
      .year {
        width: 1rem;
        font-size: 0.23rem;
        position: absolute;
        height: 0.8rem;
        line-height: 0.8rem;
        left: 2.05rem;
        color: #007285;
      }
    }
    .city {
      font-size: 0.25rem;
      position: absolute;
      height: 0.8rem;
      line-height: 0.8rem;
      left: 3.2rem;
      color: #007285;
    }
  }
  .citywraper {
    position: relative;
    top: 42%;
    left: 48.5%;
    width: 3.35rem;
    height: 2.08rem;
    background-image: url('../../assets/images/map-k.png');
    background-repeat: no-repeat;
    .cityName {
      position: absolute;
      top: 0.09rem;
      left: 0.25rem;
      color: #00d6f0;
      font-size: 0.15rem;
      font-weight: 600;
    }
    .quyu {
      width: 100%;
      height: 100%;
      text-align: center;
      .imgPosition {
        width: 124px;
        height: 154px;
        z-index: 999999;
        margin-top: 0.4rem;
      }
      .Dot {
        &::before {
          content: '';
          width: 0.2rem;
          height: 0.2rem;
          background-color: #f3c800;
          border-radius: 50%;
          position: absolute;
          top: 1.09rem;
          left: 1.54rem;
          z-index: 2;
        }

        &::after {
          content: '';
          position: absolute;
          background-color: #f3c800;
          border-radius: 50%;
          z-index: 1;
          animation: mymove 1s infinite;
          -webkit-animation: mymove 1s infinite;
        }
        @keyframes mymove {
          from {
            width: 0;
            height: 0;
            opacity: 1;
            top: 1.15rem;
            left: 1.6rem;
          }
          to {
            width: 0.6rem;
            height: 0.6rem;
            opacity: 0;
            top: 0.9rem;
            left: 1.35rem;
          }
        }
      }
      .xian1 {
        width: 2.26rem;
        border-top: 0.03rem solid rgba(243, 200, 0, 0.5);
        height: 0rem;
        // background-color: rgba(243, 200, 0, 0.5);
        position: absolute;
        left: 1.3rem;
        top: 0.24rem;
        transform: rotate(-50deg);
        opacity: 1;

        // width: 10px;
        // border-top: 3px solid rgba(243, 200, 0, 0.5);
        // height: 0px;
        // position: absolute;
        // left: 168px;
        // top: 109px;
        // -webkit-transform: rotate(-50deg);
        // transform: rotate(-50deg);
        // opacity: 1;

        // width: 3.44rem;
        // height: 0.048rem;
        // background: rgba(243, 200, 0, 0.5);
        // position: absolute;
        // left: 50%;
        // top: 50%;
        // margin-top: -1.504rem;
        // margin-left: -0.72rem;
        // transform: rotate(-55deg);
        // opacity: 1;
        /*animation: xian1 1s linear 0s;*/
      }
      .xian2 {
        width: 2.98rem;
        border-top: 0.03rem solid rgba(243, 200, 0, 0.5);
        height: 0rem;
        // background-color: rgba(243, 200, 0, 0.5);
        position: absolute;
        left: 0.54rem;
        top: -0.33rem;
        transform: rotate(-75deg);
        opacity: 1;
      }
      .xian3 {
        z-index: 17;
        width: 517px;
        border-top: 3px solid rgba(243, 200, 0, 0.5);
        height: 0;
        // background-color: rgba(243, 200, 0, 0.5);
        position: absolute;
        left: -313px;
        top: 268px;
        transform: rotate(-35deg);
        opacity: 1;
      }
      .xian4 {
        z-index: 17;
        width: 464px;
        border-top: 3px solid rgba(243, 200, 0, 0.5);
        height: 0;
        // background-color: rgba(243, 200, 0, 0.5);
        position: absolute;
        left: -173px;
        top: 313px;
        transform: rotate(-62deg);
        opacity: 1;
      }
    }
  }
}

.map-wrap .province .quyu img {
  height: 100%;
  display: block;
  margin: 0 auto;
}

.map-wrap #city {
  width: 1000px;
  height: 1000px;
  /* background: #1B1B1B; */
  position: absolute;
  left: 0.06rem;
  top: -0.72rem;
  z-index: 0;
}
.showMap {
  opacity: 0 !important;
  transition: all 0.7s !important;
  transform: scale(0) !important;
}
.showMapNot {
  opacity: 1;
  transition: all 0.8s;
}
</style>
