## 注册，登录
## 提问
## 个人中心
## 收藏话题、删除收藏
## 添加评论
## 话题列表,详情
## 为话题点赞消赞
## 头像的上传(普通上传和七牛上传)
## 增加分享功能

---
## 邮箱注册
## 第三方登录（github,weibo,weixin）
## 发邮件
## 支持markdown
## 分享问题
## 归类（属于提问类还是分享类）
## 为评论点赞消赞
## 支持at功能
## 消息通知
## 嵌入知乎日报功能

---
## 开发环境和正式环境的切换配置
## 增加日志功能
## rest api
## 使用前端渲染（全部采用ajax）
## 前端使用框架（Vue, React | Framework7, iview等)
## 加入聊天功能（多人聊天室）
## 语音功能（对于大段的文字，可以直接输入语音）
## 使用handlebars模板引擎替换ejs模板引擎
## 使用mysql提供代替mongoose进行纯ajax的查询



你将了解到以下技术的使用：
- [material icons](https://material.io/icons/)
- [framework7 material design](http://material.framework7.cn/)
- [framework7](http://framework7.io/docs/dom.html)
- [mongoose](http://mongoosejs.com/docs/api.html)
- [mongodb](https://docs.mongodb.com/manual/reference/operator/query/all/)
- [express](http://www.expressjs.com.cn/4x/api.html)
- [nodemailer](https://nodemailer.com)
- [passportjs](http://passportjs.org/)
- [alibaba iconfont](http://www.iconfont.cn/)
- [heroku](https://dashboard.heroku.com/)
- [log4js](https://nomiddlename.github.io/log4js-node/api.html)


--- 
## optimize
- 部分请求使用ajax（不刷新页面，页面可以做得更加炫酷）,统一数据返回格式
```
{
    err_no: 0, // 错误码和错误信息可做相应的配置，除了0以外都表示非成功的请求。
    err_msg: ''
    data: {
        list: []
        repo: 'https://github.com/xxxxxMiss'
    }
}
```


---

下一个node框架的使用
egg | koa | sails 
## 影片
| 字段 | 描述 |
| -- | -- |
| name | 片名 |
| enName | 英文名 |
| desc | 简介 |
| duration | 时长 |
| screenDate | 上映日期 |
| language| 语种 |
| director | 导演 |
| leadingRole | 主演 |
| category | 类型(动作) |
| kind | 放映效果(3D, 巨幕) |
| poster | 海报 |
| stars | 星级 |
| company | 出品公司 |
| comments | 影评 |
| pulisher | 发布者 |

## 评论者
| 字段 | 描述 |
| --- | --- |
| name | 评论者用户名 |
| photo| 评论者头像 |
| content | 评论的内容 |
| movie | 影片 |
| ups | 点赞 |
| replies | 回复 |

## 发布者
| 字段 | 描述 |
| --- | --- |
| name | 用户名 |
| alias | 昵称 |
| photo | 头像 |
| createDate | 注册日期 |
| password | 密码 |

## 演员
| 字段 | 描述 |
| --- | --- |
| name | 姓名 |
| enName | 英文姓名 |
| screenDate | 出道日期 |
| position | 职业 |
| desc | 生平简介 |
| representative | 代表作 |





