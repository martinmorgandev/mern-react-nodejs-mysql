import React from "react";
import { Route, Routes } from "react-router-dom";
import TasksPage from "./pages/TasksPage";
import TaskForm from "./pages/TaskForm";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";

import {TaskContextProvider} from "./context/TaskContext";

const App = () => {
  return (
    <TaskContextProvider>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<TasksPage></TasksPage>}></Route>
        <Route path="/new" element={<TaskForm></TaskForm>}></Route>
        <Route path="/edit/:id" element={<TaskForm></TaskForm>}></Route>
        <Route path="*" element={<NotFound></NotFound>}></Route>
      </Routes>
    </TaskContextProvider>
  );
};

export default App;
