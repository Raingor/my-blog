# form表单提交验证

```javascript
$(".submitBtn").click(function () {  
    let params = {};  
    let inputs = $("#bottom_form input");  
    for (let i = 0; i < inputs.length; i++) {  
        let input = inputs[i];  
        if (input.hasAttribute('required') && $(input).val() === "") {  
            alert('此输入框为必填项，请填写内容！');  
            return false;  
        }  
        params[$(input).attr('name')] = $(input).val();  
    }  
    params['msg_content'] = $('#bottom_form textarea[name="msg_content"]').val();  
    const illegalKeywords = ['blogger', 'blog post', 'seo optimization', 'AIcontent', 'AI Dashboard', 'seo'];

const msgContentLower = params['msg_content'].toLowerCase();

for (let i = 0; i < illegalKeywords.length; i++) {

if (msgContentLower.includes(illegalKeywords[i].toLowerCase())) {

alert('Your message contains illegal content and cannot be submitted.');

return false;

}

}
    params['url'] = window.location.href  
    $.post('/index/page/feedback',  
        params, function (res) {  
            alert("您的信息已提交!");  
            for (let i = 0; i < inputs.length; i++) {  
                let input = inputs[i];  
                $(input).val('');  
            }  
            $('.popupBox').hide();  
        })  
});  
$(".popSubmitBtn").click(function () {  
    let params = {};  
    let inputs = $("#pop_form input");  
    for (let i = 0; i < inputs.length; i++) {  
        let input = inputs[i];  
        if (input.hasAttribute('required') && $(input).val() === "") {  
            alert('此输入框为必填项，请填写内容！');  
            return false;  
        }  
        params[$(input).attr('name')] = $(input).val();  
    }  
    params['msg_content'] = $('#bottom_form textarea[name="msg_content"]').val();  
    const illegalKeywords = ['blogger', 'blog post', 'seo optimization', 'AIcontent', 'AI Dashboard', 'seo'];

const msgContentLower = params['msg_content'].toLowerCase();

for (let i = 0; i < illegalKeywords.length; i++) {

if (msgContentLower.includes(illegalKeywords[i].toLowerCase())) {

alert('Your message contains illegal content and cannot be submitted.');

return false;

}

}
    params['url'] = window.location.href  
    $.post('/index/page/feedback',  
        params, function (res) {  
            alert("您的信息已提交!");  
            for (let i = 0; i < inputs.length; i++) {  
                let input = inputs[i];  
                $(input).val('');  
            }  
            $('.popupBox').hide();  
        })  
});
```