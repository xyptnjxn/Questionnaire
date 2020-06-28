import Router from 'koa-router'
import Question from '../dbs/models/questionnaires'

const router = new Router({
  prefix: '/questions'
})

router.post('/singlechoice', async (ctx) => {
  const {
    title,
    username,
    link,
    question
  } = ctx.request.body
  const questionnaire = await Question.find({
    link
  })
  if (questionnaire.length) {
    const result = await Question.update({ link }, { $addToSet: { questions: question } })
    if (result) {
      ctx.body = {
        code: 0,
        msg: '成功插入单选题'
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '插入单选题失败'
      }
    }
  } else {
    const questions = []
    questions.push(question)
    console.log(questions)
    const nquestionnaire = await Question.create({
      title,
      username,
      link,
      questions
    })
    if (nquestionnaire) {
      ctx.body = {
        code: 0,
        msg: '成功插入单选题'
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '插入单选题失败'
      }
    }
  }
})

router.post('/multipleChoice', async (ctx) => {
  const {
    title,
    username,
    link,
    question
  } = ctx.request.body
  const questionnaire = await Question.find({
    link
  })
  if (questionnaire.length) {
    console.log(question)
    const result = await Question.update({ link }, { $addToSet: { questions: question } })
    if (result) {
      ctx.body = {
        code: 0,
        msg: '成功插入多选题'
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '插入多选题失败'
      }
    }
  } else {
    const questions = []
    questions.push(question)
    console.log(questions)
    const nquestionnaire = await Question.create({
      title,
      username,
      link,
      questions
    })
    if (nquestionnaire) {
      ctx.body = {
        code: 0,
        msg: '成功插入多选题'
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '插入多选题失败'
      }
    }
  }
})

router.post('/text', async (ctx) => {
  const {
    title,
    username,
    link,
    question
  } = ctx.request.body
  const questionnaire = await Question.find({
    link
  })
  if (questionnaire.length) {
    const result = await Question.update({ link }, { $addToSet: { questions: question } })
    if (result) {
      ctx.body = {
        code: 0,
        msg: '成功插入填空题'
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '插入填空题失败'
      }
    }
  } else {
    const questions = []
    questions.push(question)
    console.log(questions)
    const nquestionnaire = await Question.create({
      title,
      username,
      link,
      questions
    })
    if (nquestionnaire) {
      ctx.body = {
        code: 0,
        msg: '成功插入填空题'
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '插入填空题失败'
      }
    }
  }
})

router.post('/score', async (ctx) => {
  const {
    title,
    username,
    link,
    question
  } = ctx.request.body
  const questionnaire = await Question.find({
    link
  })
  if (questionnaire.length) {
    const result = await Question.update({ link }, { $addToSet: { questions: question } })
    if (result) {
      ctx.body = {
        code: 0,
        msg: '成功插入评分题'
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '插入评分题失败'
      }
    }
  } else {
    const questions = []
    questions.push(question)
    console.log(questions)
    const nquestionnaire = await Question.create({
      title,
      username,
      link,
      questions
    })
    if (nquestionnaire) {
      ctx.body = {
        code: 0,
        msg: '成功插入评分题'
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '插入评分题失败'
      }
    }
  }
})

router.post('/geo', async (ctx) => {
  const {
    title,
    username,
    link,
    question
  } = ctx.request.body
  const questionnaire = await Question.find({
    link
  })
  if (questionnaire.length) {
    const result = await Question.update({ link }, { $addToSet: { questions: question } })
    if (result) {
      ctx.body = {
        code: 0,
        msg: '成功插入定位题'
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '插入定位题失败'
      }
    }
  } else {
    const questions = []
    questions.push(question)
    console.log(questions)
    const nquestionnaire = await Question.create({
      title,
      username,
      link,
      questions
    })
    if (nquestionnaire) {
      ctx.body = {
        code: 0,
        msg: '成功插入定位题'
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '插入定位题失败'
      }
    }
  }
})

router.post('/getQustionnaire', async (ctx) => {
  const {
    username
  } = ctx.request.body
  const results = await Question.find({ username })
  ctx.body = {
    code: 0,
    msg: '返回该用户的所有问卷',
    questionnaires: results
  }
})

export default router
