/**
 * 注意事项：
 * 图片预览方法调用，id为当前上传图片的input控件id，预览图片的ul的id要写成id+View
 * 需要调用css样式file与imgShow，需引用viewImages.css文件
 * 在打开dialog的时候需要清空所有图片相关信息，并重置imagesFiles={}
 * 支持在火狐、谷歌下点击图片显示大图，IE下只支持在线预览、不支持点击图片显示大图
 * @author:LX
 * @time 2017-08-01 09:40:20
 */
////实例：
////选择图片按钮
//<table>
//  <tr>
//      <td style="width:100px">选择图片：</td>
//      <td>
//          <a href="javascript:;" class="file" style="float:left;margin-right:10px">选择文件
//              <input class="file" type="file" name="preFilePath" id="preFilePath" required="true" onchange="loadImageFile(this.id,5);"/>
//          </a>
//          <a href="javascript:;" class="file">清空图片
//              <input class="file" type="button" onclick="clearImages('preFilePath')"/>
//          </a>
//      </td>
//  </tr>
//</table>
////图片预览：
//<table>
//  <tr>
//      <td style="width:100px">图片预览：</td>
//      <td style="height:200px">
//          <ul id="preFilePathView" class="imgShow">
//          </ul>
//      </td>
//  </tr>
//</table>
var imageFiles = {};
//用于显示大图
var imgDatas = {};
//存放图片信息
var formDataJson = {};
var uploadFileID;
var tempNum= 0;
var loadImageFile = (function(uploadFile, num) {
    if (window.FileReader) {
        var oPreviewImg = null,
        oFReader = new window.FileReader(),
        rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;
        return function(uploadFile, num) {
            uploadFileID = uploadFile.id;
            var imgData = imgDatas[uploadFileID];
            if (imgData == undefined) {
                imgData = [];
            }
            var tempArr = formDataJson[uploadFileID];
            if (tempArr != undefined && tempArr.length >= num) {
                alert('最多上传' + num + '张图片');
                return;
            }
            if (tempArr == undefined) {
                tempArr = [];
            }
            oFReader.onload = function(oFREvent) {
                var newPreview = document.getElementById(uploadFileID + "View");
                var node = document.createElement("LI");
                node.className = 'imgLi';
                newPreview.appendChild(node);
                oPreviewImg = new Image();
                $(oPreviewImg).click(function (){
                    showBigImg(this);
                });
                oPreviewImg.style.width = "200px";
                oPreviewImg.style.height = "200px";
                node.appendChild(oPreviewImg);
                oPreviewImg.src = oFREvent.target.result;
                var tempJson = {};
                tempJson['alt'] = '大图';
                tempJson['pid'] = oFREvent.target.result;
                tempJson['src'] = oFREvent.target.result;
                tempJson['thumb'] = '';
                imgData.push(tempJson);
                imgDatas[uploadFileID] = imgData;
            };

            var aFiles = document.getElementById(uploadFileID).files;
            if (aFiles.length === 0) {
                return;
            }
            if (!rFilter.test(aFiles[0].type)) {
                alert("请上传图片类型文件!");
                return;
            }
            oFReader.readAsDataURL(aFiles[0]);
            tempArr.push(uploadFile);
            formDataJson[uploadFileID] = tempArr;
            creatInput(uploadFile);
        }
    }
    if (navigator.appName === "Microsoft Internet Explorer") {
        return function(uploadFile, num) {
            uploadFileID = uploadFile.id;
            var tempArray = formDataJson[uploadFileID];
            if (tempArray != undefined && tempArray.length >= num) {
                alert('最多上传' + num + '张图片！');
                return;
            }
            if (tempArray == undefined) {
                tempArray = [];
            }
            var extArray = new Array(".gif", ".jpg", ".bmp", ".png", ".jpeg");
            var file = document.getElementById(uploadFileID).value;
            var file1 = file.slice(file.indexOf("\\") + 1);
            var ext = file1.slice(file1.indexOf(".")).toLowerCase();
            var allowSubmit = false;
            for (var i = 0; i < extArray.length; i++) {
                if (extArray[i] == ext) {
                    allowSubmit = true;
                    break;
                }
            }
            if (!allowSubmit) {
                alert("请上传图片类型文件!");
                return;
            }
            var node = document.createElement("LI");
            node.className = 'imgLi';
            document.getElementById(uploadFileID + 'View').appendChild(node);
            node.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = file;
            tempArray.push(uploadFile);
            formDataJson[uploadFileID] = tempArray;
            creatInput(uploadFile);
        }
    }
})();
//隐藏input创建新input
function creatInput(uploadFile) {
    tempNum++;
    $(uploadFile).hide();
    var tempId = uploadFile.id;
    $(uploadFile).attr('id', "temp" + tempNum);
    var inputTemp = document.createElement("INPUT");
    inputTemp.type = 'file';
    inputTemp.name = 'filePath';
    inputTemp.id = tempId;
    $(inputTemp).addClass('file');
    $(uploadFile).parent()[0].appendChild(inputTemp);
    if ($(inputTemp)[0].onchange == null) {
        $(inputTemp).on('change',
        function() {
            loadImageFile($(inputTemp)[0], 3);
        });
    }
}
//图片提交方法
function submitFiles(url, data, func) {
    var loadingPross = layer.msg('提交中……', {
        icon: 16,
        shade: 0.01,
        time: 0 //1000*60*60*24 //2秒关闭（如果不配置，默认是3秒）
    });
    for (var fileInputId in formDataJson) {
        var formDataList = formDataJson[fileInputId];
        for (var i = 0; i < formDataList.length; i++) {
            var input = formDataList[i];//获取到图片文件
            $.ajaxFileUpload({
                url: url,
                secureuri: false,
                data: data,
                fileElementId: input.id,
                dataType: 'JSON',
                success: function(result) {
                    var resultData = $.parseJSON(result);
                    if (resultData.success) {
                        if (func != undefined && func != '') {
                            func();
                        }
                    } else {
                        alert("上传失败");
                    }
                },
                error: function(result) {
                    alert("上传失败");
                },
                complete: function(XMLHttpRequest, textStatus) {
                    layer.close(loadingPross);
                }
            });
        }
    }
}
//删除所有图片
function clearImages(id) {
    var bigImgArr = imgDatas[id];
    if (bigImgArr != undefined && bigImgArr.length > 0) {
        bigImgArr.splice(0, bigImgArr.length);
    }
    var formDataList = formDataJson[id];
    if (formDataList != undefined && formDataList.length > 0) {
        formDataList.splice(0, formDataList.length);
    }
    $('#' + id + 'View').off('click', 'li');
    $('#'+id+'View').html('');
}
//显示大图
function showBigImg(file) {
    var viewId=$(file).parents()[1].id;
    var viewIndex=viewId.indexOf("View");
    var id=viewId.substring(0,viewIndex);
    var imgData = imgDatas[id];
    var json = {
        "title": "大图展示",
        //相册标题
        "id": id,
        //相册id
        "start": 0,
        //初始显示的图片序号，默认0
        "data": imgData
    };
    layer.photos({
        photos: json,
        //格式见API文档手册页
        anim: 5 //0-6的选择，指定弹出图片动画类型，默认随机
    });
}