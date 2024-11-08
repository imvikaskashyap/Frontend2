"use client";
import React, { useEffect, useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import axios from 'axios';
import ProtectedRoute from '@/components/ProtectedRoute';
import DefaultLayout from '@/components/Layouts/DefaultLaout';
import { UserRoundPlus } from 'lucide-react';
import { useRouter } from 'next/navigation';

const AllEmployees = () => {
  const [data, setData] = useState([]);

  const router = useRouter()

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/all-employees', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, 
          },
        });
        setData(response.data.employees);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchData();
  }, []);

  // Define columns
  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 50,
      },
      {
        accessorKey: 'name',
        header: 'Name',
        size: 150,
      },
     
      {
        accessorKey: 'email',
        header: 'Email',
        size: 200,
      },
      {
        accessorKey: 'designation',
        header: 'Designation',
        size: 150,
      },
      {
        accessorKey: 'department',
        header: 'Department',
        size: 150,
      },
      {
        accessorKey: 'mob',
        header: 'Mobile',
        size: 150,
      },
     
    ],
    []
  );

  const createBtn = () =>{
    // router.push("/idPassGenerate")
  }

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
    <DefaultLayout>

    <div>
      <h1 className='mb-4 text-3xl ml-2'>All Employees</h1>
      <button className='ml-2  absolute  top-[110px] right-2 flex' onClick={createBtn} >Create  <span><UserRoundPlus /></span></button>
      <MaterialReactTable
        columns={columns}
        data={data} 
        options={{
          sorting: true,
          filtering: true,
          pagination: true,
        }}
      />
    </div>
    </DefaultLayout>
    </ProtectedRoute>
  );
};

export default AllEmployees;
