
####参数
> Title: 标题,
> Msg: 提示信息, 
> yesBtn: '确定', 
> noBtn: '取消', 
> FunL: new Object, 
> FunR: new Object,
> hideTime: 时间 默认3000 

####提示弹窗
```
$.JUI.Alert({Title: '提示', Msg: '这是一个消息提示弹窗',yesBtn:'确定',FunL:alerts}) 
```
***
####确认弹窗
```
$.JUI.Confirm({Title: '', Msg: '这是一个消息确认弹窗</br>真的是的',FunL:confirmL,FunR:Immediate})
```
***
####自动隐藏弹窗
```
$.JUI.Autofade({Msg: '我会自动隐藏'}) 
```
***
####加载
```
$.JUI.Loading('images/loading.png') 
```
***
####关闭弹窗
```
$.JUI.Close();
```
