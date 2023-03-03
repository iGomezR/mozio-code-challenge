import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SearchForm from 'components/SearchForm/SearchForm';
import ResumeForm from 'components/Counter/ResumeForm/ResumeForm';

function App() {
  return (
    <Routes>
       <Route
          path={`/`}
          element={<SearchForm />}
        />
         <Route
          path={`/resume/*`}
          element={<ResumeForm />}
        />
      {/* <SearchForm /> */}
      {/* <ResumeForm /> */}
    </Routes>
  )
}

export default App
