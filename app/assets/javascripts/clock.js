var alarm_hour = 0;// アラームセットの時間
var alarm_minute = 0;// アラームセットの分
var alarm_flug = 0;//ベルが黄色=１
var notificationflg = 0;//通知の為のフラグ変数

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

//アラーム通知表示の関数。
function alarmNotification(theBody,theTitle) {
    var options = {
        body: theBody,
        //icon: theIcon　表示するときは引数にするべし
    }
    var n = new Notification(theTitle,options);
    
    setTimeout(n.close.bind(n), 5000); 
  }//function end

// 時計のメインとなる関数
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


    //モーダルの選択した内容でネクストアラームの表示を変える
    if( timereport1.checked == true ){
        // 1こ目　毎時0分
        alarm_hour = h + 1;//　時間は１つ繰り上げ
        alarm_minute ="0"+0;//　分は００分
        if( alarm_hour == 24 ){ alarm_hour = 0; }
        alarm_time.innerHTML = "NEXT ALARM : " + alarm_hour + ":" + alarm_minute;
        if( alarm_flug == 1 && mi == "00" && s <= "15"){
            alarm();
            notificationflg ++;
        }
    }else if ( timereport2.checked == true ){
        //　２こ目　仮で30分毎
        var alarm_minutes = ["0"+0,30];
        if( mi < 30 ){
            alarm_hour = h;
            alarm_time.innerHTML = "NEXT ALARM : " + alarm_hour + ":" + alarm_minutes[1];
        }else{
            alarm_hour = h + 1;
            if( alarm_hour == 24 ){ alarm_hour = 0; }
            alarm_time.innerHTML = "NEXT ALARM : " + alarm_hour + ":" + alarm_minutes[0];
        }
        if( alarm_flug == 1 && mi == "00" && s <= "15"){
            alarm();
            notificationflg ++;
        }else if( alarm_flug == 1 && mi == "30" && s <= "15" ){
            alarm();
            notificationflg ++;
        }
    }else if( timereport3.checked == true ){
        // 3こ目 
        alarm_minute = 50;
        if ( mi < 50 ){
            alarm_hour = h;
            alarm_time.innerHTML = "NEXT ALARM : " + alarm_hour + ":" + alarm_minute;
        }else{
            alarm_hour = h + 1;
            if( alarm_hour == 24 ){ alarm_hour = 0; }
            alarm_time.innerHTML = "NEXT ALARM : " + alarm_hour + ":" + alarm_minute;
        }
        if( alarm_flug == 1 && mi == "50" && s <= "15"){
            alarm();
            notificationflg ++;
        }

    }else if( timereport4.checked == true ){
        //４こ目
        alarm_hour = 12;
        alarm_minute = 40;
            alarm_time.innerHTML = "NEXT ALARM : " + alarm_hour + ":" + alarm_minute;
            document.getElementById("t4").innerHTML = alarm_hour + "時" + alarm_minute + "分に設定";
            if( alarm_flug == 1 && h == alarm_hour && mi == alarm_minute && s <= "15"){
                alarm();
                notificationflg ++;
            }
    }else{
        alarm_time.innerHTML = "NEXT ALARM : " + "00" + ":" + "00";
    }
    

}//function end

//中央のベルマークがクリックされるごとに色が変わる
//チェックボックスにチェックされていたら黄色、そうでなければ白
function bellColorChange(){
    var alarmOnCheck = document.getElementById("alarmbotton");
    var fa = document.getElementById("fa");
    
    if ( alarmOnCheck.checked == true ){
        fa.style.color = "yellow";
        alarm_flug = 1;
    }else if( alarmOnCheck.checked != true ){
        fa.style.color = "whitesmoke";
        alarm_flug = 0;
    }
}//function end

function alarm(){
    
    var alarmSound = document.getElementById("sound");
    alarmSound.play();
    if ( notificationflg == 1 ){
        alarmNotification("アラーム設定した時間がきました。","Timin-G");
        
    }
    

}

// 上記のclock関数を1000ミリ秒ごと(毎秒)に実行する
    setInterval(clock, 1000);


