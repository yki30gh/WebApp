const express = require('express');
const mysql = require("mysql");
const app = express();
const jsdom = require("jsdom");


app.use(express.static('public'));
app.use(express.urlencoded({
  extended: false
}));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'ユーザー名を入力',
  password: 'パスワードを入力',
  database: 'listapp'
});
connection.connect((err) => {
  if (err) {
    console.log('error connecting: ' + err.stack);
    return;
  }
  console.log('success');
});
app.get('/', (req, res) => {
  res.render('top.ejs');
});

//＊＊＊＊＊＊＊＊タスク＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
app.get("/task-top", (req, res) => {
  res.render('task-top.ejs');
});
//ショップリストーーーーーーーーーーーーーーーーーーーーーーーーーー
app.get("/task-shop-index", (req, res) => {
  connection.query(
    'select*from shoplists',
    (error, results_s) => {
      connection.query(
        'select*from todolists',
        (error,results_t)=>{
          res.render("task-shop-index.ejs", {shoplists: results_s,todolists:results_t});
        });
    });
});
app.get("/sumple", (req, res) => {
  res.render('sumple.ejs');
});
app.post("/shop-create", (req, res) => {
  connection.query(
    'insert into shoplists(name,category) values(?,?)',
    [req.body.shoplistName, req.body.shoplistCategory],
    (error, results) => {
      connection.query(
        'select*from shoplists',
        (error, results) => {
          res.redirect("/task-shop-index")
        }
      );
    });
});
app.post("/shop-search", (req, res) => {
  connection.query(
    'select*from shoplists where category=?',
    [req.body.searchCategory],
    (error, results) => {
      res.render("shop-search.ejs", {
        shoplists: results
      });
    }
  );
});
app.post('/shop-delete/:id', (req, res) => {
  connection.query(
    'DELETE FROM shoplists WHERE id = ?',
    [req.params.id],
    (error, results) => {
      res.redirect('/task-shop-index');
    }
  );
});
app.get('/shop-edit/:id', (req, res) => {
  connection.query(
    'select*from shoplists where id = ?',
    [req.params.id],
    (error, results) => {
      res.render('shop-edit.ejs', {
        shoplist: results[0]
      });
    }
  );
});
app.post('/shop-update/:id', (req, res) => {
  connection.query(
    "update shoplists set name=?,category=? where id=?",
    [req.body.shoplistName, req.body.shoplistCategory, req.params.id],
    (error, results) => {
      res.redirect("/task-shop-index");
    });
});
//やることリストーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
app.get("/task-todo-index", (req, res) => {
  connection.query(
    'select*from todolists order by date asc',
    (error, results) => {
      res.render("task-todo-index.ejs", {
        todolists: results
      });
    }
  );
});
app.post("/todo-create", (req, res) => {
  connection.query(
    'insert into todolists(name,date) values(?,?)',
    [req.body.todolistName, req.body.todolistDate],
    (error, results) => {
      connection.query(
        'select*from todolists',
        (error, results) => {
          res.redirect("/task-todo-index")
        }
      );
    });
});
app.post('/todo-delete/:id', (req, res) => {
  connection.query(
    'DELETE FROM todolists WHERE id = ?',
    [req.params.id],
    (error, results) => {
      res.redirect('/task-todo-index');
    }
  );
});
app.get('/todo-edit/:id', (req, res) => {
  connection.query(
    'select*from todolists where id = ?',
    [req.params.id],
    (error, results) => {
      res.render('todo-edit.ejs', {
        todolist: results[0]
      });
    }
  );
});
app.post('/todo-update/:id', (req, res) => {
  connection.query(
    "update todolists set name=?,date=? where id=?",
    [req.body.todolistName, req.body.todolistDate, req.params.id],
    (error, results) => {
      res.redirect("/task-todo-index");
    });
});


//＊＊＊＊＊＊＊＊お金＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
app.get("/money-top", (req, res) => {
  connection.query(
    'select*from moneylists',
    (error, results) => {
      res.render('money-top.ejs', {
        moneylists: results
      });
    }
  )
});

//**支出ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
app.get("/money-expense-index", (req, res) => {
  connection.query(
    'select* from moneylists where form=0',
    (error, results) => {
      res.render("money-expense-index.ejs", {
        moneylists: results
      });
    }
  );
});
app.post('/expense-delete/:id', (req, res) => {
  connection.query(
    'DELETE FROM moneylists WHERE id = ?',
    [req.params.id],
    (error, results) => {
      res.redirect('/money-expense-index');
    }
  );
});
app.post("/expense-create", (req, res) => {
  connection.query(
    'insert into moneylists(form,name,price,category,date,method) values(0,?,?,?,?,?)',
    [req.body.moneylistName, req.body.moneylistPrice, req.body.moneylistCategory, req.body.moneylistDate, req.body.moneylistMethod],
    (error, results) => {
      connection.query(
        'select*from moneylists',
        (error, results) => {
          res.redirect("/money-expense-index");
        }
      );
    });
});
app.get('/expense-edit/:id', (req, res) => {
  connection.query(
    'select*from moneylists where id = ?',
    [req.params.id],
    (error, results) => {
      res.render('expense-edit.ejs', {
        moneylist: results[0]
      });
    }
  );
});
app.post('/expense-update/:id', (req, res) => {
  connection.query(
    "update moneylists set name=?,price=?,category=?,date=?,method=? where id=?",
    [req.body.moneylistName, req.body.moneylistPrice, req.body.moneylistCategory, req.body.moneylistDate, req.body.moneylistMethod, req.params.id],
    (error, results) => {
      res.redirect("/money-expense-index");
    });
});
app.post("/expense-key-search", (req, res) => {
  connection.query(
    'select*from moneylists where name like ? and form=0 ',
    ["%" + req.body.searchName + "%"],
    (error, results) => {
      res.render("money-expense-index.ejs", {
        moneylists: results
      });
    });
});

//【並べ替え】
app.get("/expense-new", (req, res) => {
  connection.query(
    'select* from moneylists where form=0 order by date desc',
    (error, results) => {
      res.render("money-expense-index.ejs", {
        moneylists: results
      });
    }
  );
});
app.get("/expense-old", (req, res) => {
  connection.query(
    'select* from moneylists where form=0 order by date asc',
    (error, results) => {
      res.render("money-expense-index.ejs", {
        moneylists: results
      });
    }
  );
});
app.get("/expense-hight", (req, res) => {
  connection.query(
    'select* from moneylists where form=0 order by price desc',
    (error, results) => {
      res.render("money-expense-index.ejs", {
        moneylists: results
      });
    }
  );
});
app.get("/expense-low", (req, res) => {
  connection.query(
    'select* from moneylists where form=0 order by price asc',
    (error, results) => {
      res.render("money-expense-index.ejs", {
        moneylists: results
      });
    }
  );
});
//【カテゴリ】
app.get("/expense-life", (req, res) => {
  connection.query(
    'select* from moneylists where form=0 and category="生活費"',
    (error, results) => {
      res.render("money-expense-index.ejs", {
        moneylists: results
      });
    }
  );
});
app.get("/expense-food", (req, res) => {
  connection.query(
    'select* from moneylists where form=0 and category="食費"',
    (error, results) => {
      res.render("money-expense-index.ejs", {
        moneylists: results
      });
    }
  );
});
app.get("/expense-dailyItem", (req, res) => {
  connection.query(
    'select* from moneylists where form=0 and category="日用品"',
    (error, results) => {
      res.render("money-expense-index.ejs", {
        moneylists: results
      });
    }
  );
});
app.get("/expense-education", (req, res) => {
  connection.query(
    'select* from moneylists where form=0 and category="教育費"',
    (error, results) => {
      res.render("money-expense-index.ejs", {
        moneylists: results
      });
    }
  );
});
app.get("/expense-transportation", (req, res) => {
  connection.query(
    'select* from moneylists where form=0 and category="交通費"',
    (error, results) => {
      res.render("money-expense-index.ejs", {
        moneylists: results
      });
    }
  );
});
app.get("/expense-others", (req, res) => {
  connection.query(
    'select* from moneylists where form=0 and category="その他"',
    (error, results) => {
      res.render("money-expense-index.ejs", {
        moneylists: results
      });
    }
  );
});
//**収入ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
app.get("/money-income-index", (req, res) => {
  connection.query(
    'select* from moneylists where form=1 order by date desc',
    (error, results) => {
      res.render("money-income-index.ejs", {
        moneylists: results
      });
    }
  );
});
app.post('/income-delete/:id', (req, res) => {
  connection.query(
    'DELETE FROM moneylists WHERE id = ?',
    [req.params.id],
    (error, results) => {
      res.redirect('/money-income-index');
    }
  );
});
app.post("/income-create", (req, res) => {
  connection.query(
    'insert into moneylists(form,name,price,date) values(1,?,?,?)',
    [req.body.moneylistName, req.body.moneylistPrice, req.body.moneylistDate],
    (error, results) => {
      connection.query(
        'select*from moneylists',
        (error, results) => {
          res.redirect("/money-income-index");
        }
      );
    });
});
app.get('/income-edit/:id', (req, res) => {
  connection.query(
    'select*from moneylists where id = ?',
    [req.params.id],
    (error, results) => {
      res.render('income-edit.ejs', {
        moneylist: results[0]
      });
    }
  );
});
app.post('/income-update/:id', (req, res) => {
  connection.query(
    "update moneylists set name=?,price=?,date=? where id=?",
    [req.body.moneylistName, req.body.moneylistPrice, req.body.moneylistDate, req.params.id],
    (error, results) => {
      res.redirect("/money-income-index");
    });
});
//**クレジットーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
app.get("/money-credit-index", (req, res) => {
  connection.query(
    'select* from moneylists where method="クレジット"',
    (error, results) => {
      res.render("money-credit-index.ejs", {
        moneylists: results
      });
    }
  );
});
app.post("/credit-create", (req, res) => {
  connection.query(
    'insert into moneylists(form,name,price,category,date,method) values(0,?,?,?,?,?)',
    [req.body.moneylistName, req.body.moneylistPrice, req.body.moneylistCategory, req.body.moneylistDate, req.body.moneylistMethod],
    (error, results) => {
      connection.query(
        'select*from moneylists',
        (error, results) => {
          res.redirect("/money-credit-index");
        }
      );
    });
});
app.post('/credit-delete/:id', (req, res) => {
  connection.query(
    'DELETE FROM moneylists WHERE id = ?',
    [req.params.id],
    (error, results) => {
      res.redirect('/money-credit-index');
    }
  );
});
app.get('/credit-edit/:id', (req, res) => {
  connection.query(
    'select*from moneylists where id = ?',
    [req.params.id],
    (error, results) => {
      res.render('credit-edit.ejs', {
        moneylist: results[0]
      });
    }
  );
});
app.post('/credit-update/:id', (req, res) => {
  connection.query(
    "update moneylists set name=?,price=?,category=?,date=?,method=? where id=?",
    [req.body.moneylistName, req.body.moneylistPrice, req.body.moneylistCategory, req.body.moneylistDate, req.body.moneylistMethod, req.params.id],
    (error, results) => {
      res.redirect("/money-credit-index");
    });
});
//＊＊＊＊＊＊＊＊勉強＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊

app.get("/calendar-top", (req, res) => {
  const today = new Date();
  console.log(today);
  var yyyy = today.getFullYear()
  var mm = today.getMonth() + 1;
  var firstDate = new Date(yyyy, mm - 1, 1);
  var lastDate = new Date(yyyy, mm, 0);
  var startDay = firstDate.getDay();
  const dateString = (date) => {
    var yyyy = date.getFullYear();
    var mm = date.getMonth() + 1;
    var dd = date.getDate();
    return yyyy + '/' + mm + '/' + dd;
  }
  var startDate = new Date(yyyy, mm - 1, 1 - startDay);
  var startDateString = dateString(startDate);
  var endDate = new Date(yyyy, mm - 1, 42 - startDay);
  var endDateString = dateString(endDate);

  connection.query('select*from calendars where date between ? and ? order by starttime asc',
    [startDateString, endDateString],
    (err, rows) => {
      if (err) {
        console.log('err: ' + err)
      }
      const ary1 = new Array(42).fill("");
      for (var i = 0; i < 42; i++) {
        ary1[i] = new Date(yyyy, mm - 1, 1 - startDay + i);
      }
      const ary2 = new Array(42).fill("");
      for (var i = 0; i < 42; i++) {
        var elements = rows.filter((row) => {
          return dateString(row.date) == dateString(new Date(yyyy, mm - 1, 1 - startDay + i)) && row.form!=1;
        });
        ary2[i] = elements
      }
      const ary3 = new Array(42).fill("");
      for (var i = 0; i < 42; i++) {
        var elements = rows.filter((row) => {
          return dateString(row.date) == dateString(new Date(yyyy, mm - 1, 1 - startDay + i)) && row.form===1;
        });
        ary3[i] = elements
      }
      const ary = [ary1, ary2, ary3];
      console.log(ary);
      connection.query(
        'select*from calendar_category',
        (error,results2)=>{
          res.render("calendar-top.ejs", {ary: ary,categorys:results2});
        });
    });
});
app.get("/calendar/:ym", (req, res) => {
  var yyyy = req.params.ym.substr(0, 4);
  var mm = req.params.ym.substr(5, 2);
  var firstDate = new Date(yyyy, mm - 1, 1);
  var lastDate = new Date(yyyy, mm, 0);
  var startDay = firstDate.getDay();
  const dateString = (date) => {
    var yyyy = date.getFullYear();
    var mm = date.getMonth() + 1;
    var dd = date.getDate();
    return yyyy + '/' + mm + '/' + dd;
  }
  var startDate = new Date(yyyy, mm - 1, 1 - startDay);
  var startDateString = dateString(startDate);
  var endDate = new Date(yyyy, mm - 1, 42 - startDay);
  var endDateString = dateString(endDate);
  connection.query('select*from calendars where date between ? and ? order by starttime asc',
    [startDateString, endDateString],
    (err, rows) => {
      if (err) {
        console.log('err: ' + err)
      }
      const ary1 = new Array(42).fill("");
      for (var i = 0; i < 42; i++) {
        ary1[i] = new Date(yyyy, mm - 1, 1 - startDay + i);
      }
      const ary2 = new Array(42).fill("");
      for (var i = 0; i < 42; i++) {
        var elements = rows.filter((row) => {
          return dateString(row.date) == dateString(new Date(yyyy, mm - 1, 1 - startDay + i)) && row.form!=1;
        });
        ary2[i] = elements
      }
      const ary3 = new Array(42).fill("");
      for (var i = 0; i < 42; i++) {
        var elements = rows.filter((row) => {
          return dateString(row.date) == dateString(new Date(yyyy, mm - 1, 1 - startDay + i)) && row.form===1;
        });
        ary3[i] = elements
      }
      const ary = [ary1, ary2,ary3];

      connection.query(
        'select*from calendar_category',
        (error,results2)=>{
          res.render("calendar-top.ejs", {ary: ary,categorys:results2});
        });
    });
});
app.post("/schedule-create", (req, res) => {
  connection.query(
    'insert into calendars(name,date,starttime,endtime,end_date,category,memo,form) values(?,?,?,?,?,?,?,?)',
    [req.body.scheduleName, req.body.scheduleDate, req.body.scheduleStime, req.body.scheduleEtime,req.body.scheduleEndDate,req.body.scheduleCategory, req.body.scheduleMemo,req.body.scheduleForm],
    (error, results) => {
      res.redirect("/calendar-top");
    }
  )
})
app.post("/schedule-delete/:id", (req, res) => {
  connection.query(
    'delete from calendars where id=?',
    [req.params.id],
    (error, results) => {
      res.redirect("/calendar-top");
    }
  );
});
app.post("/schedule-edit/:id",(req,res)=>{
  connection.query(
    'update calendars set name=?,date=?,starttime=?,endtime=?,end_date=?,category=?,memo=?,form=? where id=?',
    [req.body.scheduleName,req.body.scheduleDate,req.body.scheduleStime,req.body.scheduleEtime,req.body.scheduleEndDate,req.body.scheduleCategory,req.body.scheduleMemo,req.body.scheduleForm,req.params.id],
    (error, results) => {
      res.redirect("/calendar-top");
    }
  );
});
app.post("/category-edit",(req,res)=>{
  connection.query(
    'update calendar_category set category0=?,category1=?,category2=?,category3=?,category4=?,category5=?,category6=?,category7=?,category8=?',
    [req.body.category0,req.body.category1,req.body.category2,req.body.category3,req.body.category4,req.body.category5,req.body.category6,req.body.category7,req.body.category8],
    (error,results)=>{
      res.redirect("/calendar-top");
    });
});

app.get("/health-top", (req, res) => {
  res.render("health-top.ejs");
});
app.use(express.static('public'));
app.listen(3000);
