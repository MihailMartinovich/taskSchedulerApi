import mongoose, {Schema} from 'mongoose';
import { User } from '../../user/models/';

const BoardSchema = new Schema({
    title: {
      type: String,
      required: 'Task title is required',
    },
    description: {
      type: String,
    },
    order: {
      type: Number,
      default: 0,
    },
    tasks: [{
      type: Schema.Types.ObjectId,
      ref: 'Task',
    }],
    owner: {
      type: Schema.Types.ObjectId,
      required: 'Owner is required',
      ref: 'User',
    },
  }, {
    timestamps: true,
  }
);

BoardSchema.statics.updateTaskSet = async function(data) {
  let updatedBoards = [];

  for (let currentValue of data) {
    let updated = await this.findOneAndUpdate({_id: currentValue._id}, { $set: { order: currentValue.order }}, {new: true})
      .populate('tasks')
      .exec();
    updatedBoards.push(updated);
  }

  return updatedBoards;
};

BoardSchema.statics.createFields = ['title', 'description', 'order'];

BoardSchema.statics.findOneWithPublicFields = function(params, cb) {
  return this.findOne(params, cb).select({__v: 0, createdAt: 0, updatedAt: 0});
};

export default mongoose.model('Board', BoardSchema);