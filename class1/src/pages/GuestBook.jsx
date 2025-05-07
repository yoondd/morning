import React from 'react';
import { useEffect, useState } from 'react';
import './GuestBook.css';
import axios from 'axios'; //fetch는 너무 길어서 axios를 사용할 것이다.

const GuestBook = () => {

  const [ apiMessage, setApiMessage ] = useState([]); //get으로 가져올 데이터 (select로 가져온 것)
  const [ postData, setPostData ] = useState({ name: "", message: "" });  //내가 폼으로 받아올 정보를 객체에 담아서 가져온다.  

  //select 먼저 해보자
  const showMessage = async () => {
    try{
      //가져오는 명령어 
      const res = await axios.get('https://guest-391145246820.us-central1.run.app/guest');
      // const data = await res.json();
      setApiMessage(res.data);
      console.log(apiMessage);
    } catch(err) {
      console.error("데이터 불러오기 실패",err);
    }
  }
  //호출을 아래처럼 이렇게 하는건 리액트가 아니지, 
  //showMessage();

  //리액트방식대로 해볼까?
  useEffect(()=>{
    showMessage();
  },[apiMessage]); // 위 함수를 한번만 실행시켜주라. 이런느낌. 



  //insert해볼까? post 만들어야지
  const submitPost = async (e) => {
    e.preventDefault();
    try{
      //이미 입력작업이 끝났음
      await axios.post("https://guest-391145246820.us-central1.run.app/guest", postData);

      //input 상자 클리어 하기
      setPostData({ name: "", message: "" });

      //방명록에 넣은걸 보는 것도 적어야한다
      // await showMessage();
      // showMessage();
    } catch(err){
      console.error("데이터 불러오기 실패",err);
    }
  }

  return (
    <div className="guest-container">
       {/* post를위한 상자를 만들자 */}
       <form onSubmit={submitPost}>

          <h1 className="sub-title">GuestBook</h1>

          <div className="message">
          {
            apiMessage.map(data=>(
              <dl key={data.id} className="message-card">
                <dt>🐶 {data.name}<span>{new Date(data.created_at).toLocaleString()}</span></dt>
                <dd>{data.message}</dd>
              </dl>
            ))
          }
          </div>

          <div className="form">
            {/* 바뀐 postData의 name이 생성되고 value에 들어간다 */}
            <input type="text" value={postData.name} placeholder='name'
            //리액트에서는 **set이 우선값을 가진다.** 수정값이 우선값을 가진다. onChange가 먼저 일어나면 value를 setPostData에 집어넣는다.
            onChange={e => setPostData({ ...postData, name: e.target.value }) } //현재값은 유지하면서 name을 추가한다
            required />
            
            <textarea 
              value={postData.message}
              onChange={e=> setPostData({ ...postData, message: e.target.value })}
              placeholder='message'
            ></textarea>

            <input type="submit" value="submit"/>
          </div>
       </form>

       
    </div>
  )
}

export default GuestBook
