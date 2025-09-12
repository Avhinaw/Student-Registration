import React from 'react'
import { Input } from './ui/input'

export default function StudentList() {
  return (
    <div className='bg-gray-900 min-h-screen h-full w-full'>
      <div className=''>
        <div>
          <h1>Student Directory</h1>
          <h3>Manage student records, including enrollment details and contact information.</h3>
        </div>
        <a href="#">Add New Student</a>
      </div>
      <div className="bg-gray-800 rounded-2xl p-6 w-[70%] m-auto h-full">
      <div>
        <Input />
        <div>
          <select name="" id="">
            <option value="">Department</option>
            <option value="">Department</option>
            <option value="">Department</option>
            <option value="">Department</option>
          </select>
          <select name="" id="">
            <option value="">Department</option>
            <option value="">Department</option>
            <option value="">Department</option>
            <option value="">Department</option>
          </select>
        </div>
      </div>
      <div>
        
      </div>
      </div>
    </div>
  )
}
