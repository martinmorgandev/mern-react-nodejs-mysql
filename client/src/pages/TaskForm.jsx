import React, { useEffect } from 'react';
import { Form, Formik } from "formik";
import { useTasks } from '../context/TaskContext';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';



function TaskForm() {

  const {createTask, getTask, updateTask } = useTasks()
  const [task, setTask] = useState({
    title: "",
    description: "",
  })
  const params = useParams()
  const navigate = useNavigate()

  

  useEffect(() => {
    const loadTask = async() => {
      if(params.id){
        const task = await getTask(params.id)
        // console.log(task[0].title)
        // console.log(task[0].description)
        setTask({
          title: task[0].title,
          description: task[0].description
        })
      }
    }
    loadTask()
  }, [])

  return (
    <div>

      <h1>
        {
          params.id ? "Edit Task" : "New Task"
        }
      </h1>
      <Formik
        initialValues={task}
        enableReinitialize={true}
        onSubmit={ async (values, actions) => {
            console.log(values)

            if (params.id) {
              console.log('uodate')
              await updateTask(params.id, values)
              navigate("/")
            }else{
              await createTask(values)
            }
            setTask({
              title: "",
              description: ""
            })
            
        }}
      >
        {({ handleChange, handleSubmit, values, isSubmitting }) => {
          return <Form onSubmit={handleSubmit}>
            <label>title</label>
            <input
              type="text"
              name="title"
              placeholder="write a title"
              onChange={handleChange}
              value={values.title}
            ></input>

            <label>description</label>
            <textarea
              name="description"
              rows="3"
              placeholder="write a description"
              onChange={handleChange}
              value={values.description}
            ></textarea>

            <button type='submit' disabled={isSubmitting}>
              {isSubmitting ? "Saving ... " : "Save"}
              </button>
          </Form>;
        }}
      </Formik>
    </div>
  );
};

export default TaskForm;
