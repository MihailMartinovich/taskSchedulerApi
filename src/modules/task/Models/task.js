import mongoose, {Schema} from 'mongoose';


const TaskSchema = new Schema({
    title: {
      type: String,
      required: 'Task title is required'
    },
    description: {
      type: String,
    },
    owner: {
      type: Schema.Types.ObjectId,
      required: 'Owner is required',
      ref: 'User'
    },
    board: {
      type: Schema.Types.ObjectId,
      required: 'Board is required',
      ref: 'Board'
    }
  }, {
    timestamps: true
  }
);

TaskSchema.statics.createFields = ['title', 'description', 'board'];

TaskSchema.statics.findOneWithPublicFields = function(params, cb) {
  return this.findOne(params, cb).select({__v: 0, createdAt: 0, updatedAt: 0});
};

export default mongoose.model('task', TaskSchema);