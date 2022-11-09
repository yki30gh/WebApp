 ◆作成背景<br>
　大学１年の夏休み、新型コロナウィルスの影響で自宅にいることが多く何か新しことを初めてみようと思って作成するに至った<br>
 当時プログラミングの経験は一切なく、どこで何をすればいいのか、何から始めればいいのか全くわからない状態から始まった<br>
 まずプログラミングとはどういったものなのかを知るため、誰でも始められそうなWeb制作を選んだ<br>
 ２ヶ月という限られた期間で、ゴールを定めずに作業の途中で改良を繰り返しながら取り組んだ。<br>
 
 ◆作成したWebアプリケーション<br>
　自己管理を一つのアプリ内で可能とするようなサービスを提供したい<br>
 目的：プログラミングについて知る<br>
 作成期間：２ヶ月と10日間<br>
 
◆用いた言語など<br>
HTML & CSS　<br>
JavaScript<br>
jQuery<br>
Node.js（サーバーサイド ）<br>
SQL<br>

◆開発環境<br>
Atom　　Ver 1.60.0<br>
mysql  Ver 14.14<br>

◆使用するデータベース
DB:listapp<br>
table:<br>
+-------------------+<br>
| calendar_category |<br>
| calendars         |<br>
| moneylists        |<br>
| shoplists         |<br>
| todolists         |<br>
+-------------------+<br>

◆使用手順<br>
①mySQLでアプリで使用するデータベース作成<br>
CREATE DATABASE listapp;　　<br>

$ use listapp;<br>

$CREATE TABLE calendar_category(id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,category0 text,category1 text ,category2 text ,category3 text ,category4 text ,category5 text ,category6 text ,category7 text ,category8 text);<br>

$ CREATE TABLE calendars(id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,name text,date date,starttime time,endtime time,category decimal(1,0),memo text,form int(11),category_name text,end_date date);<br>

$ CREATE TABLE moneylists(id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,name text, form int(11),price int(11),category text,date date,memo text,method text);<br>

$ CREATE TABLE shoplists(id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,name text,category text);<br>

$ CREATE TABLE todolists(id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,name text,date date);<br>

②app.jsの必要項目を入力する<br>
　１４行目のユーザ名と15行目のパスワードを上書きする<br>

③ターミナルでnode.jsを実行<br>
$ cd フォルダパス<br>
$ node app.js<br>

④ウェブサイトを開く<br>
http://localhost:3000/<br>



◆webアプリ説明
トップページで使用したいツールを選択する<br>
①Task （一番初めに作ったツール。初めはtaskのみを実装する予定だった）<br>
  ToDoリストを作成できるツール<br>
  右上の新規作成ボタンでリストを登録しする。登録したものは「完了」を押せばリストから消える。<br>
              
②Money（２番目に作成したツール）<br>
  家計簿をつけるツール<br>
  expense：支出を管理<br>
  income:収入を管理<br>
  credit:クレジットの使用額を管理<br>
  右上の新規作成ボタンで登録する。
 
③calender（最後に作成したツール）
 スケジュールを管理するツール
 日付をクリックするとその日のスケジュールが表示される。
 予定を登録したい場合は右上の「+」ボタンを押す。
 右上の「All」ボタンをオンにすれば終日の予定が登録される。
 カレンダーのマークを押すと終了時刻を登録できる
 右上の「来月」をクリックすると次の月が表示される。左上の「先月」をクリックすると先月のものが表示される。
 
 ④health（カレンダー制作に力を入れすぎて時間が着手できずに終えた）
 起床時間や、運動記録、体重計測などを健康に関するツールにしようと思っていた
 
◆コメント
２年ぶりにプログラムを見返すと本当に改善んが多かった。オブジェクト思考が全くないのと、html上でデータ操作するのではなく、サーバー上でデータ操作するべき点が多く見られた。
改善点は多かったが、webのデザインは細部までこだわっていて良かった。特にカレンダーのwebデザインと動きは２年後のいまでも出来は良いと感じた。
 
  
