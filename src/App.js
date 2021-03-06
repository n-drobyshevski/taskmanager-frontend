// import logo from './logo.svg';
import './App.scss';
import { useState, useEffect, useRef } from 'react';

function App() {
  const [logged, setLogged] = useState(false);
  const [logOutActive, setLogOutActive] = useState(false);
  const [logInActive, setLogInActive] = useState(false);
  const [signUpActive, setSignUpActive] = useState(false);
  const [profileActive, setProfileActive] = useState(false);
  const [profileEditActive, setProfileEditActive] = useState(false);
  const [passwordEditActive, setPasswordEditActive] = useState(false);
  return (
    <div className="App">
      <Header logged={logged} LogInClick={() => setLogInActive(true)} profileClick={() => setProfileActive(true)} LogOutClick={() => setLogOutActive(true)} SignUpClick={() => setSignUpActive(true)} />
      <Sidebar />
      <Main />
      {logOutActive && <LogOut onLogOut={() => { setLogged(false); setLogOutActive(false); }} closeLogOut={() => setLogOutActive(false)}></LogOut>}
      {logInActive && <LogIn signUpCall={() => { setLogInActive(false); setSignUpActive(true); }} onLogIn={() => { setLogged(true); setLogInActive(false); }} closeLogIn={() => setLogInActive(false)}></LogIn>}
      {signUpActive && <SignUp logInCall={() => { setSignUpActive(false); setLogInActive(true); }} onSignUp={() => { setLogged(true); setSignUpActive(false);}} closeSignUp={() => setSignUpActive(false)}></SignUp>}
      {profileActive && <Profile onPasswordEditClick={()=>{setProfileActive(false);setPasswordEditActive(true)}} onEditClick={()=>{setProfileActive(false);console.log('edit click');setProfileEditActive(true);}}  closeProfile={() => setProfileActive(false)}></Profile>}
      {profileEditActive && <ProfileEdit  onProfileEditSubmit={()=>{setProfileEditActive(false);setProfileActive(true)}} onEditClick={()=>{setProfileActive(false);}} closeProfileEdit={() => {setProfileEditActive(false);setProfileActive(true)}}></ProfileEdit>}
      {passwordEditActive && <PasswordEdit onPasswordEditSubmit={()=>{setPasswordEditActive(false);setProfileActive(true)}} closePasswordEdit={() => {setPasswordEditActive(false);setProfileActive(true)}}></PasswordEdit>}

    </div>
  );
}
function Button(props) {
  const buttonRef = useRef(null);
  function click() {
    props.onClick(buttonRef.current);
  }
  return (
    <button className={`Button ${props.color}`} ref={buttonRef} onClick={click} type={props.type} >
      {props.children}
    </button>
  )
}

function Header(props) {
  function onLogInClick(ref) {
    if (ref.parentElement.className === 'Nav') {
      props.LogInClick();
    }
  }
  function onSignUpClick(ref) {
    if (ref.parentElement.className === 'Nav') {
      props.SignUpClick();
    }
  }
  function onLogOutClick(ref) {
    if (ref.parentElement.className === 'Nav') {
      props.LogOutClick();
    }
  }
  function onProfileClick(ref) {
    if (ref.parentElement.className === 'Nav') {
      props.profileClick();
    }
  }
  return (
    <div className="Header">
      <div className="Logo">
        <h1>?????? ?????????</h1>
      </div>
      <div className="Search">
        <form onSubmit={() => console.log('OnSubmit {Header}')} role="search">
          <input id="search" type="search" placeholder="Search..." autoFocus required />
          <Button onClick={() => { }} color='secondary' type="submit">Search</Button>
        </form>
      </div>
      {props.logged ?
        <div className="Nav">
          <Button color="primary-outline" onClick={onProfileClick}>Profile</Button>
          <Button color="red-outline" onClick={onLogOutClick}>Log Out</Button>
        </div>
        :
        <div className="Nav">
          <Button color="primary-outline" onClick={onLogInClick}>Log In</Button>
          <Button color="secondary-outline" onClick={onSignUpClick}>Sign Up</Button>
        </div>
      }
    </div>
  )
}

function RecordCard(props) {
  let [finished, setFinished] = useState(false);
  return (
    <div className="RecordCard">
      <div className="CheckContainer">
        <button className={finished ? "check clicked" : "check"} onClick={() => setFinished(!finished)}>
          <svg width="18px" height="18px" viewBox="0 0 18 18">
            <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
            <polyline points="1 9 7 14 15 4"></polyline>
          </svg>
        </button>
      </div>
      <div className="CardContainer">
        <div className="CardHeader">
          <p>{props.title}</p>
          <svg width="20" height="6" viewBox="0 0 20 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M2.5 5.25C1.90326 5.25 1.33097 5.01295 0.90901 4.59099C0.487053 4.16903 0.25 3.59674 0.25 3C0.25 2.40326 0.487053 1.83097 0.90901 1.40901C1.33097 0.987053 1.90326 0.75 2.5 0.75C3.09674 0.75 3.66903 0.987053 4.09099 1.40901C4.51295 1.83097 4.75 2.40326 4.75 3C4.75 3.59674 4.51295 4.16903 4.09099 4.59099C3.66903 5.01295 3.09674 5.25 2.5 5.25ZM10 5.25C9.40326 5.25 8.83097 5.01295 8.40901 4.59099C7.98705 4.16903 7.75 3.59674 7.75 3C7.75 2.40326 7.98705 1.83097 8.40901 1.40901C8.83097 0.987053 9.40326 0.75 10 0.75C10.5967 0.75 11.169 0.987053 11.591 1.40901C12.0129 1.83097 12.25 2.40326 12.25 3C12.25 3.59674 12.0129 4.16903 11.591 4.59099C11.169 5.01295 10.5967 5.25 10 5.25ZM17.5 5.25C16.9033 5.25 16.331 5.01295 15.909 4.59099C15.4871 4.16903 15.25 3.59674 15.25 3C15.25 2.40326 15.4871 1.83097 15.909 1.40901C16.331 0.987053 16.9033 0.75 17.5 0.75C18.0967 0.75 18.669 0.987053 19.091 1.40901C19.5129 1.83097 19.75 2.40326 19.75 3C19.75 3.59674 19.5129 4.16903 19.091 4.59099C18.669 5.01295 18.0967 5.25 17.5 5.25Z"
              fill='#00000099' />
          </svg>
        </div>
        <p>{props.text}</p>
      </div>
    </div>
  )
}

function Main() {
  return (
    <div className="Main">
      <p className="Label">Today</p>
      <div className="MainContent">
        <div className="RecordsList">
          <RecordCard title="Card title" id={'1'}
            text=" Some quick example text to build on the card title and make up the bulk of the card's content.">
          </RecordCard>
          <RecordCard title="Card title" id={'2'}
            text=" Some quick example text to build on the card title and make up the bulk of the card's content.">
          </RecordCard>
          <RecordCard title="Card title" id={'3'}
            text=" Some quick example text to build on the card title and make up the bulk of the card's content. 
          Some quick example text to build on the card title and make up the bulk of the card's content.
          Some quick example text to build on the card title and make up the bulk of the card's content.">
          </RecordCard>
          <RecordCard title="Card title" id={'4'}
            text=" Some quick example text to build on the card title and make up the bulk of the card's content.">
          </RecordCard>
          <RecordCard title="Card title" id={'5'}
            text=" Some quick example text to build on the card title and make up the bulk of the card's content.">
          </RecordCard>
        </div>
      </div>
    </div>
  );
}
function Sidebar() {
  let icons_color = '#00000099';
  // #505d68
  return (
    <div className="Sidebar">
      <ul className="SidebarContent">
        <ListItem className="All"
          // svg={<svg width="17" height="21" viewBox="0 0 17 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          //   <path d="M11.3529 12.4608H5.47056C5.21055 12.4608 4.96118 12.5641 4.77732 12.7479C4.59346 12.9318 4.49017 13.1812 4.49017 13.4412C4.49017 13.7012 4.59346 13.9506 4.77732 14.1344C4.96118 14.3183 5.21055 14.4216 5.47056 14.4216H11.3529C11.6129 14.4216 11.8623 14.3183 12.0462 14.1344C12.23 13.9506 12.3333 13.7012 12.3333 13.4412C12.3333 13.1812 12.23 12.9318 12.0462 12.7479C11.8623 12.5641 11.6129 12.4608 11.3529 12.4608ZM11.3529 8.53921H7.43135C7.17133 8.53921 6.92197 8.6425 6.73811 8.82636C6.55425 9.01022 6.45096 9.25959 6.45096 9.51961C6.45096 9.77962 6.55425 10.029 6.73811 10.2128C6.92197 10.3967 7.17133 10.5 7.43135 10.5H11.3529C11.6129 10.5 11.8623 10.3967 12.0462 10.2128C12.23 10.029 12.3333 9.77962 12.3333 9.51961C12.3333 9.25959 12.23 9.01022 12.0462 8.82636C11.8623 8.6425 11.6129 8.53921 11.3529 8.53921ZM13.3137 2.65686H12.1568C11.9546 2.08475 11.5803 1.58921 11.0853 1.23817C10.5904 0.887133 9.99894 0.697781 9.39213 0.696075H7.43135C6.82454 0.697781 6.23311 0.887133 5.73815 1.23817C5.24318 1.58921 4.86891 2.08475 4.66664 2.65686H3.50978C2.72973 2.65686 1.98163 2.96673 1.43005 3.51831C0.878477 4.06989 0.568604 4.81799 0.568604 5.59804V17.3627C0.568604 18.1428 0.878477 18.8909 1.43005 19.4425C1.98163 19.994 2.72973 20.3039 3.50978 20.3039H13.3137C14.0937 20.3039 14.8418 19.994 15.3934 19.4425C15.945 18.8909 16.2549 18.1428 16.2549 17.3627V5.59804C16.2549 4.81799 15.945 4.06989 15.3934 3.51831C14.8418 2.96673 14.0937 2.65686 13.3137 2.65686ZM6.45096 3.63725C6.45096 3.37724 6.55425 3.12787 6.73811 2.94401C6.92197 2.76015 7.17133 2.65686 7.43135 2.65686H9.39213C9.65215 2.65686 9.90151 2.76015 10.0854 2.94401C10.2692 3.12787 10.3725 3.37724 10.3725 3.63725V4.61764H6.45096V3.63725ZM14.2941 17.3627C14.2941 17.6228 14.1908 17.8721 14.0069 18.056C13.8231 18.2398 13.5737 18.3431 13.3137 18.3431H3.50978C3.24976 18.3431 3.0004 18.2398 2.81654 18.056C2.63268 17.8721 2.52939 17.6228 2.52939 17.3627V5.59804C2.52939 5.33802 2.63268 5.08865 2.81654 4.9048C3.0004 4.72094 3.24976 4.61764 3.50978 4.61764H4.49017V5.59804C4.49017 5.85805 4.59346 6.10742 4.77732 6.29128C4.96118 6.47514 5.21055 6.57843 5.47056 6.57843H11.3529C11.6129 6.57843 11.8623 6.47514 12.0462 6.29128C12.23 6.10742 12.3333 5.85805 12.3333 5.59804V4.61764H13.3137C13.5737 4.61764 13.8231 4.72094 14.0069 4.9048C14.1908 5.08865 14.2941 5.33802 14.2941 5.59804V17.3627Z" fill="#2C3E50" />
          // </svg>} 
          text="All records" />

        <Accordion label="Time">
          <ListItem text="Today" svg={<svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 0.5H1C0.734784 0.5 0.48043 0.605357 0.292893 0.792893C0.105357 0.98043 0 1.23478 0 1.5V19.5C0 19.7652 0.105357 20.0196 0.292893 20.2071C0.48043 20.3946 0.734784 20.5 1 20.5H19C19.2652 20.5 19.5196 20.3946 19.7071 20.2071C19.8946 20.0196 20 19.7652 20 19.5V1.5C20 1.23478 19.8946 0.98043 19.7071 0.792893C19.5196 0.605357 19.2652 0.5 19 0.5ZM18 18.5H2V8.5H18V18.5ZM18 6.5H2V2.5H18V6.5Z" fill={icons_color} />
          </svg>} />
          <ListItem text="Next 3 days" svg={<svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 0.5H1C0.734784 0.5 0.48043 0.605357 0.292893 0.792893C0.105357 0.98043 0 1.23478 0 1.5V19.5C0 19.7652 0.105357 20.0196 0.292893 20.2071C0.48043 20.3946 0.734784 20.5 1 20.5H19C19.2652 20.5 19.5196 20.3946 19.7071 20.2071C19.8946 20.0196 20 19.7652 20 19.5V1.5C20 1.23478 19.8946 0.98043 19.7071 0.792893C19.5196 0.605357 19.2652 0.5 19 0.5ZM6 18.5H2V8.5H6V18.5ZM12 18.5H8V8.5H12V18.5ZM18 18.5H14V8.5H18V18.5ZM18 6.5H2V2.5H18V6.5Z" fill={icons_color} />
          </svg>} />
          <ListItem text="Week" svg={<svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 0.5H1C0.734784 0.5 0.48043 0.605357 0.292893 0.792893C0.105357 0.98043 0 1.23478 0 1.5V19.5C0 19.7652 0.105357 20.0196 0.292893 20.2071C0.48043 20.3946 0.734784 20.5 1 20.5H19C19.2652 20.5 19.5196 20.3946 19.7071 20.2071C19.8946 20.0196 20 19.7652 20 19.5V1.5C20 1.23478 19.8946 0.98043 19.7071 0.792893C19.5196 0.605357 19.2652 0.5 19 0.5ZM9 18.5H2V14.5H9V18.5ZM9 12.5H2V8.5H9V12.5ZM18 18.5H11V14.5H18V18.5ZM18 12.5H11V8.5H18V12.5ZM18 6.5H2V2.5H18V6.5Z" fill={icons_color} />
          </svg>} />
          <ListItem text="Month" svg={<svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 17.1383C10.1978 17.1383 10.3911 17.0824 10.5556 16.9775C10.72 16.8726 10.8482 16.7235 10.9239 16.5491C10.9996 16.3747 11.0194 16.1827 10.9808 15.9976C10.9422 15.8124 10.847 15.6423 10.7071 15.5088C10.5673 15.3753 10.3891 15.2844 10.1951 15.2476C10.0011 15.2108 9.80004 15.2297 9.61732 15.3019C9.43459 15.3742 9.27841 15.4965 9.16853 15.6535C9.05865 15.8105 9 15.995 9 16.1838C9 16.437 9.10536 16.6798 9.29289 16.8588C9.48043 17.0378 9.73478 17.1383 10 17.1383ZM15 17.1383C15.1978 17.1383 15.3911 17.0824 15.5556 16.9775C15.72 16.8726 15.8482 16.7235 15.9239 16.5491C15.9996 16.3747 16.0194 16.1827 15.9808 15.9976C15.9422 15.8124 15.847 15.6423 15.7071 15.5088C15.5673 15.3753 15.3891 15.2844 15.1951 15.2476C15.0011 15.2108 14.8 15.2297 14.6173 15.3019C14.4346 15.3742 14.2784 15.4965 14.1685 15.6535C14.0586 15.8105 14 15.995 14 16.1838C14 16.437 14.1054 16.6798 14.2929 16.8588C14.4804 17.0378 14.7348 17.1383 15 17.1383ZM15 13.3202C15.1978 13.3202 15.3911 13.2642 15.5556 13.1593C15.72 13.0544 15.8482 12.9053 15.9239 12.7309C15.9996 12.5565 16.0194 12.3646 15.9808 12.1794C15.9422 11.9942 15.847 11.8241 15.7071 11.6907C15.5673 11.5572 15.3891 11.4662 15.1951 11.4294C15.0011 11.3926 14.8 11.4115 14.6173 11.4837C14.4346 11.556 14.2784 11.6783 14.1685 11.8353C14.0586 11.9923 14 12.1768 14 12.3656C14 12.6188 14.1054 12.8616 14.2929 13.0406C14.4804 13.2196 14.7348 13.3202 15 13.3202ZM10 13.3202C10.1978 13.3202 10.3911 13.2642 10.5556 13.1593C10.72 13.0544 10.8482 12.9053 10.9239 12.7309C10.9996 12.5565 11.0194 12.3646 10.9808 12.1794C10.9422 11.9942 10.847 11.8241 10.7071 11.6907C10.5673 11.5572 10.3891 11.4662 10.1951 11.4294C10.0011 11.3926 9.80004 11.4115 9.61732 11.4837C9.43459 11.556 9.27841 11.6783 9.16853 11.8353C9.05865 11.9923 9 12.1768 9 12.3656C9 12.6188 9.10536 12.8616 9.29289 13.0406C9.48043 13.2196 9.73478 13.3202 10 13.3202ZM17 1.86562H16V0.911073C16 0.657912 15.8946 0.41512 15.7071 0.236108C15.5196 0.0570956 15.2652 -0.0434723 15 -0.0434723C14.7348 -0.0434723 14.4804 0.0570956 14.2929 0.236108C14.1054 0.41512 14 0.657912 14 0.911073V1.86562H6V0.911073C6 0.657912 5.89464 0.41512 5.70711 0.236108C5.51957 0.0570956 5.26522 -0.0434723 5 -0.0434723C4.73478 -0.0434723 4.48043 0.0570956 4.29289 0.236108C4.10536 0.41512 4 0.657912 4 0.911073V1.86562H3C2.20435 1.86562 1.44129 2.16732 0.87868 2.70436C0.316071 3.24139 0 3.96977 0 4.72925V18.0929C0 18.8524 0.316071 19.5808 0.87868 20.1178C1.44129 20.6548 2.20435 20.9565 3 20.9565H17C17.7956 20.9565 18.5587 20.6548 19.1213 20.1178C19.6839 19.5808 20 18.8524 20 18.0929V4.72925C20 3.96977 19.6839 3.24139 19.1213 2.70436C18.5587 2.16732 17.7956 1.86562 17 1.86562ZM18 18.0929C18 18.3461 17.8946 18.5888 17.7071 18.7679C17.5196 18.9469 17.2652 19.0474 17 19.0474H3C2.73478 19.0474 2.48043 18.9469 2.29289 18.7679C2.10536 18.5888 2 18.3461 2 18.0929V9.50198H18V18.0929ZM18 7.59289H2V4.72925C2 4.47609 2.10536 4.2333 2.29289 4.05429C2.48043 3.87528 2.73478 3.77471 3 3.77471H4V4.72925C4 4.98242 4.10536 5.22521 4.29289 5.40422C4.48043 5.58323 4.73478 5.6838 5 5.6838C5.26522 5.6838 5.51957 5.58323 5.70711 5.40422C5.89464 5.22521 6 4.98242 6 4.72925V3.77471H14V4.72925C14 4.98242 14.1054 5.22521 14.2929 5.40422C14.4804 5.58323 14.7348 5.6838 15 5.6838C15.2652 5.6838 15.5196 5.58323 15.7071 5.40422C15.8946 5.22521 16 4.98242 16 4.72925V3.77471H17C17.2652 3.77471 17.5196 3.87528 17.7071 4.05429C17.8946 4.2333 18 4.47609 18 4.72925V7.59289ZM5 13.3202C5.19778 13.3202 5.39112 13.2642 5.55557 13.1593C5.72002 13.0544 5.84819 12.9053 5.92388 12.7309C5.99957 12.5565 6.01937 12.3646 5.98079 12.1794C5.9422 11.9942 5.84696 11.8241 5.70711 11.6907C5.56725 11.5572 5.38907 11.4662 5.19509 11.4294C5.00111 11.3926 4.80004 11.4115 4.61732 11.4837C4.43459 11.556 4.27841 11.6783 4.16853 11.8353C4.05865 11.9923 4 12.1768 4 12.3656C4 12.6188 4.10536 12.8616 4.29289 13.0406C4.48043 13.2196 4.73478 13.3202 5 13.3202ZM5 17.1383C5.19778 17.1383 5.39112 17.0824 5.55557 16.9775C5.72002 16.8726 5.84819 16.7235 5.92388 16.5491C5.99957 16.3747 6.01937 16.1827 5.98079 15.9976C5.9422 15.8124 5.84696 15.6423 5.70711 15.5088C5.56725 15.3753 5.38907 15.2844 5.19509 15.2476C5.00111 15.2108 4.80004 15.2297 4.61732 15.3019C4.43459 15.3742 4.27841 15.4965 4.16853 15.6535C4.05865 15.8105 4 15.995 4 16.1838C4 16.437 4.10536 16.6798 4.29289 16.8588C4.48043 17.0378 4.73478 17.1383 5 17.1383Z" fill={icons_color} />
          </svg>} />
        </Accordion>

        <Accordion label="Status">
          <ListItem text="Finished" svg={<svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.72 7.29L8.43001 11.59L6.78 9.94C6.69036 9.83532 6.58004 9.7503 6.45597 9.69027C6.33191 9.63025 6.19678 9.59652 6.05906 9.5912C5.92134 9.58588 5.78401 9.60909 5.65568 9.65936C5.52736 9.70964 5.41081 9.78589 5.31335 9.88335C5.2159 9.9808 5.13964 10.0974 5.08937 10.2257C5.03909 10.354 5.01589 10.4913 5.02121 10.6291C5.02653 10.7668 5.06026 10.9019 5.12028 11.026C5.1803 11.15 5.26532 11.2604 5.37 11.35L7.72 13.71C7.81344 13.8027 7.92426 13.876 8.0461 13.9258C8.16794 13.9755 8.2984 14.0008 8.43001 14C8.69234 13.9989 8.94374 13.8947 9.13 13.71L14.13 8.71C14.2237 8.61704 14.2981 8.50644 14.3489 8.38458C14.3997 8.26272 14.4258 8.13201 14.4258 8C14.4258 7.86799 14.3997 7.73728 14.3489 7.61542C14.2981 7.49356 14.2237 7.38296 14.13 7.29C13.9426 7.10375 13.6892 6.99921 13.425 6.99921C13.1608 6.99921 12.9074 7.10375 12.72 7.29ZM10 0.5C8.02219 0.5 6.08879 1.08649 4.4443 2.1853C2.79981 3.28412 1.51809 4.8459 0.761209 6.67317C0.00433284 8.50043 -0.193701 10.5111 0.192152 12.4509C0.578004 14.3907 1.53041 16.1725 2.92894 17.5711C4.32746 18.9696 6.10929 19.922 8.0491 20.3079C9.98891 20.6937 11.9996 20.4957 13.8268 19.7388C15.6541 18.9819 17.2159 17.7002 18.3147 16.0557C19.4135 14.4112 20 12.4778 20 10.5C20 9.18678 19.7413 7.88642 19.2388 6.67317C18.7363 5.45991 17.9997 4.35752 17.0711 3.42893C16.1425 2.50035 15.0401 1.76375 13.8268 1.2612C12.6136 0.758658 11.3132 0.5 10 0.5ZM10 18.5C8.41775 18.5 6.87104 18.0308 5.55544 17.1518C4.23985 16.2727 3.21447 15.0233 2.60897 13.5615C2.00347 12.0997 1.84504 10.4911 2.15372 8.93928C2.4624 7.38743 3.22433 5.96197 4.34315 4.84315C5.46197 3.72433 6.88743 2.9624 8.43928 2.65372C9.99113 2.34504 11.5997 2.50346 13.0615 3.10896C14.5233 3.71447 15.7727 4.73984 16.6518 6.05544C17.5308 7.37103 18 8.91775 18 10.5C18 12.6217 17.1572 14.6566 15.6569 16.1569C14.1566 17.6571 12.1217 18.5 10 18.5Z" fill={icons_color} />
          </svg>} />
          <ListItem text="In progress" svg={<svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 0.5C8.02219 0.5 6.08879 1.08649 4.4443 2.1853C2.79981 3.28412 1.51809 4.8459 0.761209 6.67317C0.00433284 8.50043 -0.193701 10.5111 0.192152 12.4509C0.578004 14.3907 1.53041 16.1725 2.92894 17.5711C4.32746 18.9696 6.10929 19.922 8.0491 20.3079C9.98891 20.6937 11.9996 20.4957 13.8268 19.7388C15.6541 18.9819 17.2159 17.7002 18.3147 16.0557C19.4135 14.4112 20 12.4778 20 10.5C20 9.18678 19.7413 7.88642 19.2388 6.67317C18.7363 5.45991 17.9997 4.35752 17.0711 3.42893C16.1425 2.50035 15.0401 1.76375 13.8268 1.2612C12.6136 0.758658 11.3132 0.5 10 0.5ZM10 18.5C8.41775 18.5 6.87104 18.0308 5.55544 17.1518C4.23985 16.2727 3.21447 15.0233 2.60897 13.5615C2.00347 12.0997 1.84504 10.4911 2.15372 8.93928C2.4624 7.38743 3.22433 5.96197 4.34315 4.84315C5.46197 3.72433 6.88743 2.9624 8.43928 2.65372C9.99113 2.34504 11.5997 2.50346 13.0615 3.10896C14.5233 3.71447 15.7727 4.73984 16.6518 6.05544C17.5308 7.37103 18 8.91775 18 10.5C18 12.6217 17.1572 14.6566 15.6569 16.1569C14.1566 17.6571 12.1217 18.5 10 18.5ZM10 4.5C9.73479 4.5 9.48043 4.60536 9.2929 4.79289C9.10536 4.98043 9 5.23478 9 5.5V9.92L6.9 11.13C6.70736 11.2392 6.5564 11.4092 6.47078 11.6134C6.38517 11.8176 6.36975 12.0444 6.42695 12.2583C6.48414 12.4722 6.61072 12.6611 6.78682 12.7953C6.96292 12.9296 7.17859 13.0015 7.4 13C7.57518 13.0012 7.7476 12.9564 7.9 12.87L10.5 11.37L10.59 11.28L10.75 11.15C10.7891 11.1005 10.8226 11.0468 10.85 10.99C10.8826 10.9363 10.9094 10.8793 10.93 10.82C10.9572 10.7564 10.9741 10.6889 10.98 10.62L11 10.5V5.5C11 5.23478 10.8946 4.98043 10.7071 4.79289C10.5196 4.60536 10.2652 4.5 10 4.5Z" fill={icons_color} />
          </svg>} />
        </Accordion>

        <Accordion label="Tags">
          <ListItem text="Tag1" svg={<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.00002 4.00002C4.80224 4.00002 4.6089 4.05867 4.44445 4.16855C4.28 4.27843 4.15182 4.43461 4.07614 4.61733C4.00045 4.80006 3.98065 5.00113 4.01923 5.19511C4.05782 5.38909 4.15306 5.56727 4.29291 5.70712C4.43276 5.84698 4.61095 5.94222 4.80493 5.9808C4.99891 6.01939 5.19997 5.99958 5.3827 5.9239C5.56543 5.84821 5.7216 5.72004 5.83149 5.55559C5.94137 5.39114 6.00002 5.1978 6.00002 5.00002C6.00002 4.7348 5.89466 4.48045 5.70712 4.29291C5.51959 4.10537 5.26523 4.00002 5.00002 4.00002ZM19.71 9.78002L10.23 0.320017C10.1368 0.21948 10.0239 0.139192 9.89828 0.0841425C9.7727 0.0290929 9.63713 0.000457809 9.50002 1.67143e-05H3.50002C3.36841 -0.000744179 3.23795 0.0244809 3.11611 0.0742455C2.99427 0.12401 2.88346 0.197335 2.79002 0.290017L0.290017 2.78002C0.197335 2.87346 0.12401 2.98427 0.0742455 3.10611C0.0244809 3.22795 -0.000744179 3.35841 1.67143e-05 3.49002V9.49002C0.0037002 9.75478 0.107283 10.0084 0.290017 10.2L9.78002 19.7C9.97165 19.8828 10.2252 19.9863 10.49 19.99C10.6216 19.9908 10.7521 19.9656 10.8739 19.9158C10.9958 19.866 11.1066 19.7927 11.2 19.7L19.71 11.19C19.8027 11.0966 19.876 10.9858 19.9258 10.8639C19.9756 10.7421 20.0008 10.6116 20 10.48C19.9938 10.2187 19.8904 9.96912 19.71 9.78002V9.78002ZM10.49 17.59L2.00002 9.09002V3.90002L3.90002 2.00002H9.08002L17.58 10.49L10.49 17.59Z" fill={icons_color} />
          </svg>
          } />
          <ListItem text="unotherTag" svg={<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.00002 4.00002C4.80224 4.00002 4.6089 4.05867 4.44445 4.16855C4.28 4.27843 4.15182 4.43461 4.07614 4.61733C4.00045 4.80006 3.98065 5.00113 4.01923 5.19511C4.05782 5.38909 4.15306 5.56727 4.29291 5.70712C4.43276 5.84698 4.61095 5.94222 4.80493 5.9808C4.99891 6.01939 5.19997 5.99958 5.3827 5.9239C5.56543 5.84821 5.7216 5.72004 5.83149 5.55559C5.94137 5.39114 6.00002 5.1978 6.00002 5.00002C6.00002 4.7348 5.89466 4.48045 5.70712 4.29291C5.51959 4.10537 5.26523 4.00002 5.00002 4.00002ZM19.71 9.78002L10.23 0.320017C10.1368 0.21948 10.0239 0.139192 9.89828 0.0841425C9.7727 0.0290929 9.63713 0.000457809 9.50002 1.67143e-05H3.50002C3.36841 -0.000744179 3.23795 0.0244809 3.11611 0.0742455C2.99427 0.12401 2.88346 0.197335 2.79002 0.290017L0.290017 2.78002C0.197335 2.87346 0.12401 2.98427 0.0742455 3.10611C0.0244809 3.22795 -0.000744179 3.35841 1.67143e-05 3.49002V9.49002C0.0037002 9.75478 0.107283 10.0084 0.290017 10.2L9.78002 19.7C9.97165 19.8828 10.2252 19.9863 10.49 19.99C10.6216 19.9908 10.7521 19.9656 10.8739 19.9158C10.9958 19.866 11.1066 19.7927 11.2 19.7L19.71 11.19C19.8027 11.0966 19.876 10.9858 19.9258 10.8639C19.9756 10.7421 20.0008 10.6116 20 10.48C19.9938 10.2187 19.8904 9.96912 19.71 9.78002V9.78002ZM10.49 17.59L2.00002 9.09002V3.90002L3.90002 2.00002H9.08002L17.58 10.49L10.49 17.59Z" fill={icons_color} />
          </svg>
          } />
        </Accordion>

      </ul>
      <div className="CreateButton">
        <Button onClick={() => { }} color="primary">Create new record</Button>
      </div>
    </div>
  )
}
function Accordion(props) {
  let [active, setActive] = useState(false);
  function click() {
    setActive(!active);
  }
  return (
    <li className={active ? "Accordion active" : "Accordion"}>
      <div className="Label" onClick={click}>
        <p>{props.label}</p>
        <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M0.646039 0.646043C0.692485 0.59948 0.747661 0.562537 0.808406 0.53733C0.869151 0.512124 0.934272 0.499149 1.00004 0.499149C1.06581 0.499149 1.13093 0.512124 1.19167 0.53733C1.25242 0.562537 1.30759 0.59948 1.35404 0.646043L7.00004 6.29304L12.646 0.646043C12.6925 0.599555 12.7477 0.562679 12.8085 0.537519C12.8692 0.51236 12.9343 0.499411 13 0.499411C13.0658 0.499411 13.1309 0.51236 13.1916 0.537519C13.2524 0.562679 13.3075 0.599555 13.354 0.646043C13.4005 0.692531 13.4374 0.74772 13.4626 0.808459C13.4877 0.869199 13.5007 0.934299 13.5007 1.00004C13.5007 1.06579 13.4877 1.13089 13.4626 1.19163C13.4374 1.25237 13.4005 1.30756 13.354 1.35404L7.35404 7.35404C7.30759 7.40061 7.25242 7.43755 7.19167 7.46276C7.13093 7.48796 7.06581 7.50094 7.00004 7.50094C6.93427 7.50094 6.86915 7.48796 6.80841 7.46276C6.74766 7.43755 6.69248 7.40061 6.64604 7.35404L0.646039 1.35404C0.599476 1.3076 0.562533 1.25242 0.537327 1.19168C0.51212 1.13093 0.499146 1.06581 0.499146 1.00004C0.499146 0.934276 0.51212 0.869154 0.537327 0.808409C0.562533 0.747664 0.599476 0.692489 0.646039 0.646043V0.646043Z" fill="#00000099" />
        </svg>
      </div>
      <ul className="AccordionContent">
        {props.children}
      </ul>
    </li>
  )
}
function ListItem(props) {
  // let marker = <svg width="6" height="7" viewBox="0 0 6 7" fill="none" xmlns="http://www.w3.org/2000/svg">
  //   <path d="M1 3.5C1 4.60457 1.89543 5.5 3 5.5C4.10457 5.5 5 4.60457 5 3.5C5 2.39543 4.10457 1.5 3 1.5C1.89543 1.5 1 2.39543 1 3.5Z" fill="#3498DB" stroke="#3498DB" strokeWidth="2" />
  // </svg>;
  return (
    <li className={props.className}>
      {props.svg}
      <p>{props.text}</p>
    </li>
  )
}
function LogOut(props) {
  return (
    <div className="LogOut">
      <Modal header="Log out" onClickOutside={() => { props.closeLogOut() }} onCloseClick={() => { props.closeLogOut() }}>
        <div className="ModalContent" >
          <p>You want to Log out?</p>
        </div>
        <div className="Footer">
          <Button type="submit" onClick={() => { props.closeLogOut() }} color="primary-outline" outline='outline'>Cancel</Button>
          <Button type="submit" onClick={() => { props.onLogOut() }} color="red">Log Out</Button>
        </div>
      </Modal>
    </div>
  )
}
function LogIn(props) {
  return (
    <div className="LogIn">
      <Modal label="Log In" onClickOutside={() => { props.closeLogIn() }} >
        <form>
          <label htmlFor="username">Username</label>
          <input id="username" name="username" type="text" autoFocus required></input>
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="text" required></input>
        </form>
        <div className="RegFooter">
          <Button type="submit" onClick={() => { props.onLogIn() }} color="secondary">Log in</Button>
          <p>Don't have one account yet? <span onClick={() => { props.signUpCall(); }}>Sign Up</span></p>
        </div>
      </Modal>
    </div>
  )
}
function SignUp(props) {

  return (
    <div className="SignUp">
      <Modal label="Sign Up" onClickOutside={() => { props.closeSignUp() }} >
        <form>
          <label htmlFor="username">Username</label>
          <input id="username" name="username" type="text" autoFocus required></input>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="text" required></input>
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="text" required></input>
          <label htmlFor="password-confirm">Password confirmation</label>
          <input id="password-confirm" name="password-confirm" type="text" required></input>
        </form>
        <div className="RegFooter">
          <Button type="submit" onClick={() => { props.onSignUp() }} color="secondary">Sign Up</Button>
          <p>Already have one account ? <span onClick={() => { props.logInCall(); }}>Log In</span></p>
        </div>
      </Modal>
    </div>
  )
}

function Profile(props) {
  return (
    <div className="Profile">
      <Modal header="Profile" onClickOutside={() => { props.closeProfile() }} onCloseClick={() => { props.closeProfile() }}>
        <form>
          <span onClick={()=>{props.onEditClick();}}id="edit">Edit</span>
          <label htmlFor="username">Username</label>
          <input defaultValue="User_name" id="username" name="username" type="text" readOnly></input>
          <label htmlFor="email">Email</label>
          <input  defaultValue="username@mail.com" id="email" name="email" type="text" readOnly></input>
          <label htmlFor="password">Password</label>
          <input defaultValue="************" id="password" name="password" type="text" readOnly></input>
          <span onClick={() =>  {props.onPasswordEditClick()}}>Change password</span>
          </form>
        <div className="Footer">
          <Button type="submit" onClick={() => { props.closeProfile() }} color="primary-outline" outline='outline'>Cancel</Button>
        </div>
      </Modal>
    </div>)
}
function ProfileEdit(props) {
  return (
    <div className="ProfileEdit">
      <Modal header="Profile Edit" onClickOutside={() => { props.closeProfileEdit() }} onCloseClick={() => { props.closeProfileEdit() }}>
        <form>
          <label htmlFor="username">Username</label>
          <input defaultValue="User_name" id="username" name="username" type="text" required autoFocus></input>
          <label htmlFor="email">Email</label>
          <input  defaultValue="username@mail.com" id="email" name="email" type="text" required></input>
          </form>
        <div className="Footer">
          <Button type="submit" onClick={() => { props.closeProfileEdit() }} color="primary-outline" outline='outline'>Cancel</Button>
          <Button type="submit" onClick={() => { props.onProfileEditSubmit() }} color="secondary">Submit</Button>
        </div>
      </Modal>
    </div>)
}
function PasswordEdit(props) {
  return (
    <div className="PasswordEdit">
      <Modal header="Password Edit" onClickOutside={() => { props.closePasswordEdit() }} onCloseClick={() => { props.closePasswordEdit() }}>
        <form>
          <label htmlFor="current-password">Current password</label>
          <input defaultValue="************" id="current-password" name="current-password" type="text" autoFocus required></input>
          <label htmlFor="new-password">New password</label>
          <input defaultValue="************" id="new-password" name="new-password" type="text" required></input>
          <label htmlFor="new-password-confirmation">New password confirmation</label>
          <input defaultValue="************" id="new-password-confirmation" name="new-password-confirmation" type="text" required></input>
          </form>
        <div className="Footer">
          <Button type="submit" onClick={() => { props.closePasswordEdit() }} color="primary-outline" outline='outline'>Cancel</Button>
          <Button type="submit" onClick={() => { props.onPasswordEditSubmit() }} color="secondary">Submit</Button>
        </div>
      </Modal>
    </div>)
}

function Modal(props) {
  const areaRef = useRef(null); //needs for control that click is outside
  //add and remove eventListeners on render
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return (() => { document.removeEventListener("click", handleClickOutside); });
  });

  function handleClickOutside(event) {
    const path = event.path || (event.composedPath && event.composedPath());
    //if clicked outside of Modal but inside Login active
    if (!path.includes(areaRef.current)) {
      props.onClickOutside();
    }
  };
  return (
    <div className="Modal" ref={areaRef}>
      {props.label &&
        <div className="Label">
          <p>{props.label}</p>
        </div>}
      {props.header &&
        <div className="ModalHeader">
          <p>{props.header}</p>
          <svg onClick={() => { props.onClickOutside() }} className="close" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M7.6979 6L12 10.3021L10.3021 12L6 7.6979L1.6979 12L0 10.3021L4.3021 6L0 1.6979L1.6979 0L6 4.3021L10.3021 0L12 1.6979L7.6979 6Z" fill="#505D68" />
          </svg>
        </div>
      }
      {props.children}
    </div>
  )
}
export default App;
