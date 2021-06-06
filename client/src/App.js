import React, { Component } from 'react';
import './App.css';
import Customer from './components/Customer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {
    minWidth: 1090
  },
  progress: {
    margin: theme.spacing.unit * 2
  }
});

class App extends Component {

  // Component 내에서 변경될 수 있는 부분
  state = {
    customers: "",
    completed: 0 //progress 디폴트값 0부터 시작(범위 : 0 ~ 100)
  }

  //모든 component가 mount 되었을 때 실행되는 부분
  componentDidMount() {
    //0.02초마다 progress함수 실행
    this.time = setInterval(this.progress, 20);
    this.callApi()
      .then(res => this.setState({ customers: res })) //callApi에서 받아온 body를 res로 바꾼후 customers에 담아줌
      .catch(err => console.log(err));
  }

  //비동기적으로 API 불러오기
  callApi = async () => {
    //로컬 주소에 접근
    const response = await fetch('/api/customers');
    //JSON 형식으로 받아오기
    const body = await response.json();
    return body;
  }
  
  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100? 0 : completed + 1 });
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper class={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableCell>번호</TableCell>
            <TableCell>이미지</TableCell>
            <TableCell>이름</TableCell>
            <TableCell>생년월일</TableCell>
            <TableCell>성별</TableCell>
            <TableCell>직업</TableCell>
          </TableHead>
          <TableBody>
            {
              //this.state.customers에는 JSOM 값이 담겨있음.
              this.state.customers ? this.state.customers.map(c => {
                return (
                  <Customer key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} />
                )
              }) : 
              <TableRow>
                <TableCell colSpan="6" align="center">
                  <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed}/>
                </TableCell>
              </TableRow>
            }
          </TableBody>
        </Table>
      </Paper>
    );
  }

}

export default withStyles(styles)(App);
