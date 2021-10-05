var instBoxData = [];

var table_to_graph_data = {
    price: [],
    QDxa: [],
    QDxb: [],
    QDxmar: [],
};

const corrent_table_to_graph_data = {
    price: [0.6, 1.0, 1.4, 1.8, 2.2],
    QDxa: [1.8, 1.4, 1.0, 0.6, 0.2],
    QDxb: [1.92, 1.6, 1.28, 0.96, 0.64],
    QDxmar: [3.72, 3.0, 2.28, 1.56, 0.84],
};

var inp_err_count = 0;
var nextPrevCount = 0;

var isCurved = false;

var load_all = (v) => {
    $('#root').load('./components/box.html');
    fetch("./components/graphs.html")
        .then((response) => response.text())
        .then((html) => {
            document.getElementById("box_graph").innerHTML = html;
            $('.tooltiper_element').tooltiper({
                tooltipAppearenceMode: 'slideDown',
                tooltipDisappearenceMode: 'slideUp',
                tooltipBound: 'cursor',
                tooltipCss: {
                    "color": "#667fcc",
                    "font-weight": "bold"
                },
            });
            populateInstBox(instBoxData);
            $('#graph_theo_col').removeClass('col-md-8');
            $('#graph_theo_col').addClass('col-md-12');
            $('.rect_wrapper_stcv').hide();
            $('.rect_wrapper_updw').hide();
            $('.rect_wrapper_hint').hide();
        })
        .catch((error) => {
            console.warn(error);
        });
}

{
    function straight(x) {
        return -x + 2.7;
    }

    function square_curve(x) {
        return 1 / x;
    }

    function generateDataSq(v) {
        let data = [];
        for (let i = 2.0; i >= 0.455; i -= .005) {
            data.push([i + v, square_curve(i) + v + 0.05]);
        }
        return data;
    }

    function generateDataSt(v) {
        let data = [];
        for (let i = 0.6; i <= 2.3; i += .005) {
            data.push([straight(i) + v, i + v]);
        }
        return data;
    }
}

var load_graph = (v, form) => {
    var graphId = document.getElementById('straight_line_graph');
    var myChart = echarts.init(graphId);
    var data_legend = {};

    if (form.includes('straight')) {
        if (form.charAt(form.length - 1) == '1') {
            var series = [{
                type: 'line',
                showSymbol: false,
                clip: true,
                data: generateDataSt(v)
            }];
        } else if (form.charAt(form.length - 1) == '2') {
            var series = [{
                type: 'line',
                showSymbol: false,
                lineStyle: {
                    type: 'dashed'
                },
                clip: true,
                endLabel: {
                    show: true,
                    position: 'top',
                    color: "black",
                    fontSize: 12,
                    formatter: function (d) {
                        return `Original Curve`;
                    }
                },
                data: generateDataSt(0),
            }, {
                type: 'line',
                showSymbol: false,
                clip: true,
                endLabel: {
                    show: true,
                    position: 'bottom',
                    color: "black",
                    fontSize: 12,
                    formatter: function (d) {
                        return `New Curve`;
                    }
                },
                data: generateDataSt(v)
            }];
        } else if (form.charAt(form.length - 1) == '3') {
            //horizontally at price=1.5
            var series = [{
                type: 'line',
                showSymbol: false,
                clip: true,
                data: generateDataSt(v),
                markLine: {
                    data: [[{
                        name: 'Price= 1.5',
                        coord: [0.0, 1.5]
                    },
                    {
                        coord: [1.2, 1.5]
                    }
                    ],
                    [{
                        name: 'Quantity= 1.2',
                        coord: [1.2, 1.5]
                    },
                    {
                        coord: [1.2, 0.0]
                    }
                    ]],
                    lineStyle: {
                        color: 'black'
                    }
                }
            }, {
                data: [
                    [1.2, 1.5]
                ],
                type: 'scatter',
                symbolSize: 23,
                color: 'orange'
            }];
        } else if (form.charAt(form.length - 1) == '4') {
            //Vertically at quantity = 1.7
            var series = [{
                type: 'line',
                showSymbol: false,
                clip: true,
                data: generateDataSt(v),
                markLine: {
                    data: [[{
                        name: 'Price= 1.0',
                        coord: [1.7, 1.0]
                    },
                    {
                        coord: [0.0, 1.0],
                        label:{
                            position: 'insideEndTop'
                        }
                    }
                    ],
                    [{
                        name: 'Quantity= 1.7',
                        coord: [1.7, 0.0]
                    },
                    {
                        coord: [1.7, 1.0]
                    }
                    ]],
                    lineStyle: {
                        color: 'black'
                    }
                }
            }, {
                data: [
                    [1.7, 1.0]
                ],
                type: 'scatter',
                symbolSize: 23,
                color: 'orange'
            }];
        }
    } else if (form.includes('curved')) {
        if (form.charAt(form.length - 1) == '1') {
            var series = [{
                type: 'line',
                showSymbol: false,
                clip: true,
                data: generateDataSq(v)
            }];
        } else if (form.charAt(form.length - 1) == '2') {
            var series = [{
                type: 'line',
                showSymbol: false,
                lineStyle: {
                    type: 'dashed'
                },
                clip: true,
                endLabel: {
                    show: true,
                    position: 'top',
                    color: "black",
                    fontSize: 12,
                    formatter: function (d) {
                        return `Original Curve`;
                    }
                },
                data: generateDataSq(0),
            }, {
                type: 'line',
                showSymbol: false,
                clip: true,
                endLabel: {
                    show: true,
                    position: 'bottom',
                    color: "black",
                    fontSize: 12,
                    formatter: function (d) {
                        return `New Curve`;
                    }
                },
                data: generateDataSq(v)
            }];
        } else if (form.charAt(form.length - 1) == '3') {
            //horizontally at price=1.5
            var series = [{
                type: 'line',
                showSymbol: false,
                clip: true,
                data: generateDataSq(v),
                markLine: {
                    data: [[{
                        name: 'Price= 1.5',
                        coord: [0.0, 1.5]
                    },
                    {
                        coord: [0.69, 1.5]
                    }
                    ],
                    [{
                        name: 'Quantity= 1.2',
                        coord: [0.69, 1.5]
                    },
                    {
                        coord: [0.69, 0.0]
                    }
                    ]],
                    lineStyle: {
                        color: 'black'
                    }
                }
            }, {
                data: [
                    [0.69, 1.5]
                ],
                type: 'scatter',
                symbolSize: 23,
                color: 'orange'
            }];
        } else if (form.charAt(form.length - 1) == '4') {
            //Vertically at quantity = 1.7
            var series = [{
                type: 'line',
                showSymbol: false,
                clip: true,
                data: generateDataSq(v),
                markLine: {
                    data: [[{
                        name: 'Price= 1.0',
                        coord: [1.7, 0.64]
                    },
                    {
                        coord: [0.0, 0.64],
                        label:{
                            position: 'insideEndTop'
                        }
                    }
                    ],
                    [{
                        name: 'Quantity= 1.7',
                        coord: [1.7, 0.0]
                    },
                    {
                        coord: [1.7, 0.64]
                    }
                    ]],
                    lineStyle: {
                        color: 'black'
                    },
                    position: 'middle'
                }
            }, {
                data: [
                    [1.7, 0.64]
                ],
                type: 'scatter',
                symbolSize: 23,
                color: 'orange'
            }];
        }
    } else if (form.includes('blank')) {
        if (form.charAt(form.length - 1) == '1') {
            var series = [{
                type: 'line',
                showSymbol: true,
                clip: true,
                data: [
                    [1, 1.7]
                ],
            }]
        } else if (form.charAt(form.length - 1) == '2') {
            var series = [{
                type: 'line',
                showSymbol: true,
                clip: true,
                data: [
                    [1, 1.7]
                ],
            }, {
                type: 'line',
                showSymbol: true,
                clip: true,
                data: [
                    [1.7, 1]
                ],
            }]
        } else {
            var series = [{
                type: 'line',
                showSymbol: true,
                clip: true,
                data: [],
            }]
        }
    } else if (form.includes('custom')) {

        data_legend = {
            data:['Demand Curve of A', 'Demand Curve of B', 'Market Demand Curve'],
            top: 10
        };
        var QDxa_data = [];
        for (let i = 0; i < 5; i++) {
            var data = [];
            data.push(table_to_graph_data.QDxa[i]);
            data.push(table_to_graph_data.price[i]);

            QDxa_data.push(data);
        }

        var QDxb_data = [];
        for (let i = 0; i < 5; i++) {
            var data = [];
            data.push(table_to_graph_data.QDxb[i]);
            data.push(table_to_graph_data.price[i]);

            QDxb_data.push(data);
        }

        var QDxmar_data = [];
        for (let i = 0; i < 5; i++) {
            var data = [];
            data.push(table_to_graph_data.QDxmar[i]);
            data.push(table_to_graph_data.price[i]);

            QDxmar_data.push(data);
        }

        var series = [{
            name: 'Demand Curve of A',
            type: 'line',
            showSymbol: true,
            lineStyle: {
                type: 'dashed'
            },
            clip: true,
            data: QDxa_data,
        }, {
            name: 'Demand Curve of B',
            type: 'line',
            showSymbol: true,
            lineStyle: {
                type: 'dashed'
            },
            clip: true,
            data: QDxb_data,
        }, {
            name: 'Market Demand Curve',
            type: 'line',
            showSymbol: true,
            clip: true,
            data: QDxmar_data,
        }];
    }

    option = {
        animation: true,
        grid: {
            top: 40,
            left: 50,
            right: 40,
            bottom: 50
        },
        tooltip: {
            trigger: "axis",
            formatter: (params) => {
                return `
                    X: ${params[0].value[0].toFixed(2)}</br>
                    Y: ${params[0].value[1].toFixed(2)}
                `;
            },
        },
        legend: data_legend,
        xAxis: {
            name: 'Quantity',
            nameTextStyle: {
                fontSize: 15,
                align: 'right',
                verticalAlign: 'top',
                padding: [30, 0, 0, 0],
            },
            min: 0,
            max: 4,
            minorTick: {
                show: false,
            },
            minorSplitLine: {
                show: false,
            }
        },
        yAxis: {
            name: 'Price',
            nameTextStyle: {
                fontSize: 15
            },
            min: 0,
            max: 2.8,
            minorTick: {
                show: false,
            },
            minorSplitLine: {
                show: false,
            }
        },
        dataZoom: [{
            show: true,
            type: 'inside',
            filterMode: 'none',
            xAxisIndex: [0],
            startValue: -20,
            endValue: 20
        }, {
            show: true,
            type: 'inside',
            filterMode: 'none',
            yAxisIndex: [0],
            startValue: -20,
            endValue: 20
        }],
        series: series,
    };
    myChart.setOption(option);
}

var populateInstBox = (data) => {
    $('#inst_box').empty();
    data.map((element, index) => {
        if (index % 2 == 0) {
            $('#inst_box').append(`
            <div class="inst_box_bubble __even">
                <p>${element}</p>
            </div>
        `).show('slow');
        } else {
            $('#inst_box').append(`
            <div class="inst_box_bubble __odd">
                <p>${element}</p>
            </div>
        `).show('slow');
        }
        if (index == data.length - 1) {
            $('.inst_box_bubble').last().addClass("last_box");
        }
    });
}

var nextPrevAction = {
    theo_to_blank_graph_1: () => {
        var transitionTime = 1000;
        $('#graph_theo_col').removeClass('col-md-12').delay(transitionTime);
        $('#graph_theo_col').addClass('col-md-8').delay(transitionTime);

        $('#inst_col').show(transitionTime);
        $('#theo_wrapper').hide(transitionTime / 3);
        $('#straight_line_graph').css({
            width: '92%',
            height: '400px',
            margin: '12px auto',
            background: '#fff4de',
            'border-radius': '10px',
        });
        setTimeout(() => {
            load_graph(0, 'blank');
        }, transitionTime + 200);
        instBoxData.push(`<p class = "inst_box_header"><b>Plotting the Demand Curve</b></p>`);
        instBoxData.push('The graph drawn has the price on the vertical axis and the quantity demanded on the horizontal axis');
        populateInstBox(instBoxData);


        nextPrevCount = 2;
    },
    blank_to_1pt_2: () => {
        instBoxData = [];
        instBoxData.push(`<p class = "inst_box_header"><b>Plotting the Demand Curve</b></p>`);
        instBoxData.push(`To create the demand curve, let consider an example:
        Suppose that an individual’s demand function for commodity X is QDx= 2.7 – Px, all other things being constant.
        Therefore, by substituting various prices of X, we get the demand schedule`);

        instBoxData.push(`Let Px= 1.7, then QDx=1`);
        populateInstBox(instBoxData);

        $('#straight_line_graph').empty();
        $('#straight_line_graph').removeAttr('_echarts_instance_');
        load_graph(0, 'blank1');

        nextPrevCount = 3;
    },
    _1pt_to_2pt_3: () => {

        instBoxData.push(`Similarly, if Px=1, then QDx=1.7`);
        populateInstBox(instBoxData);

        $('#straight_line_graph').empty();
        $('#straight_line_graph').removeAttr('_echarts_instance_');
        load_graph(0, 'blank2');

        nextPrevCount = 4;
    },
    _2pt_to_line_4: () => {
        $('#straight_line_graph').empty();
        $('#straight_line_graph').removeAttr('_echarts_instance_');

        instBoxData.push(`Plotting each pair of values as a point on the graph and joining the resulting points, we get the individual’s demand curve for commodity X`);
        populateInstBox(instBoxData);


        load_graph(0, 'straight_1');

        nextPrevCount = 4.1;
    },
    line_to_btn1_4_1: () => {
        (async () => {
            const { value: answer } = await Swal.fire({
                icon: 'info',
                html: `<p style = "font-size: 14px;">
                        We see that the lower the price of X, the greater the quantity of X demanded by the individual. The inverse relationship between price and quantity is reflected in the negative slope of the demand curve. With few exceptions, the demand curve always slopes downwards. This is usually referred to as the <b>Law of Demand</b>
                    </p>`,
            })
            instBoxData = [];
            instBoxData.push(`<p class = "inst_box_header"><b>Structures of the Demand Curves</b></p>`);
            populateInstBox(instBoxData);
            var objDiv = document.getElementById("inst_box");
            objDiv.scrollTop = objDiv.scrollHeight;
            $('.rect_wrapper_stcv').show(1000);
            instBoxData.push(`<p>Click on the buttons to understand the different structures of the demand curve</p>`);
            populateInstBox(instBoxData);
            var objDiv = document.getElementById("inst_box");
            objDiv.scrollTop = objDiv.scrollHeight;
        })()
        nextPrevCount = 4.3;
    },
    line_to_btn1_4_3: () => {
        $('.rect_wrapper_stcv').hide(1000);
        instBoxData = [];
        instBoxData.push(`<p class = "inst_box_header"><b>Reading the Demand Curve</b></p>`);
        instBoxData.push(`<p><b>Horizontally</b><br>The quantity buyers are willing and able to purchase at a given price</p>`);
        populateInstBox(instBoxData);
        var objDiv = document.getElementById("inst_box");
        objDiv.scrollTop = objDiv.scrollHeight;
        $('#straight_line_graph').removeAttr('_echarts_instance_');
        if (!isCurved)
            load_graph(0, 'straight3');
        else
            load_graph(0, 'curved3');
        nextPrevCount = 4.4;
    },
    line_to_btn1_4_4: () => {
        instBoxData = [];
        instBoxData.push(`<p class = "inst_box_header"><b>Reading the Demand Curve</b></p>`);
        instBoxData.push(`<p><b>Vertically</b><br>The max price that buyers are willing to pay for a given unit of the commodity</p>`);
        populateInstBox(instBoxData);
        var objDiv = document.getElementById("inst_box");
        objDiv.scrollTop = objDiv.scrollHeight;
        $('#straight_line_graph').removeAttr('_echarts_instance_');
        if (!isCurved)
            load_graph(0, 'straight4');
        else
            load_graph(0, 'curved4');
        nextPrevCount = 4.2;
    },
    line_to_btn1_4_2: () => {
        $('#straight_line_graph').removeAttr('_echarts_instance_');
        if (!isCurved)
            load_graph(0, 'straight1');
        else
            load_graph(0, 'curved1');
        instBoxData = [];
        instBoxData.push(`<p class = "inst_box_header"><b>Shifts in the Demand Curves</b></p>`);
        instBoxData.push(`<p>Click on the buttons to understand the reason for shifts in the demand curve</p>`);
        populateInstBox(instBoxData);
        var objDiv = document.getElementById("inst_box");
        objDiv.scrollTop = objDiv.scrollHeight;
        $('.rect_wrapper_stcv').hide(1000);
        $('.rect_wrapper_updw').show(1000);;
        nextPrevCount = 5;
    },
    line_to_popup_5: () => {
        (async () => {
            const inputOptions = new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        'increase': 'increases',
                        'decrease': 'decreases',
                        'no change': 'has no changes'
                    })
                }, 1500)
            })
            const { value: answer } = await Swal.fire({
                title: 'When the price of a substitute of commodity X falls, then the demand for X...',
                input: 'radio',
                inputOptions: inputOptions,
                inputValidator: (value) => {
                    if (!value) {
                        return 'You need to choose something!'
                    }
                    else if (value != 'decrease') {
                        return 'Wrong Answer!!'
                    }
                }
            })
            if (answer) {
                Swal.fire({
                    icon: 'success',
                    title: 'Correct',
                });
                nextPrevAction.popup_to_input_6__1();
            }
        })()
    },
    popup_to_input_6__1: () => {
        var transitionTime = 0;

        $('#inst_col').hide(transitionTime);

        $('#graph_theo_col').removeClass('col-md-8').delay(transitionTime);
        $('#graph_theo_col').addClass('col-md-12').delay(transitionTime);

        $('#pre_inp_box_text_wrapper').show(transitionTime / 3);
        $('#straight_line_graph').empty();
        $('#straight_line_graph').removeAttr('_echarts_instance_');
        $('#straight_line_graph').css({ height: '0px' });

        $('.rect_wrapper_stcv').hide(transitionTime);
        $('.rect_wrapper_updw').hide(transitionTime);

        nextPrevCount = 6.1;
    },
    popup_to_input_6: () => {
        var transitionTime = 0;

        $('#inst_col').hide(transitionTime);

        $('#graph_theo_col').removeClass('col-md-8').delay(transitionTime);
        $('#graph_theo_col').addClass('col-md-12').delay(transitionTime);

        $('#pre_inp_box_text_wrapper').hide(transitionTime / 3);
        $('#inp_box_wrapper').show(transitionTime / 3);
        $('.inp_hint_wrapper').show(transitionTime);
        $('#straight_line_graph').empty();
        $('#straight_line_graph').removeAttr('_echarts_instance_');
        $('#straight_line_graph').css({ height: '0px' });

        $('.rect_wrapper_stcv').hide(transitionTime);
        $('.rect_wrapper_updw').hide(transitionTime);

        nextPrevCount = 7;
    },
    input_to_graph_7: () => {

        var flag = true;

        $('#inp_box_wrapper table tbody tr:nth-child(1) td .effect_wrapper').children('input').each(function () {
            if (this.value == "") {
                flag = false;
            }
        });
        $('#inp_box_wrapper table tbody tr:nth-child(2) td .effect_wrapper').children('input').each(function () {
            if (this.value == "") {
                flag = false;
            }
        });
        $('#inp_box_wrapper table tbody tr:nth-child(3) td .effect_wrapper').children('input').each(function () {
            if (this.value == "") {
                flag = false;
            }
        });
        $('#inp_box_wrapper table tbody tr:nth-child(4) td .effect_wrapper').children('input').each(function () {
            if (this.value == "") {
                flag = false;
            }
        });

        if (!flag) {
            Swal.fire({
                icon: 'error',
                title: 'All the fields must be filled',
            })
        } else {
            $('#inp_box_wrapper table tbody tr:nth-child(1) td .effect_wrapper').children('input').each(function () {
                table_to_graph_data.price.push(parseFloat(this.value));
            });
            $('#inp_box_wrapper table tbody tr:nth-child(2) td .effect_wrapper').children('input').each(function () {
                table_to_graph_data.QDxa.push(parseFloat(this.value));
            });
            $('#inp_box_wrapper table tbody tr:nth-child(3) td .effect_wrapper').children('input').each(function () {
                table_to_graph_data.QDxb.push(parseFloat(this.value));
            });
            $('#inp_box_wrapper table tbody tr:nth-child(4) td .effect_wrapper').children('input').each(function () {
                table_to_graph_data.QDxmar.push(parseFloat(this.value));
            });

            if (validateinputData(table_to_graph_data)) {
                var transitionTime = 1000;
                var table_data = `<div>
                <table class = "table table-striped" style="width: 100%; font-size: 64%; margin-bottom: 5px !important;">
                <tr> 
                <th>Price</th>
                <th align="center">0.6</th>
                <th>1.0</th>
                <th>1.4</th>
                <th>1.8</th>
                <th>2.2</th>
                </tr>
                <tr> 
                <th>Quantity of A</th>
                <td>1.8</td>
                <td>1.4</td>
                <td>1.0</td>
                <td>0.6</td>
                <td>0.2</td>
                </tr>
                <tr> 
                <th>Quantity of B</th>
                <td>1.92</td>
                <td>1.6</td>
                <td>1.28</td>
                <td>0.96</td>
                <td>0.64</td>
                </tr>
                <tr> 
                <th>Market Quantity</th>
                <td>3.72</td>
                <td>3.0</td>
                <td>2.28</td>
                <td>1.56</td>
                <td>0.84</td>
                </tr>
                </table>
                </div>`;
                $('#graph_theo_col').removeClass('col-md-12').delay(transitionTime);
                $('#graph_theo_col').addClass('col-md-8').delay(transitionTime);
                $('#inst_col').show(transitionTime);
                $('#inp_box_wrapper').hide(transitionTime);
                $('.inp_hint_wrapper').hide(transitionTime);
                $('#straight_line_graph').css({
                    width: '92%',
                    height: '400px',
                    margin: '12px auto',
                    background: '#fff4de',
                    'border-radius': '10px',
                });
                $('#straight_line_graph').removeAttr('_echarts_instance_');
                instBoxData = [];
                instBoxData.push(`Creation of market demand schedule`);
                instBoxData.push(table_data);
                instBoxData.push(`You can zoom in to view more details`);
                var objDiv = document.getElementById("inst_box");
                objDiv.scrollTop = objDiv.scrollHeight;
                populateInstBox(instBoxData);
                setTimeout(() => {
                    load_graph(0, 'custom');
                }, transitionTime + 200);

                nextPrevCount = 8;
            } else {
                inp_err_count += 1;

                if (inp_err_count == 2) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Maximum tries reached',
                        text: 'All correct values have been filled in',
                    })
                    populate_input(corrent_table_to_graph_data);
                    $('#inp_box_wrapper table tbody tr:nth-child(2) td .effect_wrapper').children('input').each(function (index, element) {
                        $(`#QA${index + 1}`).removeClass('effect-8-error');
                    });
                    $('#inp_box_wrapper table tbody tr:nth-child(3) td .effect_wrapper').children('input').each(function (index, element) {
                        $(`#QB${index + 1}`).removeClass('effect-8-error');
                    });
                    $('#inp_box_wrapper table tbody tr:nth-child(4) td .effect_wrapper').children('input').each(function (index, element) {
                        $(`#Mark${index + 1}`).removeClass('effect-8-error');
                    });
                    table_to_graph_data = corrent_table_to_graph_data;
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error in Field(s)',
                    })
                    table_to_graph_data = {
                        price: [],
                        QDxa: [],
                        QDxb: [],
                        QDxmar: [],
                    };
                }
            }
        }
    },
    graph_to_end_8: () => {
        var transitionTime = 1000;

        $('#inst_col').hide(transitionTime);
        $('#straight_line_graph').hide(transitionTime);

        $('#graph_theo_col').removeClass('col-md-8');
        $('#graph_theo_col').addClass('col-md-12');

        $('#end_text_wrapper').show(transitionTime);

        nextPrevCount = 9;
    },
    end_to_end_9: () => {
        $('.root_overlay').show();
        $('.root_overlay').animate({ top: '0px' }, 1000, 'linear');
        $('#overlay_btn').empty();
        $('#overlay_btn').html('END OF<br>SIMULATION');
        $('.overlay_btn_wrapper p').remove();
        $('.overlay_btn').css({ 'width': '390px !important' });
        $('#overlay_btn').animate({ 'width': '252px', 'font-size': '18px' }, 1000, 'linear');
        $('#overlay_btn').removeClass('paper-flatten');
        $('#overlay_btn').removeAttr('id');
    }
};


var validateinputData = (input) => {
    var flag = true;
    // QDXA = 2.4 - PX 
    input.QDxa.map((element, index) => {
        var comp = 2.4 - input.price[index];
        if (element != comp.toFixed(2)) {
            flag = false;
        }
    });

    // QDXB = 2.4 – 0.8PX
    input.QDxb.map((element, index) => {
        var comp = 2.4 - (0.8 * input.price[index]);
        if (element != comp.toFixed(2)) {
            flag = false;
        }
    });

    // QDxmar = QDXB + QDXA
    input.QDxmar.map((element, index) => {
        var comp = input.QDxa[index] + input.QDxb[index];
        if (element != comp.toFixed(2)) {
            flag = false;
        }
    });



    $('#inp_box_wrapper table tbody tr:nth-child(2) td .effect_wrapper').children('input').each(function (index, element) {
        var comp = 2.4 - input.price[index];
        if (parseFloat(element.value) != comp.toFixed(2)) {
            $(`#QA${index + 1}`).addClass('effect-8-error');
            $(`#Mark${index + 1}`).val('');
        } else {
            $(`#QA${index + 1}`).removeClass('effect-8-error');
        }
    });
    $('#inp_box_wrapper table tbody tr:nth-child(3) td .effect_wrapper').children('input').each(function (index, element) {
        var comp = 2.4 - (0.8 * input.price[index]);
        if (parseFloat(element.value) != comp.toFixed(2)) {
            $(`#QB${index + 1}`).addClass('effect-8-error');
            $(`#Mark${index + 1}`).val('');
        } else {
            $(`#QB${index + 1}`).removeClass('effect-8-error');
        }
    });
    $('#inp_box_wrapper table tbody tr:nth-child(4) td .effect_wrapper').children('input').each(function (index, element) {
        var comp = input.QDxa[index] + input.QDxb[index];
        if (parseFloat(element.value) != comp.toFixed(2)) {
            $(`#Mark${index + 1}`).addClass('effect-8-error');
        } else {
            $(`#Mark${index + 1}`).removeClass('effect-8-error');
        }
    });
    return flag;
}

var populate_input = (data) => {
    $('#inp_box_wrapper table tbody tr:nth-child(2) td .effect_wrapper').children('input').each(function (index, element) {
        $(`#QA${index + 1}`).val(data.QDxa[index]);
    });
    $('#inp_box_wrapper table tbody tr:nth-child(3) td .effect_wrapper').children('input').each(function (index, element) {
        $(`#QB${index + 1}`).val(data.QDxb[index]);
    });
    $('#inp_box_wrapper table tbody tr:nth-child(4) td .effect_wrapper').children('input').each(function (index, element) {
        $(`#Mark${index + 1}`).val(data.QDxmar[index]);
    });
}

var npClickAction = () => {

    console.log(nextPrevCount);

    if (nextPrevCount == 1) {
        nextPrevAction.theo_to_blank_graph_1();
    } else if (nextPrevCount == 2) {
        nextPrevAction.blank_to_1pt_2();
    } else if (nextPrevCount == 3) {
        nextPrevAction._1pt_to_2pt_3();
    } else if (nextPrevCount == 4) {
        nextPrevAction._2pt_to_line_4();
    } else if (nextPrevCount == 4.1) {
        nextPrevAction.line_to_btn1_4_1();
    } else if (nextPrevCount == 4.3) {
        nextPrevAction.line_to_btn1_4_3();
    } else if (nextPrevCount == 4.4) {
        nextPrevAction.line_to_btn1_4_4();
    } else if (nextPrevCount == 4.2) {
        nextPrevAction.line_to_btn1_4_2();
    } else if (nextPrevCount == 5) {
        nextPrevAction.line_to_popup_5();
    } else if (nextPrevCount == 6.1) {
        nextPrevAction.popup_to_input_6();
    } else if (nextPrevCount == 7) {
        nextPrevAction.input_to_graph_7();
    } else if (nextPrevCount == 8) {
        nextPrevAction.graph_to_end_8();
    } else if (nextPrevCount == 9) {
        nextPrevAction.end_to_end_9();
    }
}

$(document).ready(() => {
    load_all(0);
    // ALL ONLOAD FUNCTION WILL BE CALLED FROM INSIDE load_all()


    $(document).on('click', '.rect_curve', () => {
        $('#straight_line_graph').removeAttr('_echarts_instance_');
        load_graph(0, 'curved1');
        var text = 'The structure of the demand curve is a downward sloping non-linear curve';
        if (instBoxData[instBoxData.length - 1] != text) {
            instBoxData.push(text);
        }
        populateInstBox(instBoxData);
        var objDiv = document.getElementById("inst_box");
        objDiv.scrollTop = objDiv.scrollHeight;
        isCurved = true;
    });
    $(document).on('click', '.rect_straight', () => {
        $('#straight_line_graph').removeAttr('_echarts_instance_');
        load_graph(0, 'straight1');
        var text = 'The structure of the demand curve is a downward sloping straight line';
        if (instBoxData[instBoxData.length - 1] != text) {
            instBoxData.push(text);
        }
        populateInstBox(instBoxData);
        var objDiv = document.getElementById("inst_box");
        objDiv.scrollTop = objDiv.scrollHeight;
        isCurved = false;
    });


    $(document).on('click', '.rect_up', () => {
        var text = '<b>Reasons for increase</b>: <br> (a)&emsp;Popularity of commodity increased <br>(b)&emsp;Price of a <span class="tooltiper_element" title="Products that can be used by the consumer for the same purpose as the commodity under consideration; for example: Dominos and Pizza hut, Chrome and Firefox or Microsoft Edge, etc."><i><u>substitute good</u></i></span> increased <br>(c)&emsp; Price of a <span class="tooltiper_element" title="Products that are used together with the commodity under consideration, for example: Cereals and Milk, Shampoo and Conditioner, Vehicles and Fuel, etc."><i><u>complement good</u></i></span> decreased <br>(d)&emsp;Rise in income, etc';
        if (isCurved) {
            load_graph(0.26, 'curved2');
            flag = 2;
        } else {
            load_graph(0.26, 'straight2');
        }
        if (instBoxData[instBoxData.length - 1] != text) {
            instBoxData.push(text);
        }
        populateInstBox(instBoxData);
        var objDiv = document.getElementById("inst_box");
        objDiv.scrollTop = objDiv.scrollHeight;
    });
    $(document).on('click', '.rect_down', () => {
        var text = '<b>Reasons for decrease </b>: <br> (a)&emsp;Product has gone out of fashion, or consumer’s taste has changed<br>(b)&emsp;Price of <span class="tooltiper_element" title="Products that can be used by the consumer for the same purpose as the commodity under consideration; for example: Dominos and Pizza hut, Chrome and Firefox or Microsoft Edge, etc."><i><u>substitute good</u></i></span> decreased.<br>(c)&emsp;Price of a <span class="tooltiper_element" title="Products that are used together with the commodity under consideration, for example: Cereals and Milk, Shampoo and Conditioner, Vehicles and Fuel, etc."><i><u>complement good</u></i></span> has increased <br>(d)&emsp;Fall in income, etc';
        if (isCurved) {
            load_graph(-0.26, 'curved2');
        } else {
            load_graph(-0.26, 'straight2');
        }
        if (instBoxData[instBoxData.length - 1] != text) {
            instBoxData.push(text);
        }
        populateInstBox(instBoxData);
        var objDiv = document.getElementById("inst_box");
        objDiv.scrollTop = objDiv.scrollHeight;
    });

    $(document).on('click', '#inp_hint', () => {
        Swal.fire({
            title: 'HINT',
            icon: 'info',
            html: `<p style="text-align: center; margin: 0px; border-radius: 5px; margin-bottom: 12px; background-color: #667fcc; color: white; padding: 8px 0px">Market Quantity at Price P = <br>(Quantity of A + Quantity of B) at price P</p><br>
                <div>
                <table class = "table table-striped" style="width: 100%">
                <tr> 
                <th>Price</th>
                <th align="center">0.6</th>
                <th>1.0</th>
                <th>1.4</th>
                <th>1.8</th>
                <th>2.2</th>
                </tr>
                <tr> 
                <th>Quantity of A</th>
                <td>1.8</td>
                <td>1.4</td>
                <td>1.0</td>
                <td>0.6</td>
                <td>0.2</td>
                </tr>
                <tr> 
                <th>Quantity of B</th>
                <td>1.92</td>
                <td>1.6</td>
                <td>1.28</td>
                <td>0.96</td>
                <td>0.64</td>
                </tr>
                <tr> 
                <th>Market Quantity</th>
                <td>3.72</td>
                <td>3.0</td>
                <td>2.28</td>
                <td>1.56</td>
                <td>0.84</td>
                </tr>
                </table>
                </div>`,
            showCloseButton: false,
            focusConfirm: false,
            confirmButtonText: 'Close',
            confirmButtonAriaLabel: 'Close'
        })
    });


    $(document).on('click', '#overlay_btn', () => {
        $('.overlay_btn').animate({
            'width': '0px',
            'font-size': '0px'
        }, 200, 'swing');
        setTimeout(() => {
            $('.root_overlay').animate({
                'top': '70px'
            }, 500,
                'swing'
            );
        }, 200);
        setTimeout(() => {
            $('.root_overlay').animate({
                'top': '-999px'
            }, 1000,
                'swing',
                () => {
                    $('.root_overlay').hide();
                    // load_graph(0, 'straight');
                }
            );
        }, 400);
    });





    $(document).on('click', '.right_nav_arrow', () => {
        if (nextPrevCount == 0) {
            nextPrevCount += 1;
        }

        npClickAction();
        var objDiv = document.getElementById("inst_box");
        objDiv.scrollTop = objDiv.scrollHeight;

    });


    $(document).on('keyup', '.effect-8', function (e) {
        var flag = false;
        if (/\D/g.test(this.value)) {
            var q = this.value.indexOf(".");
            this.value = this.value.substr(0, q + 1) + this.value.substr(q + 1).replace(".", "");
            if (this.value.match(/\D/g)[this.value.match(/\D/g).length - 1] != '.') {
                this.value = this.value.substr(0, q + 1) + this.value.substr(q + 1).replace(/\D/g, '');
            }
        }
    });
    $(document).on('keydown', '.effect-8', function (e) {
        var flag = false;
        if (/\D/g.test(this.value)) {
            var q = this.value.indexOf(".");
            this.value = this.value.substr(0, q + 1) + this.value.substr(q + 1).replace(".", "");
        }
    });

    {

        $(document).on('mouseover', '.rect_curve', () => {
            $('.rect_curve').animate({
                height: '33px',
                width: '82px',
            }, 130);
        });
        $(document).on('mousedown', '.rect_curve', () => {
            $('.rect_curve').animate({
                height: '31px',
                width: '80px',
            }, 130);
        });
        $(document).on('mouseup', '.rect_curve', () => {
            $('.rect_curve').animate({
                height: '33px',
                width: '82px',
            }, 130);
        });
        $(document).on('mouseleave', '.rect_curve', () => {
            $('.rect_curve').animate({
                height: '33px',
                width: '82px',
            }, 130);
        });
        $(document).on('mouseover', '.rect_straight', () => {
            $('.rect_straight').animate({
                height: '33px',
                width: '82px',
            }, 130);
        });
        $(document).on('mousedown', '.rect_straight', () => {
            $('.rect_straight').animate({
                height: '31px',
                width: '80px',
            }, 130);
        });
        $(document).on('mouseup', '.rect_straight', () => {
            $('.rect_straight').animate({
                height: '33px',
                width: '82px',
            }, 130);
        });
        $(document).on('mouseleave', '.rect_straight', () => {
            $('.rect_straight').animate({
                height: '33px',
                width: '82px',
            }, 130);
        });

    }
});