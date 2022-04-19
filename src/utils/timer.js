/*
 * @Date: 2022-03-10 11:18:48
 * @LastEditors: zhaozc
 * @LastEditTime: 2022-03-10 11:19:08
 * @FilePath: \awen-patient-h5\src\utils\timer.ts
 */
// @ts-nocheck
/**
 * 倒计时js
 * 使用方式：
  import Timer from '@/utils/timer'

  const timer = new Timer()
  timer.start({
    // endTime和limitTime只能三选一，传一个
    limitTime: '00:13', // 倒计时时间 暂只支持时分秒 如'11:22:18'或'22:18'（分秒）
    // endTime:'', // 截止时间 如'2019-7-30 12:12:12'或1564459932000
    // countdownTime: 300, // 剩余时间（秒） 如300（5分钟）
    counting({ day, hour, min, sec }) {
      console.log(day, hour, min, sec)
    },
    timeOver() {
      console.log('end')
    }
  })

  // 页面销毁或者开发者自认为合适的时机，销毁定时器
  timer.kill()
 *  */
let init_uid = 1
class Timer {
    constructor() {
        // 内部定义变量
        this._day = 0 // 天
        this._hour = 0 // 时
        this._min = 0 // 分
        this._sec = 0 // 秒
        this._nowTimeStamp = 0 // 现在的时间戳
        this._endTimeStamp = 0 // 截止时间戳
        this._uid = init_uid++

        // 外界传参 endTime，limitTime和countdownTime只能三选一
        this.endTime = '' // 截止时间 如'2019-7-30 12:12:12'或1564459932000
        this.limitTime = '' // 距现在的限时时间 仅限时分秒 如'11:22:18'或'22:18'（分秒）
        this.countdownTime = 0 // 剩余时间（秒） 如300（5分钟）

        // 计时中
        this.counting = function() {}
        // 倒计时结束回调
        this.timeOver = function() {}
    }
    _initOptions(options) {
        this.endTime = options.endTime || ''
        this.limitTime = options.limitTime || ''
        this.countdownTime = options.countdownTime || 0

        this._nowTimeStamp = this._getTimeStamp()

        if (this.endTime) {
            this._endTimeStamp = this._getTimeStamp(this.endTime)
        } else if (this.limitTime) {
            this._endTimeStamp = this._nowTimeStamp + this._handleLimitTime(this.limitTime)
        } else {
            this._endTimeStamp = this._nowTimeStamp + this.countdownTime * 1000
        }
        this.counting = options.counting || function() {}
        this.timeOver = options.timeOver || function() {}
    }
    // 转化限时时间为毫秒
    _handleLimitTime(limitTime = '') {
        const timeList = limitTime.split(':').reverse()
        let millisecond = 0
        let coefficient = 1000 // 时间系数
        timeList.forEach(item => {
            millisecond += coefficient * item
            coefficient *= 60
        })
        return millisecond
    }
    // 启动倒计时
    start(options) {
        this._initOptions(options)
        clearInterval(this._timer)
        this._timer = setInterval(() => {
            this._calc()
            this._nowTimeStamp = this._getTimeStamp(this._nowTimeStamp + 1000)
        }, 1000)
    }
    // 销毁定时器
    kill() {
        clearInterval(this._timer)
        this._timer = null
    }
    /**
     * 根据传入的时间戳或时间格式，转化为对应的时间戳
     * @param {String,Number} time 传入时间戳或时间格式
     * 1.time为空时，返回当前时间的时间戳
     * 2.time为数字类型的时间戳
     * 3.time为字符串类型的时间戳
     * 4.time为时间格式
     */
    _getTimeStamp(time) {
        switch (typeof time) {
            case 'undefined':
                return new Date().getTime()
            case 'number':
                return new Date(time).getTime()
            case 'string':
                if (Number.isNaN(+time)) {
                    // 时间格式
                    return new Date(time).getTime()
                }
                return new Date(+time).getTime()
            default:
                console.error('time传参格式有误', time)
        }
    }
    // 个位数处理
    _format(str) {
        var ret = str.toString().length > 1 ? str : '0' + str
        return ret
    }
    // 倒计时计算
    _calc() {
        let [day, hour, min, sec] = [0, 0, 0, 0]
        let diff = 0

        if (this._nowTimeStamp - this._endTimeStamp <= 0) {
            diff = (this._endTimeStamp - this._nowTimeStamp) / 1000
            // 计算天
            day = Math.floor(diff / (24 * 60 * 60))
            diff -= day * 24 * 60 * 60

            // 计算时
            hour = Math.floor(diff / (60 * 60))
            diff -= hour * 60 * 60

            // 计算分
            min = Math.floor(diff / 60)
            diff = Math.floor(diff - min * 60)

            sec = diff
            this._day = this._format(day)
            this._hour = this._format(hour)
            this._min = this._format(min)
            this._sec = this._format(sec)
            this.counting({
                day: this._day,
                hour: this._hour,
                min: this._min,
                sec: this._sec
            })
        } else {
            clearInterval(this._timer)
            this.timeOver()
            // console.error('倒计时组件: 截止时间已到期')
        }
    }
}
export default Timer
