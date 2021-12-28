import mongoose, { Schema, Model, Document } from 'mongoose'
import { Password } from '../services/password'

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

const userSchema = new Schema(
  {
    email:    { type: String, required: true },
    password: { type: String, required: true }
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id
        delete ret._id
        delete ret.password
        delete ret.__v
      }
    }
  }
)

userSchema.pre('save', async function(done) {
  if (this.isModified('password')) {
    const hashedPassword = await Password.toHash(this.get('password'))

    this.set('password', hashedPassword)
  }
  done()
})

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs)
}

const User = mongoose.model<UserDocument, UserModel>('User', userSchema)

export { User }
