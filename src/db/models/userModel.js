
//모듈 가져오기
const { model } = require('mongoose');
//스키마 가져오기
const userSchema = require('../schema/User');
//모델 생성
const UserModel = model('User', userSchema);

//내보내기
module.exports = UserModel;



/*
const mongoose = require('mongoose');
const UserSchema = require('../schemas/User'); // UserSchema를 정의한 파일의 경로

// 모델 정의
const UserModel = mongoose.model('User', UserSchema);

// User 클래스 정의
class User {
  static async create(newUser) {
    const createdUser = await UserModel.create(newUser);
    return createdUser;
  }

  static async findByEmail(email) {
    const user = await UserModel.findOne({ email });
    return user;
  }

  static async findById(user_id) {
    const user = await UserModel.findById(user_id); // findOne -> findById로 변경
    return user;
  }

  static async findAll() {
    const users = await UserModel.find({});
    return users;
  }

  static async update(user_id, newValues) {
    const filter = { _id: user_id }; // id -> _id로 변경
    const update = { $set: newValues };
    const options = { new: true }; // returnDocument: 'after' -> new: true로 변경

    const updatedUser = await UserModel.findByIdAndUpdate(filter, update, options); // findOneAndUpdate -> findByIdAndUpdate로 변경
    return updatedUser;
  }

  static async delete(user_id) {
    await UserModel.findByIdAndDelete(user_id); // deleteOne -> findByIdAndDelete로 변경
    return '삭제가 완료되었습니다.';
  }
}

module.exports = User;
*/