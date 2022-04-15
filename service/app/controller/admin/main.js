'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const result = await this.app.mysql.get('shop-list', {});
    ctx.body = result;
  }

  async login() {
    const { ctx } = this;
    let username = ctx.request.body.username;
    let password = ctx.request.body.password;
    const sql = `SELECT userName FROM user_info WHERE userName = '${username}' AND password = '${password}'`;
    const res = await this.app.mysql.query(sql);
    if (res.length > 0) {
      let openId = new Date().getTime();
      ctx.session.openId = { openId };
      ctx.body = { data: '登录成功', openId };
    } else {
      ctx.body = { data: '登录失败' };
    }
  }
  async register() {
    const { ctx } = this;
    let newUser = ctx.request.body;
    const result = await this.app.mysql.insert('user_info', newUser);
    const insertSuccess = result.affectedRows === 1;
    const insertId = result.insertId;
    ctx.body = {
      isSuccess: insertSuccess,
      insertId,
    };
  }
  async products() {
    const sql = 'SELECT Id, shopName, shopPrice FROM shop_list';
    const res = await this.app.mysql.query(sql);
    if (res.length > 0) {
      let openId = new Date().getTime();
      this.ctx.session.openId = { openId };
      this.ctx.body = { data: res };
    } else {
      this.ctx.body = { data: '错误' };
    }
  }
  async addProducts() {
    let newData = this.ctx.request.body;
    const result = await this.app.mysql.insert('shop_list', newData);
    const insertSuccess = result.affectedRows === 1;
    const insertId = result.insertId;
    this.ctx.body = {
      isSuccess: insertSuccess,
      insertId,
    };
  }
  async getProduct() {
    let { id } = this.ctx.params;
    let sql = `SELECT shopName,shopPrice FROM shop_list WHERE Id=${id}`;
    const res = await this.app.mysql.query(sql);
    if (res.length > 0) {
      this.ctx.body = { data: res };
    } else {
      this.ctx.body = { data: 'error' };
    }
  }
  async editProduct() {
    let { id } = this.ctx.params;
    let { shopName, shopPrice } = this.ctx.request.body;
    let sql = `UPDATE shop_list SET shopName='${shopName}',shopPrice=${shopPrice} WHERE Id=${id}`;
    const res = await this.app.mysql.query(sql);
    const insertSuccess = res.affectedRows === 1;
    const insertId = res.insertId;
    this.ctx.body = {
      isSuccess: insertSuccess,
      insertId,
    };
  }

  async uploadFile() {
    let data = this.ctx.request.body;
    console.log(data);
  }

  async delProduct() {
    let { id } = this.ctx.params;
    let res = this.app.mysql.delete('shop_list', { id });
    this.ctx.body = { data: res };
  }

}

module.exports = HomeController;
