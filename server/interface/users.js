import Router from 'koa-router'
import Redis from 'koa-redis'
import User from '../dbs/models/users'
import Passport from './utils/passport'
import axios from './utils/axios'

const router = new Router({
  prefix: '/users'
})

const Store = new Redis().client

router.post('/signup', async (ctx) => {
  const {
    username,
    email,
    password
  } = ctx.request.body

  const user = await User.find({
    username
  })
  if (user.length) {
    ctx.body = {
      code: -1,
      msg: '用户已存在'
    }
    return
  }
  const mail = await User.find({
    email
  })
  if (mail.length) {
    ctx.body = {
      code: -1,
      msg: '邮箱已被注册'
    }
    return
  }
  const nuser = await User.create({
    username,
    password,
    email
  })
  if (nuser) {
    const res = await axios.post('/users/signin', {
      username,
      password
    })
    if (res.data && res.data.code === 0) {
      ctx.body = {
        code: 0,
        msg: '注册成功，并自动登录',
        user: res.data.user
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '自动登录失败'
      }
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '注册失败'
    }
  }
})

router.post('/signin', async (ctx, next) => {
  const {
    username,
    password
  } = ctx.request.body
  // console.log(username, password)
  const where = {
    username
  }
  const result = await User.findOne(where)
  if (result != null) {
    if (result.password === password) {
      ctx.body = {
        code: 0,
        msg: '登陆成功'
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '密码错误'
      }
    }
  } else {
    ctx.body = {
      code: 1,
      msg: '用户名不存在'
    }
  }
})

router.post('/exit', async (ctx, next) => {
  await ctx.logout()
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: 0
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '退出失败'
    }
  }
})

router.get('/getUser', async (ctx) => {
  if (ctx.isAuthenticated()) {
    const {
      username,
      email
    } = ctx.session.passport.user
    ctx.body = {
      user: username,
      email
    }
  } else {
    ctx.body = {
      user: '',
      email: ''
    }
  }
})

export default router
