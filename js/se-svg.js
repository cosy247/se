/********************************************************************************************************************/
/**************************************************     svg模块    **************************************************/
/********************************************************************************************************************/
(function (factory) {

    typeof window.se == "undefined" ? window.se = {} : true;
    factory(window.se);

}(function (se) {

    let mo = {};

    /************************* 主模块 *************************/
    {
        /**
         * @function 获取一个se.svg模块
         * @param {string} svger 查找svg标签标准
         */
        let svg = function (svger) {

            /************************* 私有属性 *************************/

            let _svg = document.querySelector(svger); // svg标签
            if (!_svg) {
                console.error("svg 查找错误！");
                return;
            }

            let _svgNameSpace = 'http://www.w3.org/2000/svg'; // 命名空间
            let _shapeArrary = new Array;   // 图形作用队列

            let _workSpace = _svg;

            /************************* 私有方法 *************************/

            function _getWorkSpace() {
                return _workSpace;
            }

            function _setWorkSpace(workSpace) {
                _workSpace = workSpace;
            }

            /**
             * @function 创建一个元素并使其透明
             * @param {string} shapeName 创建的元素名
             * @return {array} 只包含刚创建的元素
             */
            function _createShape(shapeName) {
                var shape = document.createElementNS(_svgNameSpace, shapeName);
                // shape.setAttribute('fill', 'transparent');
                // shape.setAttribute('stroke', 'transparent');
                return [shape];
            }

            /**
             * @function 设置元素列表
             * @param {Array} array 元素列表
             * @param {bool} isPush 是否为追加
             */
            function _setShapeArray(array, isPush) {
                _shapeArrary = isPush == true ? _shapeArrary.concat(array) : array;
            }

            /**
             * @function 获得元素列表
             * @returns 返回元素列表
             */
            function _getShape(index) {
                if (typeof index == "undefined") {
                    return _shapeArrary;
                } else {
                    return _shapeArrary[index];
                }
            }

            /**
             * @function 让列表中没有元素作为参数运行一次函数
             * @param {function} fun 运行函数
             */
            function _each(fun) {
                let shapeArray = _getShape();
                for (let i = 0; i < shapeArray.length; i++) {
                    fun(shapeArray[i], i);
                }
            }

            /**
             * @function 显示传入列表中所有元素在svg中
             * @param {array} shapeArray 元素列表
             */
            function _showShapeArray(shapeArray) {
                for (const shape of shapeArray) {
                    _getWorkSpace().appendChild(shape);
                }
            }

            /**
             * @function 在svg中添加一个元素并改变元素列表
             * @param {string} shapeName 元素名
             */
            function _appendShape(shapeName) {
                let newArr = _createShape(shapeName);
                _setShapeArray(newArr);
                _showShapeArray(newArr);
            }

            /************************* 接口方法 *************************/

            /************** 工具接口 **************/

            /**
             * 
             */
            function select(selector) {
                _setShapeArray(_getWorkSpace().querySelectorAll(selector));
                return moudle;
            }

            /**
             * @function 对元素列表中所有元素进行克隆并更新元素列表
             * @param {number} sum 克隆数
             * @returns 返回模块
             */
            function clone(sum) {
                let newArr = new Array;
                _each((shape) => {
                    for (let i = 0; i < sum; i++) {
                        let clonedShape = shape.cloneNode(true); // 克隆节点
                        _getWorkSpace().appendChild(clonedShape);
                        newArr.push(clonedShape);
                    }
                })
                _setShapeArray(newArr, true);
                return moudle;
            }

            /**
             * @function 为元素列表所有元素设置属性
             * @param {string} attrName 属性名
             * @param {*} attrValue 属性值
             * @returns 返回模块
             */
            function setAttr(attrName, attrValue) {
                if (typeof attrValue == "undefined") {  // 如果没有传入属性值将不操作
                    return moudle;
                }
                _each((shape) => {
                    shape.setAttribute(attrName, attrValue);
                    shape[attrName] = attrValue;
                })
                return moudle;
            }

            function setAttrs(attrKV) {
                for (const attrName in attrKV) {
                    if (Object.hasOwnProperty.call(attrKV, attrName)) {
                        setAttr(attrName, attrKV[attrName]);
                    }
                }
                return moudle;
            }

            /**
             * @function 获取元素列表第一个元素的属性值
             * @param {string} attrName 属性名
             * @returns 返回第一个元素属性值
             */
            function getAttr(attrName) {
                let attrValue = _getShape(0).getAttribute(attrName);
                if (attrValue == null) {
                    attrValue = _getShape(0).attrName;
                }
                return attrValue;
            }

            /**
             * @function 使元素列表中每个元素作为一个moudle作为参数运行函数
             * @param {function} fun 执行函数
             * @returns 返回模块
             */
            function each(fun) {
                let oldArr = _getShape();
                _each((shape, index) => {
                    _setShapeArray([shape]);
                    fun(moudle, index);
                })
                _setShapeArray(oldArr);
                return moudle;
            }

            /**
             * @function 为元素列表的每个元素添加事件
             * @param {string} type 事件类型
             * @param {function} callback 回调函数
             * @param {bool} capture 函数执行方式
             * @returns 返回模块
             */
            function on(type, callback, capture) {
                capture == false ? true : capture = true;
                _each((shape) => {
                    shape.addEventListener(type, callback, capture);
                })
                return moudle;
            }

            function setCont(cont) {
                _each((shape) => {
                    if (shape.tagName == "text") {
                        shape.innerHTML = cont;
                    }
                })
                return moudle;
            }

            function getCont() {
                _each((shape) => {
                    if (shape.attr("nodeName") == "text") {
                        return shape.innerHTML;
                    }
                })
                return "";
            }

            function g(id) {
                let g = _svg.querySelector("g#" + id);
                if (g == null) {
                    g = document.createElementNS(_svgNameSpace, 'g');
                    g.setAttribute('id', id);
                    _getWorkSpace().appendChild(g);
                }
                _setShapeArray([g])
                _setWorkSpace(g);
                return moudle;
            }

            function out() {
                _setWorkSpace(_svg);
                return moudle;
            }

            function empty() {
                return _getShape().length == 0;
            }

            function style(styleName, styleValue) {
                _each((shape) => {
                    shape.style[styleName] = styleValue;
                })
                return moudle;
            }

            /************** 图形接口 **************/

            /**
             * @function 创建一个矩形
             * @param {number} x x值
             * @param {number} y y值
             * @param {number} w 宽
             * @param {number} h 高
             * @param {string} anchor 矩形锚点，默认左上，l c r t m b 对应 左中右 上中下
             * @returns 返回模块
             */
            function rect(x, y, w, h, anchor) {
                if (anchor.indexOf('c') >= 0) {
                    x -= w / 2;
                } else if (anchor.indexOf('r') >= 0) {
                    x -= w;
                }
                if (anchor.indexOf('m') >= 0) {
                    y -= h / 2;
                } else if (anchor.indexOf('b') >= 0) {
                    y -= h;
                }
                _appendShape("rect");
                setAttr("x", x);
                setAttr("y", y);
                setAttr("width", w);
                setAttr("height", h);
                return moudle;
            }

            /**
             * @function 创建一个圆
             * @param {number} cx 圆心x值
             * @param {numebr} cy 圆心y值
             * @param {number} r 圆半径
             * @returns 返回模块
             */
            function circle(cx, cy, r) {
                _appendShape("rect");
                setAttr("cx", cx);
                setAttr("cy", cy);
                setAttr("r", r);
                return moudle;
            }

            /**
             * @function 创建一个椭圆
             * @param {number} cx 圆心x值
             * @param {numebr} cy 圆心y值
             * @param {number} rx x轴
             * @param {number} ry y轴
             * @returns 返回模块
             */
            function ellipse(cx, cy, rx, ry) {
                _appendShape("ellipse");
                setAttr("cx", cx);
                setAttr("cy", cy);
                setAttr("rx", rx);
                setAttr("ry", ry);
                return moudle;
            }

            /**
             * @function 创建一条线段
             * @param {number} x1 起点x值
             * @param {number} y1 起点y值
             * @param {number} x2 终点x值
             * @param {number} y2 终点y值
             * @returns 返回模块
             */
            function line(x1, y1, x2, y2) {
                _appendShape("line");
                setAttr("x1", x1);
                setAttr("y1", y1);
                setAttr("x2", x2);
                setAttr("y2", y2);
                return moudle;
            }

            /**
             * @function 创建一条折现
             * @param {string} points 折现各点表达 "2,4 3,9 8,0 2,3"
             * @returns 返回模块
             */
            function polyline(points) {
                _appendShape("polyline");
                setAttr("points", points);
                return moudle;
            }

            /**
             * @function 创建一条path路径
             * @param {string} d 路径表达式
             */
            function path(d) {
                _appendShape("path");
                setAttr("d", d);
                return moudle;
            }

            function text(x, y, cont, anchor) {
                _appendShape("text");
                setAttr("x", x);
                setAttr("y", y);
                setAttr("innerHTML", cont);
                if (typeof anchor != "undefined") {
                    if (anchor.indexOf('c') >= 0) {
                        setAttr("text-anchor", "middle");
                    } else if (anchor.indexOf('r') >= 0) {
                        setAttr("text-anchor", "end");
                    }
                    if (anchor.indexOf('t') >= 0) {
                        setAttr("dominant-baseline", "hanging");
                    } else if (anchor.indexOf('m') >= 0) {
                        setAttr("dominant-baseline", "middle");
                    }
                }
                return moudle;
            }

            /************************* 模块定义 *************************/

            let moudle = {

                // 工具接口
                select: select,
                clone: clone,
                each: each,
                on: on,
                attr: (p1, p2) => { return typeof p2 == "undefined" ? getAttr(p1) : setAttr(p1, p2) },
                attrs: setAttrs,
                cont: (p1) => { return typeof p1 == "undefined" ? getCont() : setCont(p1) },
                g: g,
                out: out,
                empty: empty,
                style: style,

                // 图形接口
                rect: rect,
                circle: circle,
                ellipse: ellipse,
                line: line,
                path: path,
                polyline: polyline,
                text: text,

                // 图形封装
                axis: (p1) => { return axis(moudle, p1) },
                stack: (p1) => { return stack(moudle, p1) },
                pathAnime: (p1) => { return pathAnime(moudle, p1) },
            }

            return moudle;
        }

        mo = svg;
    }

    /************************* path元素d转换模块 *************************/

    {
        /**
         * @function 通过两点获取path圆弧表达式
         * @param {number} x1 起点x值
         * @param {number} y1 起点y值
         * @param {number} x2 终点x值
         * @param {number} y2 终点y值
         * @param {number} rx 椭圆x轴
         * @param {number} ry 椭圆y轴
         * @param {number} rotation 旋转度数
         * @param {bool} largeArc 是否为大弧
         * @param {bool}} sweep 是否为顺时针
         * @returns 返回圆弧表达式
         */
        function getDOfArc(x1, y1, x2, y2, rx, ry, rotation, largeArc, sweep) {
            return d = 'M' + x1 + ' ' + y1 + ' A' + rx + ' ' + ry + ' ' + rotation + ' ' + (largeArc ? 1 : 0) + ' ' + (sweep ? 1 : 0) + ' ' + x2 + ' ' + y2;
        }

        /**
         * @function 通过圆心获取path圆弧表达式
         * @param {number} cx 圆心x值
         * @param {number} cy 圆心y值
         * @param {number} rx 椭圆x轴
         * @param {number} ry 椭圆y轴
         * @param {number} angle1 起始角度
         * @param {number} angle2 终点角度
         * @param {number} rotation 旋转角度
         * @returns 返回圆弧表达式
         */
        function getDOfArc2(cx, cy, rx, ry, angle1, angle2, rotation) {
            typeof rotation == "undefined" ? rotation = 0 : ture;
            let x1 = cx + rx * Math.cos(angle1);
            let y1 = cy + rx * Math.sin(angle1);
            let x2 = cx + ry * Math.cos(angle2);
            let y2 = cy + ry * Math.sin(angle2);
            let largeArc = rotation > Math.PI ? 1 : 0;
            let sweep = 0;
            return arc(x1, y1, x2, y2, rx, ry, rotation, largeArc, sweep);
        }

        /**
         * @function 获取path贝瑟瑞二次曲线表达式
         * @param {number} startX 起点x值
         * @param {number} startY 起点y值
         * @param {number} endX 终点x值
         * @param {numebr} endY 终点y值
         * @param {number} x 控制点x值
         * @param {numebr} y 控制点y值
         * @param {bool} isRe 是否为相对坐标，默认为false
         * @returns 返回贝瑟瑞二次表达式
         */
        function getDOfBezier2(startX, startY, endX, endY, x, y, isRe) {
            isRe == true ? true : isRe = false;
            return d = 'M' + startX + ' ' + startY + (isRe ? ' s' : ' S') + x + ' ' + y + ', ' + endX + ' ' + endY;
        }

        /**
         * @function 获取path贝瑟瑞三次曲线表达式
         * @param {number} startX 起点x值
         * @param {number} startY 起点y值
         * @param {number} endX 终点x值
         * @param {numebr} endY 终点y值
         * @param {number} x1 起点控制点x值
         * @param {numebr} y1 起点控制点y值
         * @param {number} x2 终点控制点x值
         * @param {numebr} y2 终点控制点y值
         * @param {bool} isRe 是否为相对坐标，默认为false
         * @returns 返回贝瑟瑞三次表达式
         */

        function getDOfBezier3(startX, startY, endX, endY, x1, y1, x2, y2, isRe) {
            isRe == true ? true : isRe = false;
            return d = 'M' + startX + ' ' + startY + (isRe ? ' c' : ' C') + x1 + ' ' + y1 + ', ' + x2 + ' ' + y2 + ', ' + endX + ' ' + endY;
        }

        /************************* 模块定义 *************************/

        let d = {
            arc: getDOfArc,
            arc2: getDOfArc2,
            bezier2: getDOfBezier2,
            bezier3: getDOfBezier3,
        }

        mo.d = d;
    }


    /************************* 图形封装模块 *************************/

    function classTypeOf(p1) {
        let s = p1.constructor.toString();
        let index1 = s.indexOf(" ");
        let index2 = s.indexOf("(");
        return s.substring(index1 + 1, index2);;
    }

    function setValue(p1, p2) {
        if (classTypeOf(p2) == "Object") {
            for (const key in p2) {
                if (Object.hasOwnProperty.call(p2, key)) {
                    if (classTypeOf(p2[key]) == "Object") {
                        setValue(p1[key], p2[key]);
                    } else {
                        p1[key] = p2[key];
                    }
                }
            }
        } else {
            p1 = p2;
        }
    }

    function diffuse(p1, p2) {
        for (const key in p1) {
            if (Object.hasOwnProperty.call(p1, key)) {
                const value = p1[key];
                if (p2.includes(key) && classTypeOf(value) == "Object") {
                    for (const key2 in p1) {
                        if (Object.hasOwnProperty.call(p1, key2)) {
                            const value2 = p1[key2];
                            if (!p2.includes(key2) && typeof value[key2] == "undefined") {
                                value[key2] = value2;
                            }
                        }
                    }
                } else if (classTypeOf(value) == "Object") {
                    diffuse(value, p2);
                }
            }
        }
    }

    /************** axis坐标轴 **************/

    function axis(mou, p0) {

        // 默认参数
        let p = {
            x: 50, // 原点x值
            y: 400, // 原点y值
            width: 600, // 宽度
            height: 300, // 高度
            focus: true,
            attr: {},
            title: {
                show: true,
                margin: 20, // 
                position: "ct",
                anchor: "c", //
                cont: "title", //
                attr: {
                    "fill": "#222",
                    "font-size": 50,
                    "font-weight": 5,
                }
            },
            line: {
                show: true,
                attr: {
                    "stroke": "#222",
                    "stroke-width": 1,
                },
                x: {},
                y: {},
            },
            mark: {
                show: true,
                length: 10,//
                dis: 1,//
                min: 0,
                max: 10,
                attr: {
                    "stroke": "#222",
                    "stroke-width": 1,
                },
                x: {},
                y: {},
            },
            markValue: {  // 刻度文字属性
                show: true,
                dis: 1,
                attr: {
                    "font-size": 10,
                    "font-weight": 5,
                    "fill": "#333",
                },
                x: {},
                y: {},
            },
            grid: {
                show: true, //
                dis: 1, //
                attr: {
                    "stroke": "#222",
                    "stroke-width": 1,
                }, //
                x: {},
                y: {},
            }
        }

        // 数据预处理
        setValue(p, p0); // 将传入参数输入到默认参数
        diffuse(p, ["x", "y"]); // 将参数x,y分属性赋值

        p.rang = {
            x: p.mark.x.max - p.mark.x.min, // x范围
            y: p.mark.y.max - p.mark.y.min, // y范围
        }

        p.pix = {
            x: p.width / p.rang.x, // 一个x值代表像素
            y: p.height / p.rang.y, // 一个y值代表像素
        }

        p.markSum = {
            x: Math.floor((p.mark.x.max - p.mark.x.min) / p.mark.x.dis),
            y: Math.floor((p.mark.y.max - p.mark.y.min) / p.mark.y.dis),
        }

        p.markValueSum = {
            x: Math.floor(p.markSum.x / p.markValue.x.dis),
            y: Math.floor(p.markSum.y / p.markValue.y.dis),
        }

        p.gridSum = {
            x: Math.floor(p.markSum.x / p.grid.x.dis) - 1,
            y: Math.floor(p.markSum.y / p.grid.y.dis) - 1,
        }

        // 坐标轴打组
        let gID;
        for (let i = 0; true; i++) {
            if (mou.select("#axis" + i).empty()) {
                gID = "axis" + i;
                break;
            }
        }

        //
        if (!p.focus) {
            mou.g(gID)
                .attr("pointer-events", "none")
        }
        mou.g(gID)
            .attrs(p.attr)

        // x轴
        mou.g(gID);
        mou.g(gID + "_X");
        if (p.line.x.show) {
            mou.g(gID + "_X_line")
                .attrs(p.line.x.attr)
                .line(p.x, p.y, p.x + p.width, p.y)
        }

        // x刻度
        if (p.mark.x.show) {
            mou.g(gID + "_X_mark")
                .attrs(p.mark.x.attr)
                .line(0, p.y, 0, p.y + p.mark.length)
                .clone(p.markSum.x)
                .each((s, i) => {
                    let x = p.x + i * p.mark.x.dis * p.pix.x;
                    s.attrs({
                        x1: x,
                        x2: x,
                    })
                })
        }

        // x刻度值
        if (p.markValue.x.show) {
            mou.g(gID + "_X")
                .g(gID + "_X_markValue")
                .attrs(p.markValue.x.attr)
                .text(0, p.y + p.mark.x.length + 5, 0, "ct")
                .clone(p.markValueSum.x)
                .each((s, i) => {
                    let num = i * p.markValue.x.dis * p.mark.x.dis;
                    s.attr("x", p.x + num * p.pix.x)
                        .cont(num)
                })
        }

        // x网格
        if (p.grid.x.show) {
            mou.g(gID + "_X")
                .g(gID + "_X_grid")
                .attrs(p.grid.x.attr)
                .line(0, p.y, 0, p.y - p.height)
                .clone(p.gridSum.x)
                .each((s, i) => {
                    let x = p.x + (i + 1) * p.mark.x.dis * p.grid.x.dis * p.pix.x;
                    s.attrs({
                        x1: x,
                        x2: x,
                    })
                })
        }

        // y轴
        mou.g(gID)
            .g(gID + "_Y");
        if (p.line.y.show) {
            mou.g(gID + "_Y_line")
                .attrs(p.line.y.attr)
                .line(p.x, p.y, p.x, p.y - p.height)
        }

        // y刻度
        if (p.mark.y.show) {
            mou.g(gID + "_Y")
                .g(gID + "_Y_mark")
                .attrs(p.mark.y.attr)
                .line(p.x, 0, p.x - p.mark.y.length, 0)
                .clone(p.markSum.y)
                .each((s, i) => {
                    let y = p.y - i * p.mark.y.dis * p.pix.y;
                    s.attrs({
                        y1: y,
                        y2: y,
                    })
                })
        }

        // y刻度值
        if (p.markValue.y.show) {
            mou.g(gID + "_Y")
                .g(gID + "_Y_markValue")
                .attrs(p.markValue.x.attr)
                .text(p.x - p.mark.y.length - 5, 0, 0, "rm")
                .clone(p.markValueSum.y)
                .each((s, i) => {
                    let num = i * p.markValue.y.dis * p.mark.y.dis;
                    s.attr("y", p.y - num * p.pix.y)
                        .cont(num)
                })
        }

        // y网格
        if (p.grid.y.show) {
            mou.g(gID + "_Y")
                .g(gID + "_Y_grid")
                .attrs(p.grid.x.attr)
                .line(p.x, 0, p.x + p.width, 0)
                .clone(p.gridSum.y)
                .each((s, i) => {
                    let y = p.y - (i + 1) * p.mark.y.dis * p.grid.y.dis * p.pix.y;
                    s.attrs({
                        y1: y,
                        y2: y,
                    })
                })
        }

        // 标题
        if (p.title.show) {
            let titleX, titleY; // 
            if (p.title.position.indexOf('l') >= 0) {
                titleX = p.x - p.title.margin;
            } else if (p.title.position.indexOf('r') >= 0) {
                titleX = p.x + p.width + p.title.margin;
            } else {
                titleX = p.x + p.width / 2;
            }
            if (p.title.position.indexOf('m') >= 0) {
                titleY = p.y - p.height / 2;
            } else if (p.title.position.indexOf('b') >= 0) {
                titleY = p.y + p.title.margin;
            } else {
                titleY = p.y - p.height - p.title.margin;
            }
            mou.g(gID)
                .g(gID + "_title")
                .attrs(p.title.attr)
                .text(titleX, titleY, p.title.cont, p.title.anchor)
        }

        mou.out()

        return p;
    }

    /************** stack 折现堆叠图 **************/

    function stack(mou, p0) {

        // 默认参数
        let p = {
            x: 50, // 原点x值
            y: 400, // 原点y值
            width: 600, // 宽度
            height: 300, // 高度
            focus: true,
            attr: {},
            title: {
                show: true,
                margin: 20, // 
                position: "ct",
                anchor: "c", //
                cont: "title", //
                attr: {
                    "fill": "#222",
                    "font-size": 50,
                    "font-weight": 5,
                }
            },
            line: {
                show: true,
                color: ["#f00", "#0f0", "#00f"], // 线颜色
                attr: {},
            },
            data: [
                [1, 2, 3],
                [2, 3, 1],
                [3, 2, 1],
            ],
        }

        // 数据预处理
        setValue(p, p0); // 将传入参数输入到默认参数

        for (let i = 0; i < p.data.length; i++) {
            p.data[i].bottom = new Array;
            for (let j = 0; j < p.data[i].length; j++) {
                let bott = 0;
                for (let k = 0; k < p.data.length; k++) {
                    if (p.data[i][j] > p.data[k][j] || p.data[i][j] == p.data[k][j] && i > k) {
                        bott += p.data[k][j];
                    }
                }
                p.data[i].bottom.push(bott);
            }
        }

        p.maxY = 0;

        for (const d of p.data) {
            for (let i = 0; i < d.length; i++) {
                d[i] + d.bottom[i] > p.maxY ? p.maxY = d[i] + d.bottom[i] : true;
            }
        }

        p.pix = {
            x: p.width / (p.data[0].length - 1),
            y: p.height / p.maxY,
        }

        for (let i = 0; i < p.data.length; i++) {
            let topD = "M";
            let bottomD = "M";
            for (let j = 0; j < p.data[i].bottom.length; j++) { // 下线
                topD += ((p.x + j * p.pix.x) + "," + (p.y - p.data[i].bottom[j] * p.pix.y) + " ");
                bottomD += ((p.x + j * p.pix.x) + "," + (p.y - 0) + " ");
            }
            for (let j = p.data[i].bottom.length - 1; j >= 0; j--) { // 上线
                topD += ((p.x + j * p.pix.x) + "," + (p.y - (p.data[i].bottom[j] + p.data[i][j]) * p.pix.y) + " ");
                bottomD += ((p.x + j * p.pix.x) + "," + (p.y - (p.data[i][j]) * p.pix.y) + " ");
            }
            p.data[i].topD = topD + 'Z';
            p.data[i].bottomD = bottomD + 'Z';
        }

        let isShowwing = false;

        // 图形打组
        let gID;
        for (let i = 0; true; i++) {
            if (mou.select("#stack" + i).empty()) {
                gID = "stack" + i;
                break;
            }
        }
        mou.g(gID)
            .attrs(p.attr)
        if (!p.focus) {
            mou.g(gID)
                .attr("pointer-events", "none")
        }

        // 画图

        // 折线
        let seAll = gID + "_line";
        if (p.line.show) {
            mou.g(gID + "_line")
                .attrs(p.line.attr)
                .path("") // 折线
                .clone(p.data.length - 1)
                .attr("isShow", false)
                .attr(seAll, 0) //
                .style("transition", "all 0.2s linear 0.1s")
                .each((s, i) => {
                    let seOne = gID + "_line" + i;
                    s.attr("d", p.data[i].topD)
                        .attr(seOne, 0) //
                        .attr("fill", p.line.color[i % p.line.color.length])
                        .on("mouseover", () => {
                            if (isShowwing) {
                                return;
                            }
                            s.select("[" + seAll + "]")
                                .attr("opacity", 0.2)
                                .attr("pointer-events", "none")
                                .select("[" + seOne + "]")
                                .attr("opacity", 1)
                                .attr("pointer-events", "auto")
                        })
                        .on("mouseout", () => {
                            if (isShowwing) {
                                return;
                            }
                            s.select("[" + seAll + "]")
                                .attr("opacity", 0.8)
                                .attr("pointer-events", "auto")
                        })
                        .on("click", () => {
                            let isShow = s.select("[" + seOne + "]").attr("isShow") == "true";
                            isShowwing = !isShow;
                            s.select("[" + seAll + "]")
                                .attr("opacity", isShow ? 1 : 0)
                                .attr("pointer-events", isShow ? "auto" : "none")
                                .select("[" + seOne + "]")
                                .attr("isShow", !isShow)
                                .attr("pointer-events", "auto")
                                .attr("d", isShow ? p.data[i].topD : p.data[i].bottomD)
                                .attr("opacity", 1)
                        })
                })
                .attr("opacity", 0.8)
        }

        // 标题
        if (p.title.show) {
            let titleX, titleY; // 
            if (p.title.position.indexOf('l') >= 0) {
                titleX = p.x - p.title.margin;
            } else if (p.title.position.indexOf('r') >= 0) {
                titleX = p.x + p.width + p.title.margin;
            } else {
                titleX = p.x + p.width / 2;
            }
            if (p.title.position.indexOf('m') >= 0) {
                titleY = p.y - p.height / 2;
            } else if (p.title.position.indexOf('b') >= 0) {
                titleY = p.y + p.title.margin;
                console.log(p.y);
            } else {
                titleY = p.y - p.height - p.title.margin;
            }
            mou.g(gID)
                .g(gID + "_title")
                .attrs(p.title.attr)
                .text(titleX, titleY, p.title.cont, p.title.anchor)
        }

        mou.out()

        return p;
    }

    /************** pathAnime 路径动画 **************/

    function pathAnime(mou, p0) {

        // 默认参数
        let p = {
            focus: false,
            path: "M10 80 Q 77.5 10, 145 80 T 280 80",
            dasharray: [50, 20],
            time: [5, 10],
            form: [0, 0],
            to: [50, 100],
            stroke: ["#e47", "#6ea"],
            fill: ["#0000"],
            attr: {},
        }

        // 数据预处理
        setValue(p, p0); // 将传入参数输入到默认参数

        // 图形打组
        let gID;
        for (let i = 0; true; i++) {
            if (mou.select("#pathAnime" + i).empty()) {
                gID = "pathAnime" + i;
                break;
            }
        }
        mou.g(gID)
            .attrs(p.attr)
        if (!p.focus) {
            mou.g(gID)
                .attr("pointer-events", "none")
        }

        // 建立tyleTag
        let styleTag = document.querySelector("style");
        if (styleTag == null) {
            styleTag = document.createElement("style");
            document.querySelector("head").appendChild(styleTag);
        }

        let cssString = "";

        for (let i = 0; i < p.dasharray.length; i++) {
            let clas = gID + "_class_" + i;
            let dash = p.dasharray[i];
            let anima = gID + "_animation_" + i;
            let time = p.time[i % p.time.length] + "s";
            let css = "." + clas + "{"
                + "stroke-dasharray:" + dash + ";"
                + "animation: " + anima + " " + time + " linear alternate infinite;"
                + "stroke:" + p.stroke[i % p.stroke.length] + ";"
                + "fill:" + p.fill[i % p.fill.length] + ";"
                + "}";
            let ani = "@keyframes " + anima + " {"
                + "from {stroke-dashoffset: " + p.form[i % p.form.length] + ";} "
                + "to {stroke-dashoffset: " + p.to[i % p.to.length] + ";}"
                + "}";
            cssString += css + ani;
        }

        styleTag.innerHTML += cssString;

        // 画图
        mou.path(p.path)
            .clone(p.dasharray.length - 1)
            .each((s, i) => {
                s.attr("class", gID + "_class_" + i)
            })
            .attrs(p.attr)

        mou.out();

        return p;

    }

    /************************* 模块加载 *************************/

    se.svg = mo;
}))
