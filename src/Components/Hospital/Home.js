import styled from "styled-components"
import "./css/home.css";
import { useState,useEffect } from "react";
import { Link } from "react-router-dom"
import { ModalContainer, ModalOverlay, ModalCloseBtn, ModalContent } from "./Modal";
import Axios from 'axios';
import {useNavigate} from "react-router-dom"
const Container=styled.div`
  width: calc(100vw-10px);
  background-color:e5989b ;
`
const Footer=styled.div`
display: flex;
`
const Buttons=styled.ul`
li{
    list-style: none;
    margin: 20px;
    float: left;
    position: relative;
    top: 100px;
    left: 250px;
    z-index: 1;
}
`
const Table=styled.table`
    width: 100%;
    border: 1px solid #444444;
    background-color: ffcdb2;
  th{
    background-color: lightsalmon;
  }
  th, td {
    border: 1px solid #444444;
    
  }
`
export function Home(){
  
  const userID = sessionStorage.getItem('id');
  const user_id = sessionStorage.getItem('id');
  const navigate = useNavigate();
  const [reservation, setReservation] = useState('');
  const [isResvationLoadong,setisReservationLoading]=useState(false);
  function reservationLoading() {
    // 서버의 API를 호출하여 데이터 가져오기
    fetch('http://localhost:3301/api/reservationUpdate') // 백엔드 서버 주소를 사용
      .then((response) => response.json())
      .then((data) => {
        // 예약자 아이디 추가
        const reservationsWithUserId = data.map((reservation) => ({
          ...reservation,
          user_id: sessionStorage.getItem('id'), // 예약자 아이디 추가
        }));
        setReservation(reservationsWithUserId);
        setisReservationLoading(true);
        console.log(reservationsWithUserId);
      })
      .catch((error) => {
        console.error('데이터 불러오기 실패:', error);
      });
  }
  

  useEffect(() => {
    reservationLoading();
  }, [isResvationLoadong]);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen1, setModalOpen1] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [modalOpen3, setModalOpen3] = useState(false);

  
          // 사용자 정보를 담을 상태 변수들
          const [year, setYear] = useState('');
          const [hospital, setHospital] = useState('');
          const [hospitalName, setHospitalName] = useState('');

          // 예약하기 버튼 클릭 시 실행되는 함수
          const handleRegister= async (e) =>{
              e.preventDefault();
              // 서버에 회원가입 요청을 보냄
    const isLogin = sessionStorage.getItem('isLogin');
    if (isLogin === "true") {
          
              Axios.post('http://localhost:3301/api/reservation', {
              year: year,
              hospital: hospital,
              hospital_name: hospitalName,
              })
              .then((response) => {
              // 예약 성공 시 처리
              alert("예약성공 성공");
              navigate('/home');
              // 예약 성공 후 리다이렉션 등 필요한 처리 추가
              })
              .catch((error) => {
              // 예약 실패 시 처리
              console.error('예약 실패오류:', error);
              });
            } else {
              // 로그인 상태 아닐 경우
              alert("로그인 plz");
            }          
        };

        function formatDate(dateString) {
          const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: 'Asia/Seoul' };
          return new Intl.DateTimeFormat('ko-KR', options).format(new Date(dateString));
        }
  return<>
      <Container>   
      {modalOpen &&
        <ModalContainer>
            <ModalOverlay onClick={() => setModalOpen(false)}/>
            <ModalContent>
                <ModalCloseBtn onClick={() => setModalOpen(false)}>x</ModalCloseBtn>
                <div className="tap-panels">
                    <div className="tab-panel">
                    <div className="date"onChange={(e) => setYear(e.target.value)}>날짜:<input type="date" /></div>
                    <table>
                        <tbody>
                        <tr>
                            <td>
                            <select name="nation"onChange={(e) => setHospital(e.target.value)}>
                                <option value="hospital">병원을 선택하세요.</option>
                                <optgroup label="병원">
                                <option value="내과" >내과</option>
                                <option value="외과">외과</option>
                                <option value="치과">치과</option>
                                </optgroup>
                            </select>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <div><input className="hospitalName"type="text" onChange={(e) => setHospitalName(e.target.value)}/></div>
                    <div>예약하기
                    { user_id===  userID&& (
                      <input type="submit" value="Submit" onClick={handleRegister} />
                    )}
                    </div>
                    </div>
                </div>
            </ModalContent>
        </ModalContainer>
    }
    {
    modalOpen1 &&
        <ModalContainer>
        <ModalOverlay onClick={() => setModalOpen1(false)}/>    
        <ModalContent>
        <Table>
          <thead>
            <tr>
              <th>예약일자</th>
              <th>병원종류</th>
              <th>병원이름</th>
              <th>예약자</th>
            </tr>
          </thead>
          <tbody>
            {reservation && reservation.length > 0 && reservation.map((item, index) => (
              <tr key={index}>
                <td>{formatDate(item.year)}</td>
                <td>{item.hospital}</td>
                <td>{item.hospital_name}</td>
                <td>{item.user_id}</td>
              </tr>
            ))}
          </tbody>
        </Table>
            <ModalCloseBtn className="modal-close-btn" onClick={() => setModalOpen1(false)}>
            x
            </ModalCloseBtn>
        </ModalContent>
        </ModalContainer>
    }
    {
    modalOpen2 &&
        <ModalContainer>
        <ModalOverlay onClick={() => setModalOpen2(false)}/>    
        <ModalContent>
            <ModalCloseBtn className="modal-close-btn" onClick={() => setModalOpen2(false)}>
            x
            </ModalCloseBtn>
        </ModalContent>
        </ModalContainer>
    }
    {
    modalOpen3 &&
        <ModalContainer>
        <ModalOverlay onClick={() => setModalOpen3(false)}/>    
        <ModalContent>
            <ModalCloseBtn className="modal-close-btn" onClick={() => setModalOpen3(false)}>
            x
            </ModalCloseBtn>
        </ModalContent>
        </ModalContainer>
    } 
        <main>
              <section className="section">
                    <div>
                      <Buttons>        
                          <li>
                              <button className="button" onClick={() => setModalOpen(true)}>
                                <h2>예약 하기</h2>
                              </button>  
                            </li>          
                          <li>
                              <button className="button" onClick={() => setModalOpen1(true)}>
                                <h2>예약 확인</h2>
                              </button>  
                            </li>          
                          <li>
                              <button className="button" onClick={() => setModalOpen2(true)}>
                                <h2>예약자 현황</h2>
                              </button>  
                            </li>          
                          <li>
                              <button className="button" onClick={() => setModalOpen3(true)}>
                                <h2>병원 정보</h2>
                              </button>  
                            </li>        
                        </Buttons>
                    </div>
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