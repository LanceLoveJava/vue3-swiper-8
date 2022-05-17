<template>
  <swiper
    :modules="[Virtual]"
    direction="vertical"
    :slides-per-view="1"
    :virtual="true"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <template v-for="(item, index) in arrList" :key="index">
      <swiper-slide :virtualIndex="index">
        <video
          :id="'video-play-' + index"
          class="video-custom"
          preload="metadata"
          loop
          @click.stop="videoClick()"
        >
          <source
            :src="'http://zjjbk.hn-xinhua.cn' + item.VideoPath"
            type="video/mp4"
          />
        </video>
        <div v-show="mon" class="play" @click="videoClick">▶</div>
      </swiper-slide>
    </template>
  </swiper>
</template>

<script>
import { Virtual } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue/swiper-vue.js";
import "swiper/swiper.min.css";
import { ref, onBeforeMount, onMounted } from "vue";
export default {
  name: "App",
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    let arrList = ref([]);
    let swiperInit = ref(null);
    let mon = ref(false);
    let videoList = [
      {
        Id: 6,
        Title: "几亿年形成山峰奇观，亿年前张家界究竟怎么样？",
        VideoImg: "/imgupload/202111/6377164192562928589474109.JPG",
        Summary: "几亿年形成山峰奇观，亿年前张家界究竟怎么样？",
        VideoPath: "/videoupload/202111/6377164186453553587531060.mp4",
        Lauds: 2,
        ShareNum: 0,
        CommentNum: 1,
        AddTime: "2021-11-04 16:58:48",
        NickName: "游客",
        Headimgurl: "",
        IsLauds: 0,
      },
      {
        Id: 1,
        Title: "大家来数数，仙境张家界到底有多少个世界之ZUI？",
        VideoImg: "/imgupload/202111/6377164093237928588873044.JPG",
        Summary: "大家来数数，仙境张家界到底有多少个世界之ZUI？",
        VideoPath: "/videoupload/202111/6377164092345741082189081.mp4",
        Lauds: 3,
        ShareNum: 0,
        CommentNum: 0,
        AddTime: "2021-11-04 16:42:14",
        NickName: "游客",
        Headimgurl: "",
        IsLauds: 1,
      },
      {
        Id: 5,
        Title:
          "鬼斧神工，鬼斧神工，张家界一定要现场去看，比呈现的画面不知道震撼多少倍，建议5月或者10月份 ",
        VideoImg: "/imgupload/202111/6377164181245741085253883.JPG",
        Summary:
          "鬼斧神工，鬼斧神工，张家界一定要现场去看，比呈现的画面不知道震撼多少倍，建议5月或者10月份 ",
        VideoPath: "/videoupload/202111/6377164180534803584526745.mp4",
        Lauds: 5,
        ShareNum: 0,
        CommentNum: 6,
        AddTime: "2021-11-04 16:56:57",
        NickName: "游客",
        Headimgurl: "",
        IsLauds: 0,
      },
      {
        Id: 19,
        Title: "",
        VideoImg: "",
        Summary: "上传测试",
        VideoPath: "/videoApiupload/202205/6378780210971267737755990.mp4",
        Lauds: 0,
        ShareNum: 0,
        CommentNum: 0,
        AddTime: "2022-05-10 17:56:02",
        NickName: "徐忠",
        Headimgurl:
          "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eq8PqZ3gwpq6QibWe3EGNvMGyJwCen9gjph7WDcntiaDuvEscmqKJkcMicCKRFujxSl9pXrDq92fibAdw/132",
        IsLauds: 0,
      },
      {
        Id: 2,
        Title: "张家界武陵源秋日绝美云海，云雾蒸腾，如诗如画",
        VideoImg: "/imgupload/202111/6377164022325428589354081.JPG",
        Summary: "张家界武陵源秋日绝美云海，云雾蒸腾，如诗如画",
        VideoPath: "/videoupload/202111/6377163982095741086881104.mp4",
        Lauds: 4,
        ShareNum: 0,
        CommentNum: 0,
        AddTime: "2021-11-04 16:41:10",
        NickName: "游客",
        Headimgurl: "",
        IsLauds: 0,
      },
      {
        Id: 7,
        Title: "张家界绝美仙境武陵源，山河无恙，祖国安好#旅行",
        VideoImg: "/imgupload/202111/6377164195241053582659371.JPG",
        Summary: "张家界绝美仙境武陵源，山河无恙，祖国安好#旅行",
        VideoPath: "/videoupload/202111/6377164194505116081328635.mp4",
        Lauds: 3,
        ShareNum: 0,
        CommentNum: 0,
        AddTime: "2021-11-04 16:59:15",
        NickName: "游客",
        Headimgurl: "",
        IsLauds: 0,
      },
      {
        Id: 8,
        Title: "这样的仙境你想来吗",
        VideoImg: "/imgupload/202111/6377325661037928588278176.JPG",
        Summary: "",
        VideoPath: "/videoupload/202111/6377325651291053586470218.mp4",
        Lauds: 4,
        ShareNum: 0,
        CommentNum: 1,
        AddTime: "2021-11-23 09:30:18",
        NickName: "游客",
        Headimgurl: "",
        IsLauds: 0,
      },
      {
        Id: 3,
        Title:
          "有人说：人生不上张家界，阅尽千山也枉然。走进张家界的山水，你就会乐而忘返，让自己全身放松一下，你会发现人间值得 #张家界旅游攻略 ",
        VideoImg: "/imgupload/202111/6377164098905116084612689.JPG",
        Summary:
          "有人说：人生不上张家界，阅尽千山也枉然。走进张家界的山水，你就会乐而忘返，让自己全身放松一下，你会发现人间值得 #张家界旅游攻略 ",
        VideoPath: "/videoupload/202111/6377164097925428589885385.mp4",
        Lauds: 5,
        ShareNum: 0,
        CommentNum: 1,
        AddTime: "2021-11-04 16:43:11",
        NickName: "游客",
        Headimgurl: "",
        IsLauds: 0,
      },
      {
        Id: 4,
        Title: "张家界山顶有神仙#我是景区推荐官",
        VideoImg: "/imgupload/202111/6377164112325428582260646.JPG",
        Summary: "张家界山顶有神仙#我是景区推荐官",
        VideoPath: "/videoupload/202111/6377164101644178588733072.mp4",
        Lauds: 4,
        ShareNum: 0,
        CommentNum: 1,
        AddTime: "2021-11-04 16:45:26",
        NickName: "游客",
        Headimgurl: "",
        IsLauds: 0,
      },
    ];
    let videoCollection = null;
    onBeforeMount(() => {
      let arr = videoList.map((item) => item);
      arrList.value = [...arr];
    });
    onMounted(() => {
      if (videoCollection) {
        setTimeout(() => {
        const element = videoCollection.item(0);
        mon.value = element.paused
        }, 300);
      }
    });
    const onSwiper = (swiper) => {
      swiperInit.value = swiper;
      // 获取video集合，会动态及时更新
      videoCollection = document.getElementsByTagName("video");
    };
    const onSlideChange = (swiper) => {
      let element = document.getElementById("video-play-" + swiper.activeIndex);
      let arrayV = Array.from(videoCollection);
      arrayV.map((node) => {
        node.pause();
      });
      mon.value = true
      if (element) {
        element.play();
        mon.value = false
      }
      if (swiper.activeIndex === arrList.value.length - 1) {
        let arr = videoList.slice().sort(() => Math.random() - 0.5);
        arrList.value = [...arrList.value, ...arr];
      }
    };
    const videoClick = () => {
      let element = document.getElementById("video-play-" + swiperInit.value.activeIndex);
      if (element.paused) {
        element.play();
        mon.value = false
      } else {
        element.pause();
        mon.value = true
      }
    };
    return {
      onSwiper,
      onSlideChange,
      Virtual,
      mon,
      arrList,
      videoClick,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
}
body {
  padding: 0;
  margin: 0;
}
.swiper {
  width: 100%;
  height: 100%;
}
.swiper-slide {
  position: relative;
  background-color: #000;
}
.video-custom {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.play {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  font-size: 80px;
  line-height: 100vh;
  background-color: #000000a8;
  z-index: 10;
}
</style>
