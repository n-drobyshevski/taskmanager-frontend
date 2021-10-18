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
      <h1>トド リスト</h1>
      <Navbar />
    </div>
  )
}
function Navbar() {
  return (
    <div className="Navbar">
      <div className="Search">
        <div className="Search-field">
          <p>Search by title or tag...</p>
        </div>
        <Button color="secondary" outline="outline">Search</Button>
      </div>
      <div className="Button-group">
        <Button color="secondary" outline="outline">Log In</Button>
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

    </div>
  )
}
export default App;
