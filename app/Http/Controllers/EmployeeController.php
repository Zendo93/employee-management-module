<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;
use App\Http\Requests\EmployeeRequest;

class EmployeeController extends Controller
{
    public function index()
    {
        return Employee::paginate(10);
    }

    public function store(EmployeeRequest $request)
    {
        error_log("request".$request);
        return Employee::create($request->validated());
    }

    public function show(Employee $employee)
    {
        return $employee;
    }

    public function update(EmployeeRequest $request, Employee $employee)
    {
        $employee->update($request->validated());
        return $employee;
    }

    public function destroy(Employee $employee)
    {
        $employee->delete();
        return response(null, 204);
    }
}
