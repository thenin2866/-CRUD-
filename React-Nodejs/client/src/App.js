import Axios from 'axios'
import { useState } from 'react'

function App() {

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [newage, setNewAge] = useState("");


  const [userList, setUserList] = useState([]);

  const getUsers = () => {
    Axios.get('http://localhost:3001/user').then((response) => {
      setUserList(response.data);
    });
  }


  const addUser = () => {
    Axios.post('http://localhost:3001/add', {
      name: name,
      age: age
    }).then(() => {
      setUserList([
        ...userList,
        {
          name: name,
          age: age
        }
      ])
    })
  }

  const updateUserAge = (id) => {
    Axios.put("http://localhost:3001/edit", { age: newage, id: id }).then((response) => {
      setUserList(
        userList.map((val) => {
          return val.id == id ? {
            id: val.id,
            name: val.name,
            age: newage,
          } : val;
        })
      )
    })
  }


  const deleteUser = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setUserList(
        userList.filter((val) => {
          return val.id != id;
        })
      )
    })
  }
  return (
    <div className="App container-fluid bg-dark text-white">
      <h1>User information</h1>
      <div className="informaiton">
        <form action="">

          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter name"
              onChange={(event) => {
                setName(event.target.value)
              }}   ></input>
          </div>

          <div className="mb-3">
            <label htmlFor="age" className="form-label">
              Age:
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter age"
              onChange={(event) => {
                setAge(event.target.value)
              }}></input>
          </div>
          <button className="btn btn-success" onClick={addUser}>Add user</button>
        </form>
      </div>
      <hr />
      <div className="users">
        <button className="btn btn-primary mb-3" onClick={getUsers}>Show users</button>

        {userList.map((val, key) => {
          return (
            <div className="user card bg-secondary my-3">
              <div className="card-body text-left">
                <p className="card-text">Name: {val.name}</p>
                <p className="card-text">Age: {val.age}</p>
                <div className="d-flex">
                  <input
                    type="text"
                    placeholder='Update your age here'
                    className='form-control'
                    style={{ width: "300px" }}
                    onChange={(event) => {
                      setNewAge(event.target.value)
                    }}
                  />
                  <button className="btn btn-warning mx-2" onClick={() => { updateUserAge(val.id) }}>Update</button>
                  <button className="btn btn-danger" onClick={() => { deleteUser(val.id) }}>Delete</button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
