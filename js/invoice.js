$(function () {
    //单据左边，点击列表，背景变成白色
    var oli = $(".invoice-item li");
    for (var i=0; i<oli.length; i++) {
        oli.eq(i).click(function () {
            $(this).addClass("white").siblings().removeClass("white");
        })
    };

    //待办
    $("#todo").click(function () {
        $("#finished").removeClass("active");
        $("#all").removeClass("active");
        $("#todo").addClass("active");
        $('#tb').datagrid('load','data/grid_data_1.json');
		

    });
    //已办
    $("#finished").click(function () {
        $("#todo").removeClass("active");
        $("#all").removeClass("active");
        $("#finished").addClass("active");
        $('#tb').datagrid('load','data/grid_data_2.json');
    });
    //全部
    $("#all").click(function () {
        $("#todo").removeClass("active");
        $("#finished").removeClass("active");
        $("#all").addClass("active");
        $('#tb').datagrid('load','data/grid_data_3.json');
    });

    // 去除列边框
    $('#tb').datagrid({
        onLoadSuccess: function (data) {
            var panel = $(this).datagrid('getPanel');
            var tr = panel.find('div.datagrid-body tr');
            tr.each(function () {
                var td = $(this).children('td');
                td.css({
                    "border-right-width": "0"
                });
            });
        }
    });


    // 高级查询-列表
    var oUl = $(".triangle-item");
    $.ajax({
        url:'data/triangle_item_data.json',
        type:'GET',
        dataType:'json',
        success:function(result){
            for(var i=0;i<result.length;i++){
                var oli = "<li value="+'"'+result[i].deptId+'"'+">"+result[i].deptName+"</li>";
                oUl.append(oli);
            }
        }
    });

    // 高级查询-下拉列表
    $(".triangle .icon-zhankai").click(function(e){
        $(".triangle-item").fadeToggle(100);
        // $(".triangle").css("border-bottom","none");
        e.stopPropagation();
    });
    // 高级查询-表单
    $(".triangle span").click(function(e){
        $(".search-criteria").fadeToggle(100);
        $(".triangle").addClass("left-active");
        $(".reload").removeClass("left-active");
        e.stopPropagation();
    });

    //表单功能按钮，切换样式
    var oin = $(".criteria-btn input");
    for (var i=0; i<oin.length; i++) {
        oin.eq(i).click(function () {
            $(this).addClass("click-btn").siblings().removeClass("click-btn");
        })
    }
    //表单功能按钮-查询
    $(".search-btn").click(function () {
        var las = $(".search-criteria label");
        var la = [];
        for (var i=0; i<las.length-1; i++) {
            la = las[i];
            console.log(la);
        }
    });
    
    
    //刷新
    $(".reload").click(function () {
        $(".reload").addClass("left-active");
        $(".triangle").removeClass("left-active");
        $(".search-criteria").css("display","none");
    });


    // 更多操作-下拉列表
    $(".more-actions").click(function(e){
        $(".actions-item").fadeToggle(100);
        $(".actions").addClass("click-actions");
        e.stopPropagation();
    });

    // 功能按扭区，右边
    var rli = $(".btn-right li");
    for (var i=0; i<rli.length; i++) {
        rli.eq(i).click(function () {
            $(this).addClass("right-active").siblings().removeClass("right-active");
        })
    }

    // 高级查询标题
    var dli = $(".tit-item li");
    for (var i=0; i<dli.length; i++) {
        dli.eq(i).click(function () {
            $(this).addClass("del-li").siblings().removeClass("del-li");
        })
    }
    // 高级查询标题-清空列表标题
    $(".tit .icon-guanbi").click(function () {
        $(this).parent().remove();
    });
    // 高级查询标题-清空全部标题
    $(".tit span").click(function () {
        $(".tit-item").empty();
        $(".tit").hide();
    });



    //行内数据函数
    var rows ;
    function line_data() {
        $('#line-detail').form('load',{
            document_code:rows.document_code,
            document_month:rows.document_month,
            document_money:rows.document_money,
            document_explain:rows.document_explain,
            document_unit:rows.document_unit,
            document_course:rows.document_course,
            document_economic:rows.document_economic,
            document_opinion:rows.document_opinion
        });
    }
    //弹窗展示信息
    $("#tb").datagrid({
        onClickRow:function (index,row) {
            rows = row;
            line_data();
        }
    });


});

//表格操作部分
function format(val,row,index){
    return '<p><span id="detail" onclick="line_detail()">详情</span>' +
        '<span id="past" onclick="past()">通过</span>' +
        '<span id="back" onclick="back()">退回</span></p>';
}

// 遮罩层
var shade = document.getElementById("shade");
var audit = document.getElementById("more-audit");
var hist = document.getElementById("audit-history");
var line = document.getElementById("line-set");
var detail = document.getElementById("table-dig");
// 批量审核
function more_audit() {
    shade.style.display = "block";
    audit.style.display = "block";
};
function cancel_audit() {
    shade.style.display = "none";
    audit.style.display = "none";
};
//审核历史
function audit_history() {
    shade.style.display = "block";
    hist.style.display = "block";
};
function cancel_history() {
    shade.style.display = "none";
    hist.style.display = "none";
};
//列设置
function line_set() {
    shade.style.display = "block";
    line.style.display = "block";
};
function cancel_line() {
    shade.style.display = "none";
    line.style.display = "none";
};
//表格行内详细信息
function line_detail() {
    shade.style.display = "block";
    detail.style.display = "block";
}
function detail_line() {
    shade.style.display = "none";
    detail.style.display = "none";
};



