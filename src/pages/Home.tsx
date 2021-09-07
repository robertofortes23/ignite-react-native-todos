import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export interface EditTaskArgs {
taskId: number;
taskNewTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskWithSame = tasks.find((task) => task.title === newTaskTitle);
    
    if (taskWithSame) {
      return Alert.alert('Task já cadastrada')
    }

    const newData = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };
    
    setTasks((oldTasks) => [...oldTasks, newData]);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task }))

    const foundItem = updatedTasks.find(item => item.id === id )

    if (!foundItem)
      return;
    
    foundItem.done = !foundItem.done;
    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert('Remover item', 'Tem certeza que deseja remover este item?', [
      {
        style: 'cancel',
        text: 'Não'
      }, 
      {
        style: 'destructive',
        text: 'Remover',
        onPress: () => {
          const updateTasks = tasks.filter((task) => task.id !== id);

          setTasks(updateTasks);
        } 
      }
    ])
  }

  function handleEditTask({taskId, taskNewTitle}: EditTaskArgs) {
    const updateTasks = tasks.map(task => ({...task}));

    const taskToBeUpdated = updateTasks.find(task => task.id === taskId)

    if(!taskToBeUpdated)
      return;

    taskToBeUpdated.title = taskNewTitle

    setTasks(updateTasks);

  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})