 ◆作成背景<br>
　大学１年の夏休み、新型コロナウィルスの影響で自宅にいることが多く何か新しことを初めてみようと思って作成するに至った<br>
 当時プログラミングの経験は一切なく、どこで何をすればいいのか、何から始めればいいのか全くわからない状態から始まった<br>
 まずプログラミングとはどういったものなのかを知るため、誰でも始められそうなWeb制作を選んだ<br>
 ２ヶ月という限られた期間で、ゴールを定めずに作業途中で改良を繰り返しながら取り組んだ。<br>
 
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
①mySQLでデータベース作成<br>
CREATE DATABASE listapp;　　<br>

$ use listapp;<br>

$CREATE TABLE calendar_category(id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,category0 text,category1 text ,category2 text ,category3 text ,category4 text ,category5 text ,category6 text ,category7 text ,category8 text);<br>

$ CREATE TABLE calendars(id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,name text,date date,starttime time,endtime time,category decimal(1,0),memo text,form int(11),category_name text,end_date date);<br>

$ CREATE TABLE moneylists(id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,name text, form int(11),price int(11),category text,date date,memo text,method text);<br>

$ CREATE TABLE shoplists(id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,name text,category text);<br>

$ CREATE TABLE todolists(id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,name text,date date);<br>

②app.jsの必要項目を入力する

②ターミナルでnode.jsを実行
$ cd フォルダパス<br>
$ node app.js









◆webアプリ説明
トップページで使用したいツールを選択する<br>
①Task （一番初めに作ったツール。初めはtaskのみを実装する予定だった）<br>
  ToDoリストを作成できるツール<br>
  右上の新規作成ボタンでリストを登録しする。登録したものは「完了」を押せばリストから消える。<br>
  コメント：　一番初めに取り組んだ作成したツールで、主にsql接続について学べた。<br>
  
               
②Money（２番目に作成したツール）<br>
  家計簿をつけるツール<br>
  expense：支出を管理<br>
  income:収入を管理<br>
  credit:クレジットの使用額を管理<br>
  右上の新規作成ボタンで登録する。
 
  
