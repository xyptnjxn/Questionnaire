<template>
  <div>
    <div>
      <h1>网站使用说明</h1>
    </div>
    <div>
      <h2>一.进入主页面</h2>
      <span>输入网站网址（由于是在本地跑，所以是http://localhost:3000/ ）进入到主页面，如下图所示：</span>
      <img src="~@/static/images/1.png" />
      <br>
      <h2>二.注册</h2>
      <span>点击“注册”，进入注册界面，如下图所示</span>
      <img src="~@/static/images/2.png" />
      <span>根据提示信息，填写信息，然后点击注册按钮，进行注册。</span>
      <span>注意注册规则：</span>
      <ol>
        <li>邮箱要符合邮箱格式</li>
        <li>密码不得少于6位</li>
        <li>确认密码需要与密码一致</li>
        <li>标*号为必填信息</li>
      </ol>
      <span>如果填写信息不符合规范，会出现错误提示，如图3、图4所示：</span>
      <img src="~@/static/images/3.png" />
      <img src="~@/static/images/4.png" />
      <span>正确输入注册信息，如：</span>
      <ul>
        <li>昵称：姜运峰</li>
        <li>邮箱：123@163.com</li>
        <li>密码：123456</li>
      </ul>
      <span>点击注册按钮，提示注册成功，表示成功注册用户，如图5所示：</span>
      <img src="~@/static/images/5.png" />
      <br/>
      <h2>三.登录</h2>
      <span>注册成功后会自动跳转到登录界面，可用刚刚注册的用户信息进行登录，如图6所示：</span>
      <img src="~@/static/images/6.png" />
      <h2>四.主页面功能</h2>
      <span>登录成功后会自动跳转到主页面，此时，会显示个人的用户名，如图7所示：</span>
      <img src="~@/static/images/7.png" />
      <span>在该页面中，上方导航菜单从左到右分别提供“查看个人项目（主页）”、“提示当前用户”、“进入登录界面”、“进入注册界面”、“进入网站使用手册页面”、“退出登录”功能；在页面的主体部分，上方是“新建”问卷按钮，下方表格显示当前用户创建的问卷，包含信息为问卷创建时间以及问卷标题。</span>
      <h2>五.创建问卷</h2>
      <span>点击“新建”按钮，进入创建问卷界面，如图8所示</span>
      <img src="~@/static/images/8.png" />
      <span>点击“开始创建”按钮，可以开始创建问卷，依次输入问卷题目，选择问卷填写的方式，包括：</span>
      <ul>
        <li>仅注册用户</li>
        <li>无需登录，可填写n次</li>
        <li>无需登录，每天可填写n次</li>
      </ul>
      <span>然后选择相应题型进行创建，题型包括：</span>
      <ul>
        <li>单选题</li>
        <li>多选题</li>
        <li>文本填写题</li>
        <li>评分题</li>
        <li>级联选择题</li>
        <li>定位题</li>
      </ul>
      <span>如图9所示：</span>
      <img src="~@/static/images/9.png" />
      <span>点击想要创建的题型，根据提示信息填写题目信息（以单选题为例），如图10所示：</span>
      <img src="~@/static/images/10.png" />
      <span>在“单选题题目名称”栏填写单选题题目，点击“增加选项”按钮可以增加选项，在选项栏中输入选项文本，之后点击“确定”按钮，提交创建好的题目。将整个问卷创建完成后，点击“提交问卷”按钮，问卷创建成功。问卷创建成功后，页面会自动跳转回主页面，在主页面可以看到创建好的问卷信息，如图11所示：</span>
      <img src="~@/static/images/11.png" />
      <br>
      <h2>六.分享问卷</h2>
      <span>点击问卷所在行，会跳转至问卷详情页面，如图12所示：</span>
      <img src="~@/static/images/12.png" />
      <span>作为问卷创建者，可以看到问卷访问链接以及查看问卷调查结果按钮，其他用户只能看到问卷表单，如图13所示：</span>
      <img src="~@/static/images/13.png" />
      <br>
      <h2>七.问卷填写提交</h2>
      <span>依次填写问卷信息，然后点击提交问卷信息，即完成了问卷填写以及提交，如图14所示：</span>
      <img src="~@/static/images/14.png" />
      <br>
      <h2>八.查看问卷统计</h2>
      <span>当有用户成功填写并提交了问卷之后，问卷创建者可以点击“查看问卷调查结果统计”按钮，进行统计结果查看，如图15-20所示：</span>
      <img src="~@/static/images/15.png" />
      <img src="~@/static/images/16.png" />
      <img src="~@/static/images/17.png" />
      <img src="~@/static/images/18.png" />
      <img src="~@/static/images/19.png" />
      <img src="~@/static/images/20.png" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Help'
}
</script>

<style scoped>
  span {
    margin: 20px auto;
  }
  img {
    width: 80%;
    margin: 20px auto;
  }
  ul {
    list-style: none;/*前面的黑色小圆点，数字清除掉*/
  }
  div {
    padding: 0 10px;
    box-sizing:border-box;
    width: 100%;
    float: left;/**/
    margin-top: 50px;
  }
  h1 {
    color: green;/*设置文字颜色*/
    background-color: pink;/*设置背景颜色*/
    text-align: center;/*文字内的文字居中*/
    height: 30px;
  }
  h1:hover {
    color: yellow;/*鼠标停到该元素的时候会变色，离开的时候还原*/
  }
  h2 {
    color: skyblue;
    background-color: gray;
    text-align: center;
  }
  h2:hover {
    color: pink;
  }
  * {
    padding: 0px;
    margin: 0px;/*除掉浏览器的默认样式*/
  }
  a {
    background-color: pink;
  }
  a:hover {
    color: yellow;
  }
</style>
