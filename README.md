PxZoO 後台
===

![image](https://hackmd.io/_uploads/HyMALfNpp.png)

- [README 目錄](#pxzoo-後台)
  - [專案架構](#專案架構)
  - [前台介紹](#前台介紹)
  - [系統說明](#系統說明)
  - [使用技術](#使用技術)
  - [資料夾說明](#資料夾說明)
  - [測試帳號密碼](#測試帳號密碼)
  - [在 Local 端的安裝＆運行步驟](#在-local-端的安裝運行步驟)
  - [聯絡作者](#聯絡作者)
  - [其他介紹資料](#其他介紹資料)


## 專案架構
本專案為「前後台分離」、「前後端分離」: 

| :file_folder: 資料夾名稱 | :memo: 說明 | :link: GitHub 連結  |
| -------- | -------------- | ----- |
| g4       | 儲存所有專案     | --  |
| - pxzoo  | 前台內容        | [前台](https://github.com/SkerLeon/pxzoo)  |
| - back   | 後台內容        | [後台](https://github.com/Hsuan1128/PxZoO-admin)  |
| - api    | PHP 內容       | [API](https://github.com/yhkekeke/PxZoO_API)  |
| - img    | 資料庫的圖片內容 | 見 API 的 img 資料夾  |


## 後台介紹
* `管理員` 的權限如下:
    1. 「後台管理」瀏覽、查詢所有管理員資料。
    2. 「會員管理」瀏覽、查詢所有會員資料，並修改處理狀態（正常or停權）。
    3. 「留言管理 | 會員留言」瀏覽、查詢所有留言資料，並修改處理狀態（上架or下架）。
    4. 「留言管理 | 檢舉留言」瀏覽、查詢所有檢舉資料，並瀏覽檢舉明細、修改處理狀態（未審核or審核通過or審核未通過）。
    5. 「消息管理」瀏覽、查詢、新增、刪除、修改所有消息資料，並修改處理狀態（上架or下架）。
    6. 「動物管理」瀏覽、查詢、新增、修改所有消息資料，並修改處理狀態（上架or下架）。
    7. 「學堂管理」瀏覽、查詢、新增、刪除、修改所有學堂資料，並修改處理狀態（上架or下架）。
    8. 「門票管理」瀏覽、修改所有門票資料。
    9. 「銷售管理 | 購票訂單」瀏覽、查詢所有訂單資料，可瀏覽訂單明細，並修改處理狀態（已用票or已取票）、紀錄更新情形。
    10. 「銷售管理 | 銷售統計」瀏覽近 3 個月入園人數、票種統計、銷售金額之統計明細與報表。
* `超級管理員` 擁有 `管理員` 的所有權限，還可以在「後台管理」修改管理員狀態（正常or停權）、編輯自己與其他管理員資料、新增管理員。

## 系統說明
* 專案運行方式是使用 `Node.js`、`npm`、`Vue vite`。
* **核心相依項目（dependencies）**

| :pushpin: 項目 | :label:  版本 |
| -------- | -------- |
| axios | ^1.6.7 |
| chart.js | ^4.4.1 |
| pinia | ^2.1.7 |
| view-ui-plus | ^1.3.16 |
| vue | ^3.3.11 |
| vue-chartjs | ^5.3.0 |
| vue-cropper | ^1.1.1 |
| vue-router | ^4.2.5 |


* **開發相依項目（devDependencies）**

| :pushpin: 項目 | :label:  版本 |
| -------- | -------- |
| @vitejs/plugin-vue | ^4.5.2 |
| sass | ^1.70.0 |
| vite | ^5.0.10 |


## 使用技術
| :pushpin: 類別 | :wrench: 技術 |
| ------------- | ------------ |
| 前端工具       | CSS、HTML、JS、AJAX、Vue.js、View Design、pinia、chart.js  |
| 後端工具 | PHP、MySQL |
| 程式環境與工具 | Sass、VSCode、MySQL Workbench、Wampserver、Vue Vite |
| 版控工具 | git、GitHub、Sourcetree |
| 設計與專案管理工具 | Figma、TimeTree |

## 資料夾說明
| :file_folder: 資料夾名稱 | :memo: 說明 |
| -------- | ------------- |
| public     | 圖片放置處(檔名不會隨打包改變) |
| src     | 資源放置處     |
| - components | vue 組件放置處 |
| - router | index.js 放置處  |
| - stores | pinia 檔案放置處  |
| - views | 畫面放置處     |
| - assets   | 靜態資源放置處  |
| -- images | 圖片放置處      |
| -- js     | 共用 .js 放置處 |
| -- scss   | scss 檔案放置處 

## 測試帳號密碼
* [專案正式上線網址](https://tibamef2e.com/chd104/g4/)
```sh
帳號： PxZoOexample
密碼： PxZoOexample
```

* 後台需要登入才能看到內容。

## 在 Local 端的安裝＆運行步驟
1. 取得後台專案
```sh
git clone https://github.com/Hsuan1128/PxZoO-admin.git
```

1. 進入專案目錄
```sh
cd PxZoO-admin
```

1. 後台安裝套件
```sh
npm install
```
1. 運行後台專案
```sh
npm run dev
```

## 聯絡作者
本專案開發者及主責頁面/功能:  
<a href="https://github.com/Hsuan1128/PxZoO-admin/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Hsuan1128/PxZoO-admin" />
</a>  

1. [SkerLeon](https://github.com/SkerLeon): 門票管理、動物管理的動物位置
2. [yhkekeke](https://github.com/yhkekeke): 銷售管理|購票訂單、銷售管理|銷售統計
3. [wenchieh0119](https://github.com/wenchieh0119) : 學堂管理
4. [Hsuan1128](https://github.com/Hsuan1128): 後台側邊欄、後台登入頁、後台管理、會員管理
5. [huang607](https://github.com/huang607) : 留言管理|會員留言、留言管理|檢舉留言、消息管理
6. [Ying-Jung189](https://github.com/Ying-Jung189) : 動物管理

## 其他介紹資料
* [專案簡報](https://drive.google.com/file/d/1kjP9MviFWZCMTxuaUcBT9OXchDZdpxZf/view)
* [專案 Demo 影片](https://www.youtube.com/watch?v=wMNHY-WFYpA&ab_channel=%E7%B7%AF%E8%82%B2TibaMe%E5%B0%B1%E6%A5%AD%E9%A4%8A%E6%88%90%E7%8F%AD)
* [專案技術文件](https://drive.google.com/file/d/1EFl3E_D7THHsBP35CQ8ErgrPuUCdjhnD/view)
* [專案 UI/UX 設計稿](https://www.figma.com/file/YCfP69MYr9OBUSBmMqePIr/%E7%B7%AF%E8%82%B2-%7C-%E5%9C%98%E9%AB%94%E5%B0%88%E9%A1%8C-6-PxZoO?type=design&node-id=515%3A9347&mode=design&t=DTzDguwhyjsUlTiD-1)
