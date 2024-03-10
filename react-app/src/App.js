import './App.css';
import { useState } from 'react';

//props를 통해서 데이터를 입력 받고 그 데이터의 새부값을 .title같은 형태를 통해서 
//입력받는다.
function Article(props){
  return<article>
        <h2>{props.title}</h2>
        {props.body} 
      </article> 
}

//사용자 정의 태그
function Header(props){
    // 사용자 정의 태그는 반듯이 대문자로 시작해야 한다.
    // 사용자 정의 태그가 아닌 = 컴포넌트라고 명명한다.
    return<header>
    <h1><a href='/' onClick={(event) => {
      event.preventDefault(); //기본동작을 방지한다. -> 리로드 방지함
      props.onChangeMode();
    }}>{props.title}</a></h1>
  </header>
}

function Nav(props){
  const lis = []
  for(let i = 0; i<props.topics.length; i++){
    let t = props.topics[i];
    lis.push(<li key={t.id}>
      <a id={t.id} href={'/read/'+t.id} onClick={(event) => {
      event.preventDefault();
      props.onChangeMode(Number(event.target.id));
    }}>{t.title}</a></li>)
  }
  return<nav>
        <ol>
          {lis}
        </ol>
      </nav>
}
function Create(props){
  return <article>
    <h2>Create</h2>
    <form onSubmit={event=>{
      event.preventDefault();
      const title = event.target.title.value //이벤트가 발생한 타겟 = form태그
      const body = event.target.body.value
      props.onCreate(title, body);
    }}>
      <p><input type='text' name='title' placeholder='title'/></p>
      <p><textarea type='text' name='body' placeholder='title'/></p>
      <p><input type='submit' value='Create'></input></p>
    </form>
  </article>
}
function App() { 
  // const _mode = useState('WELCOME');
  // console.log(_mode); // useState의 초기값
  // const mode = _mode[0]; // useState의 0번째 데이터는 상태의 값을 읽는것
  // const setMode = _mode[1]; // useState의 1번째 데이터는 상태의 값을 변경할때 사용하는 함수

  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    {id:1,title:'html',body:'html is ...'},
    {id:2,title:'css',body:'css is ...'},
    {id:3,title:'javascript',body:'javascript is ...'}
  ]);

  let content = null;
  if(mode === 'WELCOME'){
    content = <Article title='Welcome' body="Hello, Web"></Article>
  }else if(mode === 'READ'){
    let title, body = null;
    for(let i =0; i<topics.length; i++){
      console.log(topics[i].id, id);
      if(topics[i].id === id){
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>
  }else if(mode == 'CREATE'){
    content = <Create onCreate={(title, body)=>{
      const newTopic = {id:nextId, title: title, body: body}
      const newTopics = [...topics]
      newTopics.push(newTopic)
      setTopics(newTopics);
    }}></Create>
  }
  return (
    <div>
      <Header title="Web" onChangeMode={() => {
        setMode('WELCOME');
      }}></Header>
      <Nav topics={topics} onChangeMode={(_id)=>{
        setMode('READ');
        setId(_id);
      }}></Nav>
      {content}
      <a href='/create' onClick={event=>{
        event.preventDefault();
        setMode('CREATE');
      }}>Create</a>
    </div>
  );
}
// 저장을 바꿔도 app이 다시 실행하지 않기 때문에 값이 변하지 않는다.
// 

export default App;
