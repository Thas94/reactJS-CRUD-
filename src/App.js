import React, { Component } from 'react';
import {Table,Button,Modal,ModalBody,ModalHeader,ModalFooter,Input,FormGroup,
  Label,Row,Col} from 'reactstrap';
import axios from 'axios';

class App extends Component {
  state = {
    users: [],
    newUserData : {
      UserName :'',
      FirstName : '',
      LastName : '',
      Email : '',
      Password : ''
    },
    newUserModal : false,
    editUserModal : false,
    editUserData : {
      UserName :'',
      FirstName : '',
      LastName : '',
      Email : '',
      Password : '',
      Id : '',
      AccessFailedCount: '',
      EmailConfirmed: '',
      LockoutEnabled: '',
      LockoutEndDateUtc: '',
      PasswordHash: '',
      PhoneNumber: '',
      PhoneNumberConfirmed: '',
      SecurityStamp : '',
      TwoFactorEnabled : ''
    }
    
  }
  componentWillMount()
  {
    this.Refresh()
  }
  
  toggleNewUser()
  {
    this.setState({
      newUserModal: ! this.state.newUserModal
    });
  }

  toggleEditUser()
  {
    this.setState({
      editUserModal: ! this.state.editUserModal
    });
  }

  addUser()
  {
    axios.post('http://localhost:52705/api/User/Register',this.state.newUserData).then((response) => {
      console.log(response.data);

      let {users} = this.state;
      users.push(response.data)
      this.setState({users, newUserModal: false, newUserData : {
        UserName :'',
        FirstName : '',
        LastName : '',
        Email : '',
        Password : ''
      } })
    });
  }

  updateUser()
  {
    axios.put('http://localhost:52705/api/Profile/' + this.state.editUserData.Id, this.state.editUserData).then((response) => {

      this.Refresh()

      this.setState({editUserModal: false, editUserData : {
        UserName :'',
        FirstName : '',
        LastName : '',
        Email : '',
        Password : '',
        Id : '',
        AccessFailedCount: '',
        EmailConfirmed: '',
        LockoutEnabled: '',
        LockoutEndDateUtc: '',
        PasswordHash: '',
        PhoneNumber: '',
        PhoneNumberConfirmed: '',
        SecurityStamp : '',
        TwoFactorEnabled : ''
      } })
    })
  }

  editUser(usr)
  {
    console.log("FGNF",usr)
    this.setState({
      editUserData : usr,
      editUserModal : ! this.state.editUserModal 
    }) 

  }

  Refresh()
  {
    axios.get('http://localhost:52705/api/GetAllUsers').then((response) => {
      this.setState({
        users: response.data
      })
    });
  }

  deleteUser(id)
  {
    axios.delete('http://localhost:52705/api/Profile/' + id).then((response) =>{
      this.Refresh()
    })
  }
  

  render() {
    let user = this.state.users.map((usr) => {
      return  (
        <tr>
        <td scope="row">{usr.UserName}</td>
        <td>{usr.FirstName}</td>
        <td>{usr.LastName}</td>
        <td scope="row">{usr.Password}</td>
        <td>{usr.Email}</td>
        <Button color="outline-success" className="mr-2" onClick={this.editUser.bind(this,usr)}>Edit</Button>
        <Button color="outline-danger" onClick={this.deleteUser.bind(this,usr.Id)}>Delete</Button>
      </tr>
      )
    });
    return (
      
      <div className="App Container">

      <h1>User Application</h1>
      <Button className="my-4" color="primary" block onClick={this.toggleNewUser.bind(this)}>Add a new User</Button>
        <Modal isOpen={this.state.newUserModal} toggle={this.toggleNewUser.bind(this)}>
          <ModalHeader toggle={this.toggleNewUser.bind(this)}>Modal title</ModalHeader>
          <ModalBody>
          <FormGroup>
            <Label >User Name</Label>
            <Input id="usname" placeholder="Thas_11" value={this.state.newUserData.UserName} onChange={(e) => {
              let { newUserData} = this.state;
              newUserData.UserName = e.target.value;
              this.setState({newUserData})
            }}/>
        </FormGroup>
          <Row form>
          <Col md={6}>
            <FormGroup>
              <Label >First Name</Label>
              <Input type="text" name="fname" id="fname" placeholder="Thabiso"value={this.state.newUserData.FirstName} onChange={(e) => {
              let { newUserData} = this.state;
              newUserData.FirstName = e.target.value;
              this.setState({newUserData})
            }}/>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label >Last Name</Label>
              <Input type="text" name="lname" id="lname" placeholder="Malematja" value={this.state.newUserData.LastName} onChange={(e) => {
              let { newUserData} = this.state;
              newUserData.LastName = e.target.value;
              this.setState({newUserData})
            }}/>
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label>Email</Label>
              <Input type="email" name="email" id="Email" placeholder="Thas@gmail.com" value={this.state.newUserData.Email} onChange={(e) => {
              let { newUserData} = this.state;
              newUserData.Email = e.target.value;
              this.setState({newUserData})
            }}/>
            </FormGroup>
          </Col>
          <Col md={6}> 
            <FormGroup>
              <Label>Password</Label>
              <Input type="password" name="password" id="Password" placeholder="thas_11" value={this.state.newUserData.Password} onChange={(e) => {
              let { newUserData} = this.state;
              newUserData.Password = e.target.value;
              this.setState({newUserData})
            }}/>
            </FormGroup>
          </Col>
        </Row>
           </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.addUser.bind(this)}>Add User</Button>{' '}
            <Button color="secondary" onClick={this.toggleNewUser.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>
        

        
        <Modal isOpen={this.state.editUserModal} toggle={this.toggleEditUser.bind(this)}>
          <ModalHeader toggle={this.toggleEditUser.bind(this)}>Modal title</ModalHeader>
          <ModalBody>
          <FormGroup>
            <Label >User Name</Label>
            <Input id="usname" placeholder="Thas_11" value={this.state.editUserData.UserName} onChange={(e) => {
              let { editUserData} = this.state;
              editUserData.UserName = e.target.value;
              this.setState({editUserData})
            }}/>
        </FormGroup>
          <Row form>
          <Col md={6}>
            <FormGroup>
              <Label >First Name</Label>
              <Input type="text" name="fname" id="fname" placeholder="Thabiso"value={this.state.editUserData.FirstName} onChange={(e) => {
              let { editUserData} = this.state;
              editUserData.FirstName = e.target.value;
              this.setState({editUserData})
            }}/>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label >Last Name</Label>
              <Input type="text" name="lname" id="lname" placeholder="Malematja" value={this.state.editUserData.LastName} onChange={(e) => {
              let { editUserData} = this.state;
              editUserData.LastName = e.target.value;
              this.setState({editUserData})
            }}/>
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label>Email</Label>
              <Input type="email" name="email" id="Email" placeholder="Thas@gmail.com" value={this.state.editUserData.Email} onChange={(e) => {
              let { editUserData} = this.state;
              editUserData.Email = e.target.value;
              this.setState({editUserData})
            }}/>
            </FormGroup>
          </Col>
          <Col md={6}> 
            <FormGroup>
              <Label>Password</Label>
              <Input type="password" name="password" id="Password" placeholder="thas_11" value={this.state.editUserData.Password} onChange={(e) => {
              let { editUserData} = this.state;
              editUserData.Password = e.target.value;
              this.setState({editUserData})
            }}/>
            </FormGroup>
          </Col>
        </Row>
           </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.updateUser.bind(this)}>Update User</Button>
            <Button color="secondary" onClick={this.toggleEditUser.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>

        <Table>
          
        <thead>
          <tr>
            <th>User Name</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Password</th>
            <th>Email Address</th>
          </tr>
        </thead>
        <tbody>
        {user}
        </tbody>
      </Table>
      </div>
    );
  }
}

export default App;
