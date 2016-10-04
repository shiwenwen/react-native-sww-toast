# react-native-sww-toast
兼容ios android的toast
###使用方法

	import Toast from 'react-native-sww-toast';
	
	//任意需要弹出toast的地方 （toast显示两秒会自动消失）
		Toast.show(message,location='center',touchTohidden=false)
		//messagr:string toast内容
		//location:string ('top','center','bottom') Toast位置 上中下 默认中间显示
		// touchTohidden:bool 点击Toast时是否自动消失 默认为false 点击toast无效 。
		





