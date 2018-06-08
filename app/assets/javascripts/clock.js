


var alarm_hour = 0;// アラームセットの時間
var alarm_minute = 0;// アラームセットの分
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
    var alarmOnCheck = document.getElementById("alarmbotton");
    var alarmSound = document.getElementById("sound");
    var timereport1 = document.getElementById("timereport1");
    var timereport2 = document.getElementById("timereport2");
    var timereport3 = document.getElementById("timereport3");
    var timereport4 = document.getElementById("timereport4");
    var alarm_time = document.getElementById("alarm_time");
    var setH ;//アラームを鳴らす時間
    var setMI;//アラームを鳴らす分

    //モーダルの選択した内容でネクストアラームの表示を変える
    if( timereport1.checked == true ){
        // 1こ目　毎時0分
        setH = h + 1;//　時間は１つ繰り上げ
        setMI ="0"+0;//　分は００分
        if( setH == 24 ){ setH = 0; }
        alarm_time.innerHTML = "NEXT ALARM : " + setH + ":" + setMI;
    }else if ( timereport2.checked == true ){
        //　２こ目　仮で30分毎
        setMI = ["0"+0,30];
        if( mi < 30 ){
            setH = h;
            alarm_time.innerHTML = "NEXT ALARM : " + setH + ":" + setMI[1];
        }else{
            setH = h + 1;
            if( setH == 24 ){ setH = 0; }
            alarm_time.innerHTML = "NEXT ALARM : " + setH + ":" + setMI[0];
        }
    }else if( timereport3.checked == true ){
        // 3こ目 
        setMI = 50;
        if ( mi < 50 ){
            setH = h;
            alarm_time.innerHTML = "NEXT ALARM : " + setH + ":" + setMI;
        }else{
            setH = h + 1;
            if( setH == 24 ){ setH = 0; }
            alarm_time.innerHTML = "NEXT ALARM : " + setH + ":" + setMI;
        }

    }else if( timereport4.checked == true ){
        //４こ目
            setH = 17;
            setMI = 30;
            alarm_time.innerHTML = "NEXT ALARM : " + setH + ":" + setMI;
            document.getElementById("t4").innerHTML = setH + "時" + setMI + "分";
    }else{
        alarm_time.innerHTML = "NEXT ALARM : " + "00" + ":" + "00";
    }
 
    if( alarmOnCheck.checked == true && h == setH && mi == setMI && s <= "10"){
        alarmSound.play();
    }



}

//中央のベルマークがクリックされるごとに色が変わる
//チェックボックスにチェックされていたら黄色、そうでなければ白
function bellColorChange(){
    var alarmOnCheck = document.getElementById("alarmbotton");
    var fa = document.getElementById("fa");
    if ( alarmOnCheck.checked == true ){
        fa.style.color = "yellow";
    }else if( alarmOnCheck.checked != true ){
        fa.style.color = "whitesmoke";
    }
}
//
function alarmConfig1(){
    let tr1 = document.getElementById("timereport1");
    let as = document.getElementById("as");
    if ( tr1.checked == true ){
        as.style.color = "yellow";
    }else if( tr1.checked != true ){
        as.style.color = "whitesmoke";
}
}
// 上記のclock関数を1000ミリ秒ごと(毎秒)に実行する
    setInterval(clock, 1000);


