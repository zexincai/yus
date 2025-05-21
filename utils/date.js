/**
 * 日期工具库
 * 提供常用的日期格式化、计算和处理功能
 */

const DateUtil = {
    /**
     * 格式化日期
     * @param {Date|String|Number} date 日期对象、日期字符串或时间戳
     * @param {String} format 格式化模板，例如：'YYYY-MM-DD HH:mm:ss'
     * @return {String} 格式化后的日期字符串
     */
    format(date, format = 'YYYY-MM-DD HH:mm:ss') {
        const d = this.parseDate(date);
        if (!d) return '';

        const formatMap = {
            'YYYY': d.getFullYear(),
            'YY': String(d.getFullYear()).slice(-2),
            'MM': String(d.getMonth() + 1).padStart(2, '0'),
            'M': d.getMonth() + 1,
            'DD': String(d.getDate()).padStart(2, '0'),
            'D': d.getDate(),
            'HH': String(d.getHours()).padStart(2, '0'),
            'H': d.getHours(),
            'mm': String(d.getMinutes()).padStart(2, '0'),
            'm': d.getMinutes(),
            'ss': String(d.getSeconds()).padStart(2, '0'),
            's': d.getSeconds(),
            'SSS': String(d.getMilliseconds()).padStart(3, '0')
        };

        return format.replace(/(YYYY|YY|MM|M|DD|D|HH|H|mm|m|ss|s|SSS)/g, match => formatMap[match]);
    },

    /**
     * 解析日期
     * @param {Date|String|Number} date 日期对象、日期字符串或时间戳
     * @return {Date} 日期对象
     */
    parseDate(date) {
        if (!date) return new Date();
        if (date instanceof Date) return date;
        if (typeof date === 'number') return new Date(date);
        if (typeof date === 'string') {
            // 尝试解析各种格式的日期字符串
            const parsedDate = new Date(date);
            if (!isNaN(parsedDate.getTime())) return parsedDate;

            // 处理特殊格式，如：YYYY/MM/DD、YYYY-MM-DD等
            const regexps = [
                /^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/,
                /^(\d{4})[-/](\d{1,2})[-/](\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/
            ];

            for (const regexp of regexps) {
                const match = date.match(regexp);
                if (match) {
                    const parts = match.slice(1).map(Number);
                    if (parts.length === 3) {
                        return new Date(parts[0], parts[1] - 1, parts[2]);
                    } else if (parts.length === 6) {
                        return new Date(parts[0], parts[1] - 1, parts[2], parts[3], parts[4], parts[5]);
                    }
                }
            }
        }
        return new Date();
    },

    /**
     * 获取当前日期时间
     * @param {String} format 格式化模板
     * @return {String} 格式化后的当前日期时间
     */
    now(format = 'YYYY-MM-DD HH:mm:ss') {
        return this.format(new Date(), format);
    },

    /**
     * 获取今天的日期
     * @param {String} format 格式化模板
     * @return {String} 格式化后的今天日期
     */
    today(format = 'YYYY-MM-DD') {
        return this.format(new Date(), format);
    },

    /**
     * 获取昨天的日期
     * @param {String} format 格式化模板
     * @return {String} 格式化后的昨天日期
     */
    yesterday(format = 'YYYY-MM-DD') {
        const date = new Date();
        date.setDate(date.getDate() - 1);
        return this.format(date, format);
    },

    /**
     * 获取明天的日期
     * @param {String} format 格式化模板
     * @return {String} 格式化后的明天日期
     */
    tomorrow(format = 'YYYY-MM-DD') {
        const date = new Date();
        date.setDate(date.getDate() + 1);
        return this.format(date, format);
    },

    /**
     * 获取指定日期是星期几
     * @param {Date|String|Number} date 日期对象、日期字符串或时间戳
     * @param {Boolean} chinese 是否返回中文星期
     * @return {String|Number} 星期几
     */
    dayOfWeek(date, chinese = true) {
        const d = this.parseDate(date);
        const day = d.getDay();
        if (chinese) {
            const days = ['日', '一', '二', '三', '四', '五', '六'];
            return '星期' + days[day];
        }
        return day;
    },

    /**
     * 获取两个日期之间的天数差
     * @param {Date|String|Number} date1 日期对象、日期字符串或时间戳
     * @param {Date|String|Number} date2 日期对象、日期字符串或时间戳
     * @return {Number} 天数差
     */
    dayDiff(date1, date2) {
        const d1 = this.parseDate(date1);
        const d2 = this.parseDate(date2);
        const time = d2.getTime() - d1.getTime();
        return Math.floor(time / (1000 * 60 * 60 * 24));
    },

    /**
     * 日期加减天数
     * @param {Date|String|Number} date 日期对象、日期字符串或时间戳
     * @param {Number} days 要加减的天数，正数为加，负数为减
     * @param {String} format 格式化模板
     * @return {String|Date} 计算后的日期，如果提供format则返回格式化字符串，否则返回Date对象
     */
    addDays(date, days, format) {
        const d = this.parseDate(date);
        d.setDate(d.getDate() + days);
        return format ? this.format(d, format) : d;
    },

    /**
     * 日期加减月数
     * @param {Date|String|Number} date 日期对象、日期字符串或时间戳
     * @param {Number} months 要加减的月数，正数为加，负数为减
     * @param {String} format 格式化模板
     * @return {String|Date} 计算后的日期，如果提供format则返回格式化字符串，否则返回Date对象
     */
    addMonths(date, months, format) {
        const d = this.parseDate(date);
        d.setMonth(d.getMonth() + months);
        return format ? this.format(d, format) : d;
    },

    /**
     * 日期加减年数
     * @param {Date|String|Number} date 日期对象、日期字符串或时间戳
     * @param {Number} years 要加减的年数，正数为加，负数为减
     * @param {String} format 格式化模板
     * @return {String|Date} 计算后的日期，如果提供format则返回格式化字符串，否则返回Date对象
     */
    addYears(date, years, format) {
        const d = this.parseDate(date);
        d.setFullYear(d.getFullYear() + years);
        return format ? this.format(d, format) : d;
    },

    /**
     * 获取某月的天数
     * @param {Number} year 年份
     * @param {Number} month 月份，1-12
     * @return {Number} 天数
     */
    daysInMonth(year, month) {
        return new Date(year, month, 0).getDate();
    },

    /**
     * 获取某年某月的第一天
     * @param {Number} year 年份
     * @param {Number} month 月份，1-12
     * @param {String} format 格式化模板
     * @return {String|Date} 第一天日期
     */
    firstDayOfMonth(year, month, format) {
        const d = new Date(year, month - 1, 1);
        return format ? this.format(d, format) : d;
    },

    /**
     * 获取某年某月的最后一天
     * @param {Number} year 年份
     * @param {Number} month 月份，1-12
     * @param {String} format 格式化模板
     * @return {String|Date} 最后一天日期
     */
    lastDayOfMonth(year, month, format) {
        const d = new Date(year, month, 0);
        return format ? this.format(d, format) : d;
    },

    /**
     * 判断是否为闰年
     * @param {Number} year 年份
     * @return {Boolean} 是否闰年
     */
    isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    },

    /**
     * 获取日期的时间戳
     * @param {Date|String|Number} date 日期对象、日期字符串或时间戳
     * @return {Number} 时间戳（毫秒）
     */
    timestamp(date) {
        return this.parseDate(date).getTime();
    },

    /**
     * 判断日期是否有效
     * @param {Date|String|Number} date 日期对象、日期字符串或时间戳
     * @return {Boolean} 是否有效
     */
    isValid(date) {
        const d = this.parseDate(date);
        return !isNaN(d.getTime());
    },

    /**
     * 比较两个日期的大小
     * @param {Date|String|Number} date1 日期对象、日期字符串或时间戳
     * @param {Date|String|Number} date2 日期对象、日期字符串或时间戳
     * @return {Number} 比较结果：1表示date1大于date2，-1表示date1小于date2，0表示相等
     */
    compare(date1, date2) {
        const t1 = this.timestamp(date1);
        const t2 = this.timestamp(date2);
        if (t1 > t2) return 1;
        if (t1 < t2) return -1;
        return 0;
    },

    /**
     * 获取日期的年、月、日、时、分、秒
     * @param {Date|String|Number} date 日期对象、日期字符串或时间戳
     * @return {Object} 包含年、月、日、时、分、秒的对象
     */
    getParts(date) {
        const d = this.parseDate(date);
        return {
            year: d.getFullYear(),
            month: d.getMonth() + 1,
            day: d.getDate(),
            hour: d.getHours(),
            minute: d.getMinutes(),
            second: d.getSeconds(),
            millisecond: d.getMilliseconds()
        };
    },

    /**
     * 将时间转换为友好的显示格式
     * @param {Date|String|Number} date 日期对象、日期字符串或时间戳
     * @return {String} 友好的时间显示
     */
    friendlyTime(date) {
        const d = this.parseDate(date);
        const now = new Date();
        const diff = now.getTime() - d.getTime();

        // 小于1分钟
        if (diff < 60 * 1000) {
            return '刚刚';
        }

        // 小于1小时
        if (diff < 60 * 60 * 1000) {
            return Math.floor(diff / (60 * 1000)) + '分钟前';
        }

        // 小于1天
        if (diff < 24 * 60 * 60 * 1000) {
            return Math.floor(diff / (60 * 60 * 1000)) + '小时前';
        }

        // 小于30天
        if (diff < 30 * 24 * 60 * 60 * 1000) {
            return Math.floor(diff / (24 * 60 * 60 * 1000)) + '天前';
        }

        // 小于12个月
        if (diff < 12 * 30 * 24 * 60 * 60 * 1000) {
            return Math.floor(diff / (30 * 24 * 60 * 60 * 1000)) + '个月前';
        }

        // 大于等于12个月
        return Math.floor(diff / (12 * 30 * 24 * 60 * 60 * 1000)) + '年前';
    }
};

export default DateUtil;