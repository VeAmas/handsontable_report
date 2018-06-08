window.onload = function() {
	// optionBar
	var xAxisData = [];
	var data1 = [];
	var data2 = [];
	for (var i = 0; i < 100; i++) {
	    xAxisData.push('类目' + i);
	    data1.push((Math.sin(i / 5) * (i / 5 -10) + i / 6) * 5);
	    data2.push((Math.cos(i / 5) * (i / 5 -10) + i / 6) * 5);
	}
	optionBar = {
	    title: {
	        text: '柱状图'
	    },
	    // legend: {
	    //     data: ['bar', 'bar2'],
	    //     align: 'left'
	    // },
	    // toolbox: {
	    //     // y: 'bottom',
	    //     feature: {
	    //         magicType: {
	    //             type: ['stack', 'tiled']
	    //         },
	    //         dataView: {},
	    //         saveAsImage: {
	    //             pixelRatio: 2
	    //         }
	    //     }
	    // },
	    tooltip: {},
	    xAxis: {
	        data: xAxisData,
	        silent: false,
	        splitLine: {
	            show: false
	        }
	    },
	    yAxis: {
	    },
	    series: [
		    {
		        name: 'bar',
		        type: 'bar',
		        data: data1,
		        animationDelay: function (idx) {
		            return idx * 10;
		        }
		    }, 
		    {
		        name: 'bar2',
		        type: 'bar',
		        data: data2,
		        animationDelay: function (idx) {
		            return idx * 10 + 100;
		        }
		    }
	    ],
	    backgroundColor: 'rgb(255,255,255)',
	    animationEasing: 'elasticOut',
	    animationDelayUpdate: function (idx) {
	        return idx * 5;
	    }
	};

	// optionLine
	var base = +new Date(1968, 9, 3);
	var oneDay = 24 * 3600 * 1000;
	var date = [];
	var data = [Math.random() * 300];
	for (var i = 1; i < 20000; i++) {
	    var now = new Date(base += oneDay);
	    date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
	    data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
	}
	optionLine = {
	    tooltip: {
	        trigger: 'axis',
	        position: function (pt) {
	            return [pt[0], '10%'];
	        }
	    },
	    title: {
	        left: 'center',
	        text: '大数据量面积图',
	    },
	    // toolbox: {
	    //     feature: {
	    //         dataZoom: {
	    //             yAxisIndex: 'none'
	    //         },
	    //         restore: {},
	    //         saveAsImage: {}
	    //     }
	    // },
	    xAxis: {
	        type: 'category',
	        boundaryGap: false,
	        data: date
	    },
	    yAxis: {
	        type: 'value',
	        boundaryGap: [0, '100%']
	    },
	    // dataZoom: [{
	    //     type: 'inside',
	    //     start: 0,
	    //     end: 10
	    // }, {
	    //     start: 0,
	    //     end: 10,
	    //     handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
	    //     handleSize: '80%',
	    //     handleStyle: {
	    //         color: '#fff',
	    //         shadowBlur: 3,
	    //         shadowColor: 'rgba(0, 0, 0, 0.6)',
	    //         shadowOffsetX: 2,
	    //         shadowOffsetY: 2
	    //     }
	    // }],
	    series: [
	        {
	            name:'模拟数据',
	            type:'line',
	            smooth:true,
	            symbol: 'none',
	            sampling: 'average',
	            itemStyle: {
	                normal: {
	                    color: 'rgb(255, 70, 131)'
	                }
	            },
	            areaStyle: {
	                normal: {
	                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
	                        offset: 0,
	                        color: 'rgb(255, 158, 68)'
	                    }, {
	                        offset: 1,
	                        color: 'rgb(255, 70, 131)'
	                    }])
	                }
	            },
	            data: data
	        }
	    ],
	    backgroundColor: 'rgb(255, 255, 255)'
	};

	// optionPie
	// var weatherIcons = {
	//     'Sunny': './data/asset/img/weather/sunny_128.png',
	//     'Cloudy': './data/asset/img/weather/cloudy_128.png',
	//     'Showers': './data/asset/img/weather/showers_128.png'
	// };
	optionPie = {
	    title: {
	        text: '天气情况统计',
	        subtext: '虚构数据',
	        left: 'center'
	    },
	    tooltip : {
	        trigger: 'item',
	        formatter: "{a} <br/>{b} : {c} ({d}%)"
	    },
	    legend: {
	        // orient: 'vertical',
	        // top: 'middle',
	        bottom: 10,
	        left: 'center',
	        data: ['西凉', '益州','兖州','荆州','幽州']
	    },
	    series : [
	        {
	            type: 'pie',
	            radius : '65%',
	            center: ['50%', '50%'],
	            selectedMode: 'single',
	            data:[
	                {
	                    value:1548,
	                    name: '幽州',
	                    // label: {
	                    //     normal: {
	                    //         formatter: [
	                    //             '{title|{b}}{abg|}',
	                    //             '  {weatherHead|天气}{valueHead|天数}{rateHead|占比}',
	                    //             '{hr|}',
	                    //             '  {Sunny|}{value|202}{rate|55.3%}',
	                    //             '  {Cloudy|}{value|142}{rate|38.9%}',
	                    //             '  {Showers|}{value|21}{rate|5.8%}'
	                    //         ].join('\n'),
	                    //         backgroundColor: '#eee',
	                    //         borderColor: '#777',
	                    //         borderWidth: 1,
	                    //         borderRadius: 4,
	                    //         rich: {
	                    //             title: {
	                    //                 color: '#eee',
	                    //                 align: 'center'
	                    //             },
	                    //             abg: {
	                    //                 backgroundColor: '#333',
	                    //                 width: '100%',
	                    //                 align: 'right',
	                    //                 height: 25,
	                    //                 borderRadius: [4, 4, 0, 0]
	                    //             },
	                    //             Sunny: {
	                    //                 height: 30,
	                    //                 align: 'left',
	                    //                 backgroundColor: {
	                    //                     image: weatherIcons.Sunny
	                    //                 }
	                    //             },
	                    //             Cloudy: {
	                    //                 height: 30,
	                    //                 align: 'left',
	                    //                 backgroundColor: {
	                    //                     image: weatherIcons.Cloudy
	                    //                 }
	                    //             },
	                    //             Showers: {
	                    //                 height: 30,
	                    //                 align: 'left',
	                    //                 backgroundColor: {
	                    //                     image: weatherIcons.Showers
	                    //                 }
	                    //             },
	                    //             weatherHead: {
	                    //                 color: '#333',
	                    //                 height: 24,
	                    //                 align: 'left'
	                    //             },
	                    //             hr: {
	                    //                 borderColor: '#777',
	                    //                 width: '100%',
	                    //                 borderWidth: 0.5,
	                    //                 height: 0
	                    //             },
	                    //             value: {
	                    //                 width: 20,
	                    //                 padding: [0, 20, 0, 30],
	                    //                 align: 'left'
	                    //             },
	                    //             valueHead: {
	                    //                 color: '#333',
	                    //                 width: 20,
	                    //                 padding: [0, 20, 0, 30],
	                    //                 align: 'center'
	                    //             },
	                    //             rate: {
	                    //                 width: 40,
	                    //                 align: 'right',
	                    //                 padding: [0, 10, 0, 0]
	                    //             },
	                    //             rateHead: {
	                    //                 color: '#333',
	                    //                 width: 40,
	                    //                 align: 'center',
	                    //                 padding: [0, 10, 0, 0]
	                    //             }
	                    //         }
	                    //     }
	                    // }
	                },
	                {value:535, name: '荆州'},
	                {value:510, name: '兖州'},
	                {value:634, name: '益州'},
	                {value:735, name: '西凉'}
	            ],
	            itemStyle: {
	                emphasis: {
	                    shadowBlur: 10,
	                    shadowOffsetX: 0,
	                    shadowColor: 'rgba(0, 0, 0, 0.5)'
	                }
	            }
	        }
	    ],
	   	backgroundColor: 'rgb(255, 255, 255)'
	};

	var body = document.body;
	var parrentDom = document.getElementsByClassName('wtHider')[0];

	/**
	 * 创建图表视图
	 * @param  {string} type 图表类型
	 * @return {void}      null
	 */
	function create(type) {
		var type = type || '';
		// 图表容器
		var chartDom = document.createElement('div');
		chartDom.id = 'chart-' + type + '-' + new Date().getTime();
		chartDom.style.background = 'red';
		chartDom.style.width = '500px';
		chartDom.style.height = '300px';
		chartDom.style.position = 'absolute';
		chartDom.style.top = '40px';
		chartDom.style.left = '65px';
		chartDom.style.zIndex = 100;
		// 缩放边框
		var scaleBlock1 = document.createElement('div');
		var scaleBlock2 = document.createElement('div');
		var scaleBlock3 = document.createElement('div');
		var scaleBlock4 = document.createElement('div');

		// 删除按钮
		var delButton = document.createElement('button');
		delButton.innerHTML = '删除';
		delButton.onclick = function(e) {
			parrentDom.removeChild(chartDom)
		};
		// echarts 根据不同类型，渲染图表
		var chart = echarts.init(chartDom);
		let option = type === 'bar' ? optionBar 
						: type === 'line' ? optionLine
						: optionPie
		chart.setOption(option);

		chartDom.append(delButton);
		parrentDom.append(chartDom);
		move(chartDom);
		scale(chartDom, chart);
	};
	
	/**
	 * 自定义图标大小
	 * @param  {object} dom 操作的DOM元素
	 * @return {void}     null
	 */
	function scale(dom, chart) {
		var block1 = document.createElement('div');
		block1.className = 'block';
		block1.style.position = "absolute";
		block1.style.width = 10 + 'px';
		block1.style.height = 10 + 'px';
		block1.style.background = 'black';
		block1.style.bottom = - 5  + 'px';
		block1.style.right = - 5  + 'px';
		block1.style.cursor = 'pointer';
		dom.appendChild(block1);
		var posX = 0, posY = 0, oTop = 0, oLeft = 0, oWidth=0, oHeight=0;

		block1.onmousedown = function(e) {
			e.stopPropagation();
			posX = e.clientX;
			posY = e.clientY;
			oTop = dom.style.top;
			oLeft = dom.style.left;
			oWidth = dom.offsetWidth;
			oHeight = dom.offsetHeight;

			document.onmousemove = function(e) {
				e.stopPropagation();
				dom.style.width = oWidth + (e.clientX - posX) + 'px';
				dom.style.height = oHeight + (e.clientY - posY) + 'px';
				chart.resize();
				
				document.onmouseup = function(e) {
					e.stopPropagation();
					document.onmousemove = null;
					document.onmouseup = null;
				}
			}
		};
	}

	/**
	 * 移动图表
	 * @param  {object} dom 移动的Dom元素
	 * @return {void}    	null
	 */
	function move(dom) {
		var top = 0, left = 0;
		var parentDom = dom.parentElement;
		dom.addEventListener('mousedown', function(e){
			dom.style.zIndex = 1000;
			var iDisX = iDisY = 0;
			// 计算鼠标点击位置，获取距离图表top 和 left
			iDisX = e.clientX - dom.offsetLeft;
			iDisY = e.clientY - dom.offsetTop;
			var handleMouseMove = function(e){
				e = e || window.event;
				e.stopPropagation();
				// 计算弹窗随鼠标位置移动的offsetLeft 和 offsetTop
				var iLeft = e.clientX - iDisX;
				var iTop = e.clientY - iDisY;
				if (iLeft < 70) {
					iLeft = 52;
				}
				// 弹框移动的top距离不能超出, 窗口-弹窗高度
				if (iTop > parentDom.clientHeight - dom.offsetHeight) {
					iTop = parentDom.clientHeight - dom.offsetHeight
				}
				// 弹框移动的left距离不能超出，窗口-弹框宽度
				if(iLeft > parentDom.clientWidth-dom.offsetWidth){
					iLeft = parentDom.clientWidth-dom.offsetWidth;
				}
				if(iTop < 35){
					iTop = 27;
				}
				dom.style.left = iLeft + 'px';
				//前提是需要先给元素定位
				dom.style.top = iTop +'px';
			}
			document.addEventListener('mousemove', handleMouseMove);
			document.onmouseup = function(e){
				dom.style.zIndex = 100;
				e.stopPropagation();
				document.removeEventListener('mousemove', handleMouseMove);
			};
		});
	}

	window.chart = {
		create: create,
	}
}

