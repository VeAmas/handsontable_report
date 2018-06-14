        // 调度场算法
        // 将输入的表达式转换成逆波兰表达式
        // 例如'1+1' => [1, 1, '+']
        function sya (input) {
            // 用于解析的方法名
            var formulaList = [
                'SUM',
                'MAX',
                'MIN',
                'TOFIXED'
            ]
            // 用来筛选方法名的正则
            // 例如 /^SUM/
            var regexList = formulaList.map(v => new RegExp('^' + v))

            // 导出输入表达式中最前面的一个值
            var pop = function (obj) {
                // 去掉空格 ' 1+1' => '1+1'
                var str = obj.input.trim();
                var value = str[0];
                // 判断第一个字符是不是运算符号
                if (['+', '-', '*', '/', '^', '%', '(', ')', ','].indexOf(value) > -1) {
                    // 如果是整个表达式的第一个符号 且为 + 或者 - 就返回0
                    // '-(1+1)' => '0-(1+1)'
                    if (outputList.length === 0 && ['+', '-'].indexOf(value) > -1) { return{type: 'number', input, next: '0'} }
                    // 否则就返回第一运算符
                    return {
                        type: 'o',
                        input: str.substr(1),
                        next: value
                    }
                } else {
                    // 判断第一个值是不是方法名
                    for (var i = 0; i < formulaList.length; i++) {
                        if (regexList[i].test(str)) {
                            // 如果整个表达式第一个值是一个方法,那么在表达式前加上0+ 比如: 'SUM(1,2)' => '0+SUM(1,2)'
                            if (outputList.length === 0) { return{type: 'n', input: '+' + input, next: '0'} }
                            var formula = formulaList[i]
                            // 否则返回该方法
                            str = str.replace(regexList[i], '')
                            return { // 子类型是m(method)
                                type: 'o',
                                subType: 'm',
                                input: str,
                                next: formula
                            }
                        }
                    }
                    var next;
                    var subType;
                    // 判断是不是查询表达式 例如'$(xxxxx)'
                    if (/^\$\([\S\s]*?\)/.test(str)) {
                        next = str.match(/^(\$\([\S\s]*?\))/)[1];
                        str = str.replace(/^(\$\([\S\s]*?\))/, '');
                        subType = 'e'; // 子类型是e(expression)
                    // 判断是不是单元格 例如'D4'
                    } else if (/^[A-Z]{1,}[0-9]{1,}/.test(str)) {
                        next = str.match(/^[A-Z]{1,}[0-9]{1,}/)[0];
                        str = str.replace(/^[A-Z]{1,}[0-9]{1,}/, '');
                        subType = 'c'; // 子类型是c(cell)
                    // 否则就是数值了
                    } else {
                        next = str.match(/^[0-9]+([.]{1}[0-9]+){0,1}/)[0];
                        str = str.substr(next.length)
                    }
                    // 查询表达式/单元格/数值主类型都是n(number) 但是有自己的子类型
                    return {
                        type: 'n',
                        input: str,
                        next,
                        subType
                    }
                }
            }

            // 计算运算符的优先级
            function checkPriority (o) {
                // 返回运算符在优先级列表中的位置
                for (var i = 0; i < priorityList.length; i++) {
                    if (priorityList[i].find(v => v === o)) {
                        return i;
                    }
                }
            }

            // 比较优先级
            // 如果返回true则表示需要进行特殊操作.具体见调用的地方
            function comparePriority(next) {
                // last是表达式列表的最后一个
                var last = oerationList[oerationList.length - 1]
                // 如果last是'('则
                if (last === '(') { 
                    return false
                }
                // 计算两个运算符的优先级
                var nextPriority = checkPriority(next)
                var lastPriority = checkPriority(last)
                // 方法前是','的话不需要进行特殊操作
                if (formulaList.indexOf(next) > -1 && last === ',') {
                    return false;
                }
                // 如果优先级一样则需要用noPopOperations来检测
                if (nextPriority === lastPriority) {
                    return noPopOperations.indexOf(next) === -1;
                } else if (nextPriority > lastPriority) {
                    return true;
                }
            }

            var next;
            var type;
            var outputList = [];
            var oerationList = [];
            // 运算符优先级列表
            var priorityList = [
                ['(', ')'],
                formulaList,
                ['^'],
                ['*', '/'],
                ['%'],
                ['+', '-'],
                [',']
            ]
            // 比较特殊的同级运算符, 比如','不应该把','顶掉, '^'不应该把'^'顶掉
            var noPopOperations = [',', '^'];


            // 正式开始计算
            while (input.length) {
                // 获取表达式的下一个值
                // 同时更新input
                ({next, type, input, subType} = pop({input})) // 一开始是因为直接传字符串在方法里修改没效果,但是最后改变了形式,其实直接pop(input)也可以,但是懒得改了.
                // 主类型是运算符的情况(运算符和方法)
                if (type === 'o') {
                    if (next === ')') {
                        // 如果下一个是')',则要把到下一个'('之前的所有运算符全部弹出到outputList
                        while (oerationList.length > 0 && oerationList[oerationList.length - 1] != '(') {
                            var last = oerationList.pop()
                            outputList.push({value: last, type});   // 因为方法一定会被他后面的括号给弹掉,所以这里出现的一定不是方法.所以没有用subType                         
                        }
                        // 如果没找到'(',说明括号数量不匹配
                        if (oerationList.length === 0) {
                            new Error('error');
                            return;
                        }
                        // 把与next的')'相匹配的'('弹掉.
                        oerationList.pop()
                        // 如果运算符列表中的最后一个是方法的话,也把方法弹到outputList中
                        var formulaLike =  oerationList[oerationList.length - 1]
                        if (formulaList.indexOf(formulaLike) > -1) {
                            oerationList.pop();
                            outputList.push({value: formulaLike, type: 'm'});
                        }
                    } else {
                        // 循环判断如果comparePriority方法返回true时,则将前一个运算符弹入outputList
                        while (oerationList.length > 0 && comparePriority(next)) {
                            var last = oerationList.pop()
                            outputList.push({value: last, type: type}); // 因为方法不会把','弹掉, 所以这里出现的只有运算符(op)
                        }
                        oerationList.push(next)
                    }
                } else {
                    // 是数值的话压入outputList
                    outputList.push({value: isNaN(+next) ? next : (+next), type: subType || type});
                }
            }
            // 如果结束之后运算符列表中还有东西,则反向压入outputList
            if (oerationList.length > 0) {
                oerationList.reverse().forEach(v => outputList.push({value: v, type: 'o'}));
            }
            // console.log(outputList);
            // console.log(calc(outputList))
            return outputList
        }