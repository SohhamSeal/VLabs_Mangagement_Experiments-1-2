var instBoxData = [];

var table_to_graph_data = {
    price: [],
    QSxmar: [],
};

var tooltip = {
    trigger: "axis",
    formatter: (params) => {
        return `
            X: ${params[0].value[0].toFixed(2)}</br>
            Y: ${params[0].value[1].toFixed(2)}
        `;
    },
};

var xAxis = {
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
};

var yAxis = {
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
};

const current_table_to_graph_data = {
    price: [3.0, 4.0, 5.0, 6.0, 7.0],
    QSxmar: [1000.0, 2000.0, 3000.0, 4000.0, 5000.0],
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
        return x - 0.5;
    }

    function square_curve(x) {
        return 1 / x;
    }

    function generateDataSq(v) {
        let data = [];
        for (let i = 2.0; i >= 0.455; i -= .005) {
            data.push([2.3 - i - v, square_curve(i) + v + 0.2]);
        }
        return data;
    }

    function generateDataSt(v) {
        let data = [];
        for (let i = 0.8; i <= 2.3; i += .005) {
            data.push([straight(i) + v, i - v / 2]);
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
            //horizontally at price=1.0
            var series = [{
                type: 'line',
                showSymbol: false,
                clip: true,
                data: generateDataSt(v),
                markLine: {
                    data: [[{
                        name: 'Price= 1.0',
                        coord: [0.0, 1.0]
                    },
                    {
                        coord: [0.5, 1.0]
                    }
                    ],
                    [{
                        name: 'Quantity= 0.5',
                        coord: [0.5, 1.0]
                    },
                    {
                        coord: [0.5, 0.0]
                    }
                    ]],
                    lineStyle: {
                        color: 'black'
                    }
                }
            }, {
                data: [
                    [0.5, 1.0]
                ],
                type: 'scatter',
                symbolSize: 23,
                color: 'orange'
            }];
        } else if (form.charAt(form.length - 1) == '4') {
            //Vertically at quantity = 1.5
            var series = [{
                type: 'line',
                showSymbol: false,
                clip: true,
                data: generateDataSt(v),
                markLine: {
                    data: [[{
                        name: 'Price= 1.7',
                        coord: [1.2, 1.7]
                    },
                    {
                        coord: [0.0, 1.7],
                        label: {
                            position: 'insideEndTop'
                        }
                    }
                    ],
                    [{
                        name: 'Quantity= 1.2',
                        coord: [1.2, 0.0]
                    },
                    {
                        coord: [1.2, 1.7]
                    }
                    ]],
                    lineStyle: {
                        color: 'black'
                    }
                }
            }, {
                data: [
                    [1.2, 1.7]
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
            //horizontally at price=1.7
            var series = [{
                type: 'line',
                showSymbol: false,
                clip: true,
                data: generateDataSq(v),
                markLine: {
                    data: [[{
                        name: 'Price= 1.7',
                        coord: [0.0, 1.7]
                    },
                    {
                        coord: [1.63, 1.7]
                    }
                    ],
                    [{
                        name: 'Quantity= 1.63',
                        coord: [1.63, 1.7]
                    },
                    {
                        coord: [1.63, 0.0]
                    }
                    ]],
                    lineStyle: {
                        color: 'black'
                    }
                }
            }, {
                data: [
                    [1.63, 1.7]
                ],
                type: 'scatter',
                symbolSize: 23,
                color: 'orange'
            }];
        } else if (form.charAt(form.length - 1) == '4') {
            //Vertically at quantity = 1.05
            var series = [{
                type: 'line',
                showSymbol: false,
                clip: true,
                data: generateDataSq(v),
                markLine: {
                    data: [[{
                        name: 'Price= 1.0',
                        coord: [1.05, 1.0]
                    },
                    {
                        coord: [0.0, 1.0],
                        label: {
                            position: 'insideEndTop'
                        }
                    }
                    ],
                    [{
                        name: 'Quantity= 1.05',
                        coord: [1.05, 0.0]
                    },
                    {
                        coord: [1.05, 1.0]
                    }
                    ]],
                    lineStyle: {
                        color: 'black'
                    },
                    position: 'middle'
                }
            }, {
                data: [
                    [1.05, 1.0]
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
                    [0.7, 1.2]
                ],
            }]
        } else if (form.charAt(form.length - 1) == '2') {
            var series = [{
                type: 'line',
                showSymbol: true,
                clip: true,
                data: [
                    [0.7, 1.2]
                ],
            }, {
                type: 'line',
                showSymbol: true,
                clip: true,
                data: [
                    [1.5, 2.0]
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
            data: ['Individual Supply Curve', 'Market Supply Curve'],
            top: 10
        };

        var QSxmar_data = [];
        var QSxind_data = [];
        for (let i = 0; i < 5; i++) {
            var data = [];
            data.push(table_to_graph_data.QSxmar[i]);
            data.push(table_to_graph_data.price[i]);

            QSxmar_data.push(data);

            data = [];
            data.push(table_to_graph_data.QSxmar[i] / 50.0);
            data.push(table_to_graph_data.price[i]);

            QSxind_data.push(data);
        }

        xAxis = {};
        xAxis = {
            name: 'Quantity',
            nameTextStyle: {
                fontSize: 15,
                align: 'right',
                verticalAlign: 'top',
                padding: [30, 0, 0, 0],
            },
            min: 0,
            max: 6000,
            minorTick: {
                show: false,
            },
            minorSplitLine: {
                show: false,
            }
        };

        yAxis = {};
        yAxis = {
            name: 'Price',
            nameTextStyle: {
                fontSize: 15
            },
            min: 0,
            max: 8,
            minorTick: {
                show: false,
            },
            minorSplitLine: {
                show: false,
            }
        };

        tooltip = {
            trigger: "axis"
        };

        var series = [{
            name: 'Market Supply Curve',
            type: 'line',
            showSymbol: true,
            clip: true,
            data: QSxmar_data,
        }, {
            name: 'Individual Supply Curve',
            type: 'line',
            showSymbol: true,
            clip: true,
            lineStyle: {
                type: 'dashed'
            },
            data: QSxind_data
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
        tooltip: tooltip,
        legend: data_legend,
        xAxis: xAxis,
        yAxis: yAxis,
        dataZoom: [{
            show: true,
            type: 'inside',
            filterMode: 'none',
            xAxisIndex: [0],
            startValue: -6000,
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
        instBoxData.push(`<p class = "inst_box_header"><b>Plotting the Supply Curve</b></p>`);
        instBoxData.push('To understand more about the supply curve and the nature between the product price and the quantity demanded, we move to a graphical approach');
        instBoxData.push('The graph drawn has the price on the vertical axis and the quantity demanded on the horizontal axis');
        populateInstBox(instBoxData);

        nextPrevCount = 2;
    },
    blank_to_1pt_2: () => {
        instBoxData = [];
        instBoxData.push(`<p class = "inst_box_header"><b>Plotting the Supply Curve</b></p>`);
        instBoxData.push(`To create the supply curve, let us consider an example:
        Suppose that a single producer’s supply function for commodity X is QSx= -0.5 + Px, all other things being constant.
        Therefore, by substituting various prices of X, we get the supply schedule`);

        instBoxData.push(`Let Px= 1.2, then QSx=0.7`);
        populateInstBox(instBoxData);
        var objDiv = document.getElementById("inst_box");
        objDiv.scrollTop = objDiv.scrollHeight;
        $('#straight_line_graph').empty();
        $('#straight_line_graph').removeAttr('_echarts_instance_');
        load_graph(0, 'blank1');

        nextPrevCount = 3;
    },
    _1pt_to_2pt_3: () => {
        instBoxData.push(`Similarly, if Px=2.0, then QSx=1.5`);
        populateInstBox(instBoxData);
        var objDiv = document.getElementById("inst_box");
        objDiv.scrollTop = objDiv.scrollHeight;
        $('#straight_line_graph').empty();
        $('#straight_line_graph').removeAttr('_echarts_instance_');
        load_graph(0, 'blank2');

        nextPrevCount = 4;
    },
    _2pt_to_line_4: () => {
        $('#straight_line_graph').empty();
        $('#straight_line_graph').removeAttr('_echarts_instance_');
        instBoxData.push(`Plotting each pair of values from the supply schedule as a point on the graph and joining the resulting points, we get the individual’s supply curve for commodity X`);
        populateInstBox(instBoxData);
        var objDiv = document.getElementById("inst_box");
        objDiv.scrollTop = objDiv.scrollHeight;
        load_graph(0, 'straight_1');
        nextPrevCount = 4.1;
    },
    line_to_btn1_4_1: () => {
        (async () => {
            const { value: answer } = await Swal.fire({
                icon: 'info',
                html: `<p style = "font-size: 14px;">
                            We see that the lower the price of X, the smaller the quantity of X offered by the supplier. The reverse is, also, always true. The direct relationship between the price and quantity is reflected in the positive slope of the supply curve. However, we <b>cannot</b> say that the supply curve is always positive. It could also have a zero, infinite or even a negative slope, therefore, no generalizations are possible.
                       </p>`,
            })
            instBoxData = [];
            instBoxData.push(`<p class = "inst_box_header"><b>Structures of the Supply Curves</b></p>`);
            populateInstBox(instBoxData);
            var objDiv = document.getElementById("inst_box");
            objDiv.scrollTop = objDiv.scrollHeight;
            $('.rect_wrapper_stcv').show(1000);
            instBoxData.push(`<p>Click on the buttons to understand the different structures of the supply curve</p>`);
            populateInstBox(instBoxData);
            var objDiv = document.getElementById("inst_box");
            objDiv.scrollTop = objDiv.scrollHeight;
        })()
        nextPrevCount = 4.3;
    },
    line_to_btn1_4_3: () => {
        $('.rect_wrapper_stcv').hide(1000);
        instBoxData = [];
        instBoxData.push(`<p class = "inst_box_header"><b>Reading the Supply Curve</b></p>`);
        instBoxData.push(`<p><b>Horizontally</b><br>How much suppliers are willing and able to sell at a given price</p>`);
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
        instBoxData.push(`<p class = "inst_box_header"><b>Reading the Supply Curve</b></p>`);
        instBoxData.push(`<p><b>Vertically</b><br>The min price at which suppliers will sell a given quantity</p>`);
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
        instBoxData.push(`<p class = "inst_box_header"><b>Shifts in the Supply Curves</b></p>`);
        instBoxData.push(`<p>Click on the buttons to understand the reason for shifts in the supply curve</p>`);
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
                        'increase': 'increase',
                        'decrease': 'decrease',
                        'remain unaffected': 'remain unaffected',
                        'depend on the number of customers': 'depend on the number of customers'
                    })
                }, 1000)
            })
            const { value: answer } = await Swal.fire({
                title: 'If the number of customers in the market increases suddenly, the supply will...',
                input: 'radio',
                inputOptions: inputOptions,
                inputValidator: (value) => {
                    if (!value) {
                        return 'You need to choose something!'
                    }
                    else if (value != 'remain unaffected') {
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

        $('#straight_line_graph').empty();
        $('#straight_line_graph').removeAttr('_echarts_instance_');

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
                table_to_graph_data.QSxmar.push(parseFloat(this.value));
            });

            if (validateinputData(table_to_graph_data)) {
                var transitionTime = 1000;
                var table_data = `<table class = "table table-striped" style="width: 100%; margin-bottom: 0px !important; text-align: center;">
                <tr> 
                    <td style="font-weight: bold; width: 60px;">Price </td>
                    <td style="font-weight: bold;">Individual Producer's quantity</td>
                    <td style="font-weight: bold;">Market Quantity</td>
                </tr>
                <tr> 
                    <td><b>3</b></td>
                    <td>20</td>
                    <td>1000</td>
                </tr>
                <tr> 
                    <td><b>4</b></td>
                    <td>40</td>
                    <td>2000</td>
                </tr>
                <tr>
                    <td><b>5</b></td>
                    <td>60</td>
                    <td>3000</td>
                </tr>
                <tr>
                    <td><b>6</b></td>
                    <td>80</td>
                    <td>4000</td>
                </tr>
                <tr>
                    <td><b>7</b></td>
                    <td>100</td>
                    <td>5000</td>
                </tr>
                </table>`;
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
                instBoxData.push(`<p class = "inst_box_header"><b>Creation of market supply schedule</b></p>`);
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

                if (inp_err_count >= 2) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Maximum tries reached',
                        text: 'All correct values have been filled in',
                    })
                    populate_input(current_table_to_graph_data);
                    $('#inp_box_wrapper table tbody tr:nth-child(2) td .effect_wrapper').children('input').each(function (index, element) {
                        $(`#Mark${index + 1}`).removeClass('effect-8-error');
                    });
                    table_to_graph_data = current_table_to_graph_data;
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error in Field(s)',
                    })
                    table_to_graph_data = {
                        price: [],
                        QSxmar: [],
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
    // QSxmar = 50*(20*Px-40)
    input.QSxmar.map((element, index) => {
        var comp = (input.price[index] * 20 - 40) * 50;
        if (element != comp.toFixed(2)) {
            flag = false;
        }
    });

    $('#inp_box_wrapper table tbody tr:nth-child(2) td .effect_wrapper').children('input').each(function (index, element) {
        var comp = (input.price[index] * 20 - 40) * 50;
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
        $(`#Mark${index + 1}`).val(data.QSxmar[index]);
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
        var text = 'The structure of the supply curve is an upward sloping non-linear curve';
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
        var text = 'The structure of the supply curve is an upward sloping straight line';
        if (instBoxData[instBoxData.length - 1] != text) {
            instBoxData.push(text);
        }
        populateInstBox(instBoxData);
        var objDiv = document.getElementById("inst_box");
        objDiv.scrollTop = objDiv.scrollHeight;
        isCurved = false;
    });

    $(document).on('click', '.rect_up', () => {
        var text = '<b>Reasons for increase</b>: <br> (a)&emsp;Decrease in the price of inputs <br>(b)&emsp;Advancements in production technology <br>(c)&emsp;Lower future price expectations <br>(d)&emsp;Increase in production subsidies<br>(e)&emsp;Tax reduction, etc';
        if (isCurved) {
            load_graph(-0.2, 'curved2');
            flag = 2;
        } else {
            load_graph(0.2, 'straight2');
        }
        if (instBoxData[instBoxData.length - 1] != text) {
            instBoxData.push(text);
        }
        populateInstBox(instBoxData);
        var objDiv = document.getElementById("inst_box");
        objDiv.scrollTop = objDiv.scrollHeight;
    });

    $(document).on('click', '.rect_down', () => {
        var text = '<b>Reasons for decrease</b>: <br> (a)&emsp;Increase in the price of inputs <br>(b)&emsp;Technological regress <br>(c)&emsp;Higher future price expectations <br>(d)&emsp;Cut in production subsidies,<br>(e)&emsp;Tax increased, etc';
        if (isCurved) {
            load_graph(0.2, 'curved2');
        } else {
            load_graph(-0.2, 'straight2');
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
            html: `<p style="text-align: center; margin: 0px; border-radius: 5px; margin-bottom: 12px; background-color: #667fcc; color: white; padding: 8px 0px">Market Quantity at Price P = <br>Summation of quantities of all individual producers at price P</p><br>
                <table class = "table table-striped" style="width: 100%;">
                <tr> 
                <td style="text-align: center; font-weight: bold; width: 58px;">Price </td>
                <td style="text-align: center; font-weight: bold;">Individual Producer's quantity</td>
                <td style="text-align: center; font-weight: bold;">Market Quantity</td>
                </tr>
                <tr> 
                    <td><b>3</b></td>
                    <td>20</td>
                    <td>1000</td>
                </tr>
                <tr> 
                    <td><b>4</b></td>
                    <td>40</td>
                    <td>2000</td>
                </tr>
                <tr>
                    <td><b>5</b></td>
                    <td>60</td>
                    <td>3000</td>
                </tr>
                <tr>
                    <td><b>6</b></td>
                    <td>80</td>
                    <td>4000</td>
                </tr>
                <tr>
                    <td><b>7</b></td>
                    <td>100</td>
                    <td>5000</td>
                </tr>
                </table>`,
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