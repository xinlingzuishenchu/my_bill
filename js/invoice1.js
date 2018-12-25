$(function () {
    //单据左边，点击列表，背景变成白色
    $(".invoice-item").on("click","li",function(){
   		$(this).addClass("white").siblings().removeClass("white");
   		initdatagrid();
   		$("#tb").datagrid("load",$(this).attr("url"));
    });
	
    //待办
    $("#todo").click(function () {
		$(this).addClass("active").siblings().removeClass("active");
		$('#tb').datagrid('addFilterRule', {
			field: 'document_opinion',
			op: 'contains',
			value: '待办'
		});
		$("#tb").datagrid("doFilter");
    });
    //已办
    $("#finished").click(function () {
    	$(this).addClass("active").siblings().removeClass("active");
		$('#tb').datagrid('addFilterRule', {
			field: 'document_opinion',
			op: 'contains',
			value: '已办'
		});
		$("#tb").datagrid("doFilter");
    });
    //全部
    $("#all").click(function () {
    	$(this).addClass("active").siblings().removeClass("active");
        $('#tb').datagrid('addFilterRule', {
			field: 'document_opinion',
			op: 'contains',
			value: ''
		});
		$("#tb").datagrid("doFilter");
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
	
	$(".triangle-item").on("click","li",function(){
		$(this).parent("ul").hide();
	})
	
	
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
        $("#tb").datagrid("reload");
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
    //冻结列
//  $("#tb").datagrid({
//  	frozenColumns:[[{
//  		title:"月份",
//  		field:"document_month"
//  	}]]
//  })
    
    
    $("#line-set").children(".modal-content").children("li").on("click","input[type='button']",function(){
    	$(this).addClass("focus1")
    })
    
    
    
    //启用过滤
	$("#tb").datagrid("enableFilter");

});

//表格操作部分
function format(val,row,index){
    return '<p><span id="detail" onclick="line_detail()">详情</span>' +
        '<span id="past" onclick="past()">通过</span>' +
        '<span id="back" onclick="back()">退回</span></p>';
}

// 批量审核
function more_audit() {
	
	var sel = $("#tb").datagrid("getSelected");
	if(sel == null){
		alert("请选择最少一条数据")
	}else{
		$("#shade").show();
    	$("#more-audit").show();
	}
};
function cancel_audit() {
    $("#shade").hide();
    $("#more-audit").hide();
};
//审核历史
function audit_history() {
	
	var sel = $("#tb").datagrid("getSelected");
	if(sel == null){
		alert("请选择表格中的一条数据");
	}else{
		$("#shade").show();
    	$("#audit-history").show();
	}
};
function cancel_history() {
    $("#shade").hide();
    $("#audit-history").hide();
};
//列设置
function line_set() {
	
	var list = $("#tb").datagrid("getColumnFields");
	console.log(list);
	
	var arr = [];
	$("#tb").prev().find(".datagrid-header-row").eq(0).children("td").each(function(){
		arr.push($(this).children(".datagrid-cell").children("span").eq(0).text());
	});
	console.log(arr);
	
	
    $("#shade").show();
    $("#line-set").show();
};
function cancel_line() {
    $("#shade").hide();
    $("#line-set").hide();
};
//表格行内详细信息
function line_detail() {
    $("#shade").show();
    $("#table-dig").show();
}
function detail_line() {
    $("#shade").hide();
    $("#table-dig").hide();
};

function initdatagrid(){
	$("#all").addClass("active").siblings().removeClass("active");
	
	
	$('#tb').datagrid('addFilterRule', {
		field: 'document_opinion',
		op: 'contains',
		value: ''
	}); 
	$("#tb").datagrid("doFilter");
}

