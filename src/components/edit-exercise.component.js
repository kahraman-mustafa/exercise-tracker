import React, {Component} from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class EditExercise extends Component {

  constructor(props){
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      descripton: '',
      duration: 0,
      date: new Date(),
      users: []
    } 

    console.log(props);
  }

  componentDidMount() {
    
    axios.get("http://localhost:5000/exercises/"+this.props.match.params.id)
      .then(res => {
        this.setState({
          username: res.data.username,
          description: res.data.description,
          duration: res.data.duration,
          date: new Date(res.data.date)
        })
      })
      .catch(error => console.log(error))

    axios.get("http://localhost:5000/users/")
      .then(res => {
        if(res.data.length > 0) {
          this.setState({
            users: res.data.map(user => user.username)
          })
        }
      })
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      descripton: e.target.value
    })
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    })
  }

  onChangeDate(date) {
    console.log(date.toISOString());
    this.setState({
      date
    })
  }

  onSubmit(e) {
    e.preventDefault();
    
    const exercise = {
      username: this.state.username,
      descripton: this.state.descripton,
      duration: this.state.duration,
      date: new Date("2022-01-05T19:07:36.993+00:00")
    }
    
    console.log(exercise);

    axios.post("http://localhost:5000/exercises/update"+this.props.match.params.id, exercise)
      .then(res => console.log(res.data));
    
    this.setState((curState) => ({
      username: curState.users[0],
      descripton: '',
      duration: 0,
      date: new Date()
    }))
    //window.location = "/";
  }

  render() {
    return(
        <div>
          <h3>Edit Exercise Log</h3>
          <form onSubmit={this.onSubmit}>

            <div className="form-group">
              <label>Username: </label>
              <select ref="userInput" required className="form-control" value={this.state.username} onChange={this.onChangeUsername}>
                {
                  this.state.users.map((user) => {
                    return <option key={user} value={user}>{user}</option>;
                  })
                }
              </select>
            </div>

            <div className="form-group">
              <label>Description: </label>
              <input type="text" required className="form-control" value={this.state.descripton} onChange={this.onChangeDescription} />
            </div>

            <div className="form-group">
              <label>Duration (in minutes): </label>
              <input type="text" required className="form-control" value={this.state.duration} onChange={this.onChangeDuration} />
            </div>

            <div className="form-group">
              <label>Date: </label>
              <div>
                <DatePicker selected={this.state.date} onChange={this.onChangeDate}/>
              </div>
            </div>

            <div className="form-group">
              <input type="submit" className="btn btn-primary" value="Edit Exercise Log" />
            </div>
          </form>
        </div>
    );
  }

}

export default EditExercise;