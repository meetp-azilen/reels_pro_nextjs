import bcrypt from "bcryptjs";
import mongoose,{Schema, model,models} from "mongoose";

export interface IUser {
    _id?: mongoose.Types.ObjectId;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
    comparePassword: (password: string) => Promise<boolean>;
    generateAuthToken: () => string;
}

const userSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, {
    timestamps: true,
});

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
}) 

const User = (models?.User) || model<IUser>("User", userSchema);

export default User;