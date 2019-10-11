import React, { Component } from "react";

// Import Components
import CheckBox from "../components/CheckBox";
import Input from "../components/Input";
import TextArea from "../components/TextArea";
import Select from "../components/Select.js";
import Button from "../components/Button";





class FormContainer extends Component {
    constructor(props) {
        super(props);


        this.state = {
            newUser: {
                name: "",
                email: "",
                role: [],
                tagline: "",
            },


            roleOptions: ["Backend Engineer", "Frontend Engineer", "UI/UX Design", "Security Engineer"]
        }
        this.handleTextArea = this.handleTextArea.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handleFullName = this.handleFullName.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleClearForm = this.handleClearForm.bind(this);
        this.handleCheckBox = this.handleCheckBox.bind(this);
        this.handleImput = this.handleInput.bind(this);

    }


    handleFullName(e) {
        const value = e.target.value;
        this.setState(
            prevState => ({
                newUser: {
                    ...prevState.newUser,
                    name: value
                }
            }),
            () => console.log(this.state.newUser)
        );
    }

    handleEmail(e) {
        const value = e.target.value;
        this.setState(
            prevState => ({
                newUser: {
                    ...prevState.newUser,
                    email: value
                }
            }),
            () => console.log(this.state.newUser)
        );
    }

    handleInput(e) {
        let value = e.target.value;
        let name = e.target.name;
        this.setState( prevState => {
           return { 
              newUser : {
                       ...prevState.newUser, [name]: value
                      }
           }
        }, () => console.log(this.state.newUser)
        )
    }

    handleTextArea(e) {
        console.log("Inside handletextArea");
        const value = e.target.value;
        this.setState(
            prevState => ({
                newUser: {
                    ...prevState.newUser,
                    tagline: value
                }
            }),
            () => console.log(this.state.newUser)
        );
    }


    handleCheckBox(e) {
        const newSelection = e.target.value;
        let newSelectionArray

        if (this.state.newUser.role.indexOf(newSelection) > -1) {
            newSelectionArray = this.state.newUser.role.filter(
                r => r !== newSelection
            );
        } else {
            newSelectionArray = [...this.state.newUser.role, newSelection];
        }

        this.setState(prevState => ({
            newUser: {...prevState.newUser, role: newSelectionArray }
        }));
    }

    handleFormSubmit(e) {
        e.preventDefault();
        const userData = this.state.newUser;
        // this.setState({ submitted: true })
        // alert(this.state.name + ' was submitted');
    

 

        fetch("https://user-onboard.herokuapp.com/users/register", {
            method: "Post",
            body: JSON.stringify(userData),
            headers: {
                Accept: "application/json",
                "content-Type": "application/json"
            }
        }).then(response => {
            response.json().then(data => {
                console.log(data);
            });
        });
    }

    handleClearForm(e) {
        e.preventDefault();
        this.setState({
            newUser: {
                name: "",
                email: "",
                role: [],
                tagline: ""

            }
        });
    }

    // renderUserInfo() {
    //     return <UserInfo name={this.state.name} />
    // }

    render() {
        return (
          <form className="container-fluid" onSubmit={this.handleFormSubmit}>
            <Input
              inputtype={"text"}
              title={"Full Name"}
              name={"name"}
              value={this.state.newUser.name}
              placeholder={"Enter your name"}
              handleChange={this.handleFullName}
            />{" "}
            {/* Name of the user */}
            <Input
              inputtype={"text"}
              name={"email"}
              title={"Email"}
              value={this.state.newUser.age}
              placeholder={"Enter your email"}
              handleChange={this.handleEmail}
            />{" "}
            {/* Email */}
            
            {/* Role Selection */}
            <CheckBox
              title={"Role"}
              name={"role"}
              options={this.state.roleOptions}
              selectedOptions={this.state.newUser.role}
              handleChange={this.handleCheckBox}
            />{" "}
            {/* Tagline */}
            <TextArea
              title={"Tagline."}
              rows={10}
              value={this.state.newUser.tagline}
              name={"currentTagInfo"}
              handleChange={this.handleTextArea}
              placeholder={"Sum yourself up in one line"}
            />
            {/* About you */}
            <Button
              action={this.handleFormSubmit}
              type={"primary"}
              title={"Submit"}
              style={buttonStyle}
            />{" "}
            {/*Submit */}
            <Button
              action={this.handleClearForm}
              type={"secondary"}
              title={"Clear"}
              style={buttonStyle}
            />{" "}
            {/* Clear the form */}
          </form>
        //   {this.state.submitted && this.renderUserInfo()}
        );
      }
    }
    
    const buttonStyle = {
      margin: "10px 10px 10px 10px"
    };
    
    export default FormContainer;

