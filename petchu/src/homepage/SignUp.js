import React from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
axios.defaults.withCredentials = true;
class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //회원 정보 가져오기
      email: "",
      password: "",
      passwordcheck: "",
      username: "",
      nickname: "",
      errormessage: "",
      alertemail: "",
      alertpassword: "",
    };
    this.clickSignUp = this.clickSignUp.bind(this);
    this.handleInputvalue = this.handleInputvalue.bind(this);
  }

  handleInputvalue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };

  //   checkEmail = () => {
  //     const { email } = this.state;
  //     axios
  //       .post("http://localhost:8001/user/signup/checkid", {
  //         email: email,
  //       })
  //       .then((res) => {
  //         if (res.status === 200) {
  //           return this.setState({
  //             alertemail: "사용 가능한 이메일 입니다.",
  //           });
  //         } else {
  //           return this.setState({
  //             alertemail: "이미 사용중인 이메일 입니다.",
  //           });
  //         }
  //       });
  //   };
  //어떻게 같은지 다른지 확인할 것인가
  //   checkPasswordAndPassword = () => {
  //     const { password, passwordcheck } = this.state;
  //     if (password !== passwordcheck) {
  //       return this.setState({
  //         alertpassword: "비밀번호가 일치하지 않습니다.",
  //       });
  //     } else if (password === passwordcheck) {
  //       return this.setState({
  //         alertpassword: "사용가능한 비밀번호 입니다.",
  //       });
  //     }
  //   };

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    const { email, password, passwordcheck, username, nickname } = this.state;
    if (!email) {
      this.setState({ errorMessage: "Email 을 확인해주세요" });
    } else if (!password) {
      this.setState({ errorMessage: "password 을 확인해주세요" });
    } else if (!passwordcheck) {
      this.setState({ errorMessage: "check password 을 확인해주세요" });
    } else if (password !== passwordcheck) {
      this.setState({ errorMessage: "비밀번호가 일치하지 않습니다." });
    } else if (!username) {
      this.setState({ errorMessage: "username 을 확인해주세요" });
    } else if (!nickname) {
      this.setState({ errorMessage: "nickname 을 확인해주세요" });
    } else {
      this.setState({ errorMessage: "" });
    }
  }

  clickSignUp = async () => {
    await axios
      .post("http://localhost:8001/user/signup", {
        email: this.state.email,
        password: this.state.password,
        username: this.state.username,
        nickname: this.state.nickname,
      })
      .then((res) => {
        window.location = "/signin";
      })
      .catch((err) => console.error(err.statusText));
  };
  render() {
    return (
      <div>
        <center>
          <h1>회원가입</h1>
        </center>
        <Link to="signup"></Link>
        <div>
          <TextField id="standard-basic" label="username"
            input type="input-text"
            onChange={this.handleInputvalue("username")}
            placeholder="이름을 입력하세요"
          />
        </div>
        <div>
          <TextField id="standard-basic" label="nickname"
            input type="input-text"
            onChange={this.handleInputvalue("nickname")}
            placeholder="별명을 입력하세요"
          />
        </div>
        <div>
          <TextField id="standard-basic" label="email"
            input type="email"
            onChange={this.handleInputvalue("email")}
            placeholder="이메일을 입력하세요"
          />

          <div>{this.state.alertemail}</div>
          <div>
            <TextField id="standard-basic" label="password"
              input type="password"
              onChange={this.handleInputvalue("password")}
              placeholder="비밀번호를 입력하세요"
            />

          </div>
        </div>
        <TextField id="standard-basic" label="check password"
          input type="password"
          onChange={this.handleInputvalue("passwordcheck")}
          placeholder="비밀번호를 입력하세요"
        />

        <div>{this.state.alertpassword}</div>
        <Button onClick={this.clickSignUp}>회원가입완료 </Button>


        <div className="alert-box">{this.state.errorMessage}</div>
      </div>
    );
  }
}
export default withRouter(SignUp);
