import mongoose, {Schema} from 'mongoose';
import { Board } from '../../board/models/';

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
    completed: {
      type: Boolean//,
      //default: false
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

TaskSchema.post('save', async function(task, next) {
  let board = await Board.findOne({ _id: task.board });

  let doesInclude = board.tasks.includes(task._id);
  if(!doesInclude) {
    board.tasks.push(task._id);
    board.save();
  }

  next();
});

TaskSchema.statics.removeTaskFromBoard = async function(data) {
  console.log(data);
  let task = await this.findOne(data);

  let deleted = await task.remove();

  if(deleted) {
    let board = await Board.findOne({_id: task.board});

    let index = board.tasks.indexOf(task._id);
    if(index > -1){
      board.tasks.splice(index, 1);
      board.save();
    }
  }

  return deleted;
};

TaskSchema.statics.findOneWithPublicFields = function(params, cb) {
  return this.findOne(params, cb).select({__v: 0, createdAt: 0, updatedAt: 0});
};

export default mongoose.model('Task', TaskSchema);