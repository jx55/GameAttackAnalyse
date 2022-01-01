// pages/attack/attack.js
const app=getApp();
const URL=app.globalData.URL;

//记录当前的人物和怪物buff信息
let person_buff="-1,-1,-1";
let monster_buff="-1,-1,-1";
let p_blood_start;
let m_blood_start;
let monster_hp;
let person_hp;
let p_waiting_time="0,0,0,0";
let m_waiting_time="0,0,0,0";
let atk_count=1;
let atk_count1=1;
let m_blood_res=0;
let sk2=1;
let sk3=1;
let sk4=1;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        person:{},
        monster:{},
        res_atk:[],
        res_atk1:[],
        modalHidden:true,  //对话框隐藏标志
        person_id:"0",
        monster_id:"0",
        p_blood:100,
        m_blood:100,
        p_blood_show:0,
        m_blood_show:0,
        saturate1:"saturate(7)",
        saturate2:"saturate(7)",
        saturate3:"saturate(7)",
        saturate4:"saturate(7)",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.receiveData();
    },

    onShareAppMessage() {
        return {
          title: 'scroll-view',
          path: 'page/component/pages/scroll-view/scroll-view'
        }
    },
    upper(e) {
        // console.log(e)
      },
    
      lower(e) {
        // console.log(e)
      },
    
      scroll(e) {
        // console.log(e)
      },
    
      scrollToTop() {
        this.setAction({
          scrollTop: 0
        })
      },
    
      tap() {
        for (let i = 0; i < order.length; ++i) {
          if (order[i] === this.data.toView) {
            this.setData({
              toView: order[i + 1],
              scrollTop: (i + 1) * 200
            })
            break
          }
        }
      },
    
      tapMove() {
        this.setData({
          scrollTop: this.data.scrollTop + 10
        })
      },

    receiveData:function (options) {
        let that = this;
        const eventChannel = that.getOpenerEventChannel();
        eventChannel.emit('acceptDataFromOpenedPage',{data:'attack页面成功接收到数据。'});
        eventChannel.on('acceptDataFromOpenerPage', function(data) {
            console.log(data.data);
            that.person_id=data.data[0];
            that.monster_id=data.data[1];
            that.person=data.data[2];
            that.monster=data.data[3];
            monster_hp=that.monster.hp;
            m_blood_start=that.monster.hp;
            p_blood_start=that.person.hp;
            that.p_blood_show=that.person.hp;
            that.m_blood_show=that.monster.hp;
            person_hp=that.person.hp;
            that.modalHidden=true;
            that.res_atk=[];
            that.res_atk1=[];
            //渲染到前端
            that.setData({
                person:that.person,
                monster:that.monster,
                person_id:that.person_id,
                monster_id:that.monster_id,
                p_blood_show:that.person.hp,
                m_blood_show:that.monster.hp,
            })
        })
    },
    
    attack:function(e){
        // console.log(e.currentTarget.dataset.skill);
        // console.log("人物buf:"+person_buff+" 人物时间:"+p_waiting_time+" 怪物血量:"+monster_hp+" 怪物buf:"+monster_buff+" 人物攻击id: "+e.currentTarget.dataset.skill.id);
        // console.log(this.person_id);
        // console.log(person_buff);
        // console.log(e.currentTarget.dataset.skill.id);
        // console.log(p_waiting_time);
        // console.log(monster_hp);
        // console.log(this.monster_id);
        // console.log(monster_buff);

        //当次攻击前的血量
        let blood_this=monster_hp;

        let atkstr="sk"+e.currentTarget.dataset.skill.id;
        console.log(atkstr);
        if( atkstr=="sk1" || ( atkstr=="sk2" && sk2==1 ) || ( atkstr=="sk3" && sk3==1 ) || ( atkstr=="sk4" && sk4==1 ) ){
        //发送攻击请求
        var self=this;
        wx.request({
            url: URL+'person_atk', 
            method:"POST",
            header: {
                'content-type': 'application/json' // 默认值
            },
            data:{
                personId:this.person_id,
                personBuff:person_buff,
                skillId: e.currentTarget.dataset.skill.id,
                waitingTime : p_waiting_time,
                monsterHp : monster_hp,
                monsterId: this.monster_id,
                monsterBuff:monster_buff
            },
            success (res) {
                // console.log("Person_atk：");
                // console.log(res.data);
                monster_hp=res.data.monsterHp;
                person_buff=res.data.personBuff;
                if(person_buff=="") person_buff="0,0,0";
                monster_buff=res.data.monsterBuff;
                if(monster_buff=="") monster_buff="0,0,0";
                p_waiting_time=res.data.waitingTime;

                //将技能冷却时间渲染到前端
                function cool(){
                    // console.log(p_waiting_time);
                    let ctime=[];
                    for(let k=0;k<p_waiting_time.length;k++)
                    {
                        if(p_waiting_time[k] != ','){
                            ctime.push(Number(p_waiting_time[k]));
                        }
                    }
                    // console.log(ctime);
                    if(ctime[1]!=0){
                        let tt1=setTimeout(function(){
                            sk2=0;
                            self.setData({
                                saturate2:"saturate(0)",
                            })
                        },0);
                        let tt2=setTimeout(function(){
                            sk2=1;
                            self.setData({
                                saturate2:"saturate(7)",
                            })
                        },ctime[1]*1000);
                    }

                    if(ctime[2]!=0){
                        let tt1=setTimeout(function(){
                            sk3=0;
                            self.setData({
                                saturate3:"saturate(0)",
                            })
                        },0);
                        let tt2=setTimeout(function(){
                            sk3=1;
                            self.setData({
                                saturate3:"saturate(7)",
                            })
                        },ctime[2]*1000);
                    }

                    if(ctime[3]!=0){
                        let tt1=setTimeout(function(){
                            sk4=0;
                            self.setData({
                                saturate4:"saturate(0)",
                            })
                        },0);
                        let tt2=setTimeout(function(){
                            sk4=1;
                            self.setData({
                                saturate4:"saturate(7)",
                            })
                            console.log("HHH"+ctime[3]);
                        },ctime[3]*1000);
                    }

                }
                cool();
                
                // console.log("HHH  "+p_waiting_time);
                let a1="",a2="",a3="",a4="";
                let num=0;
                for (let l=0;l<p_waiting_time.length;l++)
                {
                    if(num==0){
                        if(p_waiting_time[l]!=','){
                            a1+=p_waiting_time[l];
                        }
                        else{
                            num++;
                            continue;
                        }
                    }
                    if(num==1){
                        if(p_waiting_time[l]!=','){
                            a2+=p_waiting_time[l];
                        }
                        else{
                            num++;
                            continue;
                        }
                    }
                    if(num==2){
                        if(p_waiting_time[l]!=','){
                            a3+=p_waiting_time[l];
                        }
                        else{
                            num++;
                            continue;
                        }
                    }
                    if(num==3){
                        if(p_waiting_time[l]!=','){
                            a4+=p_waiting_time[l];
                        }
                        else{
                            num++;
                            continue;
                        }
                    }
                    
                }
                // console.log(a1,a2,a3,a4);
                var obj={
                    buf:person_buff,
                    s1:self.person.skill1.name,
                    t1:Number(a1),
                    s2:self.person.skill2.name,
                    t2:Number(a2),
                    s3:self.person.skill3.name,
                    t3:Number(a3),
                    s4:self.person.skill4.name,
                    t4:Number(a4),
                    count:atk_count++,
                }
                // console.log(obj);

                // res=[obj, ...res];
                let nn=self.res_atk.unshift(obj);
                // console.log(self.res_atk);

                let m_b=Math.floor(monster_hp/m_blood_start*100);
                if(m_b<0) m_b=0;
                let m_b_show=Math.floor(monster_hp);
                if(m_b_show<0) m_b_show=0;

                var obj2={
                    count:atk_count1++,
                    m_blood_text:Math.floor(blood_this-m_b_show),
                }
                let nn1=self.res_atk1.unshift(obj2);

                console.log(blood_this);
                console.log(m_b_show);
                //渲染到前端
                self.setData({
                    m_blood_show:m_b_show,
                    m_blood:m_b,
                    res_atk:self.res_atk,
                    res_atk1:self.res_atk1,
                });

                //判断怪物血量情况
                // console.log(m_b);
                // console.log(self.modalHidden);
                if(m_b==0){
                    console.log("怪物血量为0！");
                    //弹出提示框
                    self.modalHidden=false;
                }
                console.log(self.modalHidden);
                self.setData({
                    modalHidden:self.modalHidden,
                })

                //间隔一定时间发送怪物攻击信息
                let num1=setTimeout(function(){
                    // console.log("怪物buf:"+monster_buff+" 怪物时间:"+m_waiting_time+" 人物血量:"+person_hp+" 人物buf:"+person_buff);
                    wx.request({
                        url: URL+'monster_atk',
                        method:"POST",
                        header: {
                            'content-type': 'application/json' // 默认值
                        },
                        data:{
                            monsterId: self.monster_id,
                            monsterBuff:monster_buff,
                            waitingTime : m_waiting_time,
                            personHp : person_hp,
                            personId:self.person_id,
                            personBuff:person_buff,
                        },
                        success (res1) {
                            // console.log("Monster_atk：");
                            // console.log(res1.data);

                            person_hp=res1.data.personHp;
                            person_buff=res1.data.personBuff;
                            if(res1.data.personBuff==""){
                                person_buff="0,0,0";
                            }
                            monster_buff=res1.data.monsterBuff;
                            if(monster_buff=="") monster_buff="0,0,0";
                            m_waiting_time=res1.data.waitingTime;
                            //渲染到前端
                            self.setData({
                                p_blood_show:Math.floor(person_hp),
                                p_blood:Math.floor(person_hp/p_blood_start*100),
                            });
                            // console.log(Math.floor(person_hp/p_blood_start*100));

                        }
                    })
                    console.log("");
                },2000);
            
                // console.log("");
            }
        })

        }
        
    },

    finish:function(){
        atk_count=1;
        atk_count1=1;
        wx.navigateTo({
          url:'../index/index',
        })
    },

    //弹出框的确认按钮事件
    modalConfirm:function(e){
        this.setData({
            modalHidden:true  //隐藏弹出框
        }),
        // console.log(e);

        atk_count=1;
        atk_count1=1;
        //跳转到首页
        wx.navigateTo({
            url:'../index/index',
        })
    },
    //弹出框取消按钮事件
    modalCancel:function(e){
        this.setData({
            modalHidden:true  //隐藏弹出框
        })
        // console.log(e);
    }
})