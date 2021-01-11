import { Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import Controls from '../../components/controls/Controls';
import Form from '../../components/Form';
import useForm from '../../components/useForm';

const initialFValues = {
    fullName : " ",
    id : " ",
    email : " ",
    mobile : " ",
    city : " ",
    gender : " ",
    departmentId : " ",
    hireDate : new Date(),
    isPermanent : " "
};

const genderItems = [
    { id: 'male', title: 'Male' },
    { id: 'female', title: 'Female' },
    { id: 'other', title: 'Other' },
]

const selectItems = [
    { id: 111, title: "Training" },
    { id: 222, title: "Development" },
    { id: 333, title: "Testing" },
    { id: 444, title: "Production" },
    { id: 555, title: "R&D" }
]

function EmployeeForm(props){
    
    const { addOrEdit, recordForEdit } = props;

    const validate = (fieldValues = values)=>{
        const temp = {...errors};
        if("fullName" in fieldValues){
            temp.fullName = fieldValues.fullName?"":"FullName is required";
        }
        if("id" in fieldValues){
            temp.id = fieldValues.id?"":"ID is required";
        }
        if("email" in fieldValues){
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email)?"":"Enter correct email";
        }
        if("mobile" in fieldValues){
            temp.mobile = fieldValues.mobile.length > 9 ? " " : "Minimum 10 numbers required";
        }
        if("city" in fieldValues){
            temp.city = fieldValues.city ? " " : "City is required";
        }
        if("departmentId" in fieldValues){
            temp.departmentId = fieldValues.departmentId ? " " : "Department is required";
        }

        setErrors({...temp});

    };

    const {values,
           setValues,
           errors,
           setErrors,
           handleInputChange,
           resetForm } = useForm(initialFValues,true,validate);

    const handleSubmit = (event)=> {
        event.preventDefault();
        if (validate()) {
            addOrEdit(values, resetForm);
        }
    };

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit]);

    return(
        <Form onSubmit={handleSubmit}>

            <Grid container>

                <Grid item xs={6}>

                    <Controls.Input
                            name="id"
                            label="ID"
                            value={values.id}
                            onChange={handleInputChange}
                            error={errors.id}/>
                    <Controls.Input
                            name="fullName"
                            label="FullName"
                            value={values.fullName}
                            onChange={handleInputChange}
                            error={errors.fullName}/>
                    <Controls.Input
                            name="email"
                            label="Email"
                            value={values.email}
                            onChange={handleInputChange}
                            error={errors.email}/>
                    <Controls.Input
                            name="mobile"
                            label="Mobile"
                            value={values.mobile}
                            onChange={handleInputChange}
                            error={errors.mobile}/>
                    <Controls.Input
                            name="city"
                            label="City"
                            value={values.city}
                            onChange={handleInputChange}
                            error={errors.city}/>

                </Grid>

                <Grid item xs={6}>
                    
                    <Controls.RadioGroup
                        name="gender"
                        label="Gender"
                        value={values.gender}
                        onChange={handleInputChange}
                        items={genderItems}
                    />
                    <Controls.Select
                        name="departmentId"
                        label="Department"
                        value={values.departmentId}
                        onChange={handleInputChange}
                        options={selectItems}
                        error={errors.departmentId}
                    />
                    <Controls.DatePicker
                        name="hireDate"
                        label="Hire Date"
                        value={values.hireDate}
                        onChange={handleInputChange}
                    />
                    <Controls.Checkbox
                        name="isPermanent"
                        label="Permanent Employee"
                        value={values.isPermanent}
                        onChange={handleInputChange}
                    />
                    <div>
                        <Controls.Button
                            type="submit"
                            text="Submit" />
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm} />
                    </div>

                </Grid>
            </Grid>

        </Form>
    )
};

export default EmployeeForm;