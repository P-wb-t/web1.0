document.addEventListener('DOMContentLoaded',function(){
    $(".nav-tabs>li:first>a").addClass("active show");
    $(".tab-content>div:first").addClass("active show");
});
// $(function(){
//     $(".nav-tabs>li:first>a").addClass("active show");
//     $(".tab-content>div:first").addClass("active show");
// })
// 静态分页
var getPage = function (obj) {
    if (obj.pageType == 'WCM') {
        if (obj.pageCount == 1) {
            obj.pageId.hide();
        } else {
            obj.pageId.show();
        }
    }
    var $this = this;
    this._createPage = function (obj) {
        var total_page = parseInt(obj.pageCount); //总页数
        if (obj.isStatic) { //判断处理WCM当前页面
            if (obj.pageIndex == 0) {
                obj.pageIndex = 1;
            } else {
                obj.pageIndex = obj.pageIndex + 1;
            }
        }
        if (obj.ajaxDataType == 'xml') { //判断处理WCM当前页面
            if (obj.pageIndex == 0) {
                obj.pageIndex = 1;
            }
        }
        var current_page = parseInt(obj.pageIndex); //当前页数

        var pager_length = obj.pageLength; //不包next 和 prev 必须为奇数
        var pager = new Array(pager_length);
        var header_length = obj.headerKeep; //头部预留页码
        var tailer_length = obj.footerKeep; //尾部预留页码
        //header_length + tailer_length 必须为偶数
        var main_length = pager_length - header_length - tailer_length; //必须为奇数
        var tagStr = obj.tagStr;
        var tagStr2 = obj.tagStr2;
        var classStr = obj.classStr;
        var idStr = obj.idStr;
        var nameStr = obj.nameStr;
        var disable_class = obj.disable;
        var select_class = obj.active;
        var extClass = obj.extClass;
        var i;
        var code = '';
        var mobileCode = '';
        var codeList = [];
        var numRel = '';

        if (total_page < current_page) {
            //alert('总页数不能小于当前页数');
            return false;
        }
        //判断总页数是不是小于 分页的长度，若小于则直接显示
        if (total_page <= pager_length) {
            for (i = 0; i < total_page; i++) {
                code += (i + 1 != current_page) ? $this.createTag({
                    pageName: obj.pageName,
                    pageExt: obj.pageExt,
                    isStatic: obj.isStatic,
                    tagStr: tagStr,
                    classStr: classStr,
                    idStr: idStr,
                    nameStr: nameStr,
                    a_html: i + 1
                }) : $this.createTag({
                    pageName: obj.pageName,
                    pageExt: obj.pageExt,
                    isStatic: obj.isStatic,
                    tagStr: tagStr,
                    classStr: select_class,
                    idStr: idStr,
                    nameStr: nameStr,
                    a_html: i + 1
                });
            }
        } else { //如果总页数大于分页长度，则为一下函数
            //先计算中心偏移量
            var offset = (pager_length - 1) / 2;
            //分三种情况，第一种左边没有...
            if (current_page <= offset + 1) {
                var tailer = '';
                //前header_length + main_length 个直接输出之后加一个...然后输出倒数的    tailer_length 个
                for (i = 0; i < header_length + main_length; i++) {
                    code += (i + 1 != current_page) ? $this.createTag({
                        pageName: obj.pageName,
                        pageExt: obj.pageExt,
                        isStatic: obj.isStatic,
                        tagStr: tagStr,
                        classStr: classStr,
                        idStr: idStr,
                        nameStr: nameStr,
                        a_html: i + 1
                    }) : $this.createTag({
                        pageName: obj.pageName,
                        pageExt: obj.pageExt,
                        isStatic: obj.isStatic,
                        tagStr: tagStr,
                        classStr: select_class,
                        idStr: idStr,
                        nameStr: nameStr,
                        a_html: i + 1
                    });
                }
                code += $this.createTag({
                    pageName: obj.pageName,
                    pageExt: obj.pageExt,
                    isStatic: obj.isStatic,
                    tagStr: tagStr,
                    classStr: classStr,
                    idStr: idStr,
                    nameStr: nameStr,
                    a_html: '...'
                });
                for (i = total_page; i > total_page - tailer_length; i--) {
                    tailer = $this.createTag({
                        pageName: obj.pageName,
                        pageExt: obj.pageExt,
                        isStatic: obj.isStatic,
                        tagStr: tagStr,
                        classStr: classStr,
                        idStr: idStr,
                        nameStr: nameStr,
                        a_html: i
                    }) + tailer;
                }
                code += tailer;
            } else if (current_page >= total_page - offset) { //第二种情况是右边没有...
                var header = '';
                //后tailer_length + main_length 个直接输出之前加一个...然后拼接 最前面的 header_length 个
                for (i = total_page; i >= total_page - main_length - 1; i--) {
                    code = ((current_page != i) ? $this.createTag({
                        pageName: obj.pageName,
                        pageExt: obj.pageExt,
                        isStatic: obj.isStatic,
                        tagStr: tagStr,
                        classStr: classStr,
                        idStr: idStr,
                        nameStr: nameStr,
                        a_html: i
                    }) : $this.createTag({
                        pageName: obj.pageName,
                        pageExt: obj.pageExt,
                        isStatic: obj.isStatic,
                        tagStr: tagStr,
                        classStr: select_class,
                        idStr: idStr,
                        nameStr: nameStr,
                        a_html: i
                    })) + code;
                }
                if (total_page != (pager_length + 1)) {
                    code = $this.createTag({
                        pageName: obj.pageName,
                        pageExt: obj.pageExt,
                        isStatic: obj.isStatic,
                        tagStr: tagStr,
                        classStr: classStr,
                        idStr: idStr,
                        nameStr: nameStr,
                        a_html: '...'
                    }) + code;
                }
                for (i = 0; i < header_length; i++) {
                    header += $this.createTag({
                        pageName: obj.pageName,
                        pageExt: obj.pageExt,
                        isStatic: obj.isStatic,
                        tagStr: tagStr,
                        classStr: classStr,
                        idStr: idStr,
                        nameStr: nameStr,
                        a_html: i + 1
                    });
                }
                code = header + code;
            } else { //最后一种情况，两边都有...
                var header = '';
                var tailer = '';
                //首先处理头部
                for (i = 0; i < header_length; i++) {
                    header += $this.createTag({
                        pageName: obj.pageName,
                        pageExt: obj.pageExt,
                        isStatic: obj.isStatic,
                        tagStr: tagStr,
                        classStr: classStr,
                        idStr: idStr,
                        nameStr: nameStr,
                        a_html: i + 1
                    });
                }
                header += $this.createTag({
                    pageName: obj.pageName,
                    pageExt: obj.pageExt,
                    isStatic: obj.isStatic,
                    tagStr: tagStr,
                    classStr: classStr,
                    idStr: idStr,
                    nameStr: nameStr,
                    a_html: '...'
                });
                //处理尾巴
                for (i = total_page; i > total_page - tailer_length; i--) {
                    tailer = $this.createTag({
                        pageName: obj.pageName,
                        pageExt: obj.pageExt,
                        isStatic: obj.isStatic,
                        tagStr: tagStr,
                        classStr: classStr,
                        idStr: idStr,
                        nameStr: nameStr,
                        a_html: i
                    }) + tailer;
                }
                tailer = $this.createTag({
                    pageName: obj.pageName,
                    pageExt: obj.pageExt,
                    isStatic: obj.isStatic,
                    tagStr: tagStr,
                    classStr: classStr,
                    idStr: idStr,
                    nameStr: nameStr,
                    a_html: '...'
                }) + tailer;
                //处理中间
                //计算main的中心点
                var offset_m = (main_length - 1) / 2;
                var partA = '';
                var partB = '';
                var j;
                var counter = (parseInt(current_page) + parseInt(offset_m));
                for (i = j = current_page; i <= counter; i++, j--) {
                    partA = ((i == j) ? '' : $this.createTag({
                        pageName: obj.pageName,
                        pageExt: obj.pageExt,
                        isStatic: obj.isStatic,
                        tagStr: tagStr,
                        classStr: classStr,
                        idStr: idStr,
                        nameStr: nameStr,
                        a_html: j
                    })) + partA;
                    partB += (i == j) ? $this.createTag({
                        pageName: obj.pageName,
                        pageExt: obj.pageExt,
                        isStatic: obj.isStatic,
                        tagStr: tagStr,
                        classStr: select_class,
                        idStr: idStr,
                        nameStr: nameStr,
                        a_html: i
                    }) : $this.createTag({
                        pageName: obj.pageName,
                        pageExt: obj.pageExt,
                        isStatic: obj.isStatic,
                        tagStr: tagStr,
                        classStr: classStr,
                        idStr: idStr,
                        nameStr: nameStr,
                        a_html: i
                    });
                }
                //拼接
                code = header + partA + partB + tailer;

            }
        }

        var prev = (current_page == 1) ? $this.createTag({
            pageName: obj.pageName,
            pageExt: obj.pageExt,
            isStatic: obj.isStatic,
            tagStr: tagStr,
            classStr: disable_class,
            idStr: idStr,
            nameStr: nameStr,
            a_html: obj.prevName,
            classPage: obj.classPage
        }) : $this.createTag({
            pageName: obj.pageName,
            pageExt: obj.pageExt,
            isStatic: obj.isStatic,
            tagStr: tagStr,
            classStr: classStr,
            idStr: idStr,
            nameStr: nameStr,
            a_html: obj.prevName,
            classPage: obj.classPage
        });

        var prev2 = (current_page == 1) ? $this.createTag2({
            pageName: obj.pageName,
            pageExt: obj.pageExt,
            isStatic: obj.isStatic,
            tagStr: tagStr,
            tagStr2: tagStr2,
            classStr: disable_class,
            idStr: idStr,
            nameStr: nameStr,
            a_html: obj.prevName2,
            classPage: obj.classPage
        }) : $this.createTag2({
            pageName: obj.pageName,
            pageExt: obj.pageExt,
            isStatic: obj.isStatic,
            tagStr: tagStr,
            tagStr2: tagStr2,
            classStr: classStr,
            idStr: idStr,
            nameStr: nameStr,
            a_html: obj.prevName2,
            classPage: obj.classPage
        });

        if (1 != current_page) {
            prev = (current_page == 1) ? $this.createTag({
                pageName: obj.pageName,
                pageExt: obj.pageExt,
                isStatic: obj.isStatic,
                tagStr: tagStr,
                classStr: disable_class,
                idStr: idStr,
                nameStr: nameStr,
                a_html: obj.prevName,
                pageIndex: current_page,
                classPage: obj.classPage
            }) : $this.createTag({
                pageName: obj.pageName,
                pageExt: obj.pageExt,
                isStatic: obj.isStatic,
                tagStr: tagStr,
                classStr: classStr,
                idStr: idStr,
                nameStr: nameStr,
                a_html: obj.prevName,
                pageIndex: (current_page - 1),
                classPage: obj.classPage
            });
            prev2 = (current_page == 1) ? $this.createTag2({
                pageName: obj.pageName,
                pageExt: obj.pageExt,
                isStatic: obj.isStatic,
                tagStr: tagStr,
                tagStr2: tagStr2,
                classStr: disable_class,
                idStr: idStr,
                nameStr: nameStr,
                a_html: obj.prevName2,
                pageIndex: current_page,
                classPage: obj.classPage
            }) : $this.createTag2({
                pageName: obj.pageName,
                pageExt: obj.pageExt,
                isStatic: obj.isStatic,
                tagStr: tagStr,
                classStr: classStr,
                idStr: idStr,
                nameStr: nameStr,
                a_html: obj.prevName2,
                pageIndex: (current_page - 1),
                classPage: obj.classPage
            });
        }
        var next = (current_page == total_page) ? $this.createTag({
            pageName: obj.pageName,
            pageExt: obj.pageExt,
            isStatic: obj.isStatic,
            tagStr: tagStr,
            classStr: disable_class,
            idStr: idStr,
            nameStr: nameStr,
            a_html: obj.nextName,
            classPage: obj.classPage
        }) : $this.createTag({
            pageName: obj.pageName,
            pageExt: obj.pageExt,
            isStatic: obj.isStatic,
            tagStr: tagStr,
            classStr: classStr,
            idStr: idStr,
            nameStr: nameStr,
            a_html: obj.nextName,
            classPage: obj.classPage
        });
        var next2 = (current_page == total_page) ? $this.createTag2({
            pageName: obj.pageName,
            pageExt: obj.pageExt,
            isStatic: obj.isStatic,
            tagStr: tagStr,

            classStr: disable_class,
            idStr: idStr,
            nameStr: nameStr,
            a_html: obj.nextName2,
            classPage: obj.classPage
        }) : $this.createTag2({
            pageName: obj.pageName,
            pageExt: obj.pageExt,
            isStatic: obj.isStatic,
            tagStr: tagStr,
            tagStr2: tagStr2,
            classStr: classStr,
            idStr: idStr,
            nameStr: nameStr,
            a_html: obj.nextName2,
            classPage: obj.classPage
        });
        if (obj.pageCount != current_page) {
            next = (current_page == total_page) ? $this.createTag({
                pageName: obj.pageName,
                pageExt: obj.pageExt,
                isStatic: obj.isStatic,
                tagStr: tagStr,
                classStr: disable_class,
                idStr: idStr,
                nameStr: nameStr,
                a_html: obj.nextName,
                pageIndex: current_page,
                classPage: obj.classPage
            }) : $this.createTag({
                pageName: obj.pageName,
                pageExt: obj.pageExt,
                isStatic: obj.isStatic,
                tagStr: tagStr,
                classStr: classStr,
                idStr: idStr,
                nameStr: nameStr,
                a_html: obj.nextName,
                pageIndex: (current_page + 1),
                classPage: obj.classPage
            });
            next2 = (current_page == total_page) ? $this.createTag2({
                pageName: obj.pageName,
                pageExt: obj.pageExt,
                isStatic: obj.isStatic,
                tagStr: tagStr,

                classStr: disable_class,
                idStr: idStr,
                nameStr: nameStr,
                a_html: obj.nextName2,
                pageIndex: current_page,
                classPage: obj.classPage
            }) : $this.createTag2({
                pageName: obj.pageName,
                pageExt: obj.pageExt,
                isStatic: obj.isStatic,
                tagStr: tagStr,
                classStr: classStr,
                idStr: idStr,
                nameStr: nameStr,
                a_html: obj.nextName2,
                pageIndex: (current_page + 1),
                classPage: obj.classPage
            });
        }

        var codebutton = '<li><button page="' + obj.pageCount + '" id="pagebutton_' + obj.inde + '" class="search">GO</button></li>'//<i class="fe fe-search"></i>
        var codeinputone = '<li><span>共' + obj.pageCount + '页</span><input id="htcodeinput_' + obj.inde + '"  class="codeinput1 search_input"  type="text" value="">页</li>';
        code = prev + code + next + codeinputone + codebutton;
        var tempPrev = $(prev).find('a');
        var tempNext = $(next).find('a');
        var mobilePrev = '<button type="button" page="' + tempPrev.attr("page") + '" class="btn btn-default navbar-btn ' + tempPrev.attr("class") + '">上一页</button>';
        var mobileNext = '<button type="button" page="' + tempNext.attr("page") + '" class="btn btn-default navbar-btn next-page ' + tempNext.attr("class") + '">下一页</button>';
        mobileCode = mobilePrev + mobileNext;

        codeList.push(code);
        codeList.push(mobileCode);
        return codeList;

    }
    /**
     * 计算分页URL值
     */
    this._makeUrl = function (obj) {
        var _dataUrl = obj.dataUrl;
        var _pageIndex = obj.pageIndex;
        _dataUrl = _dataUrl.replace(".htm", '_' + _pageIndex + '.htm');
        if (_pageIndex > 1) {
            _dataUrl = _dataUrl.replace(_dataUrl.substring(_dataUrl.lastIndexOf("_")), '_' + _pageIndex + '.htm');
        } else {
            _dataUrl = _dataUrl.replace(_dataUrl.substring(_dataUrl.lastIndexOf("_")), '.htm');
        }
        return _dataUrl;
    }
    /**
     *  数据的填充
     */
    this._showData = function (obj) {
        var $pageData = $(obj.pageData);
        $pageData.html("");
        for (var i = 0; i < obj.xmlData.length; i++) {
            var strHTML = obj.ajaxData(obj.xmlData[i]);
            $pageData.append(strHTML);
        }
        $pageData.find("a[href^='javascript']").each(function () {
            $(this).parent().html($(this).text());
        });
    }

    /**
    *   请求数据
        " style="display:none" ="20"  ="1" PAGE_NAME='/aboutus/mediacenter/hotandd/data' PAGE_EXT='htm' ></div>
        */
    this._getData = function (obj) {
        $.ajax({
            type: obj.ajaxType,
            dataType: obj.ajaxDataType,
            url: $this._makeUrl(obj),
            success: function (xml) {
                var tempitem = $(xml).find("#createPage").attr("rel");
                if (tempitem != undefined) {
                    obj.xmlData = $(xml).find(tempitem);
                }
                if ($(xml).find("dl").length > 0) {
                    obj.xmlData = $(xml).find("dl");
                } else if ($(xml).find("ul").length > 1) {
                    obj.xmlData = $(xml).find("ul:first");
                }

                obj.pageIndex = $(xml).find("#createPage").attr("PAGE_INDEX");
                obj.pageCount = $(xml).find("#createPage").attr("PAGE_COUNT");
                $this._showData(obj);
            },
            error: function (xml) {
                obj.xmlData = [];
            }
        });
    }
    //创建标签
    this.createTag = function (obj) {
        classStr = (obj.classStr == '') ? '' : ' class="' + obj.classStr + '"';
        idStr = (obj.idStr == '') ? '' : ' id="' + obj.idStr + '"';
        nameStr = (obj.nameStr == '') ? '' : ' name="' + obj.nameStr + '"';
        //获取html
        var extStr = null;

        if (!isNaN(obj.a_html)) {
            numRel = 'page="' + obj.a_html + '"';
        } else {
            numRel = '';
        }

        var code = '';

        //判断是否上一页下一页
        if (obj.pageIndex != undefined) {
            numRel = 'page="' + obj.pageIndex + '"';
            var classPage = ' class="' + obj.classPage + '"';

            if (obj.tagStr == 'a') {
                if (obj.isStatic) {
                    //
                    if (obj.pageIndex == 1) {
                        extStr = obj.pageName + "." + obj.pageExt;
                    } else {
                        extStr = obj.pageName + "_" + (obj.pageIndex - 1) + "." + obj.pageExt;
                    }
                    code = '<li page="page"><' + obj.tagStr + classPage + idStr + numRel + nameStr + ' href="' + extStr + '">' + obj.a_html + '</' + obj.tagStr + '></li>';
                } else {
                    code = '<li page="page"><' + obj.tagStr + classPage + idStr + numRel + nameStr + ' href="javascript:;">' + obj.a_html + '</' + obj.tagStr + '></li>';
                }
            } else {
                code = '<li page="page"><' + obj.tagStr + classPage + idStr + numRel + nameStr + ' >' + obj.a_html + '</' + obj.tagStr + '></li>';

            }
        } else {
            if (obj.tagStr == 'a') {
                if (obj.isStatic) {
                    if (numRel) {
                        if (obj.a_html == 1) {
                            extStr = obj.pageName + "." + obj.pageExt;
                        } else {
                            extStr = obj.pageName + "_" + (obj.a_html - 1) + "." + obj.pageExt;
                        }
                    } else {
                        extStr = "javascript:;";
                    }

                    code = '<li page="page"><' + obj.tagStr + classStr + idStr + numRel + nameStr + ' href="' + extStr + '">' + obj.a_html + '</' + obj.tagStr + '></li>';
                } else {
                    code = '<li page="page"><' + obj.tagStr + classStr + idStr + numRel + nameStr + ' href="javascript:;">' + obj.a_html + '</' + obj.tagStr + '></li>';
                }
            } else {
                code = '<li page="page"><' + obj.tagStr + classStr + idStr + numRel + nameStr + ' >' + obj.a_html + '</' + obj.tagStr + '></li>';

            }
        }

        return code;
    }

    this.createTag2 = function (obj) {
        var mobileCode = '';


        classStr = (obj.classStr == '') ? '' : ' class="' + obj.classStr + '"';
        idStr = (obj.idStr == '') ? '' : ' id="' + obj.idStr + '"';
        nameStr = (obj.nameStr == '') ? '' : ' name="' + obj.nameStr + '"';



        //获取html
        var extStr = null;

        if (isNaN(obj.a_html)) {
            numRel = 'page="' + obj.pageIndex + '"';
        } else {
            numRel = '';
        }

        //判断是否上一页下一页
        if (obj.pageIndex != undefined) {
            numRel = 'page="' + obj.pageIndex + '"';
            var classPage = ' class="' + obj.classPage + '"';

            if (obj.tagStr == 'a') {
                if (obj.isStatic) {
                    //
                    if (obj.pageIndex == 1) {
                        extStr = obj.pageName + "." + obj.pageExt;
                    } else {
                        extStr = obj.pageName + "_" + (obj.pageIndex - 1) + "." + obj.pageExt;
                    }
                    mobileCode = '<button type="button" class="btn btn-default navbar-btn ' + obj.classPage + '" ' + numRel + '>' + obj.a_html + '</button>';
                } else {
                    //page=2
                    mobileCode = '<button type="button" class="btn btn-default navbar-btn ' + obj.classPage + '" ' + numRel + '>' + obj.a_html + '</button>';
                }
            } else {
                mobileCode = '<button type="button" class="btn btn-default navbar-btn ' + obj.classPage + '" ' + numRel + '>' + obj.a_html + '</button>';
            }
        } else {
            if (obj.tagStr == 'a') {
                if (obj.isStatic) {
                    if (numRel) {
                        if (obj.a_html == 1) {
                            extStr = obj.pageName + "." + obj.pageExt;
                        } else {
                            extStr = obj.pageName + "_" + (obj.a_html - 1) + "." + obj.pageExt;
                        }
                    } else {
                        extStr = "javascript:;";
                    }

                    mobileCode = '<button type="button" class="btn btn-default navbar-btn ' + obj.classPage + '" ' + numRel + '>' + obj.a_html + '</button>';
                } else {
                    //page=""
                    mobileCode = '<button type="button" class="btn btn-default navbar-btn ' + obj.classPage + '" ' + numRel + '>' + obj.a_html + '</button>';
                }
            } else {
                mobileCode = '<button type="button" class="btn btn-default navbar-btn ' + obj.classPage + '" ' + numRel + '>' + obj.a_html + '</button>';

            }
        }
        //mobileCode ='<button type="button" class="btn btn-default navbar-btn '+obj.classPage+'" '+ numRel +'>'+obj.a_html+'</button>';
        if (mobileCode.indexOf("下一页") > -1) {
            mobileCode = '<button type="button" class="btn btn-default navbar-btn next-page ' + obj.classPage + '" ' + numRel + '>' + obj.a_html + '</button>';
        }
        return mobileCode;
    }


    if (obj.pageType == "WCM") {
        if (!obj.isStatic) {
            $this._getData(obj);
        }
    } else {
        var results = obj.ajaxData();
        if (results != null) {
            obj.pageIndex = results.pageIndex;
            obj.pageCount = results.pageCount;
        }
    }
    var pageStr = $this._createPage(obj);



    if (pageStr) {
        var $page = obj.pageId.find('.hidden-mobile');
        var $pageMobile = obj.pageId.find('.mobile-page');
        $page.html(pageStr[0]);
        $pageMobile.html(pageStr[1]); //手机分页
        //绑定点击事件
        if (!obj.isStatic) {
            $page.unbind().delegate(obj.tagStr, 'click', function () {

                if ($page.parent().parent().parent() != null && $page.parent().parent().parent().length > 1) {
                    offsetTops($page.parent().parent().parent().parent());
                } else {
                    offsetTops($page.parent().parent().parent());
                };


                var $then = $(this);
                var page = $then.attr("page");
                if (page != undefined && !$then.hasClass(obj.active) && page != ' ' && page != ' ') {
                    obj.pageIndex = page;
                    var pageItem = $then.parent().parent().find('li');
                    obj.pageCount = pageItem.eq(pageItem.length - 4).find('a').attr("page")
                    pageStr = $this._createPage(obj);
                    if (pageStr) {
                        $page.html(pageStr[0]);
                        $pageMobile.html(pageStr[1]);
                    }
                    if (obj.pageType == "WCM") {
                        $this._getData(obj);
                    } else {
                        var results = {
                            "pageIndex": obj.pageIndex,
                            "pageCount": obj.pageCount
                        };
                        obj.ajaxData(results);
                    }
                }
            });

            $page.delegate('#pagebutton_' + obj.inde, 'click', function (event) {
                event.stopImmediatePropagation();
                if ($page.parent().parent().parent() != null && $page.parent().parent().parent().length > 1) {
                    offsetTops($page.parent().parent().parent().parent());
                } else {
                    offsetTops($page.parent().parent().parent());
                };
                var $then = $(this);
                var allpage = parseInt($then.attr("page"));
                var page = parseInt($("#htcodeinput_" + obj.inde).val());
                if (!isNaN(page)) {
                    if (page > 0 && page <= allpage && page) {
                        if (page != undefined && page != ' ') {
                            obj.pageIndex = page;
                            var pageItem = $then.parent().parent().find('li');
                            obj.pageCount = pageItem.eq(pageItem.length - 4).find('a').attr("page")
                            pageStr = $this._createPage(obj);
                            if (pageStr) {
                                $page.html(pageStr[0]);
                                $pageMobile.html(pageStr[1]);
                            }
                            if (obj.pageType == "WCM") {
                                $this._getData(obj);
                            } else {
                                var results = {
                                    "pageIndex": page,
                                    "pageCount": obj.pageCount
                                };
                                obj.ajaxData(results);
                                return;
                            }
                        }
                    } else {
                        alert('请输入正确的页数!');
                        return;
                    }
                } else {
                    alert("请输入正确的页数!");
                    return;
                }

            });
            $page.delegate("#htcodeinput_" + obj.inde, "keyup", function (e) {
                var _this = $(this)
                var e = e || event,
                    keycode = e.which || e.keyCode;
                if (e.keyCode == 13) {
                    $("#pagebutton_" + obj.inde).trigger("click");
                    _this.blur(); //处理事件
                }
            })

            $pageMobile.unbind().delegate('button', 'click', function () {
                offsetTops($page.parent().parent().parent());

                var $then = $(this);
                var page = $then.attr("page");
                if (page != undefined && !$then.hasClass(obj.active) && page != ' ' && page != ' ' && page != "undefined") {
                    obj.pageIndex = page;
                    pageStr = $this._createPage(obj);
                    if (pageStr) {
                        $page.html(pageStr[0]);
                        $pageMobile.html(pageStr[1]);
                    }
                    if (obj.pageType == "WCM") {
                        $this._getData(obj);
                    } else {
                        var results = {
                            "pageIndex": obj.pageIndex,
                            "pageCount": obj.pageCount
                        };
                        obj.ajaxData(results);
                    }
                }
            });
        }
    }

}
function offsetTops(id) {
    $('html,body').animate({
        scrollTop: id.offset().top
    }, 100);
}

$(function() {
//加载数据样式
function insertItem(data) {
    var items = $(data).html();
    return items;
}

var $pageList = $('[id="createPage"]');
if ($pageList.length > 0) {
    $pageList.each(function (i, obj) {
        $(obj).attr({ 'id': 'createPage_' + i, 'rel': $(obj).attr('rel') + '_' + i }).prev().addClass($(obj).attr('rel').substr(1));
        var $dataUrl = $(obj).attr("page_name") + ".htm";
        getPage({
            pageId: $('#createPage_' + i).parent().next(), //分页输出ID选择器
            pageData: $(obj).attr('rel'), //数据输出选择器
            headerKeep: 1, //头部预留页码数量 headerKeep + footerKeep 必须为偶数
            footerKeep: 1, //尾部预留页码数量 headerKeep + footerKeep 必须为偶数
            pageLength: 7, //页码显示数量,必须为奇数
            tagStr: 'a', //使用标签
            classStr: 'classStr', //标签class
            idStr: 'idStr', //标签id
            nameStr: 'nameStr', //标签name
            disable: 'disable', //不能点击class
            active: 'active', //标签选中class
            prevName: '<i class="icon-arrow_l1"></i>',
            prevName2: '上一页', //手机版的button内容
            nextName: '<i class="icon-arrow_r1"></i>',
            nextName2: '下一页',
            pageCount: $('#createPage_' + i).attr("page_count"),
            pageIndex: $('#createPage_' + i).attr("page_index"),
            classPage: 'classPage', //上下页class
            pageType: 'WCM', //分页类型
            ajaxData: insertItem, //异步请求
            ajaxType: 'post', //请求类型
            ajaxDataType: 'html', //数据类型
            dataUrl: $dataUrl, //数据URL
            xmlData: [],
            inde: i
        });
    })

}
});
