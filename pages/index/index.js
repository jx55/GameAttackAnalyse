const app=getApp();
const URL=app.globalData.URL;

Page({
  data:{
    person_index:"0",		//默认值
    monster_index:"0",
    person_image:"http://1.116.209.168/game/public/image/person/1/1.png",
    monster_image:"http://1.116.209.168/game/public/image/monster/1/1.png",
    person:[],
    monster:[]
  },
  onLoad: function () {
    this.getPerson();
    this.getMonster();
  },


  getPerson:function(){
    var self=this;
    wx.request({
      url: URL+'person/all', 
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res.data);
        let per=res.data;
        let ans=[];
        let j=0;
        for(let key in per)
        {
          let a=key;
          ans[j++]=a;
        }
        console.log(ans);
        self.setData({
          person:ans
        })
      }
    })
  },

  getMonster:function(){
    var self=this;
    wx.request({
      url: URL+'monster/all', 
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res.data);
        let per=res.data;
        let ans=[];
        let j=0;
        for(let key in per)
        {
          let a=key;
          ans[j++]=a;
        }
        console.log(ans);
        self.setData({
          monster:ans
        })
      }
    })
  },

  bindpersonchange:function(e){
    console.log("picker1发送选择改变，携带值为：",e.detail.value);
    // console.log("http://1.116.209.168/game/public/image/person/"+(e.detail.value+1)+"/1.png");
    let index=Number(e.detail.value)+1;
    this.setData({
      person_index:e.detail.value,
      person_image:"http://1.116.209.168/game/public/image/person/"+index+"/1.png",
    })
  },

  bindmonsterchange:function(e){
    console.log("picker2发送选择改变，携带值为：",e.detail.value);
    let index=Number(e.detail.value)+1;
    this.setData({
      monster_index:e.detail.value,
      monster_image:"http://1.116.209.168/game/public/image/monster/"+index+"/1.png",
    })
  },

  formSubmit:function(e){
    console.log(e.detail.value);
    wx.navigateTo({
      url:'../inform/inform',
      events:{
        acceptDataFromOpenedPage:function(data){
          console.log(data);
        }
      },
      success: function(res) {
        console.log("index页面参数传递成功！");
        console.log(e.detail.value);
        // res.eventChannel.emit('acceptDataFromOpenerPage',{data:'发送的数据。'});
        res.eventChannel.emit('acceptDataFromOpenerPage',{data:e.detail.value});
      }
    })
  },
})