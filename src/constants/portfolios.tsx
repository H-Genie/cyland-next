import MakePortfolioModal from "components/RightBody/PortfolioSection/MakePortfolioModal";
import { Portfolio, PortfolioVisitor, ProjectType } from "models/portfolio";

const cyland = new Portfolio(
  "Cyland",
  "https://h-genie.com",
  "./images/portfolio/cyland.jpg"
);
const pagination = new Portfolio(
  "Pagination",
  "https://github.com/H-Genie/pagination",
  "./images/portfolio/pagination.jpg"
);
const movieapp = new Portfolio(
  "Movie App",
  "https://genie-movieapp.onrender.com",
  "./images/portfolio/movieapp.jpg"
);
const todo = new Portfolio(
  "To Do List App",
  "https://h-genie.github.io/todo",
  "./images/portfolio/todo.jpg"
);
const genesis = new Portfolio(
  "Genesis",
  "https://h-genie.github.io/genesis",
  "./images/portfolio/genesis.jpg"
);
const flag = new Portfolio(
  "청기백기 게임",
  "https://h-genie.github.io/flag-game",
  "./images/portfolio/flag.jpg"
);
const huge = new Portfolio(
  "Huge Inc.",
  "https://h-genie.github.io/hugeinc",
  "./images/portfolio/huge.jpg"
);
const netflix = new Portfolio(
  "Netflix",
  "https://h-genie.github.io/netflix",
  "./images/portfolio/netflix.jpg"
);
const naver = new Portfolio(
  "NAVER Corporation",
  "https://h-genie.github.io/naver",
  "./images/portfolio/naver.jpg"
);
export const vom = new Portfolio(
  "봄아카데미",
  "https://vomacademy.com",
  "./images/portfolio/vom.jpg"
);

export const portfolio = [
  cyland,
  pagination,
  movieapp,
  todo,
  genesis,
  flag,
  huge,
  netflix,
  naver,
  vom
];

const cylandVisitor = new PortfolioVisitor(
  cyland.name,
  cyland.link,
  cyland.thumbnail,
  ProjectType.FRONTEND,
  "Next.js, Typescript, Firebase",
  "현재 사이트 (포트폴리오 소개) \n 검색엔진 등록 (구글, 네이버, 다음)",
  "Sever Side Rendering, Styled Component, Firestore 데이터베이스, OOP",
  "메인 컴포넌트 + 라우터 3",
  {
    코드: "https://github.com/H-Genie/cyland-next"
  }
);

const paginationVisitor = new PortfolioVisitor(
  pagination.name,
  pagination.link,
  pagination.thumbnail,
  ProjectType.FULLSTACK,
  "Node.js, MongoDB, React",
  "페이지네이션, 필터링, 소팅",
  "백엔드(REST API 설계, 인덱싱) \n 프런트엔드(React Context, 페이지네이션 로직)",
  "메인 컴포넌트, 상세 컴포넌트 (토글)",
  {
    포트폴리오: pagination.link,
    코드: "https://github.com/H-Genie/pagination",
    swagger: "https://myapi-h-genie.koyeb.app/docs"
  }
);

const movieappVisitor = new PortfolioVisitor(
  movieapp.name,
  movieapp.link,
  movieapp.thumbnail,
  ProjectType.FRONTEND,
  "React",
  "영화&배우 프로필 소개 페이지",
  "React Router, Ant Design, 데이터 페칭(Axios + useEffect), 배열 관리",
  "메인 컴포넌트 + 영화 상세 라우터 + 배우 상세 라우터",
  {
    포트폴리오: movieapp.link,
    코드: "https://github.com/H-Genie/movieapp"
  }
);

const todoVisitor = new PortfolioVisitor(
  todo.name,
  todo.link,
  todo.thumbnail,
  ProjectType.FRONTEND,
  "React, Redux, Firebase",
  "실제 활용 가능한 투두 리스트 (개인인증, DB 저장) \n\n 파이어베이스(구글 인증, 실시간 DB) 활용한 리액트 프로젝트 \n 기능 : 추가, 수정, 삭제, 순서변경 \n 인증정보 Redux로 관리",
  "React Hook, 상태관리 (Redux-Toolkit), Firestore 데이터베이스, 구글 Authentication",
  "메인 컴포넌트",
  {
    포트폴리오: movieapp.link,
    코드: "https://github.com/H-Genie/todo"
  }
);

const genesisVisitor = new PortfolioVisitor(
  genesis.name,
  genesis.link,
  genesis.thumbnail,
  ProjectType.PUBLISHING,
  "HTML, CSS, JavaScript",
  "과정 수료 후 웹퍼블리싱 종합 프로젝트 \n 멀티플 캐러셀 구현에 초점",
  "CSS 선택자 심화, 스크롤 이벤트",
  "메인페이지 / 반응형",
  {
    포트폴리오: genesis.link,
    코드: "https://github.com/H-Genie/genesis"
  }
);

const flagVisitor = new PortfolioVisitor(
  flag.name,
  flag.link,
  flag.thumbnail,
  ProjectType.FRONTEND,
  "HTML, CSS, JavaScript",
  "청기백기 게임 \n 퍼블리싱 이외의 자바스크립트 활용 연습 \n 백그라운드 로직 설계 연습",
  "Math 오브젝트, Switch문, 파라미터",
  "메인페이지, 백그라운드 로직, 반응형",
  {
    포트폴리오: flag.link,
    코드: "https://github.com/H-Genie/flag-game",
    로직: (
      <MakePortfolioModal projectName="flag" imageIndex={1} linkTitle="로직" />
    )
  }
);

const hugeVisitor = new PortfolioVisitor(
  huge.name,
  huge.link,
  huge.thumbnail,
  ProjectType.PUBLISHING,
  "HTML, CSS, JavaScript",
  "코딩 배운 후 첫번째 프로젝트 \n 박스모델과 DOM 구조에 대한 학습 \n 반응형과 자바스크립트 학습 후 디벨롭",
  "박스 모델, 미디어 태그, 클릭 이벤트, 조건문, Date 객체",
  "메인페이지 + 서브페이지 4개 / 반응형",
  {
    포트폴리오: huge.link,
    코드: "https://github.com/H-Genie/hugeinc",
    박스모델: (
      <MakePortfolioModal
        projectName="huge"
        imageIndex={6}
        linkTitle="박스모델"
      />
    )
  }
);

const netflixVisitor = new PortfolioVisitor(
  netflix.name,
  netflix.link,
  netflix.thumbnail,
  ProjectType.PUBLISHING,
  "HTML, CSS, JavaScript",
  "미디어쿼리 실습 프로젝트 \n\n * 넷플릭스 사이트와 똑같아 피싱 사이트로 감지되나, 이용에 문제가 없습니다. \n '세부정보-안전하지 않은 사이트 방문'을 눌러주세요",
  "폼 태그, 반복문, CSS 반응형",
  "메인페이지 / 반응형",
  {
    포트폴리오: netflix.link,
    코드: "https://github.com/H-Genie/netflix"
  }
);

const naverVisitor = new PortfolioVisitor(
  naver.name,
  naver.link,
  naver.thumbnail,
  ProjectType.PUBLISHING,
  "HTML, CSS, JavaScript",
  "자바스크립트 실습 프로젝트 \n 싱글 캐러셀 구현에 초점",
  "CSS 가상요소, 타이밍 이벤트, 이벤트 리스너",
  "메인페이지 / 반응형",
  {
    포트폴리오: naver.link,
    코드: "https://github.com/H-Genie/naver",
    캐러셀로직: "https://h-genie.github.io/study/javascript_slide.html"
  }
);

const vomVisitor = new PortfolioVisitor(
  vom.name,
  vom.link,
  vom.thumbnail,
  ProjectType.BUSINESS,
  "HTML, CSS, JavaScript, jQuery, PHP, MySQL",
  "실무 : 봄아카데미 홈페이지 개발 및 운영 \n\n 카페24 배포, HTTPS 인증서 적용 \n디자이너와 협업 (Adobe XD 활용) \n 검색엔진 등록 (구글, 네이버, 다음) \n 자동가입 방지 리캡챠 적용",
  "Create Element & Append Child, 모달 박스, This 키워드, Ajax, SQL CRUD, 세션 로그인, bycrypt, Mail 함수, 데이터베이스 설계",
  "메인페이지 6 + 서브페이지 9 + 관리자 페이지 + 백엔드 / 반응형",
  {
    사이트: vom.link,
    디자인가이드:
      "https://xd.adobe.com/view/d2c60d54-3c38-4f9b-76b2-f2bffc1012e4-a4f7",
    플로우차트: (
      <MakePortfolioModal
        projectName="vom"
        imageIndex={3}
        linkTitle="플로우차트"
      />
    )
  }
);

export const portfoilioVisitor = [
  cylandVisitor,
  paginationVisitor,
  movieappVisitor,
  todoVisitor,
  genesisVisitor,
  flagVisitor,
  hugeVisitor,
  netflixVisitor,
  naverVisitor,
  vomVisitor
];
