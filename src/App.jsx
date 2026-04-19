import React, { Component, useEffect, useState } from 'react';

// Inroduction of useEffect:---------------------------------------
function Intro(){
  return(
    <div style={{background:"pink", padding:"10px", borderRadius:"5px"}}>
      <h2>What is useEffect?</h2>
      <p>👉 Side effects are things that happen outside the normal UI rendering, like:</p>
      <ul>
        <li>Fetching data from an API</li>
        <li>Subscribing to events</li>
        <li>Setting up timers</li>
        <li>Manually updating the DOM</li>
      </ul>
      <h2>Types of useEffect Usage</h2>
      <ol>
        <li type='number'>
      <h3>Run useEffect on every render</h3>
       <p>📌 No dependency array → runs every time the component renders.</p>
       </li>
       <li>
       <h3>Run useEffect only once (on mount)</h3>
       <p>📌 Empty dependency array → runs only once after the first render.<br/>
        ✅ Common use case: fetching data when the page loads.</p>
       </li>
       <li>
        <h3>Run useEffect when specific state/prop changes</h3>
        <p>📌 Runs whenever the value of count changes.</p>
       </li>
       </ol>
    </div>
  )
}

// 1. Log Mount and Unmount-----------------------

function MountLogger(){
  useEffect(()=>{
    console.log("✅ Component Mounted");

    return () =>{
      console.log("Component unMount")
    }
  },[]);
  
  const para = {fontSize:"20px", fontWeight:"32px"}

  return (
  <><h2>Mount and Unmount Example</h2>
  <p style={para}>📝 Explanation: <br/>
        useEffect with empty dependency [] runs only once when the component is mounted.
        <br/>
       The cleanup function runs when the component is removed from the DOM.</p>
  </>
  )
}

// 2. Update Document Title:--------------------------------------------------------------------------------------


function TitleUpdater(){

  const[count, setCount] = useState(0);

  useEffect(() =>{
   document.title = `Cliked${count}times`
  },[count]);

  const container = {textAline:"center"}
  const btn = {padding: "10px 15px",
    background: "#673ab7",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"}
    const para = {fontWeight:"bold", textAline:"center"}

  return(
      <div style={container}>
        <p style={para}>You Clicked {count} Time</p>
        <button style={btn} onClick={() => setCount(count + 1)}>Click Me</button>
        <br/>
       <p style={para}>📝 Explanation:<br/>
       Every time count changes, the effect updates the document.title.<br/>
       Dependency array [count] ensures effect runs only when count changes.</p>
      </div>
  )
}

// Q3. Fetch Data on Mount:-------------------------------------------------------------------------------

function FetchPosts(){
  const[post, setPost] = useState([]);
 
  useEffect(()=>{
    fetch("https://jsonplaceholder.typicode.com/posts")
    .then((res) => res.json())
    .then((data) => setPost(data));
  },[]);

  const container = {textAline:"center"}

  return(
    <div style={container}>
      <h2>Posts:</h2>
      <ul>
        {post.map((p) => (
            <li key={p.id}>{p.title} - {p.body}</li>
        ))}
      </ul>
    </div>
  )
}

// 4. LocalStorage Save & Retrieve:--------------------------------------------------------------------------------

function LocalStorageExample(){
  const[name, setName] = useState("");

  useEffect(() =>{
    const savedName = localStorage.getItem("name");
    if (savedName) setName(savedName);
  },[]);

  useEffect(()=>{
    if(name) localStorage.setItem("name", name)
    //   setTimeout(()=>{
    //   setName("");
    // },2000)
  },[name]);

   const container = {textAline:"center"};
   const btn = {
    padding: "10px 15px",
    background: "#673ab7",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  }
  const input = {
    padding:"10px 20px",
    fontSize:"16px",
    border: "1px solid #868686ff",
    borderRadius: "5px",
    marginTop:"10px",
    }
    const heading = {
      fontSize:"24px",
      fontWeight:"bold"
    }
    const para={
      fontWeight:"bold", textAline:"center"
    }
  return(
    <div style={container}>
      <label style={heading}> Name: </label>
      <input style={input} type='text' value={name} onChange={(e)=> setName(e.target.value)} placeholder='Enter ur Name'/>
      <p style={heading}>Saved Name: {name}</p>
      <button  style={btn} onClick={() => setName("")}>Clear</button>
      <p style={para}>1. When the component first loads, the first useEffect runs and:<br/> 
              ✅ Reads the previously saved name from localStorage.<br/>
              ✅ Updates the state with that value.<br/>
              ✅ This ensures your input box is filled with the saved name even after page refresh.<br/>
            <br/>
          2. Whenever you type a new name, the second useEffect runs and:<br/>
              ✅ Saves that new name into localStorage.<br/>
              ✅ So if you refresh, the name is not lost.<br/>
            <br/>
          3. What happens if not use useEffect:<br/>
             ✅ The initial value will still load from localStorage because of the useState initializer.<br/>
             ❌ But it will not update localStorage anymore when you type.<br/>
             ❌ So if you refresh the page, the new name will be lost.<br/>
            </p>
    </div>
  )
}

// 5. Timer :------------------------------------------------------------------------------------------

function Timer(){
  const[sec, setSec] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(()=>{
    let Interval;
    
    if(isRunning) {
      Interval =  setInterval(() => {
      setSec((prev) => prev+1);
    },1000);
  }
    return () => clearInterval(Interval);
  },[isRunning]);

  const btn = {
    padding: "10px 15px",
    background: "#673ab7",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    margin:"10px 5px"
  }
  
  const para={
      fontWeight:"bold", textAline:"center"
    }

  const handleStart = () => setIsRunning(true);
  const handleStop = () => setIsRunning(false);
  const handleReset = () => {setIsRunning(false)
    setSec(0);
  }
  return(
  <div>
  <h2>⏳ Timer: {sec}s</h2>
  <button style={btn} onClick={handleStart} disabled={isRunning}>Start</button>
  <button style={btn} onClick={handleStop} disabled={!isRunning}>Stop</button>
  <button style={btn} onClick={handleReset}>Reset</button>

  <p style={para}>1. useEffect with [isRunning]<br/> 
              ✅ When you click Start, isRunning becomes true.<br/>
              ✅ useEffect runs and sets an interval to increment seconds every 1 second.<br/>
              ✅ ThWhen you click Stop, isRunning becomes false.<br/>
              ✅ useEffect runs again and clears the interval (✅ No memory leak). <br/>
              ✅ Reset sets seconds back to 0 and stops the timer. <br/>
            <br/>
          2. If you don’t use useEffect here:<br/>
              If you try to put setInterval inside the handleStart function without useEffect, two big problems will happen: <br/>
              ✅ Multiple intervals can start if you click Start more than once. ⏰⏰⏰<br/>
              ✅ The interval won’t automatically stop or clean up when the component unmounts → 🧠 memory leak.<br/>
            <br/>
            </p>
  </div>
  )
}

// 6. Debounce Search:---------------------------------------------------------

function DebounceSearch(){
  const[query, setQuery] = useState("");
  const[result, setResult] = useState([]);

   const styles = {
  container: {
    maxWidth: "400px",
    margin: "80px auto",
    textAlign: "center",
    padding: "20px",
    background: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  },
  heading: {
    marginBottom: "15px",
    fontFamily: "Arial, sans-serif",
    color: "#333",
  },
  input: {
    width: "50%",
    padding: "12px 15px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
    marginBottom: "10px",
    transition: "all 0.3s",
  },
  list: {
    listStyle: "none",
    padding: 0,
    marginTop: "10px",
  },
  listItem: {
    background: "#f8f8f8",
    marginBottom: "8px",
    padding: "10px",
    borderRadius: "8px",
    textAlign: "left",
    transition: "background 0.3s",
    cursor: "pointer",
  },
  email: {
    color: "#555",
    fontSize: "14px",
  },
  
  noResult: {
    color: "#e63946",
    fontWeight: "500",
  },
};

  useEffect(()=>{
    if(!query){setResult([]); return;} 
    const timeOut = setTimeout(()=>{
      fetch(`https://jsonplaceholder.typicode.com/users?name_like=${query}`)
      .then((res) => res.json())
      .then((data) => setResult(data))
    },500);
    return () => clearTimeout(timeOut);
  },[query]);

  return(
    <div style={styles.container}>
      <h1 style={styles.heading}>🔍 User Search</h1>
      <input
        style={styles.input}
        type="text"
        placeholder="Search by name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    <ul style={styles.list}>
        {result.length > 0 ? (
          result.map((ele) => (
            <li key={ele.id} style={styles.listItem}>
              <strong>{ele.name}</strong> - 
              
              <span style={styles.email}>{ele.email}</span>
            </li>
          ))
        ) : (
          query  && <p style={styles.noResult}>❌ No users found</p>
        )}
      </ul>
    </div>
  )
}

//7. Status Check:--------------------------------------------------------------------------------------

function OnOffLineStatus(){
  const[isOnline, setIsOnline] = useState(navigator.onLine);
  useEffect(()=>{
     const Online = () => setIsOnline(true);
     const Offline = () => setIsOnline(false);

     window.addEventListener("online", Online);
     window.addEventListener("offline", Offline);

     return () =>{
      window.removeEventListener("online", Online);
      window.removeEventListener("offline", Offline);
     }
  },[]);
   
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // height: "100vh",
    background: "#ffffffff",
    fontFamily: "Arial, sans-serif",
    flexDirection:"column",
   
  };

  const statusBox = {
    background: isOnline ? "#e6ffe6" : "#ffe6e6",
    color: isOnline ? "#0b8a0b" : "#c70000",
    padding: "20px 40px",
    borderRadius: "12px",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
    fontSize: "24px",
    fontWeight: "bold",
    transition: "all 0.3s ease",
  };

  const item ={
    fontSize:"16px",
    fontWeight:"bold",
    alignItems:"left",
    display:"flex",
    flexDirection:"column"
  }

  return (
    <div style={containerStyle}>
      <div style={statusBox}>
        {isOnline ? "🟢 You are Online" : "🔴 You are Offline"}
      </div>
      <p style={item}>🧠 Logic
        <ul>
          <li>navigator.onLine(built-in browser property) → detects current network state.</li>
          <li>online & offline events → trigger when connection changes.</li>
          <li>useEffect → registers the event listeners once.</li>
          <li>UI updates automatically through setIsOnline.</li>
        </ul>
      </p>
    </div>
  );
}

// 8.Infinite Scrollin(using Lazy Loading):-------------------------------------------------------------------------- 

function InfiniteLazyLoad(){
  const[image,setImage] = useState([]);
  const[page,setPage] = useState(1);
  const[loading,setLoading] = useState(false);

  const containerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "16px",
    padding: "20px",
  };
  const cardStyle = {
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
    background: "#fff",
    textAlign: "center",
  };

  const imgStyle = {
    width: "100%",
    height: "250px",
    objectFit: "cover",
    display: "block",
  };

  const skeletonStyle = {
    width: "100%",
    height: "250px",
    background: "linear-gradient(90deg, #e0e0e0 25%, #f5f5f5 50%, #e0e0e0 75%)",
    backgroundSize: "200% 100%",
    // animation: "loading 1.5s infinite",
    borderRadius: "10px",
  };

  const fetchImage = async(p) =>{
    setLoading(true);
    const res = await fetch(`https://picsum.photos/v2/list?page=${p}&limit=10`);
    const data = await res.json();
    setImage((prev) => [...prev, ...data]);
    setLoading(false);
  }
 
  useEffect(()=>{
    fetchImage(page)
  },[page]);

  useEffect(()=>{
    const handleScroll = () =>{
      if(window.innerHeight + window.scrollY >= document.body.offsetHeight -10){
        setPage((prev) => prev +1)
      }
    }
    window.addEventListener("scroll",handleScroll);
    return  () => window.removeEventListener("scroll", handleScroll);
    
  },[])

  return(
    <div>
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>
        🖼️ Infinite Scroll + Lazy Loading + Skeleton
        </h1>
        <div style={containerStyle}>
          {image.map((img) => (
            <div key={img.id} style={cardStyle}>
              <img src= {img.download_url}
              alt={img.author}
              style={imgStyle}
              loading="lazy"/>
              <p style={{ padding: "10px", fontSize: "16px", color: "#333" }}>
              {img.author}
            </p>
              </div>
          ))}


               {loading &&
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} style={cardStyle}>
              <div style={skeletonStyle}></div>
              <div
                style={{
                  height: "20px",
                  margin: "10px auto",
                  width: "60%",
                  background: "#e0e0e0",
                  borderRadius: "5px",
                }}
              ></div>
            </div>
          ))}

        </div>
    </div>
  )
}

// 9.Toggle Theme:-----------------------------------------------------------------------------------------

function ToggleTheme(){
  const[isOn, setIsOn] = useState(false);
  useEffect(()=>{
    if(isOn){
      document.body.style.background="green"
    }else{
      document.body.style.background="red"
    }
  },[isOn]) // runs every time `isOn` changes
  return(
    <div style={{textAlign: "center", color: "white", paddingTop: "100px"}}>
      <h2>{isOn?"Bulb is on":"Bulb is off"}</h2>
      <button style={{padding: "10px 20px",
          cursor: "pointer",
          fontSize: "18px",}} onClick  = {() => setIsOn(!isOn)}>
            {isOn?"Turn Off":"Turn On"}
          </button>
    </div>
  )
}

// 10. Window Resize Tracker:---------------------------------------------------------------------

function WindowResizeTracker() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <h1>Track Data</h1>
      <h2>Window Width: {width}px</h2>
    </div>
  )
}



const projects = [
  {
    category: "Basic",
    items: [
      // {id:1, name:"Mount/UnMount", Component:<MountLogger/>},
      {id:1, name:"Introductions", Component:<Intro/>},
  {id:2, name:"TitleUpdater", Component:<TitleUpdater/>},
  {id:3, name:"Fetch Data", Component:<FetchPosts/>},
  {id:4, name:"LocalStorageExample", Component:<LocalStorageExample/>},
  {id:5, name:"Timer", Component:<Timer/>},
  {id:6, name:"DebounceSearch", Component:<DebounceSearch/>},
  {id:7, name:"Network Status", Component:<OnOffLineStatus/>},
  {id:8, name:"Infinite Scrolling", Component:<InfiniteLazyLoad/>},
  {id:9, name: "Toggle Theme", Component:<ToggleTheme/>},
  {id:10, name:"Window Resizer", Component:<WindowResizeTracker/>} 
    ],
  },
  {
    category: "Intermediate",
    items: [

    ],
  },
  {
    category: "Advanced",
    items: [
      
    ],
  },
];


export default function App() {
  const [activeProject, setActiveProject] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Responsive handling for hamburger
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sidebarStyle = {
    width: "250px",
    background: "#6200ea",
    color: "#fff",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    position: "fixed",
    left: isMobile ? (isSidebarOpen ? "0" : "-260px") : "0",
    top: 0,
    bottom: 0,
    overflowY: "auto",
    transition: "left 0.3s ease",
    zIndex: 2000,
  };

  const hamburgerStyle = {
    position: "fixed",
    top: 20,
    left: 20,
    background: "#6200ea",
    color: "#fff",
    border: "none",
    padding: "10px 12px",
    borderRadius: "5px",
    fontSize: "20px",
    cursor: "pointer",
    zIndex: 2500,
    display: isMobile ? "block" : "none",
  };

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.5)",
    display: isMobile && isSidebarOpen ? "block" : "none",
    zIndex: 1500,
  };

  const contentStyle = {
    flex: 1,
    marginLeft: isMobile ? "0" : "250px",
    padding: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "margin-left 0.3s ease",
    background: "#ffffffff",
    minHeight: "80vh",
    minWidth:"70vw"
  };

  const menuBtn = (isActive) => ({
    display: "block",
    width: "100%",
    textAlign: "left",
    padding: "8px 12px",
    background: isActive ? "#fff" : "#3700b3",
    color: isActive ? "#000" : "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "8px",
    transition: "0.3s",
  });

  const allItems = projects.flatMap((p) => p.items);
  const active = allItems.find((p) => p.id === activeProject)?.Component;

  return (
    <>
      <div style={overlayStyle} onClick={toggleSidebar}></div>
      <button style={hamburgerStyle} onClick={toggleSidebar}>
        ☰
      </button>

      <aside style={sidebarStyle}>
        <h2 style={{ textAlign: "center" }}>📂 useEffect Projects</h2>
        {projects.map((group) => (
          <div key={group.category}>
            <div style={{ fontWeight: "bold", marginBottom: 10 }}>
              {group.category}
            </div>
            {group.items.map((item) => (
              <button
                key={item.id}
                style={menuBtn(activeProject === item.id)}
                onClick={() => {
                  setActiveProject(item.id);
                  if (isMobile) toggleSidebar();
                }}
              >
                {item.name}
              </button>
            ))}
          </div>
        ))}
      </aside>

      <main style={contentStyle}>{active}</main>
    </>
  );
}
