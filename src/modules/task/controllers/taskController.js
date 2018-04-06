import _ from 'lodash';
import partialRight from 'lodash.partialright';
import { Task } from '../../task/Models/';
import { SUCCESS } from '../../../constants/HTTPStatuses';

class TaskController {
  static async create(ctx) {
    let newTaskData = _.pick(ctx.request.body, Task.createFields);
    newTaskData.owner = ctx.loggedUser._id;

    let {_id} = await Task.create(newTaskData);
    let task = await Task.findOneWithPublicFields({_id});
    ctx.body = task;
  }

  static async update(ctx) {
    let id = ctx.params.id;
    let newTaskData = _.pick(ctx.request.body, Task.createFields);

    let updatedTask = await Task.findByIdAndUpdate(id, { $set :newTaskData}, { new: true} );

    ctx.body = updatedTask;
  }

  static async updateSet(ctx) {
    let data = ctx.request.body;

    let updatedTasks = await Task.updateTaskSet(data);

    ctx.body = updatedTasks;
  }

  static async delete(ctx) {
    let id = ctx.params.id;
    let deleted = await Task.removeTaskFromBoard({_id: id});

    if(deleted){
      ctx.status = SUCCESS;
      ctx.body = deleted;
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