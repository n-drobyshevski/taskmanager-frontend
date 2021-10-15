// import logo from './logo.svg';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Header />
      <Content />
    </div>
  );
}
function Button(props){
  return(
    <button className={`Button ${props.color} ${props.outline}`}>
      {props.children}
    </button>
  )
}
function Header(){
  return(
    <div className="Header">
      <h1>トド リスト</h1>
      <Navbar />
    </div>
  )
}
function Navbar(){
  return(
    <div className="Search"> 
      <div className="Search-field">
        <p>Search by title or tag...</p>
      </div>
      <Button color="dark" outline="outline">Search</Button>
    </div>
  )
}

function Content(){
  return(<div className="Content">
    <Sidebar />
    <Main />
    </div>)
}
function Main(){
  return(
    <div className="Main">  
      <p>texttexttexttexttexttexttexttexttext</p>
    </div>
  );
}
function Sidebar(){
  return(
    <div className="Sidebar">
      
      </div>
  )
}
export default App;
