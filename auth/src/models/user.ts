import mongoose, { Schema, Model, Document } from 'mongoose'

// An interface that describes the properties
// that are required to create a new User
interface UserAttrs {
  email: string
  password: string
}

// An interface that describes the properties
// that a User Model has
interface UserModel extends Model<UserDocument> {
  build(attrs: UserAttrs): UserDocument
}

// An interface that describes the properties
// that a User Document has
interface UserDocument extends Document {
  email: string
  password: string
}

const userSchema = new Schema({
  email:    { type: String, required: true },
  password: { type: String, required: true }
})

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs)
}

const User = mongoose.model<UserDocument, UserModel>('User', userSchema)

export { User }
