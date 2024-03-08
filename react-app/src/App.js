import logo from './logo.svg';
import './App.css';

//사용자 정의 태그
function Header(props){
  console.log('props : ', props , props.title);
  // 사용자 정의 태그는 반듯이 대문자로 시작해야 한다.
  // 사용자 정의 태그가 아닌 = 컴포넌트라고 명명한다.
  return<header>
  <h1><a href='/'>{props.title}</a></h1>
</header>
}
//props를 통해서 데이터를 입력 받고 그 데이터의 새부값을 .title같은 형태를 통해서 
//입력받는다.
function Article(props){
  return<article>
        <h2>{props.title}</h2>
        {props.body}
      </article>
}
function Nav(props){
  const lis = []
  for(let i = 0; i<props.topics.length; i++){
    let t = props.topics[i];
    lis.push(<li key={t.id}><a href={'/read/'+t.id}>{t.title}</a></li>)
  }
  return<nav>
        <ol>
          {lis}
        </ol>
      </nav>
}
function App() { 
  const topics = [
    {id:1,title:'html',body:'html is ...'},
    {id:2,title:'css',body:'css is ...'},
    {id:3,title:'javascript',body:'javascript is ...'}
  ]
  return (
    <div>
      <Header title="Web"></Header>
      <Nav topics={topics}></Nav>
      <Article title="Welcome" body="Hello, Web"></Article>
    </div>
  );
}

export default App;
