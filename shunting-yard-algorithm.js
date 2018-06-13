
        function sya (input) {
            var formulaList = [
                'SUM',
                'MAX',
                'MIN',
                'TOFIXED'
            ]
            var regexList = formulaList.map(v => new RegExp('^' + v))
            var pop = function (obj) {
                var str = obj.input.trim();
                var value = str[0];
                if (['+', '-', '*', '/', '^', '%', '(', ')', ','].indexOf(value) > -1) {
                    if (outputList.length === 0 && ['+', '-'].indexOf(value) > -1) { return{type: 'number', input, next: '0'} }
                    return {
                        type: 'o',
                        input: str.substr(1),
                        next: value
                    }
                } else {
                    for (var i = 0; i < formulaList.length; i++) {
                        if (regexList[i].test(str)) {
                            if (outputList.length === 0) { return{type: 'n', input: '+' + input, next: '0'} }
                            var formula = formulaList[i]
                            str = str.replace(regexList[i], '')
                            return {
                                type: 'o',
                                subType: 'm',
                                input: str,
                                next: formula
                            }
                        }
                    }
                    var next;
                    var subType;
                    if (/^\$\([\S\s]*?\)/.test(str)) {
                        next = str.match(/^(\$\([\S\s]*?\))/)[1];
                        str = str.replace(/^(\$\([\S\s]*?\))/, '');
                        subType = 'e';
                    } else if (/^[A-Z]{1,}[0-9]{1,}/.test(str)) {
                        next = str.match(/^[A-Z]{1,}[0-9]{1,}/)[0];
                        str = str.replace(/^[A-Z]{1,}[0-9]{1,}/, '');
                        subType = 'c';
                    } else {
                        next = str.match(/^[0-9]+([.]{1}[0-9]+){0,1}/)[0];
                        str = str.substr(next.length)
                    }
                    return {
                        type: 'n',
                        input: str,
                        next,
                        subType
                    }
                }
            }

            function checkPriority (o) {
                for (var i = 0; i < priorityList.length; i++) {
                    if (priorityList[i].find(v => v === o)) {
                        return i;
                    }
                }
            }

            function comparePriority(next) {
                var last = oerationList[oerationList.length - 1]
                if (last === '(') { 
                    return false
                }
                var nextPriority = checkPriority(next)
                var lastPriority = checkPriority(last)
                if (formulaList.indexOf(next) > -1 && last === ',') {
                    return false;
                }
                if (nextPriority === lastPriority) {
                    return noPoOperations.indexOf(next) === -1;
                } else if (nextPriority > lastPriority) {
                    return true;
                }
            }

            var next;
            var type;
            var outputList = [];
            var oerationList = [];
            var priorityList = [
                ['(', ')', ','],
                formulaList,
                ['^'],
                ['*', '/'],
                ['%'],
                ['+', '-']
            ]
            var noPoOperations = [',', '^'];


            while (input.length) {
                ({next, type, input, subType} = pop({input}))
                if (type === 'o') {
                    if (next === ')') {
                        while (oerationList.length > 0 && oerationList[oerationList.length - 1] != '(') {
                            var last = oerationList.pop()
                            outputList.push({value: last, type});                            
                        }
                        if (oerationList.length === 0) {
                            new Error('error');
                            return;
                        }
                        oerationList.pop()
                        var formulaLike =  oerationList[oerationList.length - 1]
                        if (formulaList.indexOf(formulaLike) > -1) {
                            oerationList.pop();
                            outputList.push({value: formulaLike, type: 'm'});
                        }
                    } else {
                        while (oerationList.length > 0 && comparePriority(next)) {
                            var last = oerationList.pop()
                            outputList.push({value: last, type: subType || type});
                        }
                        oerationList.push(next)
                    }
                } else {
                    outputList.push({value: isNaN(+next) ? next : (+next), type: subType || type});
                }
            }
            if (oerationList.length > 0) {
                oerationList.reverse().forEach(v => outputList.push({value: v, type: 'o'}));
            }
            // console.log(outputList);
            // console.log(calc(outputList))
            return outputList
        }