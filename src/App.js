// import logo from './logo.svg';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Header />
      <Sidebar />
      <Main />
    </div>
  );
}
function Button(props) {
  return (
    <button className={`Button ${props.color} ${props.outline}`}>
      {props.children}
    </button>
  )
}
function Header() {
  return (
    <div className="Header">
      <div className="Logo">
        <h1>トド リスト</h1>
      </div>
      <div className="Search">
        <input value="Search by name or by tag..." type="text" name="search"></input>
        <Button color="secondary" outline="outline">Search</Button>
      </div>
      <div className="LoginRegister">
        <Button color="blue" outline="outline">Log In</Button>
        <Button color="secondary" outline="outline">Sign Up</Button>
      </div>
    </div>
  )
}

function Main() {
  return (
    <div className="Main">
      <p>texttexttexttexttexttexttexttexttext</p>
    </div>
  );
}
function Sidebar() {
  return (
    <div className="Sidebar">
      <ul>
        <li>Today</li>
        <li>Next 3 days</li>
        <li>Week</li>
        <li>Month</li>
        </ul>
    </div>
  )
}
export default App;
