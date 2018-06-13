let Report = {
    tableWidth: Number,                                                      // 报表的宽度
    tableHeight: Number,                                                     // 报表的长度
    tabelHeaderHeight: Number,                                               // 报表表头的高度
    tableHeaderData: [Array],                                                // 报表表头的内容
    tableBodyData: [Array],                                                  // 报表本体的内容
    styleList: [{                                                            // 单元格样式列表
        pos: String,                                                         // 单元格的位置,格式为:`${row},${col}`
        style: {                                                             // 
            color: String,                                                   // 字体颜色
            backgroud: String,                                               // 背景颜色
            fontSize: String                                                 // 字体大小
        }                                                                    // 
    }],                                                                      // 
    customRowHeight: [                                                       // 自定义的行高,表示哪几行是通过手动修改过行高.
        [Number('rowNumber'), Number('height')]                              // 格式是[rowNumber, height] => [1, 20]
    ],                                                                       // 
    customColWidth: [                                                        // 自定义的列宽,表示哪几列是通过手动修改过列宽.
        [Number('columnNumber'), Number('width')]                            // 格式是[columnNumber, width] => [1, 20]
    ],                                                                       // 
                                                                             // 
    formulaList: [                                                           // 自定义的函数列表
        [                                                                    // 
            String('pos'),                                                   // 该表达式的位置
            String('method'),                                                // 方法名称
            String('arguments0'),                                            // 参数名称
            String('arguments1'),                                            // 
            ...                                                              // 格式为[pos, method, arg0, arg1 ....] => ['2,1', 'SUM', '$Data.regular', '$Data.emergency']
        ]                                                                    // 
    ],                                                                       // 
    paramList: [String],                                                     // 需要后台查询的数据列表. 如=>['$Data.regular', '$Data.emergency']
    mergeCells: [{                                                           // 合并的单元格的集合.
        col: Number,                                                         // 左上角单元格的col
        colspan: Number,                                                     // 合并了几列
        row: Number,                                                         // 左上角单元格的row
        rowspan: Number                                                      // 合并了几行
    }]                                                                       // 
}                                                                            // 