var instBoxData = ['Data Loaded'];

const possibleGraphTitles = ['LAW OF DEMAND', 'LAW OF SUPPLY', 'EQUILIBRIUM STATE'];

var nextPrevCount = 0;

var load_all = (v) => {
    $('#root').load('./components/box.html');
    fetch("./components/graphs.html")
        .then((response) => response.text())
        .then((html) => {
            // populateGraphHeader();
            document.getElementById("box_graph").innerHTML = html;
            // load_graph(v, 'straight');
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

        })
        .catch((error) => {
            console.warn(error);
        });


}

function straight(x) {
    //var a = 20;
    return -1.0989010990291264 * x + 2.6978021980582527;
}

function square_curve(x) {
    return 1 / x;
}

function generateDataSq(v) {
    let data = [];
    for (let i = 2.0; i >= 0.455; i -= .005) {
        data.push([i, square_curve(i + v)]);
    }
    return data;
}

function generateDataSt(v) {
    let data = [];
    for (let i = 0.3; i <= 2.0; i += .005) {
        data.push([i, straight(i + v)]);
    }
    return data;
}

function generateDataSqRev(v, q) {
    let data = [];
    for (let i = 2.0; i >= 0.455; i -= .005) {
        data.push([-(i + v) + q, square_curve(i + v)]);
    }
    return data;
}

function generateDataStRev(v, q) {
    let data = [];
    for (let i = 0.3; i <= 2.0; i += .005) {
        data.push([-(i + v) + q, straight(i + v)]);
    }
    return data;
}

function generateDataStMarker() {
    let data = [];
    for (let i = 0.0; i <= 1.0989999999999895; i += .01) {
        data.push([i, 1.4901098902252543]);
    }
    for (let i = 1.4901098902252543; i >= 0.0; i -= .01) {
        data.push([1.0989999999999895, i]);
    }
    return data;
}

function generateDataSqMarker() {
    let data = [];
    for (let i = 0.0; i <= 1.0989999999999007; i += .01) {
        data.push([i, 0.9099181073702545]);
    }
    for (let i = 0.9099181073702545; i >= 0; i -= .01) {
        data.push([1.0989999999999007, i]);
    }
    return data;
}



var nextPrevAction = {
    theo_to_blank_graph_1: () => {
        var transitionTime = 1000;
        $('#graph_theo_col').removeClass('col-md-12').delay(transitionTime);
        $('#graph_theo_col').addClass('col-md-8').delay(transitionTime);

        $('#inst_col').show(transitionTime);
        $('#theo_wrapper').hide(transitionTime / 3);
        $('#straight_line_graph').css({ height: '400px' });
        setTimeout(() => {
            load_graph(0, 'blank');
        }, transitionTime + 200);
    },
    blank_to_1pt_2: () => {
        $('#straight_line_graph').empty();
        $('#straight_line_graph').removeAttr('_echarts_instance_');
        load_graph(0, 'straight');
        $('.rect_wrapper_stcv').show(1000);
    },
    _1pt_to_2pt_3: () => {
        $('#straight_line_graph').empty();
        $('#straight_line_graph').removeAttr('_echarts_instance_');
        load_graph(0, 'blank2');
    },
    _2pt_to_line_4: () => {
        $('#straight_line_graph').empty();
        $('#straight_line_graph').removeAttr('_echarts_instance_');
        $('.rect_wrapper_updw').show(1000);
        load_graph(0, 'straight_1');
    },
    line_to_popup_5: () => {
        (async () => {
            // const ipAPI = '//api.ipify.org?format=json'
            // const inputValue = fetch(ipAPI)
            //     .then(response => response.json())
            //     .then(data => data.ip)

            const { value: answer } = await Swal.fire({
                title: `<h3>What comes after 3?</h3>`,
                input: 'text',
                // inputLabel: '',
                // inputValue: inputValue,
                allowOutsideClick: false,
                showCancelButton: true,
                inputValidator: (value) => {
                    if (!value || value != 4) {
                        return 'Nope...'
                    }
                }
            })
            if (answer) {
                Swal.fire(`${answer}`);
                nextPrevAction.popup_to_input_6();
            }
        })()
    },
    popup_to_input_6: () => {
        var transitionTime = 1000;

        $('#inst_col').hide(transitionTime);

        $('#graph_theo_col').removeClass('col-md-8').delay(transitionTime);
        $('#graph_theo_col').addClass('col-md-12').delay(transitionTime);

        $('#inp_box_wrapper').show(transitionTime / 3);
        $('#straight_line_graph').empty();
        $('#straight_line_graph').removeAttr('_echarts_instance_');
        $('#straight_line_graph').css({ height: '0px' });
    }
};

var load_graph = (v, form) => {
    var graphId = document.getElementById('straight_line_graph');
    var myChart = echarts.init(graphId);

    if (form.includes('straight')) {

        if (form.charAt(form.length - 1) == '1') {
            var series = [{
                type: 'line',
                showSymbol: false,
                clip: true,
                data: generateDataSt(v)
            }];
        }
        else {
            var series = [{
                type: 'line',
                showSymbol: false,
                clip: true,
                data: generateDataSt(v)
            },
            {
                type: 'line',
                showSymbol: false,
                clip: true,
                data: generateDataStRev(v, 2.198)
            },
            {
                type: 'line',
                color: '#000000',
                showSymbol: false,
                lineStyle: {
                    type: 'dashed'
                },
                data: generateDataStMarker()
            },
            {
                name: 'EQPoint_st',
                data: [[1.0989999999999007, 1.4901098902252543]],
                type: 'scatter',
                symbolSize: 23,
                labelLayout: {
                    y: 20,
                    align: 'center'
                },
                labelLine: {
                    show: true,
                    length2: 5,
                    lineStyle: {
                        color: '#000000'
                    }
                },
                label: {
                    show: true,
                    formatter: 'EQUILIBRIUM POINT',
                    color: '#FF0000',
                    minMargin: 20,
                    position: 'top'
                }
            }];
        }
    } else if (form == 'curved') {
        var series = [{
            type: 'line',
            showSymbol: false,
            clip: true,
            data: generateDataSq(v)
        },
        {
            type: 'line',
            showSymbol: false,
            clip: true,
            data: generateDataSqRev(v, 2.198)
        },
        {
            type: 'line',
            color: '#000000',
            showSymbol: false,
            clip: true,
            lineStyle: {
                type: 'dashed'
            },
            data: generateDataSqMarker()
        },
        {
            name: 'EQPoint_sq',
            data: [[1.0989999999999007, 0.9099181073702545]],
            type: 'scatter',
            symbolSize: 23,
            labelLayout: {
                y: 20,
                align: 'center'
            },
            labelLine: {
                show: true,
                length2: 5,
                lineStyle: {
                    color: '#000000'
                }
            },
            label: {
                show: true,
                formatter: 'EQUILIBRIUM POINT',
                color: '#FF0000',
                minMargin: 20,
                position: 'top'
            }
        }];
    } else if (form.includes('blank')) {
        if (form.charAt(form.length - 1) == '1') {
            var series = [{
                type: 'line',
                showSymbol: true,
                clip: true,
                data: [[1, 2]],
            }]
        } else if (form.charAt(form.length - 1) == '2') {
            var series = [{
                type: 'line',
                showSymbol: true,
                clip: true,
                data: [[1, 2]],
            }, {
                type: 'line',
                showSymbol: true,
                clip: true,
                data: [[2, 1]],
            }]
        } else {
            var series = [{
                type: 'line',
                showSymbol: true,
                clip: true,
                data: [],
            }]
        }
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

                if (params[0].value[0].toFixed(4) == 1.0989 && params[0].value[1].toFixed(4) == 1.4901) {
                    return `
                        X: ${params[0].value[0]}</br>
                        Y: ${params[0].value[1]}
                    `;
                }
                else {
                    return `
                    X: ${params[0].value[0]}</br>
                    Y: ${params[0].value[1]}
                `;
                }
            },
        },
        xAxis: {
            name: 'x',
            min: 0,
            max: 2.2,
            minorTick: {
                show: true
            },
            minorSplitLine: {
                show: true
            }
        },
        yAxis: {
            name: 'y',
            min: 0,
            max: 2.5,
            minorTick: {
                show: true
            },
            minorSplitLine: {
                show: true
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

    // console.log(JSON.stringify(option));
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

var populateGraphHeader = () => {
    $('#graph_header').empty();
    var url = new URL(location.href);
    var graphTitleFromURL = url.searchParams.get("graphtitle");
    var graphTitle = '';
    possibleGraphTitles.map((element, index) => {
        if (element == graphTitleFromURL) {
            graphTitle = element;
        }
    });
    if (graphTitle) {
        $('#graph_header').text(graphTitle);
    } else {
        $('#graph_header').text('LAW OF DEMAND');
    }
}

var npClickAction = () => {
    if (nextPrevCount == 1) {
        nextPrevAction.theo_to_blank_graph_1();
    } else if (nextPrevCount == 2) {
        nextPrevAction.blank_to_1pt_2();
    } else if (nextPrevCount == 3) {
        nextPrevAction._1pt_to_2pt_3();
    } else if (nextPrevCount == 4) {
        nextPrevAction._2pt_to_line_4();
    } else if (nextPrevCount == 5) {
        nextPrevAction.line_to_popup_5();
    }
}

$(document).ready(() => {
    load_all(0);
    // ALL ONLOAD FUNCTION WILL BE CALLED FROM INSIDE load_all()

    $(document).on('click', '.rect_curve', () => {
        $('#straight_line_graph').removeAttr('_echarts_instance_');
        load_graph(0, 'curved');
        if (instBoxData[instBoxData.length - 1] != 'Showing Curved Demand & Supply Lines') {
            instBoxData.push('Showing Curved Demand & Supply Lines');
        }
        populateInstBox(instBoxData);
    });
    $(document).on('click', '.rect_straight', () => {
        $('#straight_line_graph').removeAttr('_echarts_instance_');
        load_graph(0, 'straight');
        if (instBoxData[instBoxData.length - 1] != 'Showing Straight Demand & Supply Lines') {
            instBoxData.push('Showing Straight Demand & Supply Lines');
        }
        populateInstBox(instBoxData);
    });

    $(document).on('dblclick', '#inst_box', () => {
        $('.inst_box').animate({
            // 'filter': 'blur(4px)'
            'border': 'none'
        }, 200, 'linear');
        console.log('abcd');
        instBoxData = []
        populateInstBox(instBoxData);
    })


    $(document).on('click', '#overlay_btn', () => {
        $('.overlay_btn').animate({
            'width': '0px',
            'font-size': '0px'
        }, 200, 'swing');
        setTimeout(() => {
            $('.root_overlay').animate(
                {
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
        else if (nextPrevCount >= 1 && nextPrevCount < 5) {
            nextPrevCount += 1;
        }
        console.log(nextPrevCount);
        var action = Object.keys(nextPrevAction)[nextPrevCount - 1];
        console.log(action);


        npClickAction();

    });
    $(document).on('click', '.left_nav_arrow', () => {
        if (nextPrevCount > 1 && nextPrevCount <= 5) {
            nextPrevCount -= 1;
        }
        console.log(nextPrevCount);
        var action = Object.keys(nextPrevAction)[nextPrevCount - 1];
        console.log(action);


        npClickAction();
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