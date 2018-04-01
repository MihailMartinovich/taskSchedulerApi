import pick from 'lodash';
import { Task } from '../../task/Models/';
import { SUCCESS } from '../../../constants/HTTPStatuses';

class TaskController {
  static async create(ctx) {
    let newTaskData = pick(ctx.request.body, Task.createFields).value();
    newTaskData.owner = ctx.loggedUser._id;

    let {_id} = await Task.create(newTaskData);
    let task = await Task.findOneWithPublicFields({_id});
    ctx.body = task;
  }

  static async update(ctx) {
    let id = ctx.params.id;
    let newTaskData = pick(ctx.request.body, Task.createFields).value();

    let updatedTask = await Task.findByIdAndUpdate(id, { $set :newTaskData}, { new: true} );

    ctx.body = updatedTask;
  }

  static async delete(ctx) {
    let id = ctx.params.id;
    let deleted = await Task.removeTaskFromBoard({_id: id});

    if(deleted){
      ctx.status = SUCCESS;
    }
  }

  static async get(ctx) {
    let id = ctx.params.id;
    let task = await Task.findOne({_id: id});

    ctx.body = task;
  }

  static async getAll(ctx) {
    let ownerId = ctx.loggedUser._id;
    let tasks = await Task.find({ owner: ownerId });

    ctx.body = tasks;
  }
}

export default TaskController;