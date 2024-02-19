import mongoose , { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import { NextFunction } from 'express';


interface User extends Document {
    username: string;
    emaiil: string;
    password:string;
    comparePassword: (userPassword: string) => Promise<boolean>; // comparePassword is a method that accepts a string and returns a Promise of a boolean 
}
    const UserSchema:Schema = new Schema({
        username: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true }
    });
    
    //Hashing the password before saving it to the database
    UserSchema.pre('save', async function (this: User, next: NextFunction) {
        if(this.isModified('password')){
            this.password = await bcrypt.hash(this.password, 10); // 10 is the number of salt rounds
        }
        next();
    });

    //comparePassword method to compare the hashed password with the password entered by the user
    UserSchema.methods.comparePassword = async function (userPassword: string): Promise<boolean> {
        return await bcrypt.compare(userPassword, this.password);
    }

    export default mongoose.model<User>('User', UserSchema);