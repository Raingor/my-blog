# JS 片段汇总

## Array.find 查找数组元素

```javascript
const arr = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];
const result = arr.find(item => item.id === 1);
console.log(result.name); // Alice
```

## 数字递增动画效果

```javascript
var numbers = document.querySelectorAll(".number")
if (numbers.length > 0) {
    numbers.forEach(counter => {
        counter.innerText = 0;
        const upDateNumber = () => {
            const target = Number(counter.getAttribute('data-target'))
            const d = Number(counter.innerText)
            const increment = target / 200
            if (d < target) {
                counter.innerText = `${Math.ceil(d + increment)}`
                setTimeout(upDateNumber, 1)
            } else {
                counter.innerText = target
            }
        }
        upDateNumber()
    })
}
```

## Form 表单提交验证

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

    // 防灌水关键词检测
    const illegalKeywords = ['blogger', 'blog post', 'seo optimization', 'AIcontent', 'AI Dashboard', 'seo'];
    const msgContentLower = params['msg_content'].toLowerCase();
    for (let i = 0; i < illegalKeywords.length; i++) {
        if (msgContentLower.includes(illegalKeywords[i].toLowerCase())) {
            alert('Your message contains illegal content and cannot be submitted.');
            return false;
        }
    }

    params['url'] = window.location.href
    $.post('/index/page/feedback', params, function (res) {
        alert("您的信息已提交!");
        for (let i = 0; i < inputs.length; i++) {
            $(inputs[i]).val('');
        }
        $('.popupBox').hide();
    })
});
```
