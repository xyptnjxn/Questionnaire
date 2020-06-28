import Router from 'koa-router'
import axios from 'axios'
import Statistics from '../dbs/models/statistics'
import Questionnaire from '../dbs/models/questionnaires'

const router = new Router({
  prefix: '/statistics'
})

router.post('/submit', async (ctx) => {
  const {
    link,
    answer
  } = ctx.request.body
  console.log(link, answer)
  const submited = await Statistics.find({ link })
  if (submited.length) {
    const result = await Statistics.update({ link }, { $addToSet: { answers: answer } })
    if (result) {
      ctx.body = {
        code: 0,
        msg: '成功提交表单'
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '提交表单失败'
      }
    }
  } else {
    const answers = []
    answers.push(answer)
    console.log(answers)
    const submit = await Statistics.create({
      link,
      answers
    })
    if (submit) {
      ctx.body = {
        code: 0,
        msg: '成功提交表单'
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '提交表单失败'
      }
    }
  }
})

router.post('/getResult', async (ctx) => {
  const {
    link
  } = ctx.request.body
  const result = await Statistics.find({ link })
  if (result.length) {
    ctx.body = {
      code: 0,
      msg: '成功返回填写信息',
      answers: result
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '尚未有人提交表单'
    }
  }
})

router.post('/getQuestionnairesByLink', async (ctx) => {
  const {
    link
  } = ctx.request.body
  const result = await Questionnaire.find({ link })
  if (result.length) {
    ctx.body = {
      code: 0,
      msg: '成功找到问卷',
      questionnaire: result
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '问卷不存在'
    }
  }
})

export default router
