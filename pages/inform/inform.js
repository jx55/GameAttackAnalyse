// pages/inform/inform.js
const app=getApp();
const URL=app.globalData.URL;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    person_id:'0',
    monster_id:'0',
    person_image:"",
    monster_image:"",
    person:{},
    monster:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(){
    this.receiveData();
    this.getPerson();
    this.getMonster();
  },
  receiveData:function (options) {
    let that = this;
    const eventChannel = that.getOpenerEventChannel();
    eventChannel.emit('acceptDataFromOpenedPage',{data:'inform页面成功接收到数据。'});
    eventChannel.on('acceptDataFromOpenerPage', function(data) {
      console.log(data);
      //这里传过来的id与后端存储的id差了1
      that.person_id=Number(data.data.person_choose)+1;
      that.monster_id=Number(data.data.monster_choose)+1;
      //作用是渲染到前端
      // that.setData({
      //   person_id:data.data.person_choose,
      //   monster_id:data.data.monster_choose
      // })
      console.log(that.person_id,that.monster_id);
    })
  },
  getPerson:function(){
    var self=this;
    wx.request({
      url: URL+'person/'+self.person_id, 
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log("Person：");
        console.log(res.data);
        self.setData({
          person:res.data,
          person_image:"http://1.116.209.168/game/public/image/person/"+self.person_id+"/1.png",
          person_id:self.person_id+1,
        })
        // let num=1;
        // num=setTimeout(function(){
        // },2000);
      }
    })
  },
  getMonster:function(){
    var self=this;
    wx.request({
      url: URL+'monster/'+self.monster_id, 
      header: {
        'content-type': 'application/json'
      },
      success (res) {
        console.log("Monster：");
        console.log(res.data);
        self.setData({
          monster:res.data,
          monster_image:"http://1.116.209.168/game/public/image/monster/"+self.monster_id+"/1.png",
          monster_id:self.monster_id,
        })
      }
    })
  },
  submit:function(){
    let attack_data=[];
    attack_data.push(this.person_id);
    attack_data.push(this.monster_id);
    attack_data.push(this.data.person);
    attack_data.push(this.data.monster);
    console.log(attack_data);
    wx.navigateTo({
      url:'../attack/attack',
      events:{
        acceptDataFromOpenedPage:function(data){
          console.log(data);
        }
      },
      success: function(res) {
        console.log("inform页面参数传递成功！");
        res.eventChannel.emit('acceptDataFromOpenerPage',{data:attack_data});
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})