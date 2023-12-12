import styled from "styled-components"
import "./css/admin.css";
import Login from "./Login";
import { useState,useEffect } from "react";
import { ModalContainer, ModalOverlay, ModalCloseBtn, ModalContent } from "./Modal";
import { Link } from "react-router-dom"
const Container=styled.div`
  width: calc(100vw-10px);
  background-color:khaki ;
`
const Footer=styled.div`
display: flex;
`
const Sidebar=styled.div`
  width: 10%;
  height: 900px;
  background-color: ffb4a2;
  li{    
    position: relative;
    text-align: center;
    top: 100px;
  }
  li a{
    color: black;
  }
  li a:hover{
    cursor: pointer;
    color:rgb(55, 55, 198);
  }
`

export function Admin(){
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('isLogin')) {
      setIsLogin(true);
    }
  },[]);
  
  const [test, setTest] = useState('');

  function testLoading() {
    // 서버의 API를 호출하여 데이터 가져오기
  fetch('http://localhost:3301/api/test') // 백엔드 서버 주소를 사용
  .then((response) => response.json())
  .then((data) => {
  setTest(data);
  })
  .catch((error) => {
  });
}

useEffect(() => {
  testLoading();
}, [test]);

const [modalOpen1, setModalOpen1] = useState(false);
const [modalOpen2, setModalOpen2] = useState(false);


  return<>
      <Container>   
      {
    modalOpen1 &&
        <ModalContainer >
        <ModalOverlay onClick={() => setModalOpen1(false)}/>    
        <ModalContent>
            <ModalCloseBtn className="modal-close-btn" onClick={() => setModalOpen1(false)}>
            x
            </ModalCloseBtn>
        </ModalContent>
        </ModalContainer>
    }
    {
    modalOpen2 &&
        <ModalContainer >
        <ModalOverlay onClick={() => setModalOpen2(false)}/>    
        <ModalContent>
            <ModalCloseBtn className="modal-close-btn" onClick={() => setModalOpen2(false)}>
            x
            </ModalCloseBtn>
        </ModalContent>
        </ModalContainer>
    }
        <main>
        <Login isLogin={isLogin} setIsLogin={setIsLogin} userId={userId} setUserId={setUserId} password={password} setPassword={setPassword} />
              <section >
                <Sidebar>
                  <h2>관리자</h2>
                  <ul>
                    <li><Link to="/admin"onClick={() => setModalOpen1(true)}>병원정보</Link></li>
                    <li><Link to="/admin"onClick={() => setModalOpen2(true)}>회원정보</Link></li>
                  </ul>
                </Sidebar>
              </section>
          </main>
          <Footer>
    <ul>
        <li><Link to='https://cocoder.tistory.com' target='_blank'>Blog</Link> </li>
        <li><Link to='https://github.com/hwang-jin-woo/' target='_blank'>Github</Link></li>
    </ul>
    <p>
        <span>저자 : 황진우</span><br/>
        <span>이메일 : hjinu91@naver.com</span><br/>
        <span>Copyright 2023. copy. All Rights Reserved.</span>
    </p>
</Footer>
    </Container>  
  </>
}