import React, {useState, useEffect} from 'react';
import S from 'styled-components';
import { withFormik, Form, Field } from 'formik';
import * as Yup from "yup";
import axios from "axios";

const FormikForm = ({ values, handleChange, errors, touched,status }) => {
    const [users, setUsers] = useState([]);

    useEffect( () => {
        status && setUsers(users => [...users, status])
    },[status]);
    return (
        <StyledFormContainer>
        {users.map( (user) => {
            console.log(user)
            return(
                <div>{user}</div>
            );
        })}
            <StyledFormikForm>
            <StyledLabel>Name
                <FormikField
                    type="text"
                    name="name"
                    placeholder="full name"
                    value={values.name}
                />
                </StyledLabel>
                {touched.name && errors.name && <p>{errors.name}</p>}
                <StyledLabel>Email
                <FormikField
                    type="email"
                    name="email"
                    placeholder="email"
                    value={values.email}
                />
                </StyledLabel>
                {touched.email && errors.email && <p>{errors.email}</p>}
                <StyledLabel>Password
                <FormikField
                    type="password"
                    name="password"
                    placeholder="password"
                    value={values.password}
                />
                </StyledLabel>
                {touched.password && errors.password && <p>{errors.password}</p>}
                <StyledLabel>Terms of agreement
                <input
                    type="checkbox"
                    name="terms"
                    onChange={handleChange}
                    value={values.terms}
                />
                </StyledLabel>
                {touched.terms && errors.terms && <p>{errors.terms}</p>}
                <StyledButton type="submit">Submit</StyledButton>
            </StyledFormikForm>
        </StyledFormContainer>
    );
}


const UserForm = withFormik({
    mapPropsToValues({ name, email, password, terms, users }) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            terms: terms || false,
            users: [users] || []
        }
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required("Please enter your name"),
        email: Yup.string().required("Please enter a valid email address"),
        terms: Yup.boolean().required("Please look over the terms of agreement"),
        password: Yup.string().required("Please enter a password")
      }),

      handleSubmit(values, {setStatus}) {
        axios
          .post("https://reqres.in/api/users/", values)
          .then(res => {
            console.log(res);
            setStatus(res.data.name)
          })
          .catch(err => {
            console.log(err);
          });
      }
})(FormikForm);
export default UserForm;


const StyledFormContainer = S.div`
    width: 100%:
    height: 100%
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background-color: #d6d6d6;
`;
const StyledFormikForm = S(Form)`
    display: flex;
    flex-direction: column;
    width: 500px;
    height: 600px;
    justify-content: space-around;
    border-radius: 25px;
    background-color: cyan;
    padding: 20px;
    align-items: center;
`;
const FormikField = S(Field)`
    font-size: 20px;
    border-none;
    padding: 10px;
    width: 80%;
`;
const StyledLabel = S.label`
    font-size: 16px;
    color: #000;
`;
const StyledButton = S.button`
    font-size: 20px;
    padding: 10px 15px;
    border-radius: 20px;
    background-color: #fff;
    color: #000;
    width: 60%;
    margin: 0 auto;
    border: none;
`;