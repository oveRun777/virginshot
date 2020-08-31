$(function () {
    let late1a, late1b, late2a, late2b;
    let late1 = [];
    let late2 = []; //当たり配列
    let late10arry = [];
    let inputNumTextArray = [];
    let ransu;
    let nMin = [1, 1, 1, 1,1,1,13,3, 1,11, 2,7, 100];
    let nMax = [319, 230, 199, 99,8192,65536,20,5, 2,20, 5,20, 332];
    let inputNum = Number($('.inputnum .nums').length);
    let inputNumText = $('.inputnum .nums');
    let resultNumBox= $('.result-box');
    let resultMmoney=$('.result-money');
    let firstMoney = $('.first-money');
    let count = 0;
    let itijiNum =0;
    let urlparaPlus;
    let listNumArry = [];
    let allListNumArry = [];
    let listNumCount = 0;
    let avrage;
    let luckyPoint=0;
    let clickCount=0;
    let moneyArry = [];
    let resultTxt=["オイオイオイ<br>死ぬわアイツ","台風の中、田んぼの様子を見に行ってみる感じ","ラオウ戦に向けて<br>アップを開始したリュウケン師匠","結婚相手がヤンデレ","戦いが終わったら結婚する予定の人","街でコナン君に遭遇","ペロ･･･これは青酸カリ！","おじいちゃん対抗<br>お餅早食い大会","こんな日に行くとか正気じゃない","設定２、アイコン０の白鯨戦","ATMから呼ぶ声が聞こえる","第３話「マミる」","昼なのにめっちゃ死兆星が見える","死神「スタンバイOK！」","死神「呼んだ？」"];

    //自分の星座を登録し、ページを「HOME画面に追加」してもらう用の処理
    // 選択されているvalue属性値を取り出しURLに追記する
    $('[name=alphabet]').on('change',function() {
        let valSelect = $('[name=alphabet] option:selected').val();
        let urlbookMark = location.href;
        //urlparaPlus = `${urlbookMark}?${valSelect}`;
        //return urlparaPlus;
        //return console.log('urlparaPlus中:', urlparaPlus);
        return urlparaPlus = `${urlbookMark}?${valSelect}`;
    });
    $('.btn-Anime').clone().appendTo('.probability-block');
    
    
    //それぞれの確率を表示させる
    $('.btn-Anime').on('click', function () {
        clickCount++;
        $('.lead').slideUp();
        if(clickCount===1){
            for (let y = 0; y < 2; y++) {
                late1a = Number($('.inputnum .buns').eq(y).val());
                late1b = Number($('.inputnum .bunb').eq(y).val());
                if(y===0){
                    if(late1b===1){
                        $('.probability-list-item').eq(0).hide();
                    } 
                }
        fits(late1a);
        fits(late1b);
        //丸め処理
        if (!Number.isInteger(late1a) || !Number.isInteger(late1b)) {
            itijiNum1 = late1a.toFixed(2);
            itijiNum2 = late1b.toFixed(2);
            late1b = itijiNum2*100;
            late1a = itijiNum1*100;
        }
        for (let h = 0; h < late1b; h++) {
            late1[h] = '';
        }
        for (let j = 0; j < late1a; j++) {
            late1[j] = 1;
        }
        late2[y] = late1;
        late1 = [];  
        }
            
        //当たり配列生成
        for (let x = 0; x < nMax.length; x++) {
            for (let h = 0; h < nMax[x]; h++) {
                late1[h] = '';
            }
            for (let j = 0; j < nMin[x]; j++) {
                late1[j] = 1;
            }
            late2[x + 2] = late1;
            late1 = [];
        }
        
        lateNum();
        strTonum();
        $('.result-txt-box').slideDown(100);
        $('.btn-Anime').removeClass();
            $('.under-arrow').text('');
        switch(true){
            case luckyPoint<6:
            $('.result-txt-inline').html(`<span class="textRed">今日はイケる日</span>`);
                break;
            case luckyPoint<8:
            $('.result-txt-inline').html(`<span class="textRed">勝てそうな気がする</span>`);
                break;
            default:
                let textRansu = Math.floor(Math.random() * resultTxt.length);
                $('.result-txt-inline').html(`${resultTxt[textRansu]}`);
                break;
        }
        setTimeout(resultTxtChange, 3000);
        $('.inserttxt').remove();
        $('.result-box').slideDown();
        $('.hide-push').show();
        }else{//クリックが2回目の処理
            let reloadUrl = location.href;
            location.href = reloadUrl;
        }
    });
    
    //リザルト表示後にテキスト差し替え
    function resultTxtChange(){
        let resultTxtLast = "もう一回見てみる？";
        $('.under-arrow').parent().addClass('reload-btn btn-Anime');
        $('.under-arrow').html(`${resultTxtLast}`);
    }
    
    //マイナスを実数に、0判定、小数点以下を整数にする処理
    function fits(x) {
    if(!x || x<=0){
        alert('数値が無効です');
        exit;
        }else{
          x=Math.abs(x);
        }
    };
    
    //インプットされた値をテキスト化
    function strTonum(){
        let bunsNum = $('.buns').val();
        let bunbNum = $('.bunb').val();
        $('.inputnum-1 dt').html(`<strong>${bunsNum}</strong> / <strong>${bunbNum}</strong>の確率が平均`)
    }
    
    
    //カウント数をそれぞれの確率欄に反映
    function lateNum() {
        for (let i = 0; i < late2.length; i++) {
            for(let m=0;m<10;m++){
                for (let n = 0; n < 1000000; n++) {
                ransu = Math.floor(Math.random() * late2[i].length);
                count++;
                //当たるまでの回数を取得
                    if (late2[i][ransu] === 1) {
                        inputNumTextArray[m] = count;
                        count = 0;
                        break;
                    }
                }
                //各10回分の回数を表示
                resultNumBox.eq(i).find('.result-nums').eq(m).text(inputNumTextArray[m]);
                
                //10回の平均値を表示
                if(m===9){
                let sum = 0;
                for (let index = 0; index < inputNumTextArray.length; index++) {
                    sum += inputNumTextArray[index];
                }
                
                //初当りの金額を算出
                
                    //平均値を各項目に出力
                    let average = (sum / inputNumTextArray.length).toFixed(1);
                    inputNumText.eq(i).text(average);
                    
                    if(!(i===6||i===7)){
                        //初当り金額を算出
                        let fmoney =  ((Number(inputNumTextArray[0])/8).toFixed(0))*500;
                        fmoney = fmoney.toLocaleString();
                        firstMoney.eq(i).text(`約${fmoney}円`)

                        //平均金額を算出
                        let money = ((Number(average)/8).toFixed(0))*500;
                            moneyArry[i] = money;
                            money = money.toLocaleString();
                            resultMmoney.eq(i).text(`約${money}円`);
                    }else{
                        //初当り金額を算出
                        let fmoney =  ((Number(inputNumTextArray[0])/15).toFixed(0))*500;
                        fmoney = fmoney.toLocaleString();
                        firstMoney.eq(i).text(`約${fmoney}円`)

                        //平均金額を算出
                        let money = ((Number(average)/15).toFixed(0))*500;
                            moneyArry[i] = money;
                            money = money.toLocaleString();
                            resultMmoney.eq(i).text(`約${money}円`);                    }
                }
            }
        }
        switch (true){
            case 5000>moneyArry[2]:
            luckyPoint += 0;
            break;
            case 10000>moneyArry[2]:
            luckyPoint += 1;
            break;
            case 20000>moneyArry[2]:
            luckyPoint += 2;
            break; 
            case 30000>moneyArry[2]:
            luckyPoint += 3;
            break;
            default:
            luckyPoint += 5;
            break;
        }
        switch (true){
            case 5000>moneyArry[3]:
            luckyPoint += 0;
            break;
            case 10000>moneyArry[3]:
            luckyPoint += 1;
            break; 
            case 15000>moneyArry[3]:
            luckyPoint += 2;
            break;
            case 20000>moneyArry[3]:
            luckyPoint += 3;
            break;
            default:
            luckyPoint += 5;
            break;
        }
        switch (true){
            case 5000>moneyArry[4]:
            luckyPoint += 0;
            break;
            case 12000>moneyArry[4]:
            luckyPoint += 1;
            break; 
            case 18000>moneyArry[4]:
            luckyPoint += 2;
            break;
            case 24000>moneyArry[4]:
            luckyPoint += 3;
            break;
            default:
            luckyPoint += 5;
            break;
        }
        switch (true){
            case 1000>moneyArry[5]:
            luckyPoint += 0;
            break;
            case 2000>moneyArry[5]:
            luckyPoint += 1;
            break; 
            case 4000>moneyArry[5]:
            luckyPoint += 2;
            break;
            case 8000>moneyArry[5]:
            luckyPoint += 3;
            break;
            default:
            luckyPoint += 5;
            break;
        }
    };
    
    /*
    let sel;//選んだ星座
    let horoscopeobj = document.getElementById("horoscope_here");
    let horoscopeH3;
    // 現在日時を取得する
    let now = new Date();
    let nowYear = now.getFullYear();
    let nowMonths = (now.getMonth() + 1).toString().padStart(2, '0');
    let nowDate = (now.getDate()).toString().padStart(2, '0');
    let date = `${nowYear}/${nowMonths}/${nowDate}`;
    
    $(function(){
        horoscope_search();
    });
    
    // APIリクエスト関数の記述
    // ◆主な呼び出し元は最初の
    // <select onchange='horoscope_search(this.value)'>
    function horoscope_search ( param ) {
      sel = param;
      if(sel === undefined){ sel = 0;}

      // リクエストURLを生成する。
      let url = 'http://api.jugemkey.jp/api/horoscope/free/jsonp/' + date;
      
      // スクリプト要素を発行する。
      let script = document.createElement('script');
      script.type = 'text/javascript';
      script.charset = 'UTF-8';
      script.src = url;
      document.body.appendChild(script);
    }

    // コールバック関数の記述
    function callback(data){
      // データが取得できたかチェックする
      if ( ! data ) return;
      if ( ! data["horoscope"] ) return;
      let list = data["horoscope"][date];
      if ( ! list ) return;
      if ( ! list.length ) return;
      let horoscopecontent="";
      let i = sel;
      let imgArr = ['img01_hituji.png','img02_usi.png','img03_hutago.png','img04_kani.png','img05_sisi.png','img06_otome.png','img07_tenbin.png','img08_sasori.png','img09_ite.png','img10_yagi.png','img11_mizugame.png','img12_uo.png'];
      horoscopecontent =`<h3>今日(${date})の運勢</h3>`;
      horoscopecontent += `<div class="fream">`;
      horoscopecontent += `<div class="horoscope">`;
      horoscopecontent += `<div class="h_img"><p><span class="h_rank">${data["horoscope"][date][i]["rank"]}位</span>　${data["horoscope"][date][i]["sign"]}</p><img src="./img/${imgArr[i]}" alt="${data["horoscope"][date][i]["sign"]}"></div>`;
      horoscopecontent += `<div class="h_content">`;
      horoscopecontent += `<div class="scope">ラッキーアイテム ：<strong class="puti">${data["horoscope"][date][i]["item"]}</strong></div>`;
      horoscopecontent += `<div class="scope">ラッキーカラー ：<strong class="puti">${data["horoscope"][date][i]["color"]}</strong></div>`;
      horoscopecontent += `<div class="lucky">`;
      horoscopecontent += `<p>金運：<strong class="puti">${data["horoscope"][date][i]["money"]}</strong></p>`;
      horoscopecontent += `<p>仕事運：<strong class="puti">${data["horoscope"][date][i]["job"]}</strong></p>`;
      horoscopecontent += `<p>恋愛運：<strong class="puti">${data["horoscope"][date][i]["love"]}</strong></p>`;
      horoscopecontent += `<p>総合運：<strong class="puti">${data["horoscope"][date][i]["total"]}</strong></p></div>`;
      horoscopecontent += `<div class="content">${data["horoscope"][date][i]["content"]}</div><p class="motolink">powerd by <a href="http://jugemkey.jp/api/waf/api_free.php" target="_blank">JugemKey</a>
【PR】<a href="http://www.tarim.co.jp/" target="_blank">原宿占い館 塔里木</a></p></div>`;

      horoscopeobj.innerHTML = horoscopecontent;
    }*/
});
