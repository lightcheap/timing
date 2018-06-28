var alarm_hour = 0;// アラームセットの時間
var alarm_minute = 0;// アラームセットの分
var alarm_flug = 0;//ベルが黄色=１
var notificationflg = 0;//通知の為のフラグ変数
var timer3minute = 180;//3分タイマーの定数
var timer5minute = 300;//5分
//-------------------------------------------------------------------------------
window.onload = function(){
    // ページ読み込み時に実行したい処理
    // ブラウザが通知をサポートしているか確認する
  if (!('Notification' in window)) {
    alert('未対応のブラウザです');
  }
  else {
    // 許可を求める
    Notification.requestPermission()
      .then((permission) => {
        if (permission == 'granted') {
          // 許可
        } else if (permission == 'denied') {
          // 拒否
        } else if (permission == 'default') {
          // 無視
        }
      });
  }
}//function end
//----------------------------------------------------------------------------------
//アラーム通知表示の関数。
function alarmNotification(theBody,theTitle) {
    var options = {
        body: theBody,
        //icon: theIcon　表示するときは引数にするべし
    }
    var n = new Notification(theTitle,options);// インスタンス
    //通知クリックでページ開く
    n.addEventListener('click', function(){
        window.focus();
       // open('https://secure-shelf-71208.herokuapp.com/');
    });
    //通知を10秒間表示
    setTimeout(n.close.bind(n), 10000); 
  }//function end

// 時計のメインとなる関数---------------------------------------------------------------
function clock()
{
    var weeks = new Array("Sun","Mon","Thu","Wed","Thr","Fri","Sat");// 曜日を表す各文字列の配列
    var now = new Date(); // 現在日時を表すインスタンスを取得
    var y = now.getFullYear(); // 年
    var mo = now.getMonth() + 1; // 月 0~11で取得されるので実際の月は+1したものとなる
    var d = now.getDate(); // 日
    var w = weeks[now.getDay()]; // 曜日 0~6で日曜始まりで取得されるのでweeks配列のインデックスとして指定する
    var h = now.getHours(); // 時
    var mi = now.getMinutes(); // 分
    var s = now.getSeconds(); // 秒

    // 日付時刻文字列のなかで常に2ケタにしておきたい部分はここで処理
    if (mo < 10) mo = "0" + mo;
    if (d < 10) d = "0" + d;
    if (mi < 10) mi = "0" + mi;
    if (s < 10) s = "0" + s;

    //　HTML: <span id="clock_date">(ココの日付文字列を書き換え)</span>
    document.getElementById("clock_date").innerHTML =  y + "/" + mo + "/" + d + " (" + w + ")";
    //　HTML: <span id="clock_time">(ココの時刻文字列を書き換え)</span>
    document.getElementById("clock_time").innerHTML = h + ":" + mi + ":" + s;
    //　HTML: <div id="clock_frame"> の内部要素のフォントサイズをウインドウサイズの10分の1ピクセルに設定
    document.getElementById("clock_frame").style.fontSize =  window.innerWidth / 10 + "px";

// 仮の処理として毎時0分に音を鳴らす。出来たらモジュールわけとかする。----
    
    var timereport1 = document.getElementById("timereport1");
    var timereport2 = document.getElementById("timereport2");
    var timereport3 = document.getElementById("timereport3");
    var timereport4 = document.getElementById("timereport4");
    var alarm_time = document.getElementById("alarm_time");   
    var l1 = document.getElementById("l-1");
    var l2 = document.getElementById("l-2");
    var l3 = document.getElementById("l-3");
    var l4 = document.getElementById("l-4");

    //モーダルのどれを選択する？
    if( timereport1.checked == true ){
        // 1こ目　毎時ｘ分
        l1.style.backgroundColor = "floralwhite";
        alarm_hour = h ;
        alarm_minute = alarmSetMaiji();//　分は設定した
        if( mi >= alarm_minute ){ alarm_hour = h + 1;}
        if( alarm_minute < 10){alarm_minute = "0" + alarm_minute;}
        if( alarm_hour == 24 ){ alarm_hour = 0; }
        alarm_time.innerHTML = "NEXT ALARM : " + alarm_hour + ":" + alarm_minute;
        if( alarm_flug == 1 && mi == alarm_minute && s <= "15"){
            alarm();
            notificationflg ++;        
        }
    }else if (timereport1.checked != true ){l1.style.backgroundColor = "#dddddd"; }
    //-------------------------------------------------------------------------
    if ( timereport2.checked == true ){
        //　２こ目　セットして3分後にアラーム
        l2.style.backgroundColor = "floralwhite";
        //定数timer3minute 1秒ごとに　-１。 ０になったらアラーム。
        timer3minute -= 1;
        if ( alarm_flug == 1 && timer3minute <= 0 ){
            alarm();
            notificationflg ++;
        }
        

    }else if (timereport2.checked != true ){l2.style.backgroundColor = "#dddddd";}　　
　　//--------------------------------------------------------------------------
    if( timereport3.checked == true ){
        // 3こ目 セットして５分後
        l3.style.backgroundColor = "floralwhite"; 
        timer5minute -= 1;
        if ( alarm_flug == 1 && timer5minute <= 0 ){
            alarm();
            notificationflg ++;
        }
        
        
    }else if (timereport3.checked != true ){l3.style.backgroundColor = "#dddddd";}
　　//----------------------------------------------------------------------------
    if( timereport4.checked == true ){
        //４こ目 時刻指定してアラーム鳴らす
        l4.style.backgroundColor = "floralwhite";
        alarm_hour = alarmmezamasiH();
        alarm_minute = alarmmezamasiM();
        if( alarm_minute < 10){alarm_minute = "0" + alarm_minute;} 
            alarm_time.innerHTML = "NEXT ALARM : " + alarm_hour + ":" + alarm_minute;
            document.getElementById("t4").innerHTML = alarm_hour + "時" + alarm_minute + "分に設定";
            if( alarm_flug == 1 && h == alarm_hour && mi == alarm_minute && s <= "15"){
                alarm();
                notificationflg ++;
            }
    }else if (timereport4.checked != true ){l4.style.backgroundColor = "#dddddd";}
}//function end

//中央のベルマークがクリックされるごとに色が変わる
//チェックボックスにチェックされていたら黄色、そうでなければ白
function bellColorChange(){
    var alarmOnCheck = document.getElementById("alarmbotton");
    var fa = document.getElementById("fa");
    
    if ( alarmOnCheck.checked == true ){
        fa.style.color = "yellow";
        alarm_flug = 1;
        window.alert("アラームON");
    }else if( alarmOnCheck.checked != true ){
        fa.style.color = "whitesmoke";
        alarm_flug = 0;
    }
}//function end
//---------------------------------------------------------------------------------
function alarmSetting(){
    
    fadeIn(document.querySelector('#modal2-overlay'), 100);
    fadeIn(document.querySelector('#modal2-content'), 300);
}
//--------------------------------------------------------------------------------
function alarmSettingClear(){
    var modal2Overlay = document.getElementById("modal2-overlay");
    var modal2Content = document.getElementById("modal2-content");
    
    modal2Overlay.style.display = "none";
    modal2Content.style.display = "none";
}
//------------------------------------------------------------------
function soundselect1(){
    var sound = document.getElementById("sound");
    
    window.alert(sound);
    
    
}
function soundselect2(){
    window.alert("sd2");
}
function soundselect3(){
    document.getElementsById("sound").src = "/pinponpan.mp3";
}
function soundselect4(){
    document.getElementsById("sound").src = "/train.mp3";
}
function soundselect5(){
    document.getElementsById("sound").src = "/nandeyanen.mp3";
}
//--------------------------------------------------------------------------------
function alarm(){
    
    var alarmSound = document.getElementById("sound");
    alarmSound.play();
    if ( notificationflg == 1 ){
        alarmNotification("アラーム設定した時間がきました。","Timin-G");
        
    }   

}//function end
//---------------------------------------------------------------------------------
function fadeIn(node, duration) {
    // display: noneでないときは何もしない
    if (getComputedStyle(node).display !== 'none') return;
    
    // style属性にdisplay: noneが設定されていたとき
    if (node.style.display === 'none') {
      node.style.display = '';
    } else {
      node.style.display = 'block';
    }
    node.style.opacity = 0;
  
    var start = performance.now();
    
    requestAnimationFrame(function tick(timestamp) {
      // イージング計算式（linear）
      var easing = (timestamp - start) / duration;
  
      // opacityが1を超えないように
      node.style.opacity = Math.min(easing, 1);
  
      // opacityが1より小さいとき
      if (easing < 1) {
        requestAnimationFrame(tick);
      } else {
        node.style.opacity = '';
      }
    });
}
//--------------------------------------------------------------------------------
function alarmSetMaiji(){
    //アラーム設定1こめの、せってい分を取得する関数
    var maijiMinute = document.getElementById("maiji").selectedIndex
    document.getElementById("t1").innerHTML ="毎時"+maijiMinute+"分に設定";
    return maijiMinute;
}
//-------------------------------------------------------------------------------
function alarmmezamasiM(){
    //アラーム４つめの目覚まし機能の取得分をリターンする関数
    var alarmM = document.getElementById("alarmminute").selectedIndex
    return alarmM;
}
//-------------------------------------------------------------------------------
function alarmmezamasiH(){
    //アラーム４つめの目覚まし機能の取得時間をリターンする関数
    var alarmH = document.getElementById("alarmhour").selectedIndex
    document.getElementById("t4").innerHTML = alarmH + "時" + alarmmezamasiM() + "分に設定";
    return alarmH;
}
//---------------------------------------------------------------------------------
function clickNowTime(){
    //この関数が呼び出されたときの分を取り出すだけの関数
    var now = new Date();
    var minute = now.getMinutes();
    return minute;
}
//---------------------------------------------------------------------------------
function alarmConfig2(){
    //3分後に設定が押されたとき
    timer3minute = 180;
    alarm_minute = clickNowTime() + 3;
    if( alarm_minute < 10){alarm_minute = "0" + alarm_minute;} 
    var h = new Date().getHours();
        if( alarm_minute >= 60 ){
            alarm_minute -= 60;
            alarm_hour = h + 1;
            if( alarm_hour == 24 ){ alarm_hour = 0; }
            alarm_time.innerHTML = "NEXT ALARM : " + alarm_hour + ":" + alarm_minute;
        }else{
            alarm_hour = h ;
            if( alarm_hour == 24 ){ alarm_hour = 0; }
            alarm_time.innerHTML = "NEXT ALARM : " + alarm_hour + ":" + alarm_minute;
        }
}
//---------------------------------------------------------------------------------
function alarmConfig3(){
    //5分後に設定が押されたとき
    timer5minute = 300;
    alarm_minute = clickNowTime() + 5;
    if( alarm_minute < 10){alarm_minute = "0" + alarm_minute;}
    var h = new Date().getHours();
    if( alarm_minute >= 60 ){
        alarm_minute -= 60;
        alarm_hour = h + 1;
        if( alarm_hour == 24 ){ alarm_hour = 0; }
            alarm_time.innerHTML = "NEXT ALARM : " + alarm_hour + ":" + alarm_minute;
        }else{
            alarm_hour = h ;
            if( alarm_hour == 24 ){ alarm_hour = 0; }
            alarm_time.innerHTML = "NEXT ALARM : " + alarm_hour + ":" + alarm_minute;
        }
}

// 上記のclock関数を1000ミリ秒ごと(毎秒)に実行する
    setInterval(clock, 1000);

    
