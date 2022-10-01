export default function () {
  // 制定校验规则
  // 账号校验
  const validateName = (rule: any, value: any, callback: any) => {
    const regaccount = /^.{6,9}$/
    if (value === '') {
      callback(new Error('请输入账号'))
    } else if (regaccount.test(value)) {
      callback()
    } else {
      callback(new Error('账号长度必须为6-9位字符'))
    }
  }

  // 密码校验
  const validatePass = (rule: any, value: any, callback: any) => {
    const regaPass = /^\d{6,9}$/
    if (value === '') {
      callback(new Error('请输入密码'))
    } else if (regaPass.test(value)) {
      callback()
    } else {
      callback(new Error('密码长度必须为6-9位数字'))
    }
  }

  // 手机号校验
  const validatePhone = (rule: any, value: any, callback: any) => {
    const regRegister =
      /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
    if (value === '') {
      callback(new Error('请输入手机号'))
    } else if (value !== '' && regRegister.test(value)) {
      callback()
    } else {
      callback(new Error('手机号长度应为11位'))
    }
  }

  // 验证码校验
  const validateCode = (rule: any, value: any, callback: any) => {
    console.log('value', value)
    const regaPass = /^\d{6}$/
    if (value === '') {
      callback(new Error('请输入验证码'))
    } else if (regaPass.test(value)) {
      callback()
    } else {
      callback(new Error('密码长度必须为6位数字'))
    }
  }

  const rules = reactive({
    name: [{ validator: validateName, trigger: 'blur', required: true }],
    password: [{ validator: validatePass, trigger: 'blur', required: true }],
    num: [{ validator: validatePhone, trigger: 'blur', required: true }],
    code: [{ validator: validateCode, trigger: 'blur', required: true }]
  })

  return rules
}
