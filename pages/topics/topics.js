// posts.js
var Api = require('../../utils/api.js');
var util = require('../../utils/util.js');
Page({
  data: {
    title: '话题列表',
    postsList: [],
    hidden: false,
    count_nowplaying:{},
    count_upcoming:{},
    page: 1,
    tab: 'all'
  },
  onPullDownRefresh: function () {
    this.fetchData();
    console.log('下拉刷新', new Date());
  },
  onLoad: function () {
    console.log(1)
    this.fetchData();
  },
  onTapTag: function (e) {
    console.dir(e)
    var self = this;
    var tab = e.currentTarget.id;
    self.setData({
      tab: tab
    });
    if (tab !== 'all') {
      this.fetchData({tab: tab});
    } else {
      this.fetchData();
    }
  },
  fetchData: function (data) {
    var self = this;
    self.setData({
      hidden: false
    });
    if (!data) data = {};
    if (!data.page) data.page = 1;
    if (data.page === 1) {
      self.setData({
        postsList: []
      });
    }
    wx.request({
      url: Api.getTopics(data),
      success: function (res) {
        self.setData({
          count_nowplaying:res.data.count_nowplaying,
          count_upcoming:res.data.count_upcoming,
          postsList: res.data.data
        });
        setTimeout(function () {
          self.setData({
            hidden: true
          });
        }, 300);
      }
    });
  },
  redictDetail: function (e) {
    var id = e.currentTarget.id,
        url = '../detail/detail?id=' + id;
    wx.navigateTo({
      url: url
    })
  },
  showDetail: function (e) {
    var id = "show"+e.currentTarget.id;
    alert(id);
    this.setData({
        id: "none"
    });
    console.log("ID:"+id);

  },
  lower: function (e) {
    var self = this;
    self.setData({
      page: self.data.page + 1
    });
    if (self.data.tab !== 'all') {
      this.fetchData({tab: self.data.tab, page: self.data.page});
    } else {
      this.fetchData({page: self.data.page});
    }
  }
})
